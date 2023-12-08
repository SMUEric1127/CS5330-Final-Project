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
import React from "react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./theme/ModeToggle";
import { useUserRole } from "./adminContext/UserRoleContext";

function NavigationMain() {
  const userRole = useUserRole();

  return (
    <div className="flex-col font-medium text-lg">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <CircularIcon imageUrl={"/icon.png"} />
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              Home
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <div className="flex flex-row space-x-7">
              {userRole && (
                <Button
                  onClick={() => userRole.toggleAdmin()}
                  variant={userRole.isAdmin ? "outline" : "secondary"}
                  className="text-base min-w-[150px]"
                >
                  {userRole.isAdmin ? 'View as User' : 'View as Admin'}
                </Button>
              )}
              <Button
                variant={"outline"}
                className="bg-primary font-medium text-base border text-slate-100 hover:bg-transparent hover:border-primary hover:border"
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
