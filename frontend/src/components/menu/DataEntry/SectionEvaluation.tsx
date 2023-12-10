import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { PopupComponent } from "@/components/core/PopupComponent";
import { useToast } from "@/components/ui/use-toast";

export const SectionEvaluation = () => {
  const { toast } = useToast();
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

  async function sendQuery(url: string, dataBody: any, successMessage: string) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Assuming the server returns a JSON response
      const responseData = await response.json();

      // Show a success toast
      if (responseData.statusCode === 200) {
        toast({
          title: successMessage,
          description: `${responseData.message}`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error!",
          description: `${responseData.message}`,
        });
      }

      return responseData;
    } catch (error) {
      console.error("Error", error);

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
          type="number"
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
            const url = `/api/add_objective_evaluation`;
            const successMessage = "Add evaluation successfully! 🎉";
            sendQuery(url, evaluateObjectiveData, successMessage);
          }}
          title="Are you sure?"
          buttonTitle="Submit"
          description={"Are you sure you want to input the evaluation?"}
        />
      </div>
    </div>
  );
};
