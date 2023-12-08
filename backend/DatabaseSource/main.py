import help_functions
import sql_cmds
import re
import pandas as pd
from tabulate import tabulate

connection = help_functions.connect_database(
    'localhost', 'cs5330', 'Sql5330!', 'dbproj')

while True:
    cmd = input("Please enter command: ").lower()
    if not help_functions.valid_commands(cmd):
        print("Invalid command")
        continue
    else:
        break

if cmd == 'exit':
    exit()

# create tables in the database
if cmd == 'create':
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
                print(f"Table '{table}' created successfully")
            else:
                print(f"Error occurred while creating table '{table}'")
    else:
        print("All required tables already exist.")


# clear a single table in the database
elif cmd == 'clear':
    f_key = "SET FOREIGN_KEY_CHECKS = 0"
    help_functions.execute_query(connection, f_key)
    table = input("Please enter the table name to clear: ")
    table = table.lower()
    valid_tables = help_functions.valid_tables(connection)
    if table not in valid_tables:
        print(f"Invalid table name: {table}")
    else:
        try:
            clear_table = f"TRUNCATE TABLE {table}"
            help_functions.execute_query(connection, clear_table)
            print(f"All records from {table} successfully cleared")
        except Exception as e:
            print(f"An error occurred: {e}")
    f_key = "SET FOREIGN_KEY_CHECKS = 1"
    help_functions.execute_query(connection, f_key)


# clear all tables in the database
elif cmd == 'clear_all':
    f_key = "SET FOREIGN_KEY_CHECKS = 0"
    help_functions.execute_query(connection, f_key)
    for table in sql_cmds.clear_tables:
        help_functions.execute_query(connection, table)
    f_key = "SET FOREIGN_KEY_CHECKS = 1"
    help_functions.execute_query(connection, f_key)


# add a new department to the database
elif cmd == 'dept':
    dept_name, dept_code = input("Please enter department name, department code: ").split(',')
    if help_functions.validate_dept_input(dept_name, dept_code):
        dept_name = help_functions.replace_ampersand(dept_name)
        dept_name = help_functions.title_except(dept_name)
        dept_code = dept_code.upper()
        add_department = "INSERT INTO Department (DeptName, DeptID) VALUES (%s, %s)"
        help_functions.execute_query(connection, add_department, (dept_name, dept_code))
    else:
        print("Department not added: Invalid input")


# add a new faculty to the database
elif cmd == 'faculty':
    facultyID, name, email, dept_id, position = input(
        "Please enter faculty ID, name, email, department id, position: ").split(',')
    if help_functions.validate_faculty_input(facultyID, name, email, dept_id, position):
        name = name.title()
        email = email.lower()
        dept_id = dept_id.upper()
        position = position.title()
        add_faculty = "INSERT INTO Faculty (FacultyID, Name, Email, DeptID, Position) VALUES (%s, %s, %s, %s, %s)"
        help_functions.execute_query(connection, add_faculty, (facultyID, name, email, dept_id, position))
    else:
        print("Faculty not added: Invalid input")


# add a new program to the database
elif cmd == 'prog':
    prog_name, dept_id, lead, leadID, leadEmail = input(
        "Please enter program name, department_id, lead name, lead_id, lead email: ").split(',')
    if help_functions.validate_program_input(prog_name, dept_id, lead, leadID, leadEmail):
        prog_name = prog_name.upper()
        prog_dept = dept_id.upper()
        lead = lead.title()
        leadEmail = leadEmail.lower()
        add_program = "INSERT INTO Program (ProgName, DeptID, FacultyLead, FacultyLeadID, FacultyLeadEmail) VALUES (%s, %s, %s, %s, %s)"
        help_functions.execute_query(connection, add_program, (prog_name, prog_dept, lead, leadID, leadEmail))
    else:
        print("Program not added: Invalid input")


# add a new course to the database
elif cmd == 'course':
    courseID, title, description, dept_id = input(
        "Please enter course number, title, description, department code: ").split(',')
    if help_functions.validate_course_input(courseID, title, description, dept_id):
        courseID = courseID.upper()
        title = help_functions.replace_ampersand(title)
        title = help_functions.title_except(title)
        description = description.strip()
        dept_id = dept_id.upper()
        add_course = "INSERT INTO Course (CourseID, Title, Description, DeptID) VALUES (%s, %s, %s, %s)"
        help_functions.execute_query(connection, add_course, (courseID, title, description, dept_id))
    else:
        print("Course not added: Invalid input")


# add a new section to the database
elif cmd == 'section':
    secID, courseID, semester, year, facultyLeadID, enrollCount = input(
        "Please enter section ID, course_id, semester, year, faculty ID, enrollment count: ").split(',')
    secID = secID.zfill(3)
    if help_functions.validate_section_input(secID, courseID, semester, year, facultyLeadID, enrollCount):
        courseID = courseID.upper()
        semester = semester.title()
        add_section = ("INSERT INTO Section ("
                       "SecID, CourseID, Semester, Year, FacultyLeadID, EnrollCount) VALUES (%s, %s, %s, %s, %s, %s)")
        help_functions.execute_query(
            connection, add_section, (secID, courseID, semester, year, facultyLeadID, enrollCount))
    else:
        print("Section not added: Invalid input")


# add a new objective to the database
elif cmd == 'obj':
    objCode, description, prog, dept_id = input(
        "Please enter objective code, description, program name, dept id: ").split(',')
    if help_functions.validate_objective_input(objCode, description, prog, dept_id):
        objCode = objCode.upper()
        prog = prog.upper()
        dept_id = dept_id.upper()
        checks_passed = True
        result = help_functions.select_query(connection, sql_cmds.count_obj_query, (prog, dept_id))
        count = result[0]['obj_count'] if result else 0
        next_objCode = f"{prog}{dept_id}{count + 1}"
        if objCode and objCode != next_objCode:
            print(f"Invalid objective code: {objCode}")
            print(f"Next valid objective code: {next_objCode}")
            print("Objective not added: please enter next valid objective code, or let the database generate one")
            checks_passed = False
        elif checks_passed and not objCode:
            objCode = next_objCode
        if checks_passed:
            add_objective = "INSERT INTO Objectives (ObjCode, Description, ProgName, DeptID) VALUES (%s, %s, %s, %s)"
            help_functions.execute_query(connection, add_objective, (objCode, description, prog, dept_id))
    else:
        print("Objective not added: Invalid input")


# add a new sub-objective to the database
elif cmd == 'subobj':
    description, objCode = input("Please enter sub-objective description, objective code: ").split(',')
    if help_functions.validate_sub_objective_input(description, objCode):
        objCode = objCode.upper()
        obj_exists = help_functions.select_query(connection, sql_cmds.check_obj_exists, (objCode,))
        if not obj_exists or obj_exists[0]['obj_count'] == 0:
            print(f"Learning objective code {objCode} does not exist")
            print("Sub-objective not added: please enter valid learning objective code")
        else:
            result = help_functions.select_query(connection, sql_cmds.count_sub_obj_query, (objCode,))
            count = result[0]['sub_obj_count'] if result else 0
            subObjCode = f"{objCode}.{count + 1}"
            add_sub_objective = "INSERT INTO SubObjectives (SubObjCode, Description, ObjCode) VALUES (%s, %s, %s)"
            help_functions.execute_query(connection, add_sub_objective, (subObjCode, description, objCode))
    else:
        print("Sub-objective not added: Invalid input")


# add a new course objective to the database
elif cmd == 'courseobj':
    courseID, objCode, subObjCode = input("Please enter courseID, objective code, subobjective code: ").split(',')
    while True:
        response = input("Do you want to auto-populate all sub-objectives? (y/n): ")
        if response.lower() != 'y' and response.lower() != 'n':
            print("Invalid input")
            continue
        else:
            break

    if help_functions.validate_course_obj_input(courseID, objCode, subObjCode):
        courseID = courseID.upper()
        objCode = objCode.upper()
        subObjCode = subObjCode.upper() if subObjCode else None
        checks_passed = True

        course_exists = help_functions.select_query(connection, sql_cmds.check_course_exists, (courseID,))
        if not course_exists or course_exists[0]['course_count'] == 0:
            print(f"Course number {courseID} does not exist")
            checks_passed = False

        if checks_passed:
            obj_exists = help_functions.select_query(connection, sql_cmds.check_obj_exists, (objCode,))
            if not obj_exists or obj_exists[0]['obj_count'] == 0:
                print(f"Learning objective code {objCode} does not exist")
                checks_passed = False

        if checks_passed and subObjCode:
            subObjCode_exists = help_functions.select_query(
                connection, sql_cmds.check_sub_obj_exists, (subObjCode,))
            if not subObjCode_exists or subObjCode_exists[0]['sub_obj_count'] == 0:
                print(f"Sub-objective code {subObjCode} does not exist")
                checks_passed = False

        if checks_passed:
            courseObjId = f"{courseID}.{objCode}.{subObjCode}" if subObjCode else f"{courseID}.{objCode}"
            add_course_obj = ("INSERT INTO CourseObjectives ("
                              "CourseObjID, CourseID, ObjCode, SubObjCode) VALUES (%s, %s, %s, %s)")
            help_functions.execute_query(connection, add_course_obj, (courseObjId, courseID, objCode, subObjCode))

            # If no subObjCode was provided, add all associated sub-objectives
            if not subObjCode and response.lower() == 'y':
                # Check if the objective has sub-objectives
                sub_objectives = help_functions.select_query(connection, sql_cmds.get_sub_objectives, (objCode,))
                if sub_objectives:
                    for sub_obj in sub_objectives:
                        subObjCode = sub_obj['SubObjCode']
                        courseObjId = f"{courseID}.{subObjCode}"
                        # Add each sub-objective
                        help_functions.execute_query(connection, add_course_obj,
                                                     (courseObjId, courseID, objCode, subObjCode))
                    print("All associated sub-objectives added successfully.")
    else:
        print("Course objective not added: Invalid input")


# add a new objective evaluation to the database
elif cmd == 'objeval':
    courseObjID, secID, semester, year, evalMethod, studentsPassed = input(
        "Please enter course objective ID, section ID, semester, year, evaluation method, students passed: ").split(',')
    secID = secID.zfill(3)
    if help_functions.validate_obj_eval_input(courseObjID, secID, semester, year, evalMethod, studentsPassed):
        courseObjID = courseObjID.upper()
        courseID = courseObjID.split('.')[0]
        semester = semester.title()
        evalMethod = evalMethod.title()
        checks_passed = True

        course_obj_id_exists = help_functions.select_query(
            connection, sql_cmds.check_course_obj_id_exists, (courseObjID,))
        if not course_obj_id_exists or course_obj_id_exists[0]['course_obj_count'] == 0:
            print(f"Course objective ID {courseObjID} does not exist")
            print("Objective evaluation not added: please enter valid course objective ID")
            checks_passed = False
        if checks_passed:
            section_exists = help_functions.select_query(
                connection, sql_cmds.check_section_exists, (courseID, secID, semester, year))
            if not section_exists or section_exists[0]['section_count'] == 0:
                print(f"Section ID {secID} does not exist")
                print("Objective evaluation not added: please enter valid section ID")
                checks_passed = False
        if checks_passed:
            student_count = help_functions.select_query(
                connection, sql_cmds.get_student_count, (courseID, secID, semester, year))
            students_passed_int = int(studentsPassed)
            if students_passed_int > student_count[0]['EnrollCount']:
                print(f"Students passed ({studentsPassed}) cannot be greater than enrollment count ({student_count[0]['EnrollCount']})")
                print("Objective evaluation not added: please enter valid students passed count")
                checks_passed = False
        if checks_passed:
            add_obj_eval = ("INSERT INTO ObjectiveEval ("
                            "CourseObjID, SecID, Semester, Year, EvalMethod, StudentsPassed) VALUES ("
                            "%s, %s, %s, %s, %s, %s)")
            help_functions.execute_query(
                connection, add_obj_eval, (courseObjID, secID, semester, year, evalMethod, studentsPassed))
    else:
        print("Objective evaluation not added: Invalid input")


# delete a record from the database with one or multiple conditions
elif cmd == 'delete':
    table = input("Please enter the table name: ").lower()
    valid_tables = help_functions.valid_tables(connection)
    if table not in valid_tables:
        print(f"Invalid table name: {table}")
    else:
        conditions_input = input(
            "Enter conditions for deletion (e.g., 'attribute1=value1,attribute2>value2,attribute<=value3'): ")
        conditions = conditions_input.split(',')

        where_clause = []
        values = []
        valid_columns = help_functions.valid_columns(connection, table)
        for condition in conditions:
            match = re.match(r"(.*?)(>=|<=|!=|=|>|<)(.*)", condition)
            if match:
                column, operator, value = [m.strip() for m in match.groups()]
                if column not in valid_columns:
                    print(f"Attribute {column} does not exist in {table} table")
                    exit()
                where_clause.append(f"{column} {operator} %s")
                values.append(value)
            else:
                print(f"Invalid condition format: {condition}")
                exit()

        if len(where_clause) == len(conditions):
            where_clause_str = " AND ".join(where_clause)
            values = tuple(values)

            select_query = f"SELECT * FROM {table} WHERE {where_clause_str}"
            select_results = help_functions.select_query(connection, select_query, values)
            if select_results is not None:
                while True:
                    confirm = input(
                        f"Confirm you want to delete records from {table} where {' and '.join(conditions)}? (y/n): ")
                    if confirm.lower() != 'y' and confirm.lower() != 'n':
                        print("Invalid input")
                        continue
                    else:
                        break

                if confirm.lower() == 'y':
                    try:
                        delete_query = f"DELETE FROM {table} WHERE {where_clause_str}"
                        if help_functions.execute_query(connection, delete_query, values):
                            print(f"Records successfully deleted from {table} where {' and '.join(conditions)}")
                        else:
                            print("Deletion failed. No records were deleted.")
                    except Exception as e:
                        print(f"An error occurred: {e}")
                elif confirm.lower() == 'n':
                    print("Deletion cancelled.")
            else:
                print("No records found matching the conditions.")


# update a record in the database with multiple conditions
elif cmd == 'update':
    table = input("Please enter the table name: ")
    valid_tables = help_functions.valid_tables(connection)
    if table not in valid_tables:
        print(f"Invalid table name: {table}")
    else:
        update_attribute = input("Enter the attribute to update: ")
        valid_columns = help_functions.valid_columns(connection, table)
        if update_attribute not in valid_columns:
            print(f"Attribute {update_attribute} does not exist in {table} table")
            exit()
        new_value = input("Enter the new value for the attribute: ")
        conditions_input = input("Enter conditions (e.g., 'column1>value1,column2<=value2',column3=value3): ")
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
                print(f"Invalid condition format: {condition}")
                exit()

        where_clause_str = " AND ".join(where_clause)
        values = tuple(values)

        try:
            update_query = f"UPDATE {table} SET {update_attribute} = %s WHERE {where_clause_str}"
            help_functions.execute_query(connection, update_query, values)
            print(f"Record(s) in {table} successfully updated.")
        except Exception as e:
            print(f"An error occurred: {e}")

