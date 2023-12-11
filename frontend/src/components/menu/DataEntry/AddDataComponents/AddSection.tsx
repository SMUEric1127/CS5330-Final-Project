import React, { useEffect, useState } from "react";
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

interface AddSectionProps {
  sectionData: any;
  setSectionData: React.Dispatch<React.SetStateAction<any>>;
}

const AddSection: React.FC<AddSectionProps> = ({
  sectionData,
  setSectionData,
}) => {
  useEffect(() => {
    clearData(sectionData, setSectionData);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSectionData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: any) => {
    const name = "semester";
    setSectionData((prevData: any) => ({
      ...prevData,
      [name]: e,
    }));
  };

  const handleSelectChangeCourse = (e: any) => {
    const name = "courseID";
    e = e.split("-")[0].replaceAll(" ", "");
    setSectionData((prevData: any) => ({
      ...prevData,
      [name]: e,
    }));
  };

  const handleSelectChangeFaculty = (e: any) => {
    const name = "facultyLeadID";
    e = e.split("-")[0].replaceAll(" ", "");
    setSectionData((prevData: any) => ({
      ...prevData,
      [name]: e,
    }));
  };

  const [courseData, setCourseData] = useState([]);
  const [facultyData, setFacultyData] = useState([]);

  useEffect(() => {
    const fetchCourse = () => {
      // Get the department, which got the id, name, email
      fetch("/api/course", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          // The data will be [[ID, Name, Email]] concat into string with - as separator
          setCourseData(data.data.map((row: any) => row.join(" - ")));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    const fetchFaculty = () => {
      // Get the department, which got the id, name, email
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
    fetchCourse();
    fetchFaculty();
  }, []);

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex flex-row space-x-5">
        <Input
          name="secID"
          type="text"
          placeholder="Section ID"
          onChange={handleChange}
          value={sectionData.secID || ""}
        />
        <Select name="courseID" onValueChange={handleSelectChangeCourse}>
          <SelectTrigger>
            <SelectValue placeholder="Select a course" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Course</SelectLabel>
              {courseData.map((row: any) => (
                <SelectItem key={row} value={row}>
                  {row}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-row space-x-5">
        <Select name="position" onValueChange={handleSelectChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Semester</SelectLabel>
              <SelectItem value="Fall">Fall Semester</SelectItem>
              <SelectItem value="Spring">Spring Semester</SelectItem>
              <SelectItem value="Summer">Summer Semester</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          name="year"
          type="number"
          placeholder="Year"
          onChange={handleChange}
          value={sectionData.year || ""}
        />
      </div>
      <div className="flex flex-row space-x-5">
        {/* <Input
          name="facultyLeadID"
          type="text"
          placeholder="Faculty Lead ID"
          onChange={handleChange}
          value={sectionData.facultyLeadID || ""}
        /> */}
        <Select name="facultyLeadID" onValueChange={handleSelectChangeFaculty}>
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
        <Input
          name="enrollCount"
          type="number"
          placeholder="Enrollment Count"
          onChange={handleChange}
          value={sectionData.enrollCount || ""}
        />
      </div>
    </div>
  );
};

export default AddSection;
