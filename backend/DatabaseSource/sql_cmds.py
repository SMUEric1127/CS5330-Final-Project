create_department_table = """
CREATE TABLE department(
DeptName VARCHAR(40) PRIMARY KEY,
DeptID VARCHAR(4) UNIQUE NOT NULL
)
"""

create_faculty_table = """
CREATE TABLE faculty(
FacultyID CHAR(8) PRIMARY KEY,
Name VARCHAR(40) NOT NULL,
Email VARCHAR(40) UNIQUE NOT NULL,
DeptID VARCHAR(4) NOT NULL,
Position ENUM('Full', 'Associate', 'Assistant', 'Adjunct') NOT NULL,
FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
)
"""

create_program_table = """
CREATE TABLE program(
ProgName VARCHAR(50) NOT NULL,
DeptID VARCHAR(4) NOT NULL,
FacultyLead VARCHAR(40) NOT NULL,
FacultyLeadID VARCHAR(8) NOT NULL,
FacultyLeadEmail VARCHAR(40) NOT NULL,
PRIMARY KEY (ProgName, DeptID),
FOREIGN KEY (DeptID) REFERENCES Department(DeptID),
FOREIGN KEY (FacultyLeadID) REFERENCES Faculty(FacultyID),
FOREIGN KEY (FacultyLeadEmail) REFERENCES Faculty(Email)
)
"""

create_course_table = """
CREATE TABLE course(
CourseID VARCHAR(8) PRIMARY KEY,
Title VARCHAR(80) NOT NULL,
Description TEXT,
DeptID VARCHAR(4) NOT NULL,
FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
)
"""

create_section_table = """
CREATE TABLE section(
SecID CHAR(3) NOT NULL,
CourseID VARCHAR(8) NOT NULL,
Semester ENUM('Fall', 'Spring', 'Summer') NOT NULL,
Year YEAR NOT NULL,
FacultyLeadID CHAR(8) NOT NULL,
EnrollCount SMALLINT NOT NULL,
PRIMARY KEY (CourseID, SecID, Semester, Year),
FOREIGN KEY (CourseID) REFERENCES Course(CourseID),
FOREIGN KEY (FacultyLeadID) REFERENCES Faculty(FacultyID)
)
"""

create_objectives_table = """
CREATE TABLE objectives(
ObjCode VARCHAR(24) NOT NULL,
Description TEXT NOT NULL,
ProgName VARCHAR(50) NOT NULL,
DeptID VARCHAR(4) NOT NULL,
PRIMARY KEY (ObjCode),
FOREIGN KEY (DeptID) REFERENCES Department(DeptID),
FOREIGN KEY (ProgName) REFERENCES Program(ProgName)
)
"""

create_sub_objectives_table = """
CREATE TABLE subobjectives(
SubObjCode VARCHAR(12) PRIMARY KEY,
Description TEXT NOT NULL,
ObjCode VARCHAR(24) NOT NULL,
FOREIGN KEY (ObjCode) REFERENCES Objectives(ObjCode)
)
"""

create_course_objectives_table = """
CREATE TABLE courseobjectives(
CourseObjID VARCHAR(20) PRIMARY KEY,
CourseID VARCHAR(8) NOT NULL,
ObjCode VARCHAR(24) NOT NULL,
SubObjCode VARCHAR(12),
FOREIGN KEY (CourseID) REFERENCES Course(CourseID),
FOREIGN KEY (ObjCode) REFERENCES Objectives(ObjCode)
)
"""


create_objective_eval_table = """
CREATE TABLE objectiveeval(
CourseObjID VARCHAR(20) NOT NULL,
SecID CHAR(3) NOT NULL,
Semester ENUM('Fall', 'Spring', 'Summer') NOT NULL,
Year YEAR NOT NULL,
EvalMethod ENUM('Exam', 'Project', 'Assignment', 'Interview', 'Presentation') NOT NULL,
StudentsPassed SMALLINT NOT NULL,
FOREIGN KEY (CourseObjID) REFERENCES CourseObjectives(CourseObjID)
)
"""

clear_tables = [
    "TRUNCATE TABLE Program",
    "TRUNCATE TABLE Department",
    "TRUNCATE TABLE Faculty",
    "TRUNCATE TABLE Course",
    "TRUNCATE TABLE Section",
    "TRUNCATE TABLE Objectives",
    "TRUNCATE TABLE SubObjectives",
    "TRUNCATE TABLE CourseObjectives",
    "TRUNCATE TABLE ObjectiveEval"
]

count_obj_query = """
SELECT COUNT(*) AS obj_count
    FROM Objectives 
    WHERE ProgName = %s
    AND DeptID = %s
"""


count_sub_obj_query = """
SELECT COUNT(*) AS sub_obj_count
    FROM SubObjectives
    WHERE ObjCode = %s
"""


get_sub_objectives = """
SELECT SubObjCode
    FROM SubObjectives
    WHERE ObjCode = %s
"""


check_obj_exists = """
SELECT COUNT(*) AS obj_count
    FROM Objectives
    WHERE ObjCode = %s
"""


check_course_exists = """
SELECT COUNT(*) AS course_count
    FROM Course
    WHERE CourseID = %s
"""


check_sub_obj_exists = """
SELECT COUNT(*) AS sub_obj_count
    FROM SubObjectives
    WHERE SubObjCode = %s
"""

check_course_obj_id_exists = """
SELECT COUNT(*) AS course_obj_count
    FROM CourseObjectives
    WHERE CourseObjID = %s
"""


check_section_exists = """
SELECT COUNT(*) AS section_count
    FROM Section
    WHERE CourseID = %s
    AND SecID = %s
    AND Semester = %s
    AND Year = %s
"""


get_student_count = """
SELECT EnrollCount
    FROM Section
    WHERE CourseID = %s
    AND SecID = %s
    AND Semester = %s
    AND Year = %s
"""