const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080";

export type LoginResponse = {
    message: string;
    token: string;
};

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
    // Retrieve token directly from localStorage.
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("No authentication token found. Please log in.");
    }

    const response = await fetch(`${API_BASE_URL}/authorization/change-password`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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