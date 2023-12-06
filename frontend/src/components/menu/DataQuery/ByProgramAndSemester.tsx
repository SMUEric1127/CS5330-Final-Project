import React, { useState } from "react";
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

export const ByProgramAndSemester = () => {
  const [programName, setProgramName] = useState<undefined | string>(undefined);
  const [semester, setSemester] = useState<undefined | string>(undefined);
  const [year, setYear] = useState<undefined | number>(undefined);
  const [evaluations, setEvaluations] = useState([]);

  const handleSearch = async () => {
    if (
      programName !== undefined &&
      semester !== undefined &&
      year !== undefined
    ) {
      try {
        const url = "/api/list_evaluations_by_program_and_semester/";

        const response = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            program_name: programName,
            semester: semester,
            year: year,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setEvaluations(data.evaluations);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <div className="flex items-center flex-col space-y-5 max-h-[60vh] overflow-y-auto">
      <div className="w-fit flex flex-row space-x-5 p-1">
        <Input
          placeholder="Enter the program name"
          onChange={(e) => {
            setProgramName(e.target.value);
          }}
        />
        <Input
          placeholder="Enter the semester"
          onChange={(e) => {
            setSemester(e.target.value);
          }}
        />
        <Input
          placeholder="Enter the year"
          onChange={(e) => {
            setYear(Number(e.target.value));
          }}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      <Table>
        {/* <TableCaption>
          Evaluations for {programName}, {semester} {year}.
        </TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20px]">Index</TableHead>
            <TableHead>Program</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Course Code</TableHead>
            <TableHead>Course Name</TableHead>
            <TableHead>Section</TableHead>
            <TableHead>Student ID</TableHead>
            <TableHead>Semester</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Result</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {evaluations.map((data, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{data[0]}</TableCell>
              <TableCell>{data[1]}</TableCell>
              <TableCell>{data[2]}</TableCell>
              <TableCell>{data[3]}</TableCell>
              <TableCell>{data[4]}</TableCell>
              <TableCell>{data[5]}</TableCell>
              <TableCell>{data[6]}</TableCell>
              <TableCell>{data[7]}</TableCell>
              <TableCell>{data[8]}</TableCell>
              <TableCell>{data[9]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
