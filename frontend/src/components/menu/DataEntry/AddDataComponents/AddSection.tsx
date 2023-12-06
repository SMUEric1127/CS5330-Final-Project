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
        <Input
          name="courseID"
          type="text"
          placeholder="Course ID"
          onChange={handleChange}
          value={sectionData.courseID || ""}
        />
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
        <Input
          name="facultyLeadID"
          type="text"
          placeholder="Faculty Lead ID"
          onChange={handleChange}
          value={sectionData.facultyLeadID || ""}
        />
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
