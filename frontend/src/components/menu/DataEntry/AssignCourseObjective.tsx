import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PopupComponent } from "@/components/core/PopupComponent";

export const AssignCourseObjective = () => {
  const [assignCourseObjectiveData, setAssignCourseObjectiveData] = useState({
    courseID: "",
    objCode: "",
    subObjCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAssignCourseObjectiveData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };
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
      </div>
      <div className="w-fit mx-auto">
        <PopupComponent
          onConfirm={() => {
            console.log(
              `Assigning objective with: ${assignCourseObjectiveData.courseID}, ${assignCourseObjectiveData.objCode}, ${assignCourseObjectiveData.subObjCode}`
            );
          }}
          title="Are you sure?"
          buttonTitle="Submit"
          description={"Are you sure you want to assign the objective?"}
        />
      </div>
    </div>
  );
};
