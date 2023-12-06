"use client";
import NavigationMain from "@/components/NavigationMain";
import { AddData } from "@/components/menu/AddData";
import CreateTable from "@/components/menu/CreateTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

export default function Home() {
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
    // { id: 3, label: "Add Faculty" },
    // { id: 4, label: "Add Programs" },
    // { id: 5, label: "Add Courses" },
    // { id: 6, label: "Add Sections" },
  ];

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 1:
        return <CreateTable />;
      case 2:
        return <AddData />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-screen">
      <NavigationMain />
      <div className="container h-full">
        <div className="flex flex-row space-x-10 min-h-screen">
          <div className="flex-2 w-[30%] py-20">
            <Card className="min-h-[70vh]">
              <CardHeader>
                <CardTitle>Action Menu</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  <p className="text-xs pb-5">
                    Choose either Data Entry or Querying Data
                  </p>
                  {dataEntryTabs.map((tab) => (
                    <div
                      key={tab.id}
                      className={`cursor-pointer p-4 border-b duration-300 hover:border-b-primary ${
                        activeTab === tab.id
                          ? "border-primary bg-blue-50"
                          : "border-gray-300"
                      }`}
                      onClick={() => handleTabClick(tab.id)}
                    >
                      {tab.label}
                    </div>
                  ))}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
          <div className="flex-1 pt-20 min-h-screen">
            <Card className="min-h-[70vh]">
              <CardHeader>
                <CardTitle>Action Viewer</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  <p className="text-xs pb-5">Populates the form fields</p>
                  {renderContent()}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
