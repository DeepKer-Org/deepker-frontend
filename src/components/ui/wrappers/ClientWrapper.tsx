"use client";

import React, {useEffect} from 'react'
import {usePathname, useRouter} from "next/navigation";
import SideBar from "@/src/components/ui/SideBar";
import {SnackbarProvider} from "notistack";
import {useAuth} from "@/src/context/AuthContext";


const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth(); // Get authentication status
    const pathname = usePathname();
    const router = useRouter();
    const isAuthRoute = pathname.startsWith("/auth");

    useEffect(() => {
        // Redirect user based on authentication status when visiting the root route
        if (pathname === "/") {
            router.push(isAuthenticated ? "/alerts" : "/auth/login");
        }
    }, [pathname, isAuthenticated, router]);

    return (
        <SnackbarProvider
            maxSnack={3}
            autoHideDuration={3000}
            anchorOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
        >
            <body className="h-full flex">
            {/* Show SideBar only on non-auth routes */}
            {!isAuthRoute && <SideBar />}
            <main className="flex-grow h-full px-8 py-6">{children}</main>
            </body>
        </SnackbarProvider>
    );
};

export default ClientWrapper;