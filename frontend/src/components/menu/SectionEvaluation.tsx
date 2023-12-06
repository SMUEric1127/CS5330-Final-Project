import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { PopupComponent } from "../core/PopupComponent";

export const SectionEvaluation = () => {
  const [evaluateObjectiveData, setEvaluateObjectiveData] = useState({
    courseObjID: "",
    secID: "",
    semester: "",
    year: "",
    evalMethod: "",
    studentsPassed: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEvaluateObjectiveData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex flex-row space-x-5">
        <Input
          name="courseObjID"
          type="text"
          placeholder="Course Objective ID"
          onChange={handleChange}
          value={evaluateObjectiveData.courseObjID || ""}
        />
        <Input
          name="secID"
          type="text"
          placeholder="Section ID"
          onChange={handleChange}
          value={evaluateObjectiveData.secID || ""}
        />
        <Input
          name="semester"
          type="text"
          placeholder="Semester"
          onChange={handleChange}
          value={evaluateObjectiveData.semester || ""}
        />
      </div>
      <div className="flex flex-row space-x-5">
        <Input
          name="year"
          type="text"
          placeholder="Year"
          onChange={handleChange}
          value={evaluateObjectiveData.year || ""}
        />
        <Input
          name="evalMethod"
          type="text"
          placeholder="Evaluation Method"
          onChange={handleChange}
          value={evaluateObjectiveData.evalMethod || ""}
        />
        <Input
          name="studentsPassed"
          type="text"
          placeholder="Students Passed"
          onChange={handleChange}
          value={evaluateObjectiveData.studentsPassed || ""}
        />
      </div>
      <div className="w-fit mx-auto">
        <PopupComponent
          onConfirm={() => {
            console.log(
              `Evaluating objective with: ${evaluateObjectiveData.courseObjID}, ${evaluateObjectiveData.secID}, ${evaluateObjectiveData.semester}, ${evaluateObjectiveData.year}, ${evaluateObjectiveData.evalMethod}, ${evaluateObjectiveData.studentsPassed}`
            );
          }}
          title="Are you sure?"
          buttonTitle="Submit"
          description={"Are you sure you want to input the evaluation?"}
        />
      </div>
    </div>
  );
};
