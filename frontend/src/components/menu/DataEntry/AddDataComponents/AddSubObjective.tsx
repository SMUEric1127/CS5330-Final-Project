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

  const [objectiveData, setObjectiveData] = React.useState([]);

  const handleSelectChangeObjective = (e: any) => {
    const name = "objCode";
    e = e.split("-")[0].replaceAll(" ", "");
    setSubObjectiveData((prevData: any) => ({
      ...prevData,
      [name]: e,
    }));
  };

  useEffect(() => {
    const fetchObjective = () => {
      // Get the objective, which got the id, name, email
      fetch("/api/objective", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          // The data will be [[ID, Name, Email]] concat into string with - as separator
          setObjectiveData(data.data.map((row: any) => row.join(" - ")));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    fetchObjective();
  }, []);

  return (
    <div className="flex flex-row space-x-5">
      <Input
        name="description"
        type="text"
        placeholder="Description"
        onChange={handleChange}
        value={subObjectiveData.description || ""}
      />
      {/* <Input
        name="objCode"
        type="text"
        placeholder="Objective Code"
        onChange={handleChange}
        value={subObjectiveData.objCode || ""}
      /> */}

      <Select name="obj_code" onValueChange={handleSelectChangeObjective}>
        <SelectTrigger>
          <SelectValue placeholder="Objective Code" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {objectiveData.map((row: any) => (
              <SelectItem key={row} value={row}>
                {row}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default AddSubObjective;
