-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql_db:3306
-- Generation Time: Dec 11, 2023 at 05:42 AM
-- Server version: 8.2.0
-- PHP Version: 8.2.13

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
('BSKW1000', 'Bskw 1000: Introduction', 'Basic of Basket Weaving', 'BSKW'),
('BSKW1010', 'Bskw 1010: More Than Just Basic', 'Baskets of the world', 'BSKW'),
('BSKW2020', 'Bskw 2020: History of Basket Weaving', 'History of Basket Weaving', 'BSKW'),
('BSKW3000', 'Bskw 3000: Ready to Physics?', 'Newtonian Physics as applied to basket weaving', 'BSKW'),
('COMP1000', 'Cs 1', 'Computer 1000', 'COMP'),
('COMP1100', 'Cs 2', 'Computer 1100', 'COMP'),
('COMP1200', 'Comp1200', 'CS 3', 'COMP'),
('COMP3000', 'Comp 3000: Algorithm', 'Learn the best algorithms in the world', 'COMP'),
('CS2000', 'Data Structure', 'Data Structure using C++', 'COMP');

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
('Basket Weaving Department', 'BSKW'),
('Computer Science Department', 'COMP');

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
('10000001', 'Alan Turing', 'at@smu.edu', 'COMP', 'Full'),
('10000002', 'Sarah Davis', 'sdvis@smu.edu', 'COMP', 'Adjunct'),
('10000003', 'David Clark', 'dvclark@smu.edu', 'COMP', 'Assistant'),
('10000004', 'Emily White', 'ewhite@smu.edu', 'COMP', 'Associate'),
('10000005', 'Michael Brown', 'michbrownn@smu.edu', 'COMP', 'Full'),
('10000006', 'Lisa Johnson', 'lisajohnson@smu.edu', 'COMP', 'Adjunct'),
('10000007', 'Robert Lee', 'rob_lee@smu.edu', 'COMP', 'Assistant'),
('10000008', 'Jessica Turner', 'jesstner@smu.edu', 'COMP', 'Associate'),
('10000009', 'William Taylor', 'witaylor@smu.edu', 'COMP', 'Full'),
('10000010', 'Jennier Hall', 'jhall@smu.edu', 'COMP', 'Adjunct'),
('10000011', 'Andrew Adams', 'awdam@smu.edu', 'COMP', 'Assistant'),
('10000012', 'Oliva Carter', 'olcarter@smu.edu', 'COMP', 'Associate'),
('10000013', 'Grace Roberts', 'grrrrrrrroar@smu.edu', 'BSKW', 'Full'),
('10000014', 'Samuel Anderson', 'sason@smu.edu', 'BSKW', 'Adjunct'),
('10000015', 'Lily Morgan', 'lmgan@smu.edu', 'BSKW', 'Assistant'),
('10000016', 'Daniel Evans', 'dens@smu.edu', 'BSKW', 'Associate'),
('10000017', 'Ava Foster', 'affffoster@smu.edu', 'BSKW', 'Full'),
('10000018', 'Ethan Mitchell', 'emchell@smu.edu', 'BSKW', 'Assistant');

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
('BSKWP1', 'Ba', 'BSKW', 'Lily Morgan', '10000015', 'lmgan@smu.edu'),
('COMPP1', 'Bs', 'COMP', 'Alan Turing', '10000001', 'at@smu.edu');

-- --------------------------------------------------------

--
-- Table structure for table `ProgramCourses`
--

CREATE TABLE `ProgramCourses` (
  `ProgID` varchar(10) NOT NULL,
  `CourseID` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
('001', 'BSKW1000', 'Fall', '2023', '10000016', 40),
('001', 'BSKW1000', 'Spring', '2023', '10000018', 25),
('001', 'BSKW1000', 'Summer', '2023', '10000018', 15),
('001', 'BSKW1010', 'Fall', '2023', '10000014', 70),
('001', 'BSKW1010', 'Spring', '2023', '10000013', 50),
('001', 'BSKW1010', 'Summer', '2023', '10000018', 30),
('001', 'BSKW2020', 'Spring', '2023', '10000013', 60),
('001', 'BSKW3000', 'Fall', '2023', '10000016', 40),
('001', 'COMP1000', 'Fall', '2023', '10000002', 50),
('001', 'COMP1000', 'Spring', '2023', '10000002', 30),
('002', 'COMP1000', 'Fall', '2023', '10000004', 60),
('002', 'COMP1000', 'Spring', '2023', '10000004', 40),
('001', 'COMP1100', 'Fall', '2023', '10000004', 70),
('001', 'COMP1100', 'Spring', '2023', '10000009', 30),
('002', 'COMP1100', 'Fall', '2023', '10000004', 40),
('002', 'COMP1100', 'Spring', '2023', '10000008', 50),
('001', 'COMP1200', 'Fall', '2023', '10000005', 70),
('001', 'COMP1200', 'Spring', '2023', '10000009', 40),
('002', 'COMP1200', 'Fall', '2023', '10000008', 90),
('002', 'COMP1200', 'Spring', '2023', '10000006', 70),
('001', 'COMP3000', 'Fall', '2023', '10000009', 40),
('001', 'COMP3000', 'Spring', '2023', '10000001', 40),
('001', 'CS2000', 'Fall', '2023', '10000011', 30),
('001', 'CS2000', 'Spring', '2023', '10000003', 40);

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
