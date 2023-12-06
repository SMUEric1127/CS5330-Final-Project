import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex flex-row space-x-5">
        <Input
          name="courseID"
          type="text"
          placeholder="Course ID"
          onChange={handleChange}
          value={assignCourseObjectiveData.courseID || ""}
        />
        <Input
          name="objCode"
          type="text"
          placeholder="Objective Code"
          onChange={handleChange}
          value={assignCourseObjectiveData.objCode || ""}
        />
        <Input
          name="subObjCode"
          type="text"
          placeholder="Sub-Objective Code"
          onChange={handleChange}
          value={assignCourseObjectiveData.subObjCode || ""}
        />
        <Input
          name="populate"
          type="text"
          placeholder="Populate (Yes/No)"
          onChange={handleChange}
          value={assignCourseObjectiveData.populate || ""}
        />
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
            )}&populate=${encodeURIComponent(
              assignCourseObjectiveData.populate
            )}`;

            const successMessage = "Assign objective successfully";
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
