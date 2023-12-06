import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
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
        <Input
          type="text"
          name="departmentId"
          placeholder="Department ID"
          onChange={handleChange}
          value={facultyData.departmentId}
        />
      </div>
      <div className="flex flex-row space-x-5">
        {/* <Input
          type="text"
          name="position"
          placeholder="Position"
          onChange={handleChange}
          value={facultyData.position}
        /> */}
        <Select name="position" onValueChange={handleSelectChange}>
          <SelectTrigger className="w-[180px]">
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
