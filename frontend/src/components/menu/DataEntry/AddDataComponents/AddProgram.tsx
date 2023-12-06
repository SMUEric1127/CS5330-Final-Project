import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { clearData } from "./dataHelper/helper";

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
        <Input
          name="dept_id"
          type="text"
          placeholder="Department ID"
          onChange={handleChange}
          value={programData.dept_id || ""}
        />
      </div>
      <div className="flex flex-row space-x-5">
        <Input
          name="lead"
          type="text"
          placeholder="Lead Faculty"
          onChange={handleChange}
          value={programData.lead || ""}
        />
        <Input
          name="leadID"
          type="text"
          placeholder="Lead Faculty ID"
          onChange={handleChange}
          value={programData.leadID || ""}
        />
      </div>
      <div className="flex flex-row space-x-5">
        <Input
          name="leadEmail"
          type="text"
          placeholder="Lead Faculty Email"
          onChange={handleChange}
          value={programData.leadEmail || ""}
        />
      </div>
    </div>
  );
};
