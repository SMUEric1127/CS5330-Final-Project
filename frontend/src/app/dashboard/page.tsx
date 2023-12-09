"use client";
import NavigationMain from "@/components/NavigationMain";
import { AddData } from "@/components/menu/DataEntry/AddData";
import { AssignCourseObjective } from "@/components/menu/DataEntry/AssignCourseObjective";
import CreateTable from "@/components/menu/DataEntry/CreateTable";
import { SectionEvaluation } from "@/components/menu/DataEntry/SectionEvaluation";
import { ByAcademicYear } from "@/components/menu/DataQuery/ByAcademicYear";
import { ByDepartment } from "@/components/menu/DataQuery/ByDepartment";
import { ByProgram } from "@/components/menu/DataQuery/ByProgram";
import { ByProgramAndSemester } from "@/components/menu/DataQuery/ByProgramAndSemester";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [isDataEntryOpen, setIsDataEntryOpen] = useState(false);
  const [isDataQueryingOpen, setIsDataQueryingOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "Welcome",
      description: "Welcome to our platform - EduTrack",
    });
  }, []);

  const dataEntryTabs = [
    { id: 1, label: "Tables Manipulation" },
    { id: 2, label: "Add Data" },
    { id: 3, label: "Assign Course Objective" },
    { id: 4, label: "Section Evaluation Input" },
  ];

  const dataQueryingTabs = [
    { id: 1, label: "By Department" },
    { id: 2, label: "By Program" },
    { id: 3, label: "By Semester and Program" },
    { id: 4, label: "By Academic Year" },
  ];

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
  };

  const renderContentDataEntry = () => {
    switch (activeTab) {
      case 0:
        return <p className="text-xs pb-5">Empty, select a category</p>;
      case 1:
        return <CreateTable />;
      case 2:
        return <AddData />;
      case 3:
        return <AssignCourseObjective />;
      case 4:
        return <SectionEvaluation />;
      default:
        return null;
    }
  };

  const renderContentDataQuerying = () => {
    switch (activeTab) {
      case 0:
        return <p className="text-xs pb-5">Empty, select a category</p>;
      case 1:
        return <ByDepartment />;
      case 2:
        return <ByProgram />;
      case 3:
        return <ByProgramAndSemester />;
      case 4:
        return <ByAcademicYear />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-screen">
      <NavigationMain />
      <div className="w-max[90vw] px-10 h-full items-center justify-center">
        <div className="flex sm:flex-col lg:flex-row lg:space-x-10 lg:min-h-screen sm:h-fit">
          <div className="flex-2 lg:max-w-[30%] sm:w-full w-fit py-20 max-h-[80vh] overflow-auto">
            <Card className="lg:min-h-[70vh] sm:max-h-fit">
              <CardHeader>
                <CardTitle>Action Menu</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  <p className="text-xs pb-5">
                    Choose either Data Entry or Querying Data
                  </p>
                  <div
                    className={`cursor-pointer px-4 py-2 border-b duration-300 hover:border-b-primary ${
                      isDataEntryOpen ? "border-primary" : "border-gray-300"
                    }`}
                    onClick={() => {
                      setIsDataQueryingOpen(isDataEntryOpen);
                      setIsDataEntryOpen(!isDataEntryOpen);
                      setActiveTab(0);
                    }}
                  >
                    Data Entry
                  </div>
                  {isDataEntryOpen &&
                    dataEntryTabs.map((tab, index) => (
                      <div
                        key={tab.id}
                        className={`cursor-pointer p-2 border-b duration-300 hover:border-b-primary `}
                        onClick={() => handleTabClick(tab.id)}
                        style={{ marginLeft: "20px", fontSize: "0.9em" }} // Adjust the styles here
                      >
                        {`${index + 1}. ${tab.label}`} {/* Add an index */}
                      </div>
                    ))}

                  <div
                    className={`cursor-pointer px-4 py-2 border-b duration-300 hover:border-b-primary ${
                      isDataQueryingOpen ? "border-primary" : "border-gray-300"
                    }`}
                    onClick={() => {
                      setIsDataEntryOpen(isDataQueryingOpen);
                      setIsDataQueryingOpen(!isDataQueryingOpen);
                      setActiveTab(0);
                    }}
                  >
                    Data Querying
                  </div>

                  {isDataQueryingOpen &&
                    dataQueryingTabs.map((tab, index) => (
                      <div
                        key={tab.id}
                        className={`cursor-pointer p-2 border-b duration-300 hover:border-b-primary `}
                        onClick={() => handleTabClick(tab.id)}
                        style={{ marginLeft: "20px", fontSize: "0.9em" }} // Adjust the styles here
                      >
                        {`${index + 1}. ${tab.label}`} {/* Add an index */}
                      </div>
                    ))}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
          <div className="flex-1 lg:pt-20 lg:min-h-screen">
            <Card className="lg:min-h-[70vh]">
              <CardHeader>
                <CardTitle>Action Viewer</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="max-h-[60vh]">
                  {(activeTab == 3 || activeTab == 4) && isDataEntryOpen && (
                    <p className="text-xs pb-5">Populates the form fields</p>
                  )}
                  {(activeTab == 1 || activeTab == 2) && isDataEntryOpen && (
                    <p className="text-xs pb-0">Select List of Actions below</p>
                  )}

                  {isDataQueryingOpen && activeTab != 0 && (
                    <p className="text-xs pb-3">Enter the information below</p>
                  )}
                  {isDataEntryOpen && renderContentDataEntry()}
                  {isDataQueryingOpen && renderContentDataQuerying()}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
