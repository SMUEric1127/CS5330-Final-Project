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

import React from "react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "./ui/button";

function NavigationMain() {
  return (
    <div className="flex-col font-medium text-2xl">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>Logo</NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              Home
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Button
              variant={"outline"}
              className="bg-primary font-medium text-xl border-0"
            >
              <Link href="/dashboard" legacyBehavior passHref>
                Dashboard
              </Link>
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Separator />
    </div>
  );
}

export default NavigationMain;
