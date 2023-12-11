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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProgramCombobox } from "./ComboxBox/Program";

export const ByProgramAndSemester = () => {
  const [programID, setProgramID] = useState<undefined | string>(undefined);
  const [semester, setSemester] = useState<undefined | string>(undefined);
  const [evaluations, setEvaluations] = useState([]);
  const semesterList = ["Fall", "Spring", "Summer"];

  const handleSearch = async () => {
    if (programID !== undefined && semester !== undefined) {
      try {
        const url = "/api/list_evaluations_by_program_and_semester/";

        const response = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            program_id: programID,
            semester: semester,
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
    <div className="flex items-center flex-col space-y-5 max-h-[60vh] min-h-fit">
      <div className="flex flex-row space-x-5 p-1">
        {/* <Input
          placeholder="Enter the program name"
          onChange={(e) => {
            setProgramID(e.target.value);
          }}
        /> */}
        <div className="min-w-[200px] pl-30">
          <ProgramCombobox
            programFetchList={programFetchList}
            programID={programID}
            setProgramID={setProgramID}
          />
        </div>
        <Select
          name="semester"
          onValueChange={(value: any) => {
            setSemester(value);
          }}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Select a Semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Semester</SelectLabel>
              {semesterList.map((row: any) => (
                <SelectItem key={row} value={row}>
                  {row}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button onClick={handleSearch}>Search</Button>
      </div>
      <Table>
        <TableCaption>
          {programID && semester && (
            <p>
              Evaluations for {programID}, {semester}.
            </p>
          )}
          {(!programID || !semester) && (
            <p>Please enter information above to search for evaluations</p>
          )}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20px]">Index</TableHead>
            {/* SELECT pc.ProgID, c.CourseID, s.SecID, c.Title, oe.Semester,
            oe.Year, oe.EvalMethod, oe.StudentsPassed */}
            <TableHead>Program ID</TableHead>
            <TableHead>Course ID</TableHead>
            <TableHead>Section</TableHead>
            <TableHead>Course Title</TableHead>
            <TableHead>Semester</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Evaluation Method</TableHead>
            <TableHead>Students Passed</TableHead>
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
