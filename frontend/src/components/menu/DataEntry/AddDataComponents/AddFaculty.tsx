import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
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
const AddFaculty = ({ facultyData, setFacultyData }: any) => {
  useEffect(() => {
    clearData(facultyData, setFacultyData);
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFacultyData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: any) => {
    const name = "position";
    setFacultyData((prevData: any) => ({
      ...prevData,
      [name]: e,
    }));
  };

  const handleSelectChangeDepartment = (e: any) => {
    const name = "departmentId";
    e = e.split("-")[0].replaceAll(" ", "");
    setFacultyData((prevData: any) => ({
      ...prevData,
      [name]: e,
    }));

    console.log("Updating departmetn id");
  };

  // fetch for department
  const [departmentData, setDepartmentData] = useState([]);
  useEffect(() => {
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
    fetchDepartment();
  }, []);

  return (
    <div className="flex-col space-y-5">
      <div className="flex flex-row space-x-5">
        <Input
          type="text"
          name="facultyId"
          placeholder="Faculty ID"
          onChange={handleChange}
          value={facultyData.facultyId}
        />
        <Input
          type="text"
          name="facultyName"
          placeholder="Faculty Name"
          onChange={handleChange}
          value={facultyData.facultyName}
        />
      </div>
      <div className="flex flex-row space-x-5">
        <Input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={facultyData.email}
        />
        <Select
          name="departmentId"
          onValueChange={handleSelectChangeDepartment}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a department" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Department</SelectLabel>
              {departmentData.map((department: any) => (
                <SelectItem value={department}>{department}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-row space-x-5">
        <Select name="position" onValueChange={handleSelectChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a position" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Position</SelectLabel>
              <SelectItem value="Full">Full-time</SelectItem>
              <SelectItem value="Adjunct">Adjunct</SelectItem>
              <SelectItem value="Assistant">Assistant</SelectItem>
              <SelectItem value="Associate">Associate</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AddFaculty;
