import uvicorn
from fastapi import FastAPI, Query, HTTPException
from pydantic import BaseModel
from DatabaseSource import help_functions, sql_cmds
import re
import pandas as pd
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from router import APIRouter

app = FastAPI()
router = APIRouter()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)
print(dotenv_path)

connection = None
print("Connecting to db from outside main")
connection = help_functions.connect_database(
    os.getenv("HOST"), os.getenv("MYSQL_USER"), os.getenv("MYSQL_PASSWORD"), os.getenv("DB_NAME"))


class DepartmentQuery(BaseModel):
    department_id: str


class ProgramQuery(BaseModel):
    program_name: str


class ProgramAndSemesterQuery(BaseModel):
    program_name: str
    semester: str
    year: int


class AcademicYearQuery(BaseModel):
    start_year: int


@app.get("/")
async def root():
    # Get something simple without any params
    return {"statusCode": 200, "result": "Successfully set up backend, please go to the frontend and test it out!"}

# Create Tables Function


@router.get("/create_tables/")
async def create_tables():
    print("Create tables!")
    statusCode = 200
    try:
        existing_tables = help_functions.valid_tables(connection)
        required_tables = {
            'department': sql_cmds.create_department_table,
            'faculty': sql_cmds.create_faculty_table,
            'program': sql_cmds.create_program_table,
            'course': sql_cmds.create_course_table,
            'section': sql_cmds.create_section_table,
            'programcourses': sql_cmds.create_program_courses_table,
            'objectives': sql_cmds.create_objectives_table,
            'subobjectives': sql_cmds.create_sub_objectives_table,
            'courseobjectives': sql_cmds.create_course_objectives_table,
            'objectiveeval': sql_cmds.create_objective_eval_table,
        }

        # Convert both lists to lowercase
        existing_tables_lower = [table.lower() for table in existing_tables]
        required_tables_lower = [table.lower() for table in required_tables]

        # Find tables to create (case-insensitive comparison)
        tables_to_create = [
            table for table in required_tables_lower if table not in existing_tables_lower]

        if tables_to_create:
            for table in tables_to_create:
                if help_functions.execute_query(connection, required_tables[table]):
                    statusCode = 200
                    response_message = f"Created successfully {len(tables_to_create)} table(s)."
                else:
                    statusCode = 500
                    response_message = f"Error occurred while creating table"
                    break
        else:
            statusCode = 201
            response_message = "All required tables already exist."

        return {"message": response_message, statusCode: statusCode}

    except Exception as e:
        return {"message": f"An error occurred: {str(e)}", statusCode: statusCode}


@router.get("/clear_specific_table/{table_name}")
async def delete_table(table_name: str):
    try:
        f_key_off = "SET FOREIGN_KEY_CHECKS = 0"
        help_functions.execute_query(connection, f_key_off)

        # table_name = table_name.lower()
        valid_tables = help_functions.valid_tables(connection)

        if table_name not in valid_tables:
            return {"message": f"Invalid table name: {table_name}", "statusCode": 500}
        else:
            try:
                delete_table_query = f"DROP TABLE IF EXISTS {table_name}"
                help_functions.execute_query(connection, delete_table_query)
                f_key_on = "SET FOREIGN_KEY_CHECKS = 1"
                if help_functions.execute_query(connection, f_key_on):
                    return {"message": f"Table {table_name} successfully deleted"}

                return {"message": f"Error during drop table ${table_name}", "statusCode": 500}
            except Exception as e:
                return {"message": f"An error occurred: {str(e)}", "statusCode": 500}
    finally:
        f_key_on = "SET FOREIGN_KEY_CHECKS = 1"
        help_functions.execute_query(connection, f_key_on)

# Clear All Tables


@router.get("/clear_all_tables/")
async def clear_all_tables():
    statusCode = 200
    try:
        f_key_off = "SET FOREIGN_KEY_CHECKS = 0"
        help_functions.execute_query(connection, f_key_off)

        for clear_table_query in sql_cmds.clear_tables:
            help_functions.execute_query(connection, clear_table_query)

        f_key_on = "SET FOREIGN_KEY_CHECKS = 1"
        help_functions.execute_query(connection, f_key_on)

        return {"message": "All tables cleared successfully", "statusCode": statusCode}
    except Exception as e:
        return {"message": f"An error occurred: {str(e)}", "statusCode": statusCode}


@router.get("/drop_all_tables/")
async def drop_all_tables():
    try:
        # Turn off foreign key checks to avoid constraint issues
        f_key_off = "SET FOREIGN_KEY_CHECKS = 0"
        help_functions.execute_query(connection, f_key_off)

        # Retrieve a list of all tables in the database
        all_tables = help_functions.execute_query(connection, "SHOW TABLES")

        # Iterate over the list of tables and drop each one
        for table in all_tables:
            drop_table_query = f"DROP TABLE IF EXISTS {table[0]}"
            if not help_functions.execute_query(connection, drop_table_query):
                return {"message": "Something wrong happened during dropping tables.", "statusCode": 200}

        # Success message
        return {"message": "All tables successfully dropped", "statusCode": 200}
    except Exception as e:
        # Handle any exceptions during the process
        return {"message": f"An error occurred: {str(e)}", "statusCode": 500}
    finally:
        # Re-enable foreign key checks
        f_key_on = "SET FOREIGN_KEY_CHECKS = 1"
        help_functions.execute_query(connection, f_key_on)


@router.get("/populate_table")
async def populate_data():
    sql_file_path = os.getenv("POPULATE_SQL_FILE")
    try:
        # drop all tables first
        await drop_all_tables()

        # Open and read the SQL file
        with open(sql_file_path, 'r') as file:
            sql_commands = file.read().split(';')

        # Execute each SQL command
        for command in sql_commands:
            # Ignore empty commands
            if command.strip() != '':
                if not help_functions.execute_query(connection, command):
                    return {"message": f"Cannot populate data, something wrong happened!", "statusCode": 500}

        return {"message": f"Successfully populated all data", "statusCode": 200}
    except Exception as e:
        # Handle any exceptions during the process
        return {"message": f"An error occurred: {str(e)}", "statusCode": 500}

# Add Department


@router.get("/add_department/")
async def add_department(dept_name: str, dept_code: str):
    try:
        message, success = help_functions.validate_dept_input(
            dept_name, dept_code)
        if success:
            dept_name = help_functions.replace_ampersand(dept_name)
            dept_name = help_functions.title_except(dept_name)
            dept_code = dept_code.upper()

            add_department_query = "INSERT INTO Department (DeptName, DeptID) VALUES (%s, %s)"
            help_functions.execute_query(
                connection, add_department_query, (dept_name, dept_code))

            return {"message": "Department added successfully", "statusCode": 200}
        else:
            return {"message": f"Department not added: {message}", "statusCode": 500}
    except Exception as e:
        return {"message": f"An error occurred: {str(e)}", "statusCode": 500}

# Add Faculty Member


@router.get("/add_faculty/")
async def add_faculty(
    faculty_id: str,
    name: str,
    email: str,
    dept_id: str,
    position: str
):
    try:
        message, success = help_functions.validate_faculty_input(
            faculty_id, name, email, dept_id, position)
        if success:
            name = name.title()
            email = email.lower()
            dept_id = dept_id.upper()
            position = position.title()

            add_faculty_query = (
                "INSERT INTO Faculty (FacultyID, Name, Email, DeptID, Position) "
                "VALUES (%s, %s, %s, %s, %s)"
            )

            if help_functions.execute_query(
                    connection, add_faculty_query, (faculty_id, name, email, dept_id, position)):
                return {"message": "Faculty added successfully", "statusCode": 200}
            else:
                return {"message": f"Faculty not added, something wrong happened!", "statusCode": 500}
        else:
            return {"message": f"Faculty not added {message}", "statusCode": 500}
    except Exception as e:
        return {"message": f"An error occurred: {str(e)}", "statusCode": 500}


@router.get("/add_program/")
async def add_program(
    prog_name: str,
    dept_id: str,
    lead_id: str
):
    try:
        message, success = help_functions.validate_program_input(
            prog_name, dept_id, lead_id)
        if success:
            prog_name = help_functions.replace_ampersand(prog_name)
            prog_name = help_functions.title_except(prog_name)
            prog_dept = dept_id.upper()
            program_count = help_functions.select_query(
                connection, sql_cmds.count_program, (prog_dept,))

            if not program_count:
                return {"message": "Error getting program count.", "statusCode": 500}

            prog_count = program_count[0]['program_count']
            progID = f"{prog_dept}P{prog_count + 1}"

            lead_details = help_functions.select_query(
                connection, sql_cmds.get_faculty_info, (lead_id,))
            if lead_details:
                lead, leadEmail = lead_details[0]['Name'], lead_details[0]['Email']
                add_program_query = ("INSERT INTO Program ("
                                     "ProgID, ProgName, DeptID, FacultyLead, FacultyLeadID, FacultyLeadEmail) VALUES ("
                                     "%s, %s, %s, %s, %s, %s)")
                help_functions.execute_query(
                    connection, add_program_query, (progID, prog_name, prog_dept, lead, lead_id, leadEmail))

                return {"message": "Program added successfully.", "statusCode": 200}
            else:
                return {"message": f"Faculty with ID {lead_id} does not exist.", "statusCode": 500}
        else:
            return {"message": f"Program not added: {message}", "statusCode": 500}

    except Exception as e:
        return {"message": f"An error occurred: {str(e)}", "statusCode": 500}

# Add Course


@router.get("/add_course/")
async def add_course(
    course_id: str,
    title: str,
    description: str,
    dept_id: str
):
    try:
        message, success = help_functions.validate_course_input(
            course_id, title, description, dept_id)
        if success:
            course_id = course_id.upper()
            title = help_functions.replace_ampersand(title)
            title = help_functions.title_except(title)
            description = description.strip()
            dept_id = dept_id.upper()

            add_course_query = (
                "INSERT INTO Course (CourseID, Title, Description, DeptID) "
                "VALUES (%s, %s, %s, %s)"
            )

            if help_functions.execute_query(
                    connection, add_course_query, (course_id, title, description, dept_id)):
                return {"message": "Course added successfully", "statusCode": 200}
            else:
                return {"message": "Cannot add course!", "statusCode": 500}
        else:
            return {"message": f"Course not added: {message}", "statusCode": 500}
    except Exception as e:
        return {"message": f"An error occurred: {str(e)}", "statusCode": 500}

# Add a section


@router.get("/add_section/")
async def add_section(
    sec_id: str,
    course_id: str,
    semester: str,
    year: int,
    faculty_lead_id: str,
    enroll_count: int
):
    try:
        sec_id = sec_id.zfill(3)
        message, success = help_functions.validate_section_input(
            sec_id, course_id, semester, year, faculty_lead_id, enroll_count)
        if success:
            course_id = course_id.upper()
            semester = semester.title()

            add_section_query = (
                "INSERT INTO Section (SecID, CourseID, Semester, Year, FacultyLeadID, EnrollCount) "
                "VALUES (%s, %s, %s, %s, %s, %s)"
            )

            if help_functions.execute_query(
                    connection, add_section_query, (sec_id, course_id, semester, year, faculty_lead_id, enroll_count)):
                return {"message": "Section added successfully", "statusCode": 200}
            else:
                return {"message": "Cannot add course!", "statusCode": 500}
        else:
            return {"message": f"Cannot add section: {message}", "statusCode": 500}
    except Exception as e:
        return {"message": f"An error occurred: {str(e)}", "statusCode": 500}

# Assign a Course to Program


@router.post("/assign_program_course/")
async def assign_program_course(
    progID: str,
    courseID: str
):
    try:
        if help_functions.validate_prog_course_input(progID, courseID):
            progID = progID.upper()
            courseID = courseID.upper()

            check_program = help_functions.select_query(
                connection, sql_cmds.check_program_id_exists, (progID,))
            if not check_program or check_program[0]['program_count'] == 0:
                return {"message": f"Program ID {progID} does not exist. Program course not added: please enter valid program id.", "statusCode": 500}

            check_course = help_functions.select_query(
                connection, sql_cmds.check_course_exists, (courseID,))
            if not check_course or check_course[0]['course_count'] == 0:
                return {"message": f"Course ID {courseID} does not exist. Program course not added: please enter valid course id.", "statusCode": 500}

            add_prog_course_query = "INSERT INTO ProgramCourses (ProgID, CourseID) VALUES (%s, %s)"
            help_functions.execute_query(
                connection, add_prog_course_query, (progID, courseID))

            return {"message": "Program course added successfully.", "statusCode": 200}
        else:
            return {"message": "Program course not added: Invalid input.", "statusCode": 500}

    except Exception as e:
        return {"message": f"An error occurred: {str(e)}", "statusCode": 500}


@router.get("/add_objective/")
async def add_objective(
    description: str,
    prog_id: str,
    dept_id: str,
    obj_code: str | None = None,
):
    try:
        message, success = help_functions.validate_objective_input(
            obj_code, description, prog_id, dept_id)
        if success:
            # obj_code = obj_code.upper()
            prog_id = prog_id.upper()

            checks_passed = True
            result = help_functions.select_query(
                connection, sql_cmds.count_obj_query, (prog_id, dept_id))
            count = result[0]['obj_count'] if result else 0

            next_obj_code = f"{prog_id}{dept_id}{count + 1}"
            if obj_code and obj_code != next_obj_code:
                return {
                    "message": f"Invalid objective code: {obj_code}. Next valid objective code: {next_obj_code}. ",
                    "statusCode": 500
                }
            elif checks_passed and obj_code == '':
                obj_code = next_obj_code

            if checks_passed:
                add_objective_query = (
                    "INSERT INTO Objectives (ObjCode, Description, ProgID, DeptID) "
                    "VALUES (%s, %s, %s, %s)"
                )

                results = help_functions.execute_query(
                    connection, add_objective_query, (obj_code, description, prog_id, dept_id))
                if results:
                    return {"message": "Objective added successfully", "statusCode": 200}
                else:
                    return {"message": "Cannot add objective!", "statusCode": 500}
        else:
            return {"message": f"Objective not added: {message}", "statusCode": 500}
    except Exception as e:
        return {"message": f"An error occurred: {str(e)}", "statusCode": 500}

# Add Sub Objective


@router.get("/add_sub_objective/")
async def add_sub_objective(
    description: str,
    obj_code: str
):
    try:
        message, success = help_functions.validate_sub_objective_input(
            description, obj_code)
        if success:
            obj_code = obj_code.upper()

            obj_exists = help_functions.select_query(
                connection, sql_cmds.check_obj_exists, (obj_code,))
            if not obj_exists or obj_exists[0]['obj_count'] == 0:
                return {
                    "message": f"Learning objective code {obj_code} does not exist. ", "statusCode": 500
                }

            result = help_functions.select_query(
                connection, sql_cmds.count_sub_obj_query, (obj_code,))
            count = result[0]['sub_obj_count'] if result else 0
            sub_obj_code = f"{obj_code}.{count + 1}"

            add_sub_objective_query = (
                "INSERT INTO SubObjectives (SubObjCode, Description, ObjCode) "
                "VALUES (%s, %s, %s)"
            )

            if help_functions.execute_query(
                    connection, add_sub_objective_query, (sub_obj_code, description, obj_code)):
                return {"message": "Sub-objective added successfully", "statusCode": 200}
            else:
                return {"message": "Cannot add sub-objective!", "statusCode": 500}
        else:
            return {"message": f"Sub-objective not added: {message}", "statusCode": 500}
    except Exception as e:
        return {"message": f"An error occurred: {str(e)}", "statusCode": 500}

# add new course objective


@router.get("/add_course_objective/")
async def add_course_objective(
    course_id: str,
    obj_code: str,
    sub_obj_code: str | None = None,
    auto_populate: str | None = None
):
    try:
        course_id = course_id.upper()
        obj_code = obj_code.upper()
        sub_obj_code = sub_obj_code.upper() if sub_obj_code else None
        auto_populate = auto_populate.lower() if auto_populate else None

        message, success = help_functions.validate_course_obj_input(
            course_id, obj_code, sub_obj_code, auto_populate)

        if not success:
            return {"message": f"An error occurred: {str(message)}", "statusCode": 500}

        course_exists = help_functions.select_query(
            connection, sql_cmds.check_course_exists, (course_id,))
        if not course_exists or course_exists[0]['course_count'] == 0:
            return {"message": f"Course number {course_id} does not exist. Course objective not added: Invalid input", "statusCode": 500}

        obj_exists = help_functions.select_query(
            connection, sql_cmds.check_obj_exists, (obj_code,))
        if not obj_exists or obj_exists[0]['obj_count'] == 0:
            return {"message": f"Learning objective code {obj_code} does not exist. "
                               "Course objective not added: Invalid input", "statusCode": 500}

        if sub_obj_code:
            sub_obj_code_exists = help_functions.select_query(
                connection, sql_cmds.check_sub_obj_exists, (sub_obj_code,))
            if not sub_obj_code_exists or sub_obj_code_exists[0]['sub_obj_count'] == 0:
                return {"message": f"Sub-objective code {sub_obj_code} does not exist. "
                                   "Course objective not added: Invalid input", "statusCode": 500}

        course_obj_id = f"{course_id}.{sub_obj_code}" if sub_obj_code else f"{course_id}.{obj_code}"
        add_course_obj_query = (
            "INSERT INTO CourseObjectives (CourseObjID, CourseID, ObjCode, SubObjCode) "
            "VALUES (%s, %s, %s, %s)"
        )
        if not help_functions.execute_query(
                connection, add_course_obj_query, (course_obj_id, course_id, obj_code, sub_obj_code)):
            return {"message": "Cannot add course objective!", "statusCode": 500}

        # If no sub_obj_code was provided and auto_populate is 'y', add all associated sub-objectives
        if not sub_obj_code and auto_populate == 'yes':
            # Check if the objective has sub-objectives
            sub_objectives = help_functions.select_query(
                connection, sql_cmds.get_sub_objectives, (obj_code,))
            if sub_objectives:
                for sub_obj in sub_objectives:
                    sub_obj_code = sub_obj['SubObjCode']
                    course_obj_id = f"{course_id}.{sub_obj_code}"
                    # Add each sub-objective
                    if not help_functions.execute_query(connection, add_course_obj_query,
                                                        (course_obj_id, course_id, obj_code, sub_obj_code)):
                        return {"message": "Error during add sub-objective!", "statusCode": 500}
                return {"message": "All associated sub-objectives added successfully.", "statusCode": 200}

        return {"message": "Course objective added successfully", "statusCode": 200}
    except Exception as e:
        return {"message": f"An error occurred: {str(e)}", "statusCode": 500}


class ObjectiveEvalInput(BaseModel):
    courseObjID: str
    secID: str
    semester: str
    year: str
    evalMethod: str
    studentsPassed: int


@router.post("/add_objective_evaluation")
async def add_objective_evaluation(input_data: ObjectiveEvalInput):
    try:
        secID = input_data.secID.zfill(3)
        message, success = help_functions.validate_obj_eval_input(
            input_data.courseObjID, input_data.secID, input_data.semester, input_data.year, input_data.evalMethod, input_data.studentsPassed)
        if success:
            courseObjID = input_data.courseObjID.upper()
            courseID = input_data.courseObjID.split('.')[0]
            semester = input_data.semester
            evalMethod = input_data.evalMethod
            studentsPassed = input_data.studentsPassed
            year = input_data.year
            checks_passed = True

            course_obj_id_exists = help_functions.select_query(
                connection, sql_cmds.check_course_obj_id_exists, (courseObjID,))
            if not course_obj_id_exists or course_obj_id_exists[0]['course_obj_count'] == 0:
                return {"message": f"Course objective ID {courseObjID} does not exist. Objective evaluation not added.", "statusCode": 500}

            section_exists = help_functions.select_query(
                connection, sql_cmds.check_section_exists, (courseID, secID, semester, year))
            if not section_exists or section_exists[0]['section_count'] == 0:
                return {"message": f"The data you entered does not exist. Objective evaluation not added.", "statusCode": 500}

            student_count = help_functions.select_query(
                connection, sql_cmds.get_student_count, (courseID, secID, semester, year))
            if studentsPassed > student_count[0]['EnrollCount']:
                return {"message": f"Students passed ({studentsPassed}) cannot be greater than enrollment count ({student_count[0]['EnrollCount']}). Objective evaluation not added.", "statusCode": 500}

            add_obj_eval = ("INSERT INTO ObjectiveEval ("
                            "CourseObjID, SecID, Semester, Year, EvalMethod, StudentsPassed) VALUES ("
                            "%s, %s, %s, %s, %s, %s)")

            if help_functions.execute_query(
                    connection, add_obj_eval, (courseObjID, secID, semester, year, evalMethod, studentsPassed)):
                return {"message": "Objective evaluation added successfully.", "statusCode": 200}
            else:
                return {"message": f"Objective evaluation not added! Error: {message}", "statusCode": 500}
        else:
            return {"message": "Objective evaluation not added!", "statusCode": 500}

    except Exception as e:
        return {"message": f"An error occurred: {str(e)}", "statusCode": 500}


@router.post("/delete_records/")
async def delete_records(
    table: str,
    conditions_input: str
):
    try:
        table = table.lower()
        valid_tables = help_functions.valid_tables(connection)

        if table not in valid_tables:
            return {"message": f"Invalid table name: {table}"}

        conditions = conditions_input.split(',')

        where_clause = []
        values = []
        for condition in conditions:
            column, value = condition.split('=')
            where_clause.append(f"{column} = %s")
            values.append(value)

        where_clause_str = " AND ".join(where_clause)
        values = tuple(values)

        confirm = input(
            f"Confirm you want to delete records from {table} where {' and '.join(conditions)}? (y/n): ")

        if confirm.lower() == 'y':
            delete_query = f"DELETE FROM {table} WHERE {where_clause_str}"
            help_functions.execute_query(connection, delete_query, values)
            return {"message": f"Records successfully deleted from {table} where {' and '.join(conditions)}"}
        elif confirm.lower() == 'n':
            return {"message": "Deletion cancelled."}
        else:
            return {"message": "Invalid input. Please enter 'y' for yes or 'n' for no."}

    except Exception as e:
        return {"message": f"An error occurred: {str(e)}"}

# update a record in the database with multiple conditions


@router.post("/update_record/")
async def update_record(
    table: str,
    update_attribute: str,
    new_value: str,
    conditions_input: str
):
    try:
        table = table.lower()
        valid_tables = help_functions.valid_tables(connection)

        if table not in valid_tables:
            return {"message": f"Invalid table name: {table}"}

        conditions = conditions_input.split(',')

        where_clause = []
        values = [new_value]
        for condition in conditions:
            match = re.match(r"(.*?)(>=|<=|!=|=|>|<)(.*)", condition)
            if match:
                column, operator, value = match.groups()
                where_clause.append(f"{column} {operator} %s")
                values.append(value)
            else:
                return {"message": f"Invalid condition format: {condition}"}

        where_clause_str = " AND ".join(where_clause)
        values = tuple(values)

        update_query = f"UPDATE {table} SET {update_attribute} = %s WHERE {where_clause_str}"
        help_functions.execute_query(connection, update_query, values)

        return {"message": f"Record in {table} successfully updated."}

    except Exception as e:
        return {"message": f"An error occurred: {str(e)}"}


def list_programs_by_department(department_id):
    query = "SELECT DeptID, ProgName, FacultyLead, FacultyLeadID, FacultyLeadEmail FROM Program WHERE DeptID = %s;"
    params = (department_id,)
    return help_functions.execute_query(connection, query, params)


def list_faculty_by_department(department_id):
    query = """
    SELECT
        f.Name AS FacultyName,
        f.Email AS FacultyEmail,
        f.Position AS FacultyRank,
        d.DeptName AS DepartmentName,
        (SELECT p.ProgName
         FROM Program p
         WHERE p.FacultyLeadID = f.FacultyID
         ) AS ProgramInCharge
    FROM Faculty f, Department d
    WHERE f.DeptID = d.DeptID AND d.DeptID = %s;
    """
    params = (department_id,)
    return help_functions.execute_query(connection, query, params)


def list_courses_by_program(program_name):
    query = """
    SELECT
        C.CourseID AS CouseID,
        C.Title AS CourseTitle,
        S.Year,
        O.Description AS ObjectiveDescription,
        SO.Description AS SubObjectivesDescription,
        C.DeptID
    FROM Course C
    JOIN Section S ON C.CourseID = S.CourseID
    JOIN CourseObjectives CO ON C.CourseID = CO.CourseID
    JOIN Objectives O ON CO.ObjCode = O.ObjCode
    LEFT JOIN SubObjectives SO ON CO.SubObjCode = SO.SubObjCode
    WHERE C.DeptID IN (SELECT DeptID FROM Program WHERE ProgID = %s)
    ORDER BY C.Title, S.Year;
    """
    # Converted WHERE C.DeptID = into C.DeptID IN so that it can get multiple department if same Program name
    params = (program_name,)
    return help_functions.execute_query(connection, query, params)


def list_objectives_by_program(program_name):
    query = """
    SELECT O.ObjCode, O.Description, O.DeptID
    FROM Objectives O
    WHERE O.ProgID IN (
        SELECT P.ProgID 
        FROM Program P 
        WHERE P.ProgName = %s
    );
    """
    params = (program_name,)
    return help_functions.execute_query(connection, query, params)


def list_evaluations_by_program_and_semester(program_name, semester, year):
    query = """
    SELECT
        P.ProgName,
        C.DeptID,
        C.CourseID,
        C.Title AS CourseTitle,
        S.SecID,
        S.FacultyLeadID,
        E.Semester,
        E.Year,
        E.EvalMethod,
        E.StudentsPassed
    FROM ObjectiveEval E
    JOIN Section S ON E.SecID = S.SecID AND E.Semester = S.Semester AND E.Year = S.Year
    JOIN Course C ON S.CourseID = C.CourseID
    JOIN Program P ON C.DeptID = P.DeptID
    WHERE P.ProgID = %s AND E.Semester = %s AND E.Year = %s;
    """
    params = (program_name, semester, year)
    return help_functions.execute_query(connection, query, params)


def list_evaluation_results_by_academic_year(start_year):
    end_year = start_year + 1
    query = """
    SELECT
        O.ObjCode AS ObjectiveCode,
        SO.SubObjCode AS SubObjectiveCode,
        E.Semester,
        E.Year,
        E.EvalMethod,
        E.StudentsPassed
    FROM ObjectiveEval E
    JOIN CourseObjectives CO ON E.CourseObjID = CO.CourseObjID
    JOIN Objectives O ON CO.ObjCode = O.ObjCode
    LEFT JOIN SubObjectives SO ON CO.ObjCode = SO.ObjCode
    JOIN Section S ON E.SecID = S.SecID
    JOIN Course C on C.CourseID = S.CourseID
    WHERE
        (s.Semester IN ('Fall', 'Summer') AND s.Year = %s) OR
        (s.Semester = 'Spring' AND s.Year = %s)
    ORDER BY O.ObjCode, SO.SubObjCode, E.Semester, E.Year;
    """
    params = (start_year, end_year)
    return help_functions.execute_query(connection, query, params)


def aggregate_evaluations_by_academic_year(start_year):
    end_year = start_year + 1
    query = """
    SELECT
        o.ObjCode AS ObjectiveCode,
        so.SubObjCode AS SubObjectiveCode,
        COALESCE(SUM(oe.StudentsPassed), 0) AS StudentsPassed,
        COALESCE(SUM(s.EnrollCount), 0) AS TotalStudents,
        COALESCE(ROUND((SUM(oe.StudentsPassed) / NULLIF(SUM(s.EnrollCount), 0)) * 100, 2), 0) AS PercentagePassed
    FROM Objectives o
    LEFT JOIN SubObjectives so ON o.ObjCode = so.ObjCode
    LEFT JOIN CourseObjectives co ON o.ObjCode = co.ObjCode OR so.SubObjCode = co.SubObjCode
    LEFT JOIN ObjectiveEval oe ON co.CourseObjID = oe.CourseObjID
    LEFT JOIN Section s ON oe.SecID = s.SecID AND oe.SecID = s.SecID AND oe.Semester = s.Semester AND oe.Year = s.Year
    WHERE
        (s.Semester IN ('Fall', 'Summer') AND s.Year = %s) OR
        (s.Semester = 'Spring' AND s.Year = %s)
    GROUP BY o.ObjCode, so.SubObjCode
    ORDER BY o.ObjCode, so.SubObjCode;
    """
    params = (start_year, end_year)
    return help_functions.execute_query(connection, query, params)


@router.post("/list_programs_by_department/")
async def list_programs_endpoint(query: DepartmentQuery):
    # connect to the database
    try:
        result = list_programs_by_department(query.department_id)
        return {"programs": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/list_faculty_by_department/")
async def list_faculty_endpoint(query: DepartmentQuery):
    try:
        result = list_faculty_by_department(query.department_id)
        return {"faculty": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/list_courses_by_program/")
async def list_courses_endpoint(query: ProgramQuery):
    try:
        result = list_courses_by_program(query.program_name.upper())
        return {"courses": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/list_objectives_by_program/")
async def list_objectives_endpoint(query: ProgramQuery):
    try:
        result = list_objectives_by_program(query.program_name.upper())
        return {"objectives": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/list_evaluations_by_program_and_semester/")
async def list_evaluations_endpoint(query: ProgramAndSemesterQuery):
    try:
        result = list_evaluations_by_program_and_semester(
            query.program_name.upper(), query.semester, query.year)
        return {"evaluations": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/list_evaluation_results_by_academic_year/")
async def list_evaluation_results_endpoint(query: AcademicYearQuery):
    try:
        result = list_evaluation_results_by_academic_year(query.start_year)
        return {"evaluation_results": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/list_aggregate_results_by_academic_year/")
async def list_aggregation_results_endpoint(query: AcademicYearQuery):
    try:
        result = aggregate_evaluations_by_academic_year(query.start_year)
        if not result:
            result = []
        return {"aggregated_results": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/get_all_tables/")
async def get_all_tables():
    try:
        tables = help_functions.valid_tables(connection)
        return {"tables": tables}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


class TableName(BaseModel):
    table_name: str


@router.post("/get_table_data/")
async def get_table_data(table: TableName):
    try:
        cursor = connection.cursor()
        cursor.execute(f"SELECT * FROM {table.table_name}")
        data = cursor.fetchall()
        columns = [column[0] for column in cursor.description]
        return {"columns": columns, "data": data, "statusCode": 200}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/faculty")
async def get_faculty():
    try:
        cursor = connection.cursor()
        cursor.execute(f"SELECT FacultyID, Name, Email FROM Faculty")
        data = cursor.fetchall()
        columns = [column[0] for column in cursor.description]
        return {"columns": columns, "data": data, "statusCode": 200}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/department")
async def get_department(deptId: str = None):
    try:
        cursor = connection.cursor()
        query = "SELECT DeptID, DeptName FROM Department"

        # Modify the query based on the presence of deptId
        if deptId is not None:
            query += " WHERE DeptID = %s"
            cursor.execute(query, (deptId,))
        else:
            cursor.execute(query)

        data = cursor.fetchall()
        columns = [column[0] for column in cursor.description]
        return {"columns": columns, "data": data, "statusCode": 200}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/program")
async def get_program():
    try:
        cursor = connection.cursor()
        cursor.execute(f"SELECT ProgID, ProgName FROM Program")
        data = cursor.fetchall()
        columns = [column[0] for column in cursor.description]
        return {"columns": columns, "data": data, "statusCode": 200}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/course")
async def get_course():
    try:
        cursor = connection.cursor()
        cursor.execute(f"SELECT CourseID, Title FROM Course")
        data = cursor.fetchall()
        columns = [column[0] for column in cursor.description]
        return {"columns": columns, "data": data, "statusCode": 200}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/objective")
async def get_objective():
    try:
        cursor = connection.cursor()
        cursor.execute(f"SELECT ObjCode, Description FROM Objectives")
        data = cursor.fetchall()
        columns = [column[0] for column in cursor.description]
        return {"columns": columns, "data": data, "statusCode": 200}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/sub_objective")
async def get_subobjective_by_obj_code(obj_code: str):
    try:
        cursor = connection.cursor()
        cursor.execute(
            f"SELECT SubObjCode, Description FROM SubObjectives WHERE ObjCode = %s", (obj_code,))
        data = cursor.fetchall()
        columns = [column[0] for column in cursor.description]
        return {"columns": columns, "data": data, "statusCode": 200}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/course_objective")
async def get_courseobjective():
    try:
        cursor = connection.cursor()
        cursor.execute(f"SELECT CourseObjID FROM CourseObjectives")
        data = cursor.fetchall()
        columns = [column[0] for column in cursor.description]
        return {"columns": columns, "data": data, "statusCode": 200}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


class SectionQuery(BaseModel):
    course_id: str


@router.post("/section")
async def get_section_by_course_id(query: SectionQuery):
    try:
        cursor = connection.cursor()
        cursor.execute(
            f"SELECT DISTINCT SecID FROM Section WHERE CourseID = %s", (query.course_id,))
        data = cursor.fetchall()
        columns = [column[0] for column in cursor.description]
        return {"columns": columns, "data": data, "statusCode": 200}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

app.include_router(router=router)
if __name__ == "__main__":
    if connection is None:
        print("Connecting to db from inside main")
        connection = help_functions.connect_database(
            os.getenv("HOST"), os.getenv("MYSQL_USER"), os.getenv("MYSQL_PASSWORD"), os.getenv("DB_NAME"))
    print("Starting uvicorn app")
    uvicorn.run(app, host="0.0.0.0", port=8000)
    app.include_router(router=router)
