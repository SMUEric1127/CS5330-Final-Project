import React, { use, useEffect, useState } from "react";
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

interface AddCourseProps {
  courseData: any;
  setCourseData: React.Dispatch<React.SetStateAction<any>>;
}

const AddCourse: React.FC<AddCourseProps> = ({ courseData, setCourseData }) => {
  useEffect(() => {
    clearData(courseData, setCourseData);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCourseData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChangeDepartment = (e: any) => {
    const name = "dept_id";
    e = e.split("-")[0].replaceAll(" ", "");
    setCourseData((prevData: any) => ({
      ...prevData,
      [name]: e,
    }));
  };

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
    <div className="flex flex-col space-y-5">
      <div className="flex flex-row space-x-5">
        <Input
          name="courseID"
          type="text"
          placeholder="Course ID"
          onChange={handleChange}
          value={courseData.courseID || ""}
        />
        <Input
          name="title"
          type="text"
          placeholder="Title"
          onChange={handleChange}
          value={courseData.title || ""}
        />
      </div>
      <div className="flex flex-row space-x-5">
        <Input
          name="description"
          type="text"
          placeholder="Description"
          onChange={handleChange}
          value={courseData.description || ""}
        />
        {/* <Input
          name="dept_id"
          type="text"
          placeholder="Department ID"
          onChange={handleChange}
          value={courseData.dept_id || ""}
        /> */}
        <Select name="dept_id" onValueChange={handleSelectChangeDepartment}>
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
    </div>
  );
};

export default AddCourse;
