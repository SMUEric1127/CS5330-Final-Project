import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { clearData } from "./dataHelper/helper";

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
        <Input
          name="dept_id"
          type="text"
          placeholder="Department ID"
          onChange={handleChange}
          value={courseData.dept_id || ""}
        />
      </div>
    </div>
  );
};

export default AddCourse;
