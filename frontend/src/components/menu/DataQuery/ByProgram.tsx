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
import { ProgramCombobox } from "./ComboxBox/Program";

export const ByProgram = () => {
  const [programName, setProgramName] = useState<undefined | string>(undefined);
  const [courses, setCourses] = useState([]);
  const [objectives, setObjectives] = useState([]);
  const [activeQuery, setActiveQuery] = useState("Courses");

  const handleSearch = async () => {
    if (programName !== undefined) {
      try {
        const url =
          activeQuery === "Courses"
            ? "/api/list_courses_by_program/"
            : "/api/list_objectives_by_program/";

        const response = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            program_name: programName,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (activeQuery === "Courses") {
          setCourses(data.courses);
        } else if (activeQuery === "Objectives") {
          setObjectives(data.objectives);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  // We will update a list of departments based on what user inputs
  const [programFetchList, setProgramFetchList] = useState<string[]>([]);

  const handleProgramFetch = async () => {
    try {
      // Add the query param ProgramID to the URL
      const url = `/api/program`;
      const response = await fetch(url);

      if (!response.ok) {
        return;
      }

      // Assuming the server returns a JSON response
      const responseData = await response.json();

      // Concat the responseData.data (DeptID - DeptName) to the ProgramFetchList
      const concatResult = responseData.data.map((row: any) => row.join(" - "));
      setProgramFetchList(concatResult);
    } catch (error) {
      console.error(`Error`, error);
    }
  };

  useEffect(() => {
    handleProgramFetch();
  }, []);

  return (
    <div className="flex items-center flex-col space-y-5 max-h-[60vh] overflow-y-auto">
      <div className="w-[80%] max-w-[80%] flex flex-row space-x-5 p-1">
        {/* <Input
          placeholder={`Enter the program name to access ${
            activeQuery === "Courses" ? "courses" : "objectives"
          } data.`}
          onChange={(e) => {
            setProgramName(e.target.value);
          }}
        /> */}
        <ProgramCombobox
          programFetchList={programFetchList}
          programName={programName}
          setProgramName={setProgramName}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      <div className="flex space-x-4">
        <Button
          onClick={() => setActiveQuery("Courses")}
          className={`px-4 py-2 hover:text-white ${
            activeQuery === "Courses"
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700"
          } rounded`}
        >
          Courses
        </Button>
        <Button
          onClick={() => setActiveQuery("Objectives")}
          className={`px-4 py-2 hover:text-white  ${
            activeQuery === "Objectives"
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700"
          } rounded`}
        >
          Objectives
        </Button>
      </div>
      {activeQuery === "Courses" && (
        <Table>
          {programName && (
            <TableCaption>
              A list of courses for the program {programName}.
            </TableCaption>
          )}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[20px]">Index</TableHead>
              <TableHead>Course ID</TableHead>
              <TableHead>Course Name</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Objective Description</TableHead>
              <TableHead>SubObjective Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((data, index) => (
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
      {activeQuery === "Objectives" && (
        <Table>
          {programName && (
            <TableCaption>
              A list of objectives for the program {programName}.
            </TableCaption>
          )}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[20px]">Index</TableHead>
              <TableHead>Objective Code</TableHead>
              <TableHead>Objective Description</TableHead>
              <TableHead>Department ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {objectives.map((data, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{data[0]}</TableCell>
                <TableCell>{data[1]}</TableCell>
                <TableCell>{data[2]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
