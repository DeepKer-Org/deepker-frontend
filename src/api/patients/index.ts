import {PatientResponse, PatientsQueryParams, PatientsResponse} from "@/src/types/patient";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080";

export const fetchPatients = async (
    page: number,
    rowsPerPage: number,
    filters: PatientsQueryParams = {}
): Promise<PatientsResponse> => {
    const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: rowsPerPage.toString(),
        ...Object.fromEntries(
            Object.entries(filters).filter(([, value]) => value !== undefined && value !== null)
        )
    }).toString();

    // Fetch data from API
    const res = await fetch(`${API_BASE_URL}/patients?${queryParams}`, { method: 'GET' });

    if (!res.ok) {
        throw new Error('Failed to fetch patients');
    }

    const data = await res.json();

    return {
        patients: data.patients,
        totalCount: data.totalCount,
    };
};

export const fetchPatient = async (patientId: string): Promise<PatientResponse> => {
    const res = await fetch(`${API_BASE_URL}/patients/${patientId}`, { method: 'GET' });

    if (!res.ok) {
        throw new Error('Failed to fetch patient');
    }

    return res.json();
};