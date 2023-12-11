import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { clearData } from "./dataHelper/helper";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddObjectiveProps {
  objectiveData: any;
  setObjectiveData: React.Dispatch<React.SetStateAction<any>>;
}

const AddObjective: React.FC<AddObjectiveProps> = ({
  objectiveData,
  setObjectiveData,
}) => {
  useEffect(() => {
    clearData(objectiveData, setObjectiveData);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setObjectiveData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Add the fetch program and fetch department
  const [programData, setProgramData] = React.useState([]);
  const [departmentData, setDepartmentData] = React.useState([]);

  const handleSelectChangeProgram = (e: any) => {
    const name = "prog_id";
    e = e.split("-")[0].replaceAll(" ", "");
    setObjectiveData((prevData: any) => ({
      ...prevData,
      [name]: e,
    }));
  };

  const handleSelectChangeDepartment = (e: any) => {
    const name = "dept_id";
    e = e.split("-")[0].replaceAll(" ", "");
    setObjectiveData((prevData: any) => ({
      ...prevData,
      [name]: e,
    }));
  };

  useEffect(() => {
    const fetchProgram = () => {
      // Get the program, which got the id, name, email
      fetch("/api/program", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          // The data will be [[ID, Name, Email]] concat into string with - as separator
          setProgramData(data.data.map((row: any) => row.join(" - ")));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    const fetchDepartment = () => {
      // Get the department, which got the id, name, email
      fetch("/api/department", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          // The data will be [[ID, Name, Email]] concat into string with - as separator
          setDepartmentData(data.data.map((row: any) => row.join(" - ")));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    fetchProgram();
    fetchDepartment();
  }, []);

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex flex-row space-x-5">
        <Input
          name="objCode"
          type="text"
          placeholder="Objective Code"
          onChange={handleChange}
          value={objectiveData.objCode || ""}
        />
        <Input
          name="description"
          type="text"
          placeholder="Description"
          onChange={handleChange}
          value={objectiveData.description || ""}
        />
      </div>
      <div className="flex flex-row space-x-5">
        {/* <Input
          name="prog_id"
          type="text"
          placeholder="Program ID"
          onChange={handleChange}
          value={objectiveData.prog || ""}
        /> Replace with Select*/}
        <Select name="prog_id" onValueChange={handleSelectChangeProgram}>
          <SelectTrigger>
            <SelectValue placeholder="Select a program" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Program</SelectLabel>
              {programData.map((row: any) => (
                <SelectItem key={row} value={row}>
                  {row}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* <Input
          name="dept_id"
          type="text"
          placeholder="Department ID"
          onChange={handleChange}
          value={objectiveData.dept_id || ""}
        /> Replace with select */}
        <Select name="dept_id" onValueChange={handleSelectChangeDepartment}>
          <SelectTrigger>
            <SelectValue placeholder="Select a department" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Department</SelectLabel>
              {departmentData.map((row: any) => (
                <SelectItem key={row} value={row}>
                  {row}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AddObjective;
