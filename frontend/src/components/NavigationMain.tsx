import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { CircularIcon } from "@/components/images/CircularIcon";
import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./theme/ModeToggle";
import { useUserRole } from "./adminContext/UserRoleContext";

function NavigationMain() {
  const userRole = useUserRole();
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 600px)").matches
      : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const handleResize = () => setIsMobile(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleResize);
    handleResize(); // Call once to set initial state

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <div className="flex-col font-medium text-lg">
      <NavigationMenu>
        {!isMobile && (
          <NavigationMenuList>
            <NavigationMenuItem>
              <CircularIcon imageUrl={"/icon.png"} />
            </NavigationMenuItem>
          </NavigationMenuList>
        )}
        <NavigationMenuList>
          <NavigationMenuItem>
            <div className="flex flex-row space-x-5 items-center">
              <Link href="/" legacyBehavior passHref>
                Home
              </Link>
              {userRole && (
                <Button
                  onClick={() => userRole.toggleAdmin()}
                  variant={userRole.isAdmin ? "outline" : "secondary"}
                  className="min-w-[50px]"
                >
                  {userRole.isAdmin ? "View as User" : "View as Admin"}
                </Button>
              )}
              <Button
                variant={"outline"}
                className="bg-primary font-medium border text-slate-100 hover:bg-transparent hover:border-primary hover:border"
              >
                <Link href="/dashboard" legacyBehavior passHref>
                  Dashboard
                </Link>
              </Button>

              <ModeToggle />
            </div>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Separator />
    </div>
  );
}

export default NavigationMain;
