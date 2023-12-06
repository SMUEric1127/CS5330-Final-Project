import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { clearData } from "./dataHelper/helper";

interface AddSubObjectiveProps {
  subObjectiveData: any;
  setSubObjectiveData: React.Dispatch<React.SetStateAction<any>>;
}

const AddSubObjective: React.FC<AddSubObjectiveProps> = ({
  subObjectiveData,
  setSubObjectiveData,
}) => {
  useEffect(() => {
    clearData(subObjectiveData, setSubObjectiveData);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSubObjectiveData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-row space-x-5">
      <Input
        name="description"
        type="text"
        placeholder="Description"
        onChange={handleChange}
        value={subObjectiveData.description || ""}
      />
      <Input
        name="objCode"
        type="text"
        placeholder="Objective Code"
        onChange={handleChange}
        value={subObjectiveData.objCode || ""}
      />
    </div>
  );
};

export default AddSubObjective;
