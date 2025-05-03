import {
  PatientResponse,
  PatientsQueryParams,
  PatientsResponse,
} from "@/src/types/patient";
import { authenticatedFetch } from "@/src/api/authenticatedFetch";

const NEXT_PUBLIC_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export const fetchPatientsPaginated = async (
  page: number,
  rowsPerPage: number,
  filters: PatientsQueryParams = {}
): Promise<PatientsResponse> => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: rowsPerPage.toString(),
    ...Object.fromEntries(
      Object.entries(filters).filter(
        ([, value]) => value !== undefined && value !== null
      )
    ),
  }).toString();

  // Fetch data from API with authenticatedFetch
  const res = await authenticatedFetch(
    `${NEXT_PUBLIC_API_BASE_URL}/patients?${queryParams}`,
    { method: "GET" }
  );
  const data = await res.json();

  return {
    patients: data.patients,
    totalCount: data.totalCount,
  };
};

export const fetchPatients = async (): Promise<PatientsResponse> => {
  const res = await authenticatedFetch(`${NEXT_PUBLIC_API_BASE_URL}/patients`, {
    method: "GET",
  });
  const data = await res.json();

  return {
    patients: data.patients,
    totalCount: data.totalCount,
  };
};

export const fetchPatient = async (
  patientId: string
): Promise<PatientResponse> => {
  const res = await authenticatedFetch(
    `${NEXT_PUBLIC_API_BASE_URL}/patients/${patientId}`,
    { method: "GET" }
  );
  return res.json();
};
