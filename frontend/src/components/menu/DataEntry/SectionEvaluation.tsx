import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { PopupComponent } from "@/components/core/PopupComponent";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const evaluationMethod = [
    "Exam",
    "Project",
    "Assignment",
    "Interview",
    "Presentation",
  ];
  const semester = ["Fall", "Spring", "Summer"];
  const [courseObjID, setCourseObjID] = useState([]);
  const [section, setSection] = useState([]);

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

  const handleChangeCourseObjID = async (e: any) => {
    const name = "courseObjID";
    e = e.split("-")[0].replaceAll(" ", "");
    setEvaluateObjectiveData((prevData: any) => ({
      ...prevData,
      [name]: e,
    }));

    // Need to fetch the section based on the courseObjID
    // Split the course from courseObjID by the first element before the .
    const course_id = e.split(".")[0];
    await fetch("/api/section", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ course_id: course_id }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setSection(data.data.map((row: any) => row.join(" - ")));
      });
  };

  const handleSelectChangeCourse = (e: any) => {
    e = e.split("-")[0].replaceAll(" ", "");
    setEvaluateObjectiveData((prevData: any) => ({
      ...prevData,
      courseID: e,
    }));
  };

  const handleSelectChangeSection = (e: any) => {
    e = e.split("-")[0].replaceAll(" ", "");
    setEvaluateObjectiveData((prevData: any) => ({
      ...prevData,
      secID: e,
    }));
  };

  useEffect(() => {
    const fetchCourseObjID = () => {
      // Get the objective, which got the id, name, email
      fetch("/api/course_objective", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          // The data will be [[ID, Name, Email]] concat into string with - as separator
          setCourseObjID(data.data.map((row: any) => row.join(" - ")));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    fetchCourseObjID();
  }, []);

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex flex-row space-x-5">
        <Select name="courseObjID" onValueChange={handleChangeCourseObjID}>
          <SelectTrigger>
            <SelectValue placeholder="Select a Course Objective" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Course Objective</SelectLabel>
              {courseObjID.map((row: any) => (
                <SelectItem key={row} value={row}>
                  {row}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          name="secID"
          onValueChange={handleSelectChangeSection}
          disabled={section.length == 0 ? true : false}
        >
          <SelectTrigger>
            <SelectValue placeholder={"Select a Section"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Section</SelectLabel>
              {section.map((row: any) => (
                <SelectItem key={row} value={row}>
                  {row}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          name="semester"
          onValueChange={(value: any) => {
            setEvaluateObjectiveData((prevData: any) => ({
              ...prevData,
              ["semester"]: value,
            }));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a Semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Semester</SelectLabel>
              {semester.map((row: any) => (
                <SelectItem key={row} value={row}>
                  {row}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-row space-x-5">
        <Input
          name="year"
          type="number"
          placeholder="Year"
          onChange={handleChange}
          value={evaluateObjectiveData.year || ""}
        />
        <Select
          name="evalMethod"
          onValueChange={(value: any) => {
            setEvaluateObjectiveData((prevData: any) => ({
              ...prevData,
              ["evalMethod"]: value,
            }));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select an Evaluation Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Evaluation Method</SelectLabel>
              {evaluationMethod.map((row: any) => (
                <SelectItem key={row} value={row}>
                  {row}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          name="studentsPassed"
          type="number"
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
