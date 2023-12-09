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
import { UserRoleProvider, useUserRole } from "@/components/adminContext/UserRoleContext";
import { AdminActionMenu } from "@/components/menu/AdminTable/AdminActionMenu";
import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes";

export default function Home() {
  const [currentOpenTab, setCurrentOpenTab] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [adminTable, setAdminTable] = useState([]);
  const [tableName, setTableName] = useState('' as string);
  const [activeTab, setActiveTab] = useState(1);
  const userRole = useUserRole();

  const { theme } = useTheme();
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
    setLoading(true);
    setTimeout(() => {
      setActiveTab(tabId);
      setLoading(false);
    }, 200);
  };

  const renderContentDataEntry = () => {
    const component = () => {
      switch (activeTab) {
        case 0:
          return <p className="text-center">Empty, select a category</p>;
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
    }
    return (
      <div>
        <motion.div
          key={`${currentOpenTab == "entry"}${activeTab}`}
          initial={{ y: "20px" }} // start from above the viewport
          animate={{ y: 0 }} // animate to its original position
          exit={{ y: "20px" }} // exit to above the viewport
          transition={{ duration: 0.3 }}
        >
          {component()}
        </motion.div >
      </div>
    );
  };

  const renderContentDataQuerying = () => {
    const component = () => {
      switch (activeTab) {
        case 0:
          return <p className="text-center">Empty, select a category</p>;
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
    }
    return (
      <div>
        <motion.div
          key={`${currentOpenTab == "entry"}${activeTab}`}
          initial={{ y: "20px" }} // start from above the viewport
          animate={{ y: 0 }} // animate to its original position
          exit={{ y: "20px" }} // exit to above the viewport
          transition={{ duration: 0.3 }}
        >
          {component()}
        </motion.div >
      </div>
    );
  };

  const getAdminTable = async () => {
    const res = await fetch("/api/get_all_tables");
    const data = await res.json();
    setAdminTable(data.tables);
  }

  useEffect(() => {
    if (currentOpenTab == "admin") {
      getAdminTable();
    }
  }, [currentOpenTab])

  const changeOpenTab = (tab: string) => {
    setLoading(true);
    setTimeout(() => {
      setCurrentOpenTab(tab);
      setLoading(false);
    }, 100);
  }

  const changeTableName = (table: string) => {
    setLoading(true);
    setTimeout(() => {
      setTableName(table);
      setLoading(false);
    }, 100);
  }

  return (
    <div className="min-h-screen w-screen">
      <NavigationMain />
      <div className="w-max[90vw] px-10 h-full items-center justify-center">
        <div className="flex sm:flex-col lg:flex-row lg:space-x-10 lg:min-h-screen sm:h-fit">
          <div className="flex-2 lg:max-w-[30%] sm:w-full w-fit py-20 max-h-[80vh]">
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
                    className={`cursor-pointer px-4 py-2 border-b duration-300 hover:border-b-primary ${currentOpenTab == "entry" ? "border-primary" : "border-gray-300"
                      }`}
                    onClick={() => {
                      changeOpenTab("entry");
                      setActiveTab(0);
                    }}
                  >
                    Data Entry
                  </div>
                  {currentOpenTab == "entry" &&
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
                    className={`cursor-pointer px-4 py-2 border-b duration-300 hover:border-b-primary ${currentOpenTab == "query" ? "border-primary" : "border-gray-300"
                      }`}
                    onClick={() => {
                      changeOpenTab("query");
                      setActiveTab(0);
                    }}
                  >
                    Data Querying
                  </div>

                  {currentOpenTab == "query" &&
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
                  {userRole?.isAdmin && <div>
                    <div
                      className={`cursor-pointer px-4 py-2 border-b duration-300 hover:border-b-primary ${currentOpenTab == "admin" ? "border-primary" : "border-gray-300"
                        }`}
                      onClick={() => {
                        changeOpenTab("admin");
                        setActiveTab(0);
                      }}
                    >
                      Admin Table View
                    </div>
                    {currentOpenTab == "admin" && adminTable.length > 0 && adminTable.map((table, index) => (
                      <div
                        key={table}
                        className={`cursor-pointer p-2 border-b duration-300 hover:border-b-primary `}
                        onClick={() => changeTableName(table)}
                        style={{ marginLeft: "20px", fontSize: "0.9em" }} // Adjust the styles here
                      >
                        {`${index + 1}. Table ${table}`} {/* Add an index */}
                      </div>
                    ))}

                    {currentOpenTab == "admin" && adminTable.length == 0 &&
                      (<p className="text-xs pl-5 pt-1">
                        Empty Table, initialize a table first
                      </p>)
                    }
                  </div>}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
          <div className="flex-1 lg:pt-20 lg:min-h-screen lg:max-w-[70%]">
            <Card className="lg:min-h-[70vh]">
              <CardHeader>
                <CardTitle>Action Viewer</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="max-h-[60vh]">
                  {(activeTab == 3 || activeTab == 4) && currentOpenTab == "entry" && (
                    <p className="pb-5">Populates the form fields</p>
                  )}
                  {(activeTab == 1 || activeTab == 2) && currentOpenTab == "entry" && (
                    <p className="pb-0">Select List of Actions below</p>
                  )}

                  {currentOpenTab == "query" && activeTab != 0 && (
                    <p className="pb-3">Enter the information below</p>
                  )}
                  {!loading && <AnimatePresence>
                    {currentOpenTab == "entry" && renderContentDataEntry()}
                    {currentOpenTab == "query" && renderContentDataQuerying()}
                    {currentOpenTab == "admin" && <AdminActionMenu table={tableName} />}
                  </AnimatePresence>}
                  {loading && (
                    <div className="flex justify-center items-center min-h-[50vh]">
                      <Loader2 className="animate-spin" size={50} color={theme == "dark" ? "white" : "black"} />
                    </div>
                  )}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div >
  );
}
