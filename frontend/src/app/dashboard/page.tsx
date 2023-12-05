"use client";
import NavigationMain from "@/components/NavigationMain";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ActionMenu } from "@/components/action_menu/ActionMenu";
import { toast } from "react-toastify";

export default function Home() {
  return (
    <div className="min-h-screen w-screen">
      <NavigationMain />
      <div className="container h-full">
        <div className="flex flex-row space-x-10">
          <div className="flex-2 w-[30%] pt-20">
            <Card>
              <CardHeader>
                <CardTitle>Action Menu</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  <p className="text-xs">
                    Choose either Data Entry or Querying Data
                  </p>
                  <ActionMenu />
                </CardDescription>
              </CardContent>
            </Card>
          </div>
          <div className="flex-1 pt-20">
            <Card>
              <CardHeader>
                <CardTitle>Action Viewer</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Populates the form fields</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
