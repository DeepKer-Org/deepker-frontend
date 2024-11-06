import {authenticatedFetch} from "@/src/api/authenticatedFetch";
import {LoginResponse, UsersResponse} from "@/src/types/auth";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080";

export const loginUser = async (username: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/authorization/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        throw new Error("Login failed");
    }

    return response.json();
};

export const changePassword = async (dni: string, issuance_date: string, new_password: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/authorization/change-password`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            dni,
            issuance_date,
            new_password,
        }),
    });

    if (!response.ok) {
        throw new Error("Password change failed");
    }
};

export const registerAdminUser = async (username: string, password: string): Promise<void> => {
    const roles = ["admin", "doctor"];
    const response = await authenticatedFetch(`${API_BASE_URL}/authorization/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, roles }),
    });

    if (!response.ok) {
        throw new Error("Admin registration failed");
    }
}

// fetchUsers
export const fetchUsers = async (page: number, rowsPerPage: number): Promise<UsersResponse> => {
    const res = await authenticatedFetch(`${API_BASE_URL}/authorization?page=${page}&limit=${rowsPerPage}`, { method: 'GET' });
    const data = await res.json();

    return {
        users: data.users,
        totalCount: data.totalCount,
    }
}

// updateUser

// delete User