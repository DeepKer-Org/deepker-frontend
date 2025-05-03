import { authenticatedFetch } from "@/src/api/authenticatedFetch";
import {
  LoginResponse,
  User,
  UserRequest,
  UsersResponse,
} from "@/src/types/auth";

const NEXT_PUBLIC_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export const loginUser = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const response = await fetch(
    `${NEXT_PUBLIC_API_BASE_URL}/authorization/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }
  );

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
};

export const changePassword = async (
  dni: string,
  issuance_date: string,
  new_password: string
): Promise<void> => {
  const response = await fetch(
    `${NEXT_PUBLIC_API_BASE_URL}/authorization/change-password`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dni,
        issuance_date,
        new_password,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Password change failed");
  }
};

export const registerAdminUser = async (
  request: UserRequest
): Promise<void> => {
  const roles = ["admin"];
  const response = await authenticatedFetch(
    `${NEXT_PUBLIC_API_BASE_URL}/authorization`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...request, roles }),
    }
  );

  if (!response.ok) {
    throw new Error("Admin registration failed");
  }
};

// fetchUsers
export const fetchUsers = async (
  page: number,
  rowsPerPage: number
): Promise<UsersResponse> => {
  const res = await authenticatedFetch(
    `${NEXT_PUBLIC_API_BASE_URL}/authorization?page=${page}&limit=${rowsPerPage}`,
    { method: "GET" }
  );
  const data = await res.json();

  return {
    users: data.users,
    totalCount: data.totalCount,
  };
};

export const fetchUserById = async (userId: string): Promise<User> => {
  const response = await authenticatedFetch(
    `${NEXT_PUBLIC_API_BASE_URL}/authorization/${userId}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("User fetch failed");
  }

  return response.json();
};

// updateUser
export const updateUser = async (
  userId: string,
  request: UserRequest
): Promise<void> => {
  const response = await authenticatedFetch(
    `${NEXT_PUBLIC_API_BASE_URL}/authorization/${userId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }
  );

  if (!response.ok) {
    throw new Error("User update failed");
  }
};

// delete User
export const deleteUser = async (userId: string): Promise<void> => {
  const response = await authenticatedFetch(
    `${NEXT_PUBLIC_API_BASE_URL}/authorization/${userId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("User deletion failed");
  }
};
