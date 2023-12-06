import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { PopupComponent } from "../core/PopupComponent";
import { Input } from "../ui/input";
import { AddDepartment } from "./AddDataComponents/AddDepartment";
import AddFaculty from "./AddDataComponents/AddFaculty";
import { AddProgram } from "./AddDataComponents/AddProgram";
import AddCourse from "./AddDataComponents/AddCourse";

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

  return (
    <div className="container min-h-[30vh] text-lg items-center text-start space-y-5">
      <p>Select List of Actions below</p>
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
          onConfirm={() => {}}
          buttonTitle="Add Section"
          title="Are you absolutely sure?"
          description="This action cannot be undone. This will permanently delete your table"
        />
        <PopupComponent
          onConfirm={() => {}}
          buttonTitle="Add Objective"
          title="Are you absolutely sure?"
          description="This action cannot be undone. This will permanently delete your table"
        />
        <PopupComponent
          onConfirm={() => {}}
          buttonTitle="Add Sub-Objective"
          title="Are you absolutely sure?"
          description="This action cannot be undone. This will permanently delete your table"
        />
      </div>
    </div>
  );
};
