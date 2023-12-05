-- Test data for the Department 'CS'
INSERT INTO Department (DeptName, DeptID) VALUES ('Computer Science', 'CS');

-- Test data for Programs in the 'CS' Department
INSERT INTO Faculty (FacultyID, Name, Email, DeptID, Position) VALUES ('F1234567', 'Dr. Alice Smith', 'asmith@email.com', 'CS', 'Full');
INSERT INTO Faculty (FacultyID, Name, Email, DeptID, Position) VALUES ('F2345678', 'Dr. Bob Jones', 'bjones@email.com', 'CS', 'Associate');

-- Test data for Faculty in the 'CS' Department
INSERT INTO Program (ProgName, DeptID, FacultyLead, FacultyLeadID, FacultyLeadEmail) VALUES ('BSc Computer Science', 'CS', 'Dr. Alice Smith', 'F1234567', 'asmith@email.com');
INSERT INTO Program (ProgName, DeptID, FacultyLead, FacultyLeadID, FacultyLeadEmail) VALUES ('MSc Computer Science', 'CS', 'Dr. Bob Jones', 'F2345678', 'bjones@email.com');

-- Test data for the Courses in the 'BSc Computer Science' Program
INSERT INTO Course (CourseID, Title, Description, DeptID) VALUES ('CS101', 'Introduction to Computer Science', 'Basics of Computer Science', 'CS');
INSERT INTO Course (CourseID, Title, Description, DeptID) VALUES ('CS102', 'Data Structures', 'In-depth Data Structures', 'CS');

-- Test data for Sections of Courses
INSERT INTO Section (SecID, CourseID, Semester, Year, FacultyLeadID, EnrollCount) VALUES ('001', 'CS101', 'Fall', 2023, 'F1234567', 30);
INSERT INTO Section (SecID, CourseID, Semester, Year, FacultyLeadID, EnrollCount) VALUES ('002', 'CS102', 'Spring', 2024, 'F2345678', 25);

-- Test data for Objectives and SubObjectives for the 'BSc Computer Science' Program
INSERT INTO Objectives (ObjCode, Description, ProgName, DeptID) VALUES ('OBJ01', 'Understand basic concepts', 'BSc Computer Science', 'CS');
INSERT INTO SubObjectives (SubObjCode, Description, ObjCode) VALUES ('OBJ01.1', 'Understand Dr. Lin', 'OBJ01');

-- Test data for CourseObjectives for the 'BSc Computer Science' Program
INSERT INTO CourseObjectives (CourseObjID, CourseID, ObjCode) VALUES ('CSCOBJ01', 'CS101', 'OBJ01');
INSERT INTO CourseObjectives (CourseObjID, CourseID, ObjCode, SubObjCode) VALUES ('CSCOBJ02', 'CS102', 'OBJ01', 'OBJ01.1');

-- Test data for ObjectiveEval for the 'BSc Computer Science' Program
INSERT INTO ObjectiveEval (CourseObjID, SecID, Semester, Year, EvalMethod, StudentsPassed) VALUES ('CSCOBJ01', '001', 'Fall', 2023, 'Exam', 20);
INSERT INTO ObjectiveEval (CourseObjID, SecID, Semester, Year, EvalMethod, StudentsPassed) VALUES ('CSCOBJ02', '002', 'Spring', 2024, 'Project', 18);

-- Test data for the Department 'ELE'
INSERT INTO Department (DeptName, DeptID) VALUES ('Electrical Engineering', 'ELE');

-- Test data for Faculty in the 'ELE' Department
INSERT INTO Faculty (FacultyID, Name, Email, DeptID, Position) VALUES ('F3456789', 'Dr. Emily Clark', 'eclark@email.com', 'ELE', 'Full');
INSERT INTO Faculty (FacultyID, Name, Email, DeptID, Position) VALUES ('F4567890', 'Dr. John Doe', 'jdoe@email.com', 'ELE', 'Associate');

-- Test data for Programs in the 'ELE' Department
INSERT INTO Program (ProgName, DeptID, FacultyLead, FacultyLeadID, FacultyLeadEmail) VALUES ('BSc Electrical Engineering', 'ELE', 'Dr. Emily Clark', 'F3456789', 'eclark@email.com');
INSERT INTO Program (ProgName, DeptID, FacultyLead, FacultyLeadID, FacultyLeadEmail) VALUES ('MSc Electrical Engineering', 'ELE', 'Dr. John Doe', 'F4567890', 'jdoe@email.com');

-- Test data for the Courses in the 'BSc Electrical Engineering' Program
INSERT INTO Course (CourseID, Title, Description, DeptID) VALUES ('ELE101', 'Introduction to Electronics', 'Basics of Electronics', 'ELE');
INSERT INTO Course (CourseID, Title, Description, DeptID) VALUES ('ELE102', 'Circuit Analysis', 'Fundamentals of Circuit Analysis', 'ELE');

-- Test data for Sections of Courses
INSERT INTO Section (SecID, CourseID, Semester, Year, FacultyLeadID, EnrollCount) VALUES ('001', 'ELE101', 'Fall', 2023, 'F3456789', 35);
INSERT INTO Section (SecID, CourseID, Semester, Year, FacultyLeadID, EnrollCount) VALUES ('002', 'ELE102', 'Spring', 2024, 'F4567890', 30);

-- Test data for Objectives and SubObjectives for the 'BSc Electrical Engineering' Program
INSERT INTO Objectives (ObjCode, Description, ProgName, DeptID) VALUES ('ELOBJ01', 'Understand electronic principles', 'BSc Electrical Engineering', 'ELE');
INSERT INTO SubObjectives (SubObjCode, Description, ObjCode) VALUES ('ELOBJ01.1', 'Understand Basic Circuits', 'ELOBJ01');

-- Test data for CourseObjectives for the 'BSc Electrical Engineering' Program
INSERT INTO CourseObjectives (CourseObjID, CourseID, ObjCode) VALUES ('ELECOBJ01', 'ELE101', 'ELOBJ01');
INSERT INTO CourseObjectives (CourseObjID, CourseID, ObjCode, SubObjCode) VALUES ('ELECOBJ02', 'ELE102', 'ELOBJ01', 'ELOBJ01.1');

-- Test data for ObjectiveEval for the 'BSc Electrical Engineering' Program
INSERT INTO ObjectiveEval (CourseObjID, SecID, Semester, Year, EvalMethod, StudentsPassed) VALUES ('ELECOBJ01', '001', 'Fall', 2023, 'Exam', 25);
INSERT INTO ObjectiveEval (CourseObjID, SecID, Semester, Year, EvalMethod, StudentsPassed) VALUES ('ELECOBJ02', '002', 'Spring', 2024, 'Project', 22);
