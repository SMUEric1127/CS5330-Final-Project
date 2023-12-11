import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
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

export const AddProgram = ({ programData, setProgramData }: any) => {
  useEffect(() => {
    clearData(programData, setProgramData);
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProgramData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: any) => {
    const name = "leadID";
    e = e.split("-")[0].replaceAll(" ", "");
    setProgramData((prevData: any) => ({
      ...prevData,
      [name]: e,
    }));
  };

  const handleSelectChangeDepartment = (e: any) => {
    const name = "dept_id";
    e = e.split("-")[0].replaceAll(" ", "");
    setProgramData((prevData: any) => ({
      ...prevData,
      [name]: e,
    }));
  };

  const [facultyData, setFacultyData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);

  useEffect(() => {
    const fetchFaculty = () => {
      // Get the faculty, which got the id, name, email
      fetch("/api/faculty", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          // The data will be [[ID, Name, Email]] concat into string with - as separator
          setFacultyData(data.data.map((row: any) => row.join(" - ")));
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
    fetchFaculty();
    fetchDepartment();
  }, []);

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex flex-row space-x-5">
        <Input
          name="prog_name"
          type="text"
          placeholder="Program Name"
          onChange={handleChange}
          value={programData.prog_name || ""}
        />
        {/* <Input
          name="dept_id"
          type="text"
          placeholder="Department ID"
          onChange={handleChange}
          value={programData.dept_id || ""}
        /> */}
        <Select name="dept_id" onValueChange={handleSelectChangeDepartment}>
          <SelectTrigger>
            <SelectValue placeholder="Select a department" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Department List</SelectLabel>
              {departmentData.map((department: any) => (
                <SelectItem key={department} value={department}>
                  {department}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-row space-x-5">
        {/* <Input
          name="leadID"
          type="text"
          placeholder="Lead Faculty ID"
          onChange={handleChange}
          value={programData.leadID || ""}
        /> */}
        <Select name="facultyID" onValueChange={handleSelectChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a faculty" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Faculty List</SelectLabel>
              {facultyData.map((faculty: any) => (
                <SelectItem key={faculty} value={faculty}>
                  {faculty}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
