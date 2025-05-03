import {
  DoctorRequest,
  DoctorResponse,
  DoctorsResponse,
} from "@/src/types/doctor";
import { authenticatedFetch } from "@/src/api/authenticatedFetch";

const NEXT_PUBLIC_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export const fetchDoctors = async (): Promise<DoctorsResponse> => {
  const res = await authenticatedFetch(`${NEXT_PUBLIC_API_BASE_URL}/doctors`, {
    method: "GET",
  });

  const data = await res.json();

  return {
    doctors: data.doctors,
  };
};

export const fetchDoctor = async (
  doctorId: string
): Promise<DoctorResponse> => {
  const res = await authenticatedFetch(
    `${NEXT_PUBLIC_API_BASE_URL}/doctors/${doctorId}`,
    { method: "GET" }
  );
  return res.json();
};

export const fetchDoctorByUserId = async (
  userId: string,
  token: string
): Promise<DoctorResponse> => {
  const res = await fetch(
    `${NEXT_PUBLIC_API_BASE_URL}/doctors/userID/${userId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch doctor");
  }

  return res.json();
};

export const updateDoctorByUserId = async (
  userId: string,
  request: DoctorRequest
): Promise<void> => {
  const response = await authenticatedFetch(
    `${NEXT_PUBLIC_API_BASE_URL}/doctors/userID/${userId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...request }),
    }
  );

  if (!response.ok) {
    throw new Error("Doctor update failed");
  }
};

export const registerDoctorUser = async (
  request: DoctorRequest
): Promise<void> => {
  const response = await authenticatedFetch(
    `${NEXT_PUBLIC_API_BASE_URL}/doctors`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...request }),
    }
  );

  if (!response.ok) {
    throw new Error("Doctor registration failed");
  }
};
