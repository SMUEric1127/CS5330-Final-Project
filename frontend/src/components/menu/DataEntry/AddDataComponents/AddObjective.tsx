import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { clearData } from "./dataHelper/helper";

interface AddObjectiveProps {
  objectiveData: any;
  setObjectiveData: React.Dispatch<React.SetStateAction<any>>;
}

const AddObjective: React.FC<AddObjectiveProps> = ({
  objectiveData,
  setObjectiveData,
}) => {
  useEffect(() => {
    clearData(objectiveData, setObjectiveData);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setObjectiveData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex flex-row space-x-5">
        <Input
          name="objCode"
          type="text"
          placeholder="Objective Code"
          onChange={handleChange}
          value={objectiveData.objCode || ""}
        />
        <Input
          name="description"
          type="text"
          placeholder="Description"
          onChange={handleChange}
          value={objectiveData.description || ""}
        />
      </div>
      <div className="flex flex-row space-x-5">
        <Input
          name="prog"
          type="text"
          placeholder="Program"
          onChange={handleChange}
          value={objectiveData.prog || ""}
        />
        <Input
          name="dept_id"
          type="text"
          placeholder="Department ID"
          onChange={handleChange}
          value={objectiveData.dept_id || ""}
        />
      </div>
    </div>
  );
};

export default AddObjective;
