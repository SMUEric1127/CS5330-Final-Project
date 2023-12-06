from fastapi import FastAPI, Query, HTTPException
from pydantic import BaseModel
import help_functions
import sql_cmds
import re
import pandas as pd

# alternative: import every thing:
# from database_source.query import *
from database_source.query import exampleQuery, exampleQueryParam

app = FastAPI()
connection = help_functions.connect_database(host_name='localhost',
            user_name='root',
            user_password='matt',
            db_name='SMU')
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
    return {"statusCode": 200, "result": exampleQuery()}


@app.get("/params")
async def root(param1: str = Query(..., description="Write your description for param1")):
    # Get with param, in case we want to have some input from the user
    # the ... in Query means it's required

    result = exampleQueryParam(param1)
    return {"message": "Successfully get!", "result": result}


class UserCreate(BaseModel):
    username: str
    password: str


@app.post("/create_user/")
async def create_user(user: UserCreate):
    # Example of post, if we want to send something more than just some params (a json...)
    # Using Pydantic to make sure our data is validated (Like if we only want a username, password, not every other thing)

    user_data = {"username": user.username, "password": user.password}

    return {"message": "User created successfully using POST API", "user_data": user_data}

#Create Tables Function 
@app.post("/create_tables/", status_code=201)
async def create_tables():
     existing_tables = help_functions.valid_tables(connection)
     required_tables = {
        'department': sql_cmds.create_department_table,
        'faculty': sql_cmds.create_faculty_table,
        'program': sql_cmds.create_program_table,
        'course': sql_cmds.create_course_table,
        'section': sql_cmds.create_section_table,
        'objectives': sql_cmds.create_objectives_table,
        'subobjectives': sql_cmds.create_sub_objectives_table,
        'courseobjectives': sql_cmds.create_course_objectives_table,
        'objectiveeval': sql_cmds.create_objective_eval_table,
    }
     tables_to_create = [table for table in required_tables if table not in existing_tables]

     if tables_to_create:
        for table in tables_to_create:
            if help_functions.execute_query(connection, required_tables[table]):
                message = f"Table '{table}' created successfully"
                print(message)
            else:
                message = f"Table '{table}' created successfully"
                print (message)
        return{"message": "Tables created successfully"}
     else:
        return {"message": "All required tables already exist."}


#Clear a Certain Table 
@app.post("/clear_table/{table_name}")
async def delete_table(table_name: str):
    try:
        f_key_off = "SET FOREIGN_KEY_CHECKS = 0"
        await help_functions.execute_query(connection, f_key_off)

        table_name = table_name.lower()
        valid_tables = help_functions.valid_tables(connection)

        if table_name not in valid_tables:
            return {"message": f"Invalid table name: {table_name}"}
        else:
            try:
                delete_table_query = f"DROP TABLE IF EXISTS {table_name}"
                await help_functions.execute_query(connection, delete_table_query)
                f_key_on = "SET FOREIGN_KEY_CHECKS = 1"
                await help_functions.execute_query(connection, f_key_on)
                return {"message": f"Table {table_name} successfully deleted"}
            except Exception as e:
                return {"message": f"An error occurred: {str(e)}"}
    finally:
        f_key_on = "SET FOREIGN_KEY_CHECKS = 1"
        help_functions.execute_query(connection, f_key_on)

#Clear All Tables
@app.post("/clear_all_tables/")
async def clear_all_tables():
    try:
        f_key_off = "SET FOREIGN_KEY_CHECKS = 0"
        help_functions.execute_query(connection, f_key_off)

        for table in sql_cmds.clear_tables:
            clear_table_query = f"TRUNCATE TABLE {table}"
            help_functions.execute_query(connection, clear_table_query)

        f_key_on = "SET FOREIGN_KEY_CHECKS = 1"
        help_functions.execute_query(connection, f_key_on)

        return {"message": "All tables cleared successfully"}
    except Exception as e:
        return {"message": f"An error occurred: {str(e)}"}

#Add Department 
@app.post("/add_department/")
async def add_department(dept_name: str, dept_code: str):
    try:
        if help_functions.validate_dept_input(dept_name, dept_code):
            dept_name = help_functions.replace_ampersand(dept_name)
            dept_name = help_functions.title_except(dept_name)
            dept_code = dept_code.upper()

            add_department_query = "INSERT INTO Department (DeptName, DeptID) VALUES (%s, %s)"
            help_functions.execute_query(connection, add_department_query, (dept_name, dept_code))

            return {"message": "Department added successfully"}
        else:
            return {"message": "Department not added: Invalid input"}
    except Exception as e:
        return {"message": f"An error occurred: {str(e)}"}

#Add Faculty Member 
@app.post("/add_faculty/")
async def add_faculty(
    faculty_id: str, 
    name: str, 
    email: str, 
    dept_id: str, 
    position: str
):
    try:
        if help_functions.validate_faculty_input(faculty_id, name, email, dept_id, position):
            name = name.title()
            email = email.lower()
            dept_id = dept_id.upper()
            position = position.title()

            add_faculty_query = (
                "INSERT INTO Faculty (FacultyID, Name, Email, DeptID, Position) "
                "VALUES (%s, %s, %s, %s, %s)"
            )
            help_functions.execute_query(connection, add_faculty_query, (faculty_id, name, email, dept_id, position))

            return {"message": "Faculty added successfully"}
        else:
            return {"message": "Faculty not added: Invalid input"}
    except Exception as e:
        return {"message": f"An error occurred: {str(e)}"}

#Add Program 
@app.post("/add_program/")
async def add_program(
    prog_name: str, 
    dept_id: str, 
    lead: str, 
    lead_id: str, 
    lead_email: str
):
    try:
        if help_functions.validate_program_input(prog_name, dept_id, lead, lead_id, lead_email):
            prog_name = prog_name.upper()
            prog_dept = dept_id.upper()
            lead = lead.title()
            lead_email = lead_email.lower()

            add_program_query = (
                "INSERT INTO Program (ProgName, DeptID, FacultyLead, FacultyLeadID, FacultyLeadEmail) "
                "VALUES (%s, %s, %s, %s, %s)"
            )
            help_functions.execute_query(connection, add_program_query, (prog_name, prog_dept, lead, lead_id, lead_email))

            return {"message": "Program added successfully"}
        else:
            return {"message": "Program not added: Invalid input"}
    except Exception as e:
        return {"message": f"An error occurred: {str(e)}"}

#Add Course    
@app.post("/add_course/")
async def add_course(
    course_id: str, 
    title: str, 
    description: str, 
    dept_id: str
):
    try:
        if help_functions.validate_course_input(course_id, title, description, dept_id):
            course_id = course_id.upper()
            title = help_functions.replace_ampersand(title)
            title = help_functions.title_except(title)
            description = description.strip()
            dept_id = dept_id.upper()

            add_course_query = (
                "INSERT INTO Course (CourseID, Title, Description, DeptID) "
                "VALUES (%s, %s, %s, %s)"
            )
            help_functions.execute_query(connection, add_course_query, (course_id, title, description, dept_id))

            return {"message": "Course added successfully"}
        else:
            return {"message": "Course not added: Invalid input"}
    except Exception as e:
        return {"message": f"An error occurred: {str(e)}"}

# Add a section     
@app.post("/add_section/")
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
        if help_functions.validate_section_input(sec_id, course_id, semester, year, faculty_lead_id, enroll_count):
            course_id = course_id.upper()
            semester = semester.title()

            add_section_query = (
                "INSERT INTO Section (SecID, CourseID, Semester, Year, FacultyLeadID, EnrollCount) "
                "VALUES (%s, %s, %s, %s, %s, %s)"
            )
            help_functions.execute_query(
                connection, add_section_query, (sec_id, course_id, semester, year, faculty_lead_id, enroll_count))

            return {"message": "Section added successfully"}
        else:
            return {"message": "Section not added: Invalid input"}
    except Exception as e:
        return {"message": f"An error occurred: {str(e)}"}
    
#Add Objective 
@app.post("/add_objective/")
async def add_objective(
    obj_code: str, 
    description: str, 
    prog: str, 
    dept_id: str
):
    try:
        if help_functions.validate_objective_input(obj_code, description, prog, dept_id):
            obj_code = obj_code.upper()
            prog = prog.upper()

            checks_passed = True
            result = help_functions.select_query(connection, sql_cmds.count_obj_query, (prog, dept_id))
            count = result[0]['obj_count'] if result else 0
            next_obj_code = f"{prog}{dept_id}{count + 1}"

            if obj_code and obj_code != next_obj_code:
                return {
                    "message": f"Invalid objective code: {obj_code}. "
                    f"Next valid objective code: {next_obj_code}. "
                    "Objective not added: please enter the next valid objective code, or let the database generate one"
                }
                checks_passed = False
            elif checks_passed and not obj_code:
                obj_code = next_obj_code

            if checks_passed:
                add_objective_query = (
                    "INSERT INTO Objectives (ObjCode, Description, ProgName, DeptID) "
                    "VALUES (%s, %s, %s, %s)"
                )
                help_functions.execute_query(connection, add_objective_query, (obj_code, description, prog, dept_id))

                return {"message": "Objective added successfully"}
        else:
            return {"message": "Objective not added: Invalid input"}
    except Exception as e:
        return {"message": f"An error occurred: {str(e)}"}

# Add Sub Objective  
@app.post("/add_sub_objective/")
async def add_sub_objective(
    description: str, 
    obj_code: str
):
    try:
        if help_functions.validate_sub_objective_input(description, obj_code):
            obj_code = obj_code.upper()

            obj_exists = help_functions.select_query(connection, sql_cmds.check_obj_exists, (obj_code,))
            if not obj_exists or obj_exists[0]['obj_count'] == 0:
                return {
                    "message": f"Learning objective code {obj_code} does not exist. "
                    "Sub-objective not added: please enter a valid learning objective code"
                }
            
            result = help_functions.select_query(connection, sql_cmds.count_sub_obj_query, (obj_code,))
            count = result[0]['sub_obj_count'] if result else 0
            sub_obj_code = f"{obj_code}.{count + 1}"

            add_sub_objective_query = (
                "INSERT INTO SubObjectives (SubObjCode, Description, ObjCode) "
                "VALUES (%s, %s, %s)"
            )
            help_functions.execute_query(connection, add_sub_objective_query, (sub_obj_code, description, obj_code))

            return {"message": "Sub-objective added successfully"}
        else:
            return {"message": "Sub-objective not added: Invalid input"}
    except Exception as e:
        return {"message": f"An error occurred: {str(e)}"}
    
# add new course objective 
@app.post("/add_course_objective/")
async def add_course_objective(
    course_id: str, 
    obj_code: str, 
    sub_obj_code: str = None, 
    auto_populate: str = None
):
    try:
        course_id = course_id.upper()
        obj_code = obj_code.upper()
        sub_obj_code = sub_obj_code.upper() if sub_obj_code else None
        auto_populate = auto_populate.lower() if auto_populate else None

        checks_passed = True

        course_exists = help_functions.select_query(connection, sql_cmds.check_course_exists, (course_id,))
        if not course_exists or course_exists[0]['course_count'] == 0:
            return {"message": f"Course number {course_id} does not exist. Course objective not added: Invalid input"}

        obj_exists = help_functions.select_query(connection, sql_cmds.check_obj_exists, (obj_code,))
        if not obj_exists or obj_exists[0]['obj_count'] == 0:
            return {"message": f"Learning objective code {obj_code} does not exist. "
                               "Course objective not added: Invalid input"}

        if sub_obj_code:
            sub_obj_code_exists = help_functions.select_query(connection, sql_cmds.check_sub_obj_exists, (sub_obj_code,))
            if not sub_obj_code_exists or sub_obj_code_exists[0]['sub_obj_count'] == 0:
                return {"message": f"Sub-objective code {sub_obj_code} does not exist. "
                                   "Course objective not added: Invalid input"}

        course_obj_id = f"{course_id}.{obj_code}.{sub_obj_code}" if sub_obj_code else f"{course_id}.{obj_code}"
        add_course_obj_query = (
            "INSERT INTO CourseObjectives (CourseObjID, CourseID, ObjCode, SubObjCode) "
            "VALUES (%s, %s, %s, %s)"
        )
        help_functions.execute_query(connection, add_course_obj_query, (course_obj_id, course_id, obj_code, sub_obj_code))

        # If no sub_obj_code was provided and auto_populate is 'y', add all associated sub-objectives
        if not sub_obj_code and auto_populate == 'y':
            # Check if the objective has sub-objectives
            sub_objectives = help_functions.select_query(connection, sql_cmds.get_sub_objectives, (obj_code,))
            if sub_objectives:
                for sub_obj in sub_objectives:
                    sub_obj_code = sub_obj['SubObjCode']
                    course_obj_id = f"{course_id}.{sub_obj_code}"
                    # Add each sub-objective
                    help_functions.execute_query(connection, add_course_obj_query,
                                                 (course_obj_id, course_id, obj_code, sub_obj_code))
                return {"message": "All associated sub-objectives added successfully."}

        return {"message": "Course objective added successfully"}
    except Exception as e:
        return {"message": f"An error occurred: {str(e)}"}
    
# delete a record from the database with multiple conditions
@app.post("/delete_records/")
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
@app.post("/update_record/")
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
    query = "SELECT ProgName FROM Program WHERE DeptID = %s;"
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
        C.Title AS CourseTitle,
        S.Year,
        O.Description AS ObjectiveDescription,
        SO.Description AS SubObjectivesDescription
    FROM Course C
    JOIN Section S ON C.CourseID = S.CourseID
    JOIN CourseObjectives CO ON C.CourseID = CO.CourseID
    JOIN Objectives O ON CO.ObjCode = O.ObjCode
    LEFT JOIN SubObjectives SO ON CO.SubObjCode = SO.SubObjCode
    WHERE C.DeptID = (SELECT DeptID FROM Program WHERE ProgName = %s)
    ORDER BY C.Title, S.Year;
    """
    params = (program_name,)
    return help_functions.execute_query(connection, query, params)

def list_objectives_by_program(program_name):
    query = """
    SELECT O.Description
    FROM Objectives O
    JOIN Program P ON P.ProgName = O.ProgName
    WHERE O.ProgName = %s;
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
    WHERE P.ProgName = %s AND E.Semester = %s AND E.Year = %s;
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
        (S.Semester = 'Summer' AND S.Year = %s) OR
        (S.Semester IN ('Fall', 'Spring') AND S.Year = %s)
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
        (s.Semester = 'Summer' AND s.Year = %s) OR
        (s.Semester IN ('Fall', 'Spring') AND s.Year = %s)
    GROUP BY o.ObjCode, so.SubObjCode
    ORDER BY o.ObjCode, so.SubObjCode;
    """
    params = (start_year, end_year)
    return help_functions.execute_query(connection, query, params)

@app.post("/list_programs_by_department/")
async def list_programs_endpoint(query: DepartmentQuery):
    # connect to the database
    try:
        result = list_programs_by_department(query.department_id)
        return {"programs": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/list_faculty_by_department/")
async def list_faculty_endpoint(query: DepartmentQuery):
    try:
        result = list_faculty_by_department(query.department_id)
        return {"faculty": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/list_courses_by_program/")
async def list_courses_endpoint(query: ProgramQuery):
    try:
        result = list_courses_by_program(query.program_name)
        return {"courses": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/list_objectives_by_program/")
async def list_objectives_endpoint(query: ProgramQuery):
    try:
        result = list_objectives_by_program(query.program_name)
        return {"objectives": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/list_evaluations_by_program_and_semester/")
async def list_evaluations_endpoint(query: ProgramAndSemesterQuery):
    try:
        result = list_evaluations_by_program_and_semester(query.program_name, query.semester, query.year)
        return {"evaluations": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/list_evaluation_results_by_academic_year/")
async def list_evaluation_results_endpoint(query: AcademicYearQuery):
    try:
        result = list_evaluation_results_by_academic_year(query.start_year)
        return {"evaluation_results": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/list_aggregate_results_by_academic_year/")
async def list_aggregation_results_endpoint(query: AcademicYearQuery):
    try:
        result = aggregate_evaluations_by_academic_year(query.start_year)
        return {"aggregated_results": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))