"use client";
import { UserRoleProvider } from "@/components/adminContext/UserRoleContext";
import React, { ReactNode } from "react";

export default function Layout({ children }: {
    children: ReactNode;
}) {
    return (
        <UserRoleProvider>
            {children}
        </UserRoleProvider>
    )
}