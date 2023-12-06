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

export const ByAcademicYear = () => {
  const [startYear, setStartYear] = useState<undefined | number>(undefined);
  const [evaluationResults, setEvaluationResults] = useState([]);

  const handleSearch = async () => {
    if (startYear !== undefined) {
      try {
        const url = "/api/list_evaluation_results_by_academic_year/";

        const response = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            start_year: startYear,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setEvaluationResults(data.evaluation_results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <div className="flex items-center flex-col space-y-5 max-h-[60vh] overflow-y-auto">
      <div className="w-[80%] max-w-[80%] flex flex-row space-x-5 p-1">
        <Input
          placeholder="Enter the start year to access evaluation results."
          onChange={(e) => {
            setStartYear(Number(e.target.value));
          }}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      <Table>
        <TableCaption>
          Evaluation results for the academic year starting from {startYear}.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20px]">Index</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Subcode</TableHead>
            <TableHead>Semester</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Result</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {evaluationResults.map((data, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{data[0]}</TableCell>
              <TableCell>{data[1]}</TableCell>
              <TableCell>{data[2]}</TableCell>
              <TableCell>{data[3]}</TableCell>
              <TableCell>{data[4]}</TableCell>
              <TableCell>{data[5]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
