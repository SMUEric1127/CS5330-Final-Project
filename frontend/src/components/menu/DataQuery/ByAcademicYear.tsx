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
  const [aggregatedResults, setAggregatedResults] = useState([]);

  // Evaluation Detail & Aggregated Percentage
  const [activeQuery, setActiveQuery] = useState("Evaluation");

  const handleSearch = async () => {
    if (startYear !== undefined) {
      try {
        const url =
          activeQuery == "Evaluation"
            ? "/api/list_evaluation_results_by_academic_year/"
            : "/api/list_aggregate_results_by_academic_year/";

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

        if (activeQuery == "Evaluation") {
          setEvaluationResults(data.evaluation_results);
        } else if (activeQuery == "Aggregated") {
          setAggregatedResults(data.aggregated_results);
        }
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
      <div className="flex space-x-4">
        <Button
          onClick={() => setActiveQuery("Evaluation")}
          className={`px-4 py-2 hover:text-white ${
            activeQuery === "Evaluation"
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700"
          } rounded`}
        >
          Evaluation Detail
        </Button>
        <Button
          onClick={() => setActiveQuery("Aggregated")}
          className={`px-4 py-2 hover:text-white  ${
            activeQuery === "Aggregated"
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700"
          } rounded`}
        >
          Aggregated Student Percentage
        </Button>
      </div>
      {activeQuery == "Evaluation" && (
        <Table>
          <TableCaption>
            Evaluation results for the academic year starting from {startYear}.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[20px]">Index</TableHead>
              <TableHead>Objective Code</TableHead>
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
      )}
      {activeQuery == "Aggregated" && (
        <Table>
          <TableCaption>
            Aggregated student percentage for the academic year starting from{" "}
            {startYear}.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[20px]">Index</TableHead>
              <TableHead>Objective Code</TableHead>
              <TableHead>SubObjective Code</TableHead>
              <TableHead>Students Passed</TableHead>
              <TableHead>Total Students</TableHead>
              <TableHead>Percentage Passed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {aggregatedResults.map((data, index) => (
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
