-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: dbproj
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `CourseID` varchar(8) NOT NULL,
  `Title` varchar(80) NOT NULL,
  `Description` text,
  `DeptID` varchar(4) NOT NULL,
  PRIMARY KEY (`CourseID`),
  KEY `DeptID` (`DeptID`),
  CONSTRAINT `course_ibfk_1` FOREIGN KEY (`DeptID`) REFERENCES `department` (`DeptID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES ('BSKW1000','Basic of Basket Weaving','Fun times','BSKW'),('BSKW1010','Baskets of the World','Funner times','BSKW'),('BSKW2020','History of Basket Weaving','The funnest of times','BSKW'),('BSKW3000','Newtonian Physics as Applied to Basket Weaving','Too much fun','BSKW'),('COMP1000','Cs 1','Learning Java','COMP'),('COMP1100','Cs 2','Learning C++','COMP'),('COMP1200','Cs 3','Python Essentials','COMP'),('COMP2000','Data Structures','DS essentials','COMP'),('COMP3000','Algorithm','Enjoy the pain','COMP');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courseobjectives`
--

DROP TABLE IF EXISTS `courseobjectives`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courseobjectives` (
  `CourseObjID` varchar(64) NOT NULL,
  `CourseID` varchar(8) NOT NULL,
  `ObjCode` varchar(24) NOT NULL,
  `SubObjCode` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`CourseObjID`),
  KEY `CourseID` (`CourseID`),
  KEY `ObjCode` (`ObjCode`),
  KEY `SubObjCode` (`SubObjCode`),
  CONSTRAINT `courseobjectives_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`),
  CONSTRAINT `courseobjectives_ibfk_2` FOREIGN KEY (`ObjCode`) REFERENCES `objectives` (`ObjCode`),
  CONSTRAINT `courseobjectives_ibfk_3` FOREIGN KEY (`SubObjCode`) REFERENCES `subobjectives` (`SubObjCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courseobjectives`
--

LOCK TABLES `courseobjectives` WRITE;
/*!40000 ALTER TABLE `courseobjectives` DISABLE KEYS */;
INSERT INTO `courseobjectives` VALUES ('BSKW1000.BABSKW1','BSKW1000','BABSKW1',NULL),('BSKW1000.BABSKW1.1','BSKW1000','BABSKW1','BABSKW1.1');
/*!40000 ALTER TABLE `courseobjectives` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `DeptName` varchar(40) NOT NULL,
  `DeptID` varchar(4) NOT NULL,
  PRIMARY KEY (`DeptName`),
  UNIQUE KEY `DeptID` (`DeptID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES ('Basket Weaving Department','BSKW'),('Computer Science Department','COMP');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faculty`
--

DROP TABLE IF EXISTS `faculty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faculty` (
  `FacultyID` char(8) NOT NULL,
  `Name` varchar(40) NOT NULL,
  `Email` varchar(40) NOT NULL,
  `DeptID` varchar(4) NOT NULL,
  `Position` enum('Full','Associate','Assistant','Adjunct') NOT NULL,
  PRIMARY KEY (`FacultyID`),
  UNIQUE KEY `Email` (`Email`),
  KEY `DeptID` (`DeptID`),
  CONSTRAINT `faculty_ibfk_1` FOREIGN KEY (`DeptID`) REFERENCES `department` (`DeptID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculty`
--

LOCK TABLES `faculty` WRITE;
/*!40000 ALTER TABLE `faculty` DISABLE KEYS */;
INSERT INTO `faculty` VALUES ('11111111','Alan Turing','at@smu.edu','COMP','Full'),('12121212','Brad Pitt','bp@smu.edu','BSKW','Full'),('12345678','John Smith','js@smu.edu','COMP','Full'),('22222222','Robert Oppenheimer','ro@smu.edu','COMP','Associate'),('23232323','The Rock','tr@smu.edu','BSKW','Full'),('23456789','Jim Jones','jj@smu.edu','COMP','Full'),('33333333','Enrico Fermi','er@smu.edu','COMP','Associate'),('34343434','Carrot Top','ct@smu.edu','BSKW','Associate'),('44444444','James Maxwell','jm@smu.edu','COMP','Associate'),('45454545','John Doe','jd@smu.edu','BSKW','Associate'),('55555555','Marie Curie','mc@smu.edu','COMP','Adjunct'),('56565656','Bruce Lee','bl@smu.edu','BSKW','Adjunct'),('66555555','John Von Neumann','jvn@smu.edu','COMP','Adjunct'),('67676767','Ben Stiller','bs@smu.edu','BSKW','Adjunct'),('77777777','Isaac Newton','in@smu.edu','COMP','Adjunct'),('88888888','Johannes Kepler','jk@smu.edu','COMP','Assistant'),('99888888','Werner Heisenberg','wh@smu.edu','COMP','Assistant'),('99999999','Dennis Ritchie','dr@smu.edu','COMP','Assistant');
/*!40000 ALTER TABLE `faculty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `objectiveeval`
--

DROP TABLE IF EXISTS `objectiveeval`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `objectiveeval` (
  `CourseObjID` varchar(64) NOT NULL,
  `SecID` char(3) NOT NULL,
  `Semester` enum('Fall','Spring','Summer') NOT NULL,
  `Year` year NOT NULL,
  `EvalMethod` enum('Exam','Project','Assignment','Interview','Presentation') NOT NULL,
  `StudentsPassed` smallint NOT NULL,
  KEY `CourseObjID` (`CourseObjID`),
  CONSTRAINT `objectiveeval_ibfk_1` FOREIGN KEY (`CourseObjID`) REFERENCES `courseobjectives` (`CourseObjID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `objectiveeval`
--

LOCK TABLES `objectiveeval` WRITE;
/*!40000 ALTER TABLE `objectiveeval` DISABLE KEYS */;
INSERT INTO `objectiveeval` VALUES ('BSKW1000.BABSKW1.1','001','Fall',2023,'Exam',44);
/*!40000 ALTER TABLE `objectiveeval` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `objectives`
--

DROP TABLE IF EXISTS `objectives`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `objectives` (
  `ObjCode` varchar(24) NOT NULL,
  `Description` text NOT NULL,
  `ProgName` varchar(50) NOT NULL,
  `DeptID` varchar(4) NOT NULL,
  PRIMARY KEY (`ObjCode`),
  KEY `DeptID` (`DeptID`),
  KEY `ProgName` (`ProgName`),
  CONSTRAINT `objectives_ibfk_1` FOREIGN KEY (`DeptID`) REFERENCES `department` (`DeptID`),
  CONSTRAINT `objectives_ibfk_2` FOREIGN KEY (`ProgName`) REFERENCES `program` (`ProgName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `objectives`
--

LOCK TABLES `objectives` WRITE;
/*!40000 ALTER TABLE `objectives` DISABLE KEYS */;
INSERT INTO `objectives` VALUES ('BABSKW1','Learn the art of the basket','BA','BSKW');
/*!40000 ALTER TABLE `objectives` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `program`
--

DROP TABLE IF EXISTS `program`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `program` (
  `ProgName` varchar(50) NOT NULL,
  `DeptID` varchar(4) NOT NULL,
  `FacultyLead` varchar(40) NOT NULL,
  `FacultyLeadID` varchar(8) NOT NULL,
  `FacultyLeadEmail` varchar(40) NOT NULL,
  PRIMARY KEY (`ProgName`,`DeptID`),
  KEY `DeptID` (`DeptID`),
  KEY `FacultyLeadID` (`FacultyLeadID`),
  KEY `FacultyLeadEmail` (`FacultyLeadEmail`),
  CONSTRAINT `program_ibfk_1` FOREIGN KEY (`DeptID`) REFERENCES `department` (`DeptID`),
  CONSTRAINT `program_ibfk_2` FOREIGN KEY (`FacultyLeadID`) REFERENCES `faculty` (`FacultyID`),
  CONSTRAINT `program_ibfk_3` FOREIGN KEY (`FacultyLeadEmail`) REFERENCES `faculty` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `program`
--

LOCK TABLES `program` WRITE;
/*!40000 ALTER TABLE `program` DISABLE KEYS */;
INSERT INTO `program` VALUES ('BA','BSKW','Brad Pitt','12121212','bp@smu.edu'),('BS','COMP','Dennis Ritchie','99999999','dr@smu.edu');
/*!40000 ALTER TABLE `program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `section`
--

DROP TABLE IF EXISTS `section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `section` (
  `SecID` char(3) NOT NULL,
  `CourseID` varchar(8) NOT NULL,
  `Semester` enum('Fall','Spring','Summer') NOT NULL,
  `Year` year NOT NULL,
  `FacultyLeadID` char(8) NOT NULL,
  `EnrollCount` smallint NOT NULL,
  PRIMARY KEY (`CourseID`,`SecID`,`Semester`,`Year`),
  KEY `FacultyLeadID` (`FacultyLeadID`),
  CONSTRAINT `section_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`),
  CONSTRAINT `section_ibfk_2` FOREIGN KEY (`FacultyLeadID`) REFERENCES `faculty` (`FacultyID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `section`
--

LOCK TABLES `section` WRITE;
/*!40000 ALTER TABLE `section` DISABLE KEYS */;
INSERT INTO `section` VALUES ('001','BSKW1000','Fall',2023,'12121212',45),('001','BSKW1000','Spring',2023,'12121212',30),('001','BSKW1000','Summer',2023,'12121212',35),('001','BSKW1010','Fall',2023,'23232323',50),('001','BSKW1010','Spring',2023,'23232323',35),('001','BSKW1010','Summer',2023,'23232323',25),('001','BSKW2020','Spring',2023,'34343434',45),('001','BSKW3000','Fall',2023,'45454545',40),('001','COMP1000','Fall',2023,'33333333',30),('001','COMP1000','Spring',2023,'22222222',40),('002','COMP1000','Fall',2023,'33333333',30),('002','COMP1000','Spring',2023,'33333333',30),('001','COMP1100','Fall',2023,'33333333',20),('001','COMP1100','Spring',2023,'22222222',50),('002','COMP1100','Fall',2023,'11111111',40),('002','COMP1100','Spring',2023,'11111111',35),('001','COMP1200','Fall',2023,'55555555',45),('001','COMP1200','Spring',2023,'55555555',35),('002','COMP1200','Fall',2023,'22222222',55),('002','COMP1200','Spring',2023,'77777777',45),('001','COMP2000','Fall',2023,'99999999',45),('001','COMP2000','Spring',2023,'99999999',40),('001','COMP3000','Fall',2023,'99999999',25),('001','COMP3000','Spring',2023,'99999999',30);
/*!40000 ALTER TABLE `section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subobjectives`
--

DROP TABLE IF EXISTS `subobjectives`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subobjectives` (
  `SubObjCode` varchar(12) NOT NULL,
  `Description` text NOT NULL,
  `ObjCode` varchar(24) NOT NULL,
  PRIMARY KEY (`SubObjCode`),
  KEY `ObjCode` (`ObjCode`),
  CONSTRAINT `subobjectives_ibfk_1` FOREIGN KEY (`ObjCode`) REFERENCES `objectives` (`ObjCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subobjectives`
--

LOCK TABLES `subobjectives` WRITE;
/*!40000 ALTER TABLE `subobjectives` DISABLE KEYS */;
INSERT INTO `subobjectives` VALUES ('BABSKW1.1','Become one with the weave','BABSKW1');
/*!40000 ALTER TABLE `subobjectives` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-05 21:38:14
