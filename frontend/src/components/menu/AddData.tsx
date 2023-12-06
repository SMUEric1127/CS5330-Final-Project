import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { PopupComponent } from "../core/PopupComponent";
import { Input } from "../ui/input";
import { AddDepartment } from "./AddDataComponents/AddDepartment";
import AddFaculty from "./AddDataComponents/AddFaculty";
import { AddProgram } from "./AddDataComponents/AddProgram";
import AddCourse from "./AddDataComponents/AddCourse";
import AddSection from "./AddDataComponents/AddSection";
import AddObjective from "./AddDataComponents/AddObjective";
import AddSubObjective from "./AddDataComponents/AddSubObjective";

export const AddData = () => {
  // Add Department
  const [departmentData, setDepartmentData] = useState({
    departmentName: "",
    departmentCode: "",
  });

  const [facultyData, setFacultyData] = useState({
    facultyId: "",
    facultyName: "",
    email: "",
    departmentId: "",
    position: "",
  });

  const [programData, setProgramData] = useState({
    prog_name: "",
    dept_id: "",
    lead: "",
    leadID: "",
    leadEmail: "",
  });

  const [courseData, setCourseData] = useState({
    courseID: "",
    title: "",
    description: "",
    dept_id: "",
  });

  const [sectionData, setSectionData] = useState({
    secID: "",
    courseID: "",
    semester: "",
    year: "",
    facultyLeadID: "",
    enrollCount: "",
  });

  const [objectiveData, setObjectiveData] = useState({
    objCode: "",
    description: "",
    prog: "",
    dept_id: "",
  });

  const [subObjectiveData, setSubObjectiveData] = useState({
    description: "",
    objCode: "",
  });

  return (
    <div className="container min-h-[30vh] text-lg items-center text-start space-y-5">
      <div className="flex-col space-y-5">
        <PopupComponent
          onConfirm={() => {
            console.log(
              `Creating department with: ${departmentData.departmentCode} ${departmentData.departmentName}`
            );
          }}
          buttonTitle="Add Department"
          description={
            <AddDepartment
              departmentData={departmentData}
              setDepartmentData={setDepartmentData}
            />
          }
        />
        <PopupComponent
          onConfirm={() => {
            console.log(
              `Creating faculty with: ${JSON.stringify(facultyData)}`
            );
          }}
          buttonTitle="Add Faculty"
          description={
            <AddFaculty
              facultyData={facultyData}
              setFacultyData={setFacultyData}
            />
          }
        />
        <PopupComponent
          onConfirm={() => {
            console.log(
              `Creating program with: ${programData.prog_name}, ${programData.dept_id}, ${programData.lead}, ${programData.leadID}, ${programData.leadEmail}`
            );
          }}
          buttonTitle="Add Program"
          description={
            <AddProgram
              programData={programData}
              setProgramData={setProgramData}
            />
          }
        />
        <PopupComponent
          onConfirm={() => {
            console.log(
              `Creating course with: ${courseData.courseID}, ${courseData.title}, ${courseData.description}, ${courseData.dept_id}`
            );
          }}
          buttonTitle="Add Course"
          description={
            <AddCourse courseData={courseData} setCourseData={setCourseData} />
          }
        />
        <PopupComponent
          onConfirm={() => {
            console.log(
              `Creating section with: ${sectionData.secID}, ${sectionData.courseID}, ${sectionData.semester}, ${sectionData.year}, ${sectionData.facultyLeadID}, ${sectionData.enrollCount}`
            );
          }}
          buttonTitle="Add Section"
          description={
            <AddSection
              sectionData={sectionData}
              setSectionData={setSectionData}
            />
          }
        />
        <PopupComponent
          onConfirm={() => {
            console.log(
              `Creating objective with: ${objectiveData.objCode}, ${objectiveData.description}, ${objectiveData.prog}, ${objectiveData.dept_id}`
            );
          }}
          buttonTitle="Add Objective"
          description={
            <AddObjective
              objectiveData={objectiveData}
              setObjectiveData={setObjectiveData}
            />
          }
        />
        <PopupComponent
          onConfirm={() => {
            console.log(
              `Creating sub-objective with: ${subObjectiveData.description}, ${subObjectiveData.objCode}`
            );
          }}
          buttonTitle="Add Sub-Objective"
          description={
            <AddSubObjective
              subObjectiveData={subObjectiveData}
              setSubObjectiveData={setSubObjectiveData}
            />
          }
        />
      </div>
    </div>
  );
};
