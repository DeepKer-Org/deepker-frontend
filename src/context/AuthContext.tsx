"use client";
import React, {createContext, useState, useContext, useEffect, ReactNode} from "react";
import {loginUser, changePassword as changePasswordService} from "@/src/api/auth";
import {fetchDoctorByUserId} from "@/src/api/doctors";

// Define types
type AuthContextType = {
    signIn: (username: string, password: string) => Promise<SignInResult>;
    signOut: () => void;
    changePassword: (dni: string, issuance_date: string, new_password: string) => Promise<void>;
    session?: string | null;
    uid?: string | null;
    doctorId?: string | null;
    roles: string[];
    isLoading: boolean;
    isAuthenticated: boolean;
};

type SignInResult = {
    success: boolean;
    message?: string;
    roles?: string[]; // Add roles to the result type
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
    const [roles, setRoles] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Initialize session, uid, and doctorId from cookies on mount
    useEffect(() => {
        const getCookie = (name: string) => {
            const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
            return match ? decodeURIComponent(match[2]) : null;
        };

        setSession(getCookie("token"));
        setUid(getCookie("uid"));
        setDoctorId(getCookie("doctorId"));

        // Load roles from cookies only if already set, avoiding a reset post-signIn
        const savedRoles = getCookie("roles");
        if (savedRoles) setRoles(JSON.parse(savedRoles));
    }, []);

    const decodeToken = (token: string) => {
        const payloadBase64 = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        return decodedPayload;
    };

    const signIn = async (username: string, password: string): Promise<SignInResult> => {
        setIsLoading(true);
        try {
            const { token } = await loginUser(username, password);
            const decodedToken = decodeToken(token);
            const userId = decodedToken.user_id;
            const userRoles = decodedToken.roles || []; // Extract roles from the decoded token

            let doctorId = null;

            // If user has the 'doctor' role, fetch the doctor information
            if (userRoles.includes("doctor")) {
                const doctorData = await fetchDoctorByUserId(userId, token);
                doctorId = doctorData.doctor.doctor_id;
            }

            // Set cookies for token, uid, roles, and conditionally for doctorId
            document.cookie = `token=${token}; path=/; secure; samesite=lax`;
            document.cookie = `uid=${userId}; path=/; secure; samesite=lax`;
            document.cookie = `roles=${JSON.stringify(userRoles)}; path=/; secure; samesite=lax`;
            if (doctorId) {
                document.cookie = `doctorId=${doctorId}; path=/; secure; samesite=lax`;
            } else {
                document.cookie = `doctorId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=lax`;
            }

            // Set state directly
            setSession(token);
            setUid(userId);
            setRoles(userRoles);
            setDoctorId(doctorId);

            return { success: true, roles: userRoles }; // Include roles in the response
        } catch (error) {
            console.error("Sign in error:", error);
            clearAuthData();
            return { success: false, message: "Inicio de sesión fallido. Por favor, verifica tus credenciales." };
        } finally {
            setIsLoading(false);
        }
    };

    const signOut = () => {
        // Clear cookies
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=lax";
        document.cookie = "uid=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=lax";
        document.cookie = "roles=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=lax";
        document.cookie = "doctorId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=lax";

        clearAuthData();
        window.location.href = "/auth/login";
    };

    const clearAuthData = () => {
        setSession(null);
        setUid(null);
        setDoctorId(null);
        setRoles([]);
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
                roles,
                isLoading,
                isAuthenticated: !!session,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
