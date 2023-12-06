import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PopupComponent } from "@/components/core/PopupComponent";
import { Input } from "@/components/ui/input";
import { AddDepartment } from "@/components/menu/DataEntry/AddDataComponents/AddDepartment";
import AddFaculty from "@/components/menu/DataEntry/AddDataComponents/AddFaculty";
import { AddProgram } from "@/components/menu/DataEntry/AddDataComponents/AddProgram";
import AddCourse from "@/components/menu/DataEntry/AddDataComponents/AddCourse";
import AddSection from "@/components/menu/DataEntry/AddDataComponents/AddSection";
import AddObjective from "@/components/menu/DataEntry/AddDataComponents/AddObjective";
import AddSubObjective from "@/components/menu/DataEntry/AddDataComponents/AddSubObjective";

export const AddData = () => {
  const { toast } = useToast();
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

  async function sendQuery(url: string, successMessage: string) {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Assuming the server returns a JSON response
      const responseData = await response.json();

      // Show a success toast
      if (responseData.statusCode == 200)
        toast({
          title: successMessage,
          description: `${responseData.message}`,
        });
      else
        toast({
          variant: "destructive",
          title: `Error!`,
          description: `${responseData.message}`,
        });

      return responseData;
    } catch (error) {
      console.error(`Error`, error);

      // Show an error toast
      toast({
        variant: "destructive",
        title: `Error! ${error}`,
      });

      throw error; // Re-throw the error for further handling if needed
    }
  }

  return (
    <div className="min-h-[30vh] text-lg items-center text-start space-y-5">
      <div className="flex-col space-y-5">
        <PopupComponent
          onConfirm={async () => {
            console.log(
              `Creating department with: ${departmentData.departmentCode} ${departmentData.departmentName}`
            );
            const url = `/api/add_department/?dept_name=${encodeURIComponent(
              departmentData.departmentName
            )}&dept_code=${encodeURIComponent(departmentData.departmentCode)}`;
            const successMessage = "Department created";
            sendQuery(url, successMessage);
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
          onConfirm={async () => {
            console.log(
              `Creating faculty with: ${JSON.stringify(facultyData)}`
            );
            const url = `/api/add_faculty/?faculty_id=${encodeURIComponent(
              facultyData.facultyId
            )}&name=${encodeURIComponent(
              facultyData.facultyName
            )}&email=${encodeURIComponent(
              facultyData.email
            )}&dept_id=${encodeURIComponent(
              facultyData.departmentId
            )}&position=${encodeURIComponent(facultyData.position)}`;
            const successMessage = "Faculty added";
            sendQuery(url, successMessage);
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
            const url = `/api/add_program/?prog_name=${encodeURIComponent(
              programData.prog_name
            )}&dept_id=${encodeURIComponent(
              programData.dept_id
            )}&lead=${encodeURIComponent(
              programData.lead
            )}&lead_id=${encodeURIComponent(
              programData.leadID
            )}&lead_email=${encodeURIComponent(programData.leadEmail)}`;
            const successMessage = "Program added";
            sendQuery(url, successMessage);
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
            // /add_course/?course_id=CS1342&title=C%2B%2B&description=C%2B%2B%20learning&dept_id=COMP
            const url = `/api/add_course/?course_id=${encodeURIComponent(
              courseData.courseID
            )}&title=${encodeURIComponent(
              courseData.title
            )}&description=${encodeURIComponent(
              courseData.description
            )}&dept_id=${encodeURIComponent(courseData.dept_id)}`;
            const successMessage = "Course added";
            sendQuery(url, successMessage);
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
