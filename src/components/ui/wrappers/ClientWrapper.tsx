"use client";

import React from 'react'
import {usePathname} from "next/navigation";
import SideBar from "@/src/components/ui/SideBar";


const ClientWrapper = ({children}: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isAuthRoute = pathname.startsWith("/auth");

    return (
        <body className="h-full flex">
        {!isAuthRoute && <SideBar/>}
        <main className="flex-grow h-full px-8 py-6">{children}</main>
        </body>
    )
}
export default ClientWrapper
