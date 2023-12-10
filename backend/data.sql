-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql_db:3306
-- Generation Time: Dec 10, 2023 at 10:47 AM
-- Server version: 8.0.33
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbproj`
--

-- --------------------------------------------------------

--
-- Table structure for table `Course`
--

CREATE TABLE `Course` (
  `CourseID` varchar(8) NOT NULL,
  `Title` varchar(80) NOT NULL,
  `Description` text,
  `DeptID` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Course`
--

INSERT INTO `Course` (`CourseID`, `Title`, `Description`, `DeptID`) VALUES
('CS1341', 'Java Course', 'Hello World using Java!', 'LYLE'),
('CS1342', 'C++', 'C++ OOP Course', 'LYLE'),
('MEAD1000', 'Intro to Music Appreciation', '', 'MEAD');

-- --------------------------------------------------------

--
-- Table structure for table `CourseObjectives`
--

CREATE TABLE `CourseObjectives` (
  `CourseObjID` varchar(24) NOT NULL,
  `CourseID` varchar(8) NOT NULL,
  `ObjCode` varchar(128) NOT NULL,
  `SubObjCode` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `CourseObjectives`
--

INSERT INTO `CourseObjectives` (`CourseObjID`, `CourseID`, `ObjCode`, `SubObjCode`) VALUES
('CS1341.LYLEP1LYLE1.1', 'CS1341', 'LYLEP1LYLE1', 'LYLEP1LYLE1.1'),
('CS1342.LYLEP1LYLE2', 'CS1342', 'LYLEP1LYLE2', NULL),
('MEAD1000.LYLEP1LYLE1.1', 'MEAD1000', 'MEADP1MEAD1', 'LYLEP1LYLE1.1'),
('MEAD1000.MEADP1MEAD1.1', 'MEAD1000', 'MEADP1MEAD1', 'MEADP1MEAD1.1');

-- --------------------------------------------------------

--
-- Table structure for table `Department`
--

CREATE TABLE `Department` (
  `DeptName` varchar(128) NOT NULL,
  `DeptID` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Department`
--

INSERT INTO `Department` (`DeptName`, `DeptID`) VALUES
('Lyle School of Engineering', 'LYLE'),
('Meadow Department', 'MEAD');

-- --------------------------------------------------------

--
-- Table structure for table `Faculty`
--

CREATE TABLE `Faculty` (
  `FacultyID` char(8) NOT NULL,
  `Name` varchar(128) NOT NULL,
  `Email` varchar(128) NOT NULL,
  `DeptID` varchar(4) NOT NULL,
  `Position` enum('Full','Associate','Assistant','Adjunct') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Faculty`
--

INSERT INTO `Faculty` (`FacultyID`, `Name`, `Email`, `DeptID`, `Position`) VALUES
('00001234', 'Meadow Faculty', 'tes23222t@mail.com', 'LYLE', 'Associate'),
('12341211', 'Alan Turring', 'at@smu.edu', 'LYLE', 'Full'),
('12341233', 'Meadow Faculty', 'me@smu.edu', 'LYLE', 'Assistant');

-- --------------------------------------------------------

--
-- Table structure for table `ObjectiveEval`
--

CREATE TABLE `ObjectiveEval` (
  `CourseObjID` varchar(24) NOT NULL,
  `SecID` char(3) NOT NULL,
  `Semester` enum('Fall','Spring','Summer') NOT NULL,
  `Year` year NOT NULL,
  `EvalMethod` enum('Exam','Project','Assignment','Interview','Presentation') NOT NULL,
  `StudentsPassed` smallint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ObjectiveEval`
--

INSERT INTO `ObjectiveEval` (`CourseObjID`, `SecID`, `Semester`, `Year`, `EvalMethod`, `StudentsPassed`) VALUES
('CS1341.LYLEP1LYLE1.1', '001', 'Fall', '2023', 'Exam', 50),
('CS1341.LYLEP1LYLE1.1', '002', 'Fall', '2023', 'Exam', 25),
('CS1342.LYLEP1LYLE2', '001', 'Fall', '2023', 'Project', 30),
('MEAD1000.MEADP1MEAD1.1', '001', 'Fall', '2023', 'Exam', 50);

-- --------------------------------------------------------

--
-- Table structure for table `Objectives`
--

CREATE TABLE `Objectives` (
  `ObjCode` varchar(128) NOT NULL,
  `Description` text NOT NULL,
  `ProgID` varchar(10) NOT NULL,
  `DeptID` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Objectives`
--

INSERT INTO `Objectives` (`ObjCode`, `Description`, `ProgID`, `DeptID`) VALUES
('LYLEP1LYLE1', 'Basic Java Core', 'LYLEP1', 'LYLE'),
('LYLEP1LYLE2', 'A very looooooooooong description for a objective', 'LYLEP1', 'LYLE'),
('MEADP1MEAD1', 'Foundation of Music Appreciation', 'MEADP1', 'MEAD');

-- --------------------------------------------------------

--
-- Table structure for table `Program`
--

CREATE TABLE `Program` (
  `ProgID` varchar(10) NOT NULL,
  `ProgName` varchar(50) NOT NULL,
  `DeptID` varchar(4) NOT NULL,
  `FacultyLead` varchar(128) NOT NULL,
  `FacultyLeadID` varchar(8) NOT NULL,
  `FacultyLeadEmail` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Program`
--

INSERT INTO `Program` (`ProgID`, `ProgName`, `DeptID`, `FacultyLead`, `FacultyLeadID`, `FacultyLeadEmail`) VALUES
('LYLEP1', 'Bs', 'LYLE', 'Alan Turring', '12341211', 'at@smu.edu'),
('LYLEP2', 'Music Appreciation Bs', 'LYLE', 'Meadow Faculty', '12341233', 'me@smu.edu'),
('MEADP1', 'Music Appreciation Bs', 'MEAD', 'Meadow Faculty', '00001234', 'tes23222t@mail.com');

-- --------------------------------------------------------

--
-- Table structure for table `ProgramCourses`
--

CREATE TABLE `ProgramCourses` (
  `ProgID` varchar(10) NOT NULL,
  `CourseID` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ProgramCourses`
--

INSERT INTO `ProgramCourses` (`ProgID`, `CourseID`) VALUES
('LYLEP1', 'CS1341'),
('LYLEP1', 'CS1342');

-- --------------------------------------------------------

--
-- Table structure for table `Section`
--

CREATE TABLE `Section` (
  `SecID` char(3) NOT NULL,
  `CourseID` varchar(8) NOT NULL,
  `Semester` enum('Fall','Spring','Summer') NOT NULL,
  `Year` year NOT NULL,
  `FacultyLeadID` char(8) NOT NULL,
  `EnrollCount` smallint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Section`
--

INSERT INTO `Section` (`SecID`, `CourseID`, `Semester`, `Year`, `FacultyLeadID`, `EnrollCount`) VALUES
('001', 'CS1341', 'Fall', '2023', '12341211', 50),
('002', 'CS1341', 'Fall', '2023', '12341211', 100),
('001', 'CS1342', 'Fall', '2023', '12341211', 60),
('001', 'MEAD1000', 'Fall', '2023', '00001234', 100),
('001', 'MEAD1000', 'Spring', '2023', '12341211', 100);

-- --------------------------------------------------------

--
-- Table structure for table `SubObjectives`
--

CREATE TABLE `SubObjectives` (
  `SubObjCode` varchar(128) NOT NULL,
  `Description` text NOT NULL,
  `ObjCode` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `SubObjectives`
--

INSERT INTO `SubObjectives` (`SubObjCode`, `Description`, `ObjCode`) VALUES
('LYLEP1LYLE1.1', 'Basic Java Functions', 'LYLEP1LYLE1'),
('LYLEP1LYLE2.1', 'test', 'LYLEP1LYLE2'),
('MEADP1MEAD1.1', 'Sub 1', 'MEADP1MEAD1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Course`
--
ALTER TABLE `Course`
  ADD PRIMARY KEY (`CourseID`),
  ADD KEY `DeptID` (`DeptID`);

--
-- Indexes for table `CourseObjectives`
--
ALTER TABLE `CourseObjectives`
  ADD PRIMARY KEY (`CourseObjID`),
  ADD KEY `CourseID` (`CourseID`),
  ADD KEY `ObjCode` (`ObjCode`);

--
-- Indexes for table `Department`
--
ALTER TABLE `Department`
  ADD PRIMARY KEY (`DeptName`),
  ADD UNIQUE KEY `DeptID` (`DeptID`);

--
-- Indexes for table `Faculty`
--
ALTER TABLE `Faculty`
  ADD PRIMARY KEY (`FacultyID`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD KEY `DeptID` (`DeptID`);

--
-- Indexes for table `ObjectiveEval`
--
ALTER TABLE `ObjectiveEval`
  ADD KEY `CourseObjID` (`CourseObjID`);

--
-- Indexes for table `Objectives`
--
ALTER TABLE `Objectives`
  ADD PRIMARY KEY (`ObjCode`),
  ADD KEY `DeptID` (`DeptID`),
  ADD KEY `ProgID` (`ProgID`);

--
-- Indexes for table `Program`
--
ALTER TABLE `Program`
  ADD PRIMARY KEY (`ProgID`),
  ADD KEY `DeptID` (`DeptID`),
  ADD KEY `FacultyLeadID` (`FacultyLeadID`),
  ADD KEY `FacultyLeadEmail` (`FacultyLeadEmail`);

--
-- Indexes for table `ProgramCourses`
--
ALTER TABLE `ProgramCourses`
  ADD PRIMARY KEY (`ProgID`,`CourseID`),
  ADD KEY `CourseID` (`CourseID`);

--
-- Indexes for table `Section`
--
ALTER TABLE `Section`
  ADD PRIMARY KEY (`CourseID`,`SecID`,`Semester`,`Year`),
  ADD KEY `FacultyLeadID` (`FacultyLeadID`);

--
-- Indexes for table `SubObjectives`
--
ALTER TABLE `SubObjectives`
  ADD PRIMARY KEY (`SubObjCode`),
  ADD KEY `ObjCode` (`ObjCode`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Course`
--
ALTER TABLE `Course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`DeptID`) REFERENCES `Department` (`DeptID`);

--
-- Constraints for table `CourseObjectives`
--
ALTER TABLE `CourseObjectives`
  ADD CONSTRAINT `courseobjectives_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `Course` (`CourseID`),
  ADD CONSTRAINT `courseobjectives_ibfk_2` FOREIGN KEY (`ObjCode`) REFERENCES `Objectives` (`ObjCode`);

--
-- Constraints for table `Faculty`
--
ALTER TABLE `Faculty`
  ADD CONSTRAINT `faculty_ibfk_1` FOREIGN KEY (`DeptID`) REFERENCES `Department` (`DeptID`);

--
-- Constraints for table `ObjectiveEval`
--
ALTER TABLE `ObjectiveEval`
  ADD CONSTRAINT `objectiveeval_ibfk_1` FOREIGN KEY (`CourseObjID`) REFERENCES `CourseObjectives` (`CourseObjID`);

--
-- Constraints for table `Objectives`
--
ALTER TABLE `Objectives`
  ADD CONSTRAINT `objectives_ibfk_1` FOREIGN KEY (`DeptID`) REFERENCES `Department` (`DeptID`),
  ADD CONSTRAINT `objectives_ibfk_2` FOREIGN KEY (`ProgID`) REFERENCES `Program` (`ProgID`);

--
-- Constraints for table `Program`
--
ALTER TABLE `Program`
  ADD CONSTRAINT `program_ibfk_1` FOREIGN KEY (`DeptID`) REFERENCES `Department` (`DeptID`),
  ADD CONSTRAINT `program_ibfk_2` FOREIGN KEY (`FacultyLeadID`) REFERENCES `Faculty` (`FacultyID`),
  ADD CONSTRAINT `program_ibfk_3` FOREIGN KEY (`FacultyLeadEmail`) REFERENCES `Faculty` (`Email`);

--
-- Constraints for table `ProgramCourses`
--
ALTER TABLE `ProgramCourses`
  ADD CONSTRAINT `programcourses_ibfk_1` FOREIGN KEY (`ProgID`) REFERENCES `Program` (`ProgID`),
  ADD CONSTRAINT `programcourses_ibfk_2` FOREIGN KEY (`CourseID`) REFERENCES `Course` (`CourseID`);

--
-- Constraints for table `Section`
--
ALTER TABLE `Section`
  ADD CONSTRAINT `section_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `Course` (`CourseID`),
  ADD CONSTRAINT `section_ibfk_2` FOREIGN KEY (`FacultyLeadID`) REFERENCES `Faculty` (`FacultyID`);

--
-- Constraints for table `SubObjectives`
--
ALTER TABLE `SubObjectives`
  ADD CONSTRAINT `subobjectives_ibfk_1` FOREIGN KEY (`ObjCode`) REFERENCES `Objectives` (`ObjCode`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
