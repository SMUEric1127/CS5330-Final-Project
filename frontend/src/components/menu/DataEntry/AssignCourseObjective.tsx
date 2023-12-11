import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
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

export const AssignCourseObjective = () => {
  const { toast } = useToast();
  const [assignCourseObjectiveData, setAssignCourseObjectiveData] = useState({
    courseID: "",
    objCode: "",
    subObjCode: "",
    populate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAssignCourseObjectiveData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

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

  const [courseData, setCourseData] = React.useState([]);
  const [courseObjectiveData, setCourseObjectiveData] = React.useState([]);
  const [courseSubObjectiveData, setCourseSubObjectiveData] = React.useState(
    []
  );

  useEffect(() => {
    const fetchCourse = () => {
      // Get the course, which got the id, name, email
      fetch("/api/course", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          // The data will be [[ID, Name, Email]] concat into string with - as separator
          setCourseData(data.data.map((row: any) => row.join(" - ")));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    const fetchCourseObjective = () => {
      // Get the course, which got the id, name, email
      fetch("/api/objective", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          // The data will be [[ID, Name, Email]] concat into string with - as separator
          setCourseObjectiveData(data.data.map((row: any) => row.join(" - ")));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    fetchCourseObjective();
    fetchCourse();
  }, []);

  const fetchCourseSubObjective = (obj_code: string) => {
    // get the sub_objective by obj_code with the query param is obj_code
    fetch(`/api/sub_objective?obj_code=${obj_code}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setCourseSubObjectiveData(data.data.map((row: any) => row.join(" - ")));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleChangeCourse = (e: any) => {
    e = e.split("-")[0].replaceAll(" ", "");
    setAssignCourseObjectiveData((prevData: any) => ({
      ...prevData,
      courseID: e,
    }));
  };

  const handleChangeObjective = (e: any) => {
    e = e.split("-")[0].replaceAll(" ", "");
    setAssignCourseObjectiveData((prevData: any) => ({
      ...prevData,
      objCode: e,
    }));

    fetchCourseSubObjective(e);
  };

  const handleChangeSubObjective = (e: any) => {
    e = e.split("-")[0].replaceAll(" ", "");
    setAssignCourseObjectiveData((prevData: any) => ({
      ...prevData,
      subObjCode: e,
    }));
  };

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex flex-row space-x-5">
        {/* <Input
          name="courseID"
          type="text"
          placeholder="Course ID"
          onChange={handleChange}
          value={assignCourseObjectiveData.courseID || ""}
        /> Conver to Select */}

        <Select name="courseID" onValueChange={handleChangeCourse}>
          <SelectTrigger>
            <SelectValue placeholder="Select a Course" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Course ID</SelectLabel>
              {courseData.map((row: any) => (
                <SelectItem key={row} value={row}>
                  {row}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* <Input
          name="objCode"
          type="text"
          placeholder="Objective Code"
          onChange={handleChange}
          value={assignCourseObjectiveData.objCode || ""}
        /> */}
        <Select name="objCode" onValueChange={handleChangeObjective}>
          <SelectTrigger>
            <SelectValue placeholder="Select an Objective" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Objective Code</SelectLabel>
              {courseObjectiveData.map((row: any) => (
                <SelectItem key={row} value={row}>
                  {row}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* <Input
          name="subObjCode"
          type="text"
          placeholder="Sub-Objective Code"
          onChange={handleChange}
          value={assignCourseObjectiveData.subObjCode || ""}
        /> */}

        <Select
          name="subObjCode"
          onValueChange={handleChangeSubObjective}
          disabled={courseSubObjectiveData.length == 0 ? true : false}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a Sub-Objective" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sub-Objective Code</SelectLabel>
              {courseSubObjectiveData.map((row: any) => (
                <SelectItem key={row} value={row}>
                  {row}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* <Input
          name="populate"
          type="text"
          placeholder="Populate (Yes/No)"
          onChange={handleChange}
          value={assignCourseObjectiveData.populate || ""}
        /> */}
        <Select
          name="populate"
          onValueChange={(value) => {
            setAssignCourseObjectiveData((prevData: any) => ({
              ...prevData,
              populate: value,
            }));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select an populate option" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Populate</SelectLabel>
              <SelectItem key="Yes" value="Yes">
                Yes
              </SelectItem>
              <SelectItem key="No" value="No">
                No
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-fit mx-auto">
        <PopupComponent
          onConfirm={() => {
            console.log(
              `Assigning objective with: ${assignCourseObjectiveData.courseID}, ${assignCourseObjectiveData.objCode}, ${assignCourseObjectiveData.subObjCode}, ${assignCourseObjectiveData.populate}`
            );
            const url = `/api/add_course_objective/?course_id=${encodeURIComponent(
              assignCourseObjectiveData.courseID
            )}&obj_code=${encodeURIComponent(
              assignCourseObjectiveData.objCode
            )}&sub_obj_code=${encodeURIComponent(
              assignCourseObjectiveData.subObjCode
            )}&auto_populate=${encodeURIComponent(
              assignCourseObjectiveData.populate
            )}`;

            const successMessage = "Assign objective successfully! 🎉";
            sendQuery(url, successMessage);
          }}
          title="Are you sure?"
          buttonTitle="Submit"
          description={"Are you sure you want to assign the objective?"}
        />
      </div>
      <br />
      Note: If not given a sub-objective code and auto populate is "Yes" it will
      automatically assigns all sub-objectives.
    </div>
  );
};
