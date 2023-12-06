import mysql.connector
from mysql.connector import Error
import re

def connect_database(host_name, user_name, user_password, db_name):
    print(
        f"Connecting to: {host_name}, {user_name}, {user_password}, {db_name}")
    connection = None
    try:
        connection = mysql.connector.connect(
            host=host_name,
            user=user_name,
            passwd=user_password,
            database=db_name
        )
        print("MySQL Database connection successful")
    except Error as err:
        print(f"Error: '{err}'")

    return connection


def execute_query(connection, query, params=None):
    cursor = connection.cursor(buffered=True)
    try:
        if params:
            cursor.execute(query, params)
        else:
            cursor.execute(query)
        connection.commit()
        return cursor.fetchall()
    except Error as err:
        print(f"Error: '{err}'")
        return False
    finally:
        cursor.close()


def select_query(connection, query, params=None):
    cursor = connection.cursor(dictionary=True)
    try:
        if params:
            cursor.execute(query, params)
        else:
            cursor.execute(query)
        results = cursor.fetchall()
        if results:
            return results
        else:
            return None
    except Error as err:
        print(f"Error: '{err}'")
        return None
    finally:
        cursor.close()


def valid_tables(connection):
    cursor = connection.cursor()
    try:
        cursor.execute("SHOW TABLES")
        tables = cursor.fetchall()
        return [table[0] for table in tables]
    except Error as err:
        print(f"Error: '{err}'")
        return []
    finally:
        cursor.close()


def valid_columns(connection, table):
    cursor = connection.cursor()
    try:
        cursor.execute(f"SHOW COLUMNS FROM {table}")
        columns = cursor.fetchall()
        return [column[0] for column in columns]
    except Error as err:
        print(f"Error: '{err}'")
        return []
    finally:
        cursor.close()


def validate_program_input(p_name, p_dept, lead, l_id, l_email):
    if not re.match(r"^[A-Za-z ]{1,50}$", p_name):
        print(f"Invalid program name: {p_name}")
        return False
    if not re.match(r"^[A-Za-z]{1,4}$", p_dept):
        print(f"Invalid program department: {p_dept}")
        return False
    if not re.match(r"^[A-Za-z ]{1,40}$", lead):
        print(f"Invalid lead name: {lead}")
        return False
    if not re.match(r"^[0-9]{8}$", l_id):
        print(f"Invalid lead ID: {l_id}")
        return False
    if not re.match(r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$", l_email):
        print(f"Invalid lead email: {l_email}")
        return False
    return True


def validate_dept_input(d_name, d_code):
    if not re.match(r"^[A-Za-z ]{1,40}$", d_name):
        print(f"Invalid department name: {d_name}")
        return False
    if not re.match(r"^[A-Za-z]{1,4}$", d_code):
        print(f"Invalid department code: {d_code}")
        return False
    return True


def validate_faculty_input(f_id, f_name, f_email, f_dept, f_pos):
    if not re.match(r"^[0-9]{8}$", f_id):
        print(f"Invalid faculty ID: {f_id}")
        return False
    if not re.match(r"^[A-Za-z ]{1,40}$", f_name):
        print(f"Invalid faculty name: {f_name}")
        return False
    if not re.match(r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$", f_email):
        print(f"Invalid faculty email: {f_email}")
        return False
    if not re.match(r"^[A-Za-z]{1,4}$", f_dept):
        print(f"Invalid faculty department: {f_dept}")
        return False
    if not re.match(r"^(Full|Associate|Assistant|Adjunct)$", f_pos, re.IGNORECASE):
        print(f"Invalid faculty rank: {f_pos}")
        return False
    return True


def validate_course_input(c_id, c_title, c_desc, c_dept):
    if not re.match(r"^[A-Za-z]{1,4}[0-9]{4}$", c_id):
        print(f"Invalid course ID: {c_id}")
        return False
    if not re.match(r"^[A-Za-z ]{1,40}$", c_title):
        print(f"Invalid course title: {c_title}")
        return False
    if not re.match(r"^[A-Za-z0-9 ]{1,500}$", c_desc):
        print(f"Invalid course description: {c_desc}")
        return False
    if not re.match(r"^[A-Za-z]{1,4}$", c_dept):
        print(f"Invalid course department: {c_dept}")
        return False
    return True


def validate_section_input(s_id, c_id, s_sem, s_year, f_id, e_count):
    if not re.match(r"^[0-9]{3}$", s_id):
        print(f"Invalid section ID: {s_id}")
        return False
    if not re.match(r"^[A-Za-z]{1,4}[0-9]{4}$", c_id):
        print(f"Invalid course ID: {c_id}")
        return False
    if not re.match(r"^(Fall|Spring|Summer)$", s_sem, re.IGNORECASE):
        print(f"Invalid semester: {s_sem}")
        return False
    if not re.match(r"^[0-9]{4}$", s_year):
        print(f"Invalid year: {s_year}")
        return False
    if not re.match(r"^[0-9]{8}$", f_id):
        print(f"Invalid faculty ID: {f_id}")
        return False
    if not re.match(r"^[0-9]{1,3}$", e_count):
        print(f"Invalid enrollment count: {e_count}")
        return False
    return True


def validate_objective_input(o_code, o_desc, prog, p_dept):
    if o_code:
        if not re.match(r"^[A-Za-z]{1,7}[0-9]{1,2}$", o_code):
            print(f"Invalid objective code: {o_code}")
            return False
    if not re.match(r"^[A-Za-z0-9 ]{1,500}$", o_desc):
        print(f"Invalid objective description: {o_desc}")
        return False
    if not re.match(r"^[A-Za-z ]{1,50}$", prog):
        print(f"Invalid program name: {prog}")
        return False
    if not re.match(r"^[A-Za-z]{1,4}$", p_dept):
        print(f"Invalid program department: {p_dept}")
        return False
    return True


def validate_sub_objective_input(s_desc, o_code):
    if not re.match(r"^[A-Za-z0-9 ]{1,500}$", s_desc):
        print(f"Invalid sub-objective description: {s_desc}")
        return False
    if not re.match(r"^[A-Za-z]{1,7}[0-9]{1,2}$", o_code):
        print(f"Invalid objective code: {o_code}")
        return False
    return True


def validate_course_obj_input(c_id, o_code, s_code):
    if not re.match(r"^[A-Za-z]{1,4}[0-9]{4}$", c_id):
        print(f"Invalid course ID: {c_id}")
        return False
    if not re.match(r"^[A-Za-z]{1,7}[0-9]{1,2}$", o_code):
        print(f"Invalid objective code: {o_code}")
        return False
    if s_code:
        if not re.match(r"^[A-Za-z]{1,7}[0-9]{1,2}\.[0-9]{1,2}$", s_code):
            print(f"Invalid sub-objective code: {s_code}")
            return False
    return True


def validate_obj_eval_input(course_obj_id, s_id, sem, yr, eval, pass_count):
    if not re.match(r"^[A-Za-z]{1,4}[0-9]{4}\.[A-Za-z]{1,8}[0-9]{1,2}(\.[0-9]{1,2})?$", course_obj_id):
        print(f"Invalid course ID: {course_obj_id}")
        return False
    if not re.match(r"^[0-9]{3}$", s_id):
        print(f"Invalid section ID: {s_id}")
        return False
    if not re.match(r"^(Fall|Spring|Summer)$", sem, re.IGNORECASE):
        print(f"Invalid semester: {sem}")
        return False
    if not re.match(r"^[0-9]{4}$", yr):
        print(f"Invalid year: {yr}")
        return False
    if not re.match(r"^(Exam|Project|Assignment|Interview|Presentation)$", eval, re.IGNORECASE):
        print(f"Invalid evaluation method: {eval}")
        return False
    if not re.match(r"^[0-9]{1,3}$", pass_count):
        print(f"Invalid pass count: {pass_count}")
        return False
    return True


def replace_ampersand(text):
    return text.replace("&", "and")


def title_except(s):
    exceptions = ["the", "and", "in", "for", "on", "with", "at", "by", "from"]
    word_list = s.split()
    final = [word_list[0].capitalize()]
    for word in word_list[1:]:
        final.append(word if word in exceptions else word.capitalize())
    return ' '.join(final)

def valid_commands(s):
    valid_cmds = [
        'create', 'clear', 'clear_all', 'dept', 'faculty', 'prog', 'course', 'section', 'obj', 'subobj', 'courseobj',
        'objeval', 'delete', 'update', 'exit'
    ]
    return s in valid_cmds