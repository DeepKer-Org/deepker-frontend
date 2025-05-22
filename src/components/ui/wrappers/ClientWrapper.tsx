"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import SideBar from "@/src/components/ui/sidebars/SideBar";
import { SnackbarProvider } from "notistack";
import { useAuth } from "@/src/context/AuthContext";
import { ErrorSnackbar, InfoSnackbar, SuccessSnackbar, WarningSnackbar } from "../snackbars/CustomSnackbar";

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth(); // Get authentication status
  const pathname = usePathname();
  const router = useRouter();

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
      style={{ width: "90vw", maxWidth: "1115px" }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      Components={{
        success: SuccessSnackbar,
        error: ErrorSnackbar,
        warning: WarningSnackbar,
        info: InfoSnackbar
      }}
    >
      <div className="h-full flex">
        {isAuthenticated && <SideBar />}
        <main className="flex-grow h-full px-8 py-6">{children}</main>
      </div>
    </SnackbarProvider>
  );
};

export default ClientWrapper;
