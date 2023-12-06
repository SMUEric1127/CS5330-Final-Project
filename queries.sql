
/*
Querying. You should support the following queries:
o Given a department:
     List all its program
     List all its faculty (including what program each faculty is in charge of, if there is one)
o Given a program:
     List all the courses, together with the objectives/sub-objectives association with year
     List all the objectives
o Given a semester and a program:
     List all the evaluation results for each section. (If data for some sections has not been entered, just indicate that the information is not found)
o Given an academic year (e.g. 23-24, which constitute summer 23, fall 23 and spring 24)
     List all the evaluation results for each objective/sub-objective
        • For each objective/sub-objective, list the course/section that are involved in evaluating them, and list the result for each course/section.
        • For each objective/sub-objective, aggregate the result to show the number (and the percentage) of students
*/

SELECT ProgName
FROM Program
WHERE DeptID = 'CS';

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
WHERE f.DeptID = d.DeptID
AND d.DeptID = 'CS';

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
WHERE C.DeptID = (SELECT DeptID FROM Program WHERE ProgName = 'BSc Computer Science')
ORDER BY C.Title, S.Year;

SELECT O.Description
FROM Objectives O
JOIN Program P ON P.ProgName = O.ProgName
WHERE O.ProgName = 'BSc Computer Science';

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
WHERE P.ProgName = 'BSc Computer Science';

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
    (S.Semester = 'Summer' AND S.Year = 2023) OR
    (S.Semester IN ('Fall', 'Spring') AND S.Year = 2022 + 1)
ORDER BY O.ObjCode, SO.SubObjCode, E.Semester, E.Year;

SELECT
    o.ObjCode AS ObjectiveCode,
    so.SubObjCode AS SubObjectiveCode,
    COALESCE(SUM(oe.StudentsPassed), 0) AS StudentsPassed,
    COALESCE(SUM(s.EnrollCount), 0) AS TotalStudents,
    COALESCE(ROUND((SUM(oe.StudentsPassed) / NULLIF(SUM(s.EnrollCount), 0)) * 100, 2), 0) AS PercentagePassed
FROM
    Objectives o
LEFT JOIN
    SubObjectives so ON o.ObjCode = so.ObjCode
LEFT JOIN
    CourseObjectives co ON o.ObjCode = co.ObjCode OR so.SubObjCode = co.SubObjCode
LEFT JOIN
    ObjectiveEval oe ON co.CourseObjID = oe.CourseObjID
LEFT JOIN
    Section s ON oe.SecID = s.SecID AND oe.SecID = s.SecID AND oe.Semester = s.Semester AND oe.Year = s.Year
WHERE
    (s.Semester = 'Summer' AND s.Year = 2023) OR
    (s.Semester = 'Fall' AND s.Year = 2023 + 1) OR
    (s.Semester = 'Spring' AND s.Year = 2023 + 1)
GROUP BY
    o.ObjCode, so.SubObjCode
ORDER BY
    o.ObjCode, so.SubObjCode;
