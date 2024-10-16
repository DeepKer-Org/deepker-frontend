"use client";

import React from 'react'
import {usePathname} from "next/navigation";
import SideBar from "@/src/components/ui/SideBar";
import {SnackbarProvider} from "notistack";


const ClientWrapper = ({children}: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isAuthRoute = pathname.startsWith("/auth");

    return (
        <SnackbarProvider maxSnack={3} autoHideDuration={3000} anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}>
            <body className="h-full flex">
            {!isAuthRoute && <SideBar/>}
            <main className="flex-grow h-full px-8 py-6">{children}</main>
            </body>
        </SnackbarProvider>
    )
}
export default ClientWrapper
