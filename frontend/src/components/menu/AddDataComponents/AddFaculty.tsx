import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import { clearData } from "./dataHelper/helper";
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
        <Input
          type="text"
          name="position"
          placeholder="Position"
          onChange={handleChange}
          value={facultyData.position}
        />
      </div>
    </div>
  );
};

export default AddFaculty;
