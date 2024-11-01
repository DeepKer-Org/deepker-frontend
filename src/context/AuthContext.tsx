"use client";
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { loginUser, changePassword as changePasswordService } from "@/src/api/auth";
import { fetchDoctorByUserId } from "@/src/api/doctors";

// Define types
type AuthContextType = {
    signIn: (username: string, password: string) => Promise<{ success: boolean; message?: string }>;
    signOut: () => void;
    changePassword: (dni: string, issuance_date: string, new_password: string) => Promise<void>;
    session?: string | null;
    uid?: string | null;
    doctorId?: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

// Provider component
type AuthProviderProps = {
    children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [session, setSession] = useState<string | null>(null);
    const [uid, setUid] = useState<string | null>(null);
    const [doctorId, setDoctorId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Initialize token, uid, and doctorId from localStorage on mount
    useEffect(() => {
        const savedSession = localStorage.getItem("token");
        const savedUid = localStorage.getItem("uid");
        const savedDoctorId = localStorage.getItem("doctorId");

        if (savedSession) setSession(savedSession);
        if (savedUid) setUid(savedUid);
        if (savedDoctorId) setDoctorId(savedDoctorId);
    }, []);

    const decodeToken = (token: string) => {
        const payloadBase64 = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        return decodedPayload;
    };

    const signIn = async (username: string, password: string): Promise<{ success: boolean; message?: string }> => {
        setIsLoading(true);
        try {
            const { token } = await loginUser(username, password);
            const decodedToken = decodeToken(token);
            const userId = decodedToken.user_id;

            // Fetch and set doctor information
            const doctorData = await fetchDoctorByUserId(userId, token);
            const doctorId = doctorData.doctor.doctor_id;

            // Store in localStorage and update state
            localStorage.setItem("token", token);
            localStorage.setItem("uid", userId);
            localStorage.setItem("doctorId", doctorId);

            // Set token as a cookie for middleware
            document.cookie = `token=${token}; path=/; secure; samesite=lax`;

            setSession(token);
            setUid(userId);
            setDoctorId(doctorId);

            return { success: true };
        } catch (error) {
            console.error("Sign in error:", error);
            clearAuthData();
            return { success: false, message: "Inicio de sesión fallido. Por favor, verifica tus credenciales." };
        } finally {
            setIsLoading(false);
        }
    };

    const signOut = () => {
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=lax";
        clearAuthData();

        window.location.href = "/auth/login";
    };

    const clearAuthData = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("uid");
        localStorage.removeItem("doctorId");
        setSession(null);
        setUid(null);
        setDoctorId(null);
    };

    const changePassword = async (dni: string, issuance_date: string, new_password: string) => {
        try {
            await changePasswordService(dni, issuance_date, new_password);
        } catch (error) {
            console.error("Password change error:", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signOut,
                changePassword,
                uid,
                session,
                doctorId,
                isLoading,
                isAuthenticated: !!session, // Set isAuthenticated based on session state
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
