import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { clearData } from "./dataHelper/helper";

export const AddDepartment = ({ departmentData, setDepartmentData }: any) => {
  useEffect(() => {
    clearData(departmentData, setDepartmentData);
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setDepartmentData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-row space-x-5">
      <Input
        name="departmentName"
        type="text"
        placeholder="Department name"
        onChange={handleChange}
        value={departmentData.departmentName || ""}
      />
      <Input
        name="departmentCode"
        type="text"
        placeholder="Department code"
        onChange={handleChange}
        value={departmentData.departmentCode || ""}
      />
    </div>
  );
};
