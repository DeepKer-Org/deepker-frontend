import {DoctorResponse, DoctorsResponse} from "@/src/types/doctor";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080";

export const fetchDoctors = async (
): Promise<DoctorsResponse> => {
    const res = await fetch(
        `${API_BASE_URL}/doctors`,
        { method: 'GET' }
    );

    if (!res.ok) {
        throw new Error('Failed to fetch doctors');
    }

    const data = await res.json();

    return {
        doctors: data.doctors,
    };
};

export const fetchDoctor = async (doctorId: string): Promise<DoctorResponse> => {
    const res = await fetch(`${API_BASE_URL}/doctors/${doctorId}`, { method: 'GET' });

    if (!res.ok) {
        throw new Error('Failed to fetch doctor');
    }

    return res.json();
}

export const fetchDoctorByUserId = async (userId: string, token: string): Promise<DoctorResponse> => {
    const res = await fetch(`${API_BASE_URL}/doctors/userID/${userId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch doctor');
    }

    return res.json();
};