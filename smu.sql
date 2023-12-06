DROP TABLE IF EXISTS ObjectiveEval;
DROP TABLE IF EXISTS CourseObjectives;
DROP TABLE IF EXISTS SubObjectives;
DROP TABLE IF EXISTS Objectives;
DROP TABLE IF EXISTS Section;
DROP TABLE IF EXISTS Course;
DROP TABLE IF EXISTS Program;
DROP TABLE IF EXISTS Faculty;
DROP TABLE IF EXISTS Department;



-- Table Creation Statements
CREATE TABLE Department(
    DeptName VARCHAR(40) PRIMARY KEY,
    DeptID VARCHAR(4) UNIQUE NOT NULL
);

CREATE TABLE Faculty(
    FacultyID CHAR(8) PRIMARY KEY,
    Name VARCHAR(40) NOT NULL,
    Email VARCHAR(40) NOT NULL,
    DeptID VARCHAR(4) NOT NULL,
    Position ENUM('Full', 'Associate', 'Assistant', 'Adjunct') NOT NULL,
    FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
);

CREATE TABLE Program(
    ProgName VARCHAR(50) PRIMARY KEY,
    DeptID VARCHAR(4) NOT NULL,
    FacultyLead VARCHAR(40) NOT NULL,
    FacultyLeadID VARCHAR(8) NOT NULL,
    FacultyLeadEmail VARCHAR(40) NOT NULL,
    FOREIGN KEY (DeptID) REFERENCES Department(DeptID),
    FOREIGN KEY (FacultyLeadID) REFERENCES Faculty(FacultyID)
);

CREATE TABLE Course(
    CourseID VARCHAR(8) PRIMARY KEY,
    Title VARCHAR(40) NOT NULL,
    Description TEXT,
    DeptID VARCHAR(4) NOT NULL,
    FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
);

CREATE TABLE Section(
    SecID CHAR(3) NOT NULL,
    CourseID VARCHAR(8) NOT NULL,
    Semester ENUM('Fall', 'Spring', 'Summer') NOT NULL,
    Year YEAR NOT NULL,
    FacultyLeadID CHAR(8) NOT NULL,
    EnrollCount SMALLINT NOT NULL,
    PRIMARY KEY (CourseID, SecID, Semester, Year),
    FOREIGN KEY (CourseID) REFERENCES Course(CourseID),
    FOREIGN KEY (FacultyLeadID) REFERENCES Faculty(FacultyID)
);

CREATE TABLE Objectives(
    ObjCode VARCHAR(9) PRIMARY KEY NOT NULL,
    Description TEXT NOT NULL,
    ProgName VARCHAR(50) NOT NULL,
    DeptID VARCHAR(4) NOT NULL,
    FOREIGN KEY (DeptID) REFERENCES Department(DeptID),
    FOREIGN KEY (ProgName) REFERENCES Program(ProgName)
);

CREATE TABLE SubObjectives(
    SubObjCode CHAR(12) PRIMARY KEY,
    Description TEXT NOT NULL,
    ObjCode VARCHAR(9) NOT NULL,
    FOREIGN KEY (ObjCode) REFERENCES Objectives(ObjCode)
);

CREATE TABLE CourseObjectives(
    CourseObjID VARCHAR(20) PRIMARY KEY,
    CourseID VARCHAR(8) NOT NULL,
    ObjCode CHAR(9) NOT NULL,
    SubObjCode CHAR(12),
    FOREIGN KEY (CourseID) REFERENCES Course(CourseID),
    FOREIGN KEY (ObjCode) REFERENCES Objectives(ObjCode)
);

CREATE TABLE ObjectiveEval(
    CourseObjID VARCHAR(20) NOT NULL,
    SecID CHAR(3) NOT NULL,
    Semester ENUM('Fall', 'Spring', 'Summer') NOT NULL,
    Year YEAR NOT NULL,
    EvalMethod ENUM('Exam', 'Project', 'Assignment', 'Interview', 'Presentation') NOT NULL,
    StudentsPassed SMALLINT,
    FOREIGN KEY (CourseObjID) REFERENCES CourseObjectives(CourseObjID)
);

-- Truncate Table Statements
TRUNCATE TABLE Program;
TRUNCATE TABLE Department;
TRUNCATE TABLE Faculty;
TRUNCATE TABLE Course;
TRUNCATE TABLE Section;
TRUNCATE TABLE Objectives;
TRUNCATE TABLE SubObjectives;
TRUNCATE TABLE CourseObjectives;
TRUNCATE TABLE ObjectiveEval;