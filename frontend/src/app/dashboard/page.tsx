"use client";
import NavigationMain from "@/components/NavigationMain";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";

export default function Home() {
  return (
    <div className="h-screen w-screen">
      <NavigationMain />
      <div className="container h-full">
        <div className="flex flex-row space-x-20">
          <div className="flex-1 pt-20">
            <Card>
              <CardHeader>
                <CardTitle>Menu</CardTitle>
              </CardHeader>
              Test
            </Card>
          </div>
          <div className="flex-1 pt-20">
            <Card>Test</Card>
          </div>
        </div>
      </div>
    </div>
  );
}
