import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DepartmentCombobox } from "./ComboxBox/Department";

export const ByDepartment = () => {
  // const [departmentData, setDepartmentData]
  const [departmentID, setDepartmentID] = useState<undefined | string>(
    undefined
  );
  const [programs, setPrograms] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [activeQuery, setActiveQuery] = useState("Program");

  const handleSearch = async () => {
    if (departmentID != undefined) {
      try {
        const url =
          activeQuery == "Program"
            ? "/api/list_programs_by_department/"
            : "/api/list_faculty_by_department/";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            department_id: departmentID,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (activeQuery == "Program") {
          setPrograms(data.programs);
        } else if (activeQuery == "Faculty") {
          setFaculty(data.faculty);
        }

        if (data.programs.length == 0) {
          toast({ title: "Fetch Result", description: "Fetched empty array" });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  // We will update a list of departments based on what user inputs
  const [departmentFetchList, setDepartmentFetchList] = useState<string[]>([]);

  const handleDepartmentFetch = async () => {
    try {
      // Add the query param departmentID to the URL
      const url = `/api/department`;
      const response = await fetch(url);

      if (!response.ok) {
        return;
      }

      // Assuming the server returns a JSON response
      const responseData = await response.json();

      // Concat the responseData.data (DeptID - DeptName) to the departmentFetchList
      const concatResult = responseData.data.map((row: any) => row.join(" - "));
      setDepartmentFetchList(concatResult);
    } catch (error) {
      console.error(`Error`, error);
    }
  };

  useEffect(() => {
    handleDepartmentFetch();
  }, []);

  return (
    <div className="flex items-center flex-col space-y-5 max-h-[60vh] overflow-y-auto">
      <div className="w-[80%] max-w-[80%] flex flex-row space-x-5 p-1">
        <DepartmentCombobox
          departmentFetchList={departmentFetchList}
          departmentID={departmentID}
          setDepartmentID={setDepartmentID}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      <div className="flex space-x-4">
        <Button
          onClick={() => setActiveQuery("Program")}
          className={`px-4 py-2 hover:text-white ${
            activeQuery === "Program"
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700"
          } rounded`}
        >
          Program
        </Button>
        <Button
          onClick={() => setActiveQuery("Faculty")}
          className={`px-4 py-2 hover:text-white  ${
            activeQuery === "Faculty"
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700"
          } rounded`}
        >
          Faculty
        </Button>
      </div>
      {activeQuery == "Program" && (
        <Table>
          {departmentID && (
            <TableCaption>
              A list of programs from department {departmentID}.
            </TableCaption>
          )}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[20px]">Index</TableHead>
              <TableHead className=" max-w-xl">Department ID</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Faculty Lead</TableHead>
              <TableHead>Faculty Lead ID</TableHead>
              <TableHead>Faculty Lead Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {programs.map((data, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{data[0]}</TableCell>
                <TableCell>{data[1]}</TableCell>
                <TableCell>{data[2]}</TableCell>
                <TableCell>{data[3]}</TableCell>
                <TableCell>{data[4]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {activeQuery == "Faculty" && (
        <Table>
          {departmentID && (
            <TableCaption>
              A list of faculty members in the Computer Science Department.
            </TableCaption>
          )}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[20px]">Index</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Program</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {faculty.map((data, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{data[0]}</TableCell>
                <TableCell>{data[1]}</TableCell>
                <TableCell>{data[2]}</TableCell>
                <TableCell>{data[3]}</TableCell>
                <TableCell>{data[4]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
