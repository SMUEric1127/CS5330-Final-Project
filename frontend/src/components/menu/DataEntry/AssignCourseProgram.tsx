import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PopupComponent } from "@/components/core/PopupComponent";
import { useToast } from "@/components/ui/use-toast";

export const AssignCourseProgram = () => {
  const { toast } = useToast();
  const [assignCourseProgramData, setAssignCourseProgramData] = useState({
    courseID: "",
    progID: "",
  });

  // Lets convert those two inputs into select
  const [courseID, setCourseID] = useState([]);
  const [progID, setProgID] = useState([]);

  useEffect(() => {
    const fetchProg = () => {
      // Get the program, which got the id, name, email
      fetch("/api/program", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          // The data will be [[ID, Name, Email]] concat into string with - as separator
          setProgID(data.data.map((row: any) => row.join(" - ")));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    const fetchCourse = () => {
      // Get the course, which got the id, name, email
      fetch("/api/course", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          // The data will be [[ID, Name, Email]] concat into string with - as separator
          setCourseID(data.data.map((row: any) => row.join(" - ")));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    fetchProg();
    fetchCourse();
  }, []);

  const handleSelectChangeCourse = (e: any) => {
    e = e.split("-")[0].replaceAll(" ", "");
    setAssignCourseProgramData((prevData: any) => ({
      ...prevData,
      courseID: e,
    }));
  };

  const handleSelectChangeProgram = (e: any) => {
    e = e.split("-")[0].replaceAll(" ", "");
    setAssignCourseProgramData((prevData: any) => ({
      ...prevData,
      progID: e,
    }));
  };
  async function sendQuery(url: string, successMessage: string) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify(assignCourseProgramData),
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
    <div className="flex flex-col space-y-5">
      <div className="flex flex-row space-x-5">
        <Select name="courseID" onValueChange={handleSelectChangeCourse}>
          <SelectTrigger>
            <SelectValue placeholder="Select a course" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Course</SelectLabel>
              {courseID.map((row: any) => (
                <SelectItem key={row} value={row}>
                  {row}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select name="progID" onValueChange={handleSelectChangeProgram}>
          <SelectTrigger>
            <SelectValue placeholder="Select a program" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Program</SelectLabel>
              {progID.map((row: any) => (
                <SelectItem key={row} value={row}>
                  {row}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-fit mx-auto">
        <PopupComponent
          onConfirm={() => {
            const url = `/api/assign_program_course/?courseID=${encodeURIComponent(
              assignCourseProgramData.courseID
            )}&progID=${encodeURIComponent(assignCourseProgramData.progID)}`;
            const successMessage = "Assign Course - Program successfully! 🎉";
            sendQuery(url, successMessage);
          }}
          title="Are you sure?"
          buttonTitle="Submit"
          description={"Are you sure you want to assign the objective?"}
        />
      </div>
    </div>
  );
};
