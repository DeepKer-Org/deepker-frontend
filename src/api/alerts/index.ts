import {
  AlertUpdateRequest,
  AlertResponse,
  AlertsResponse,
} from "@/src/types/alert";
import { authenticatedFetch } from "@/src/api/authenticatedFetch";

const NEXT_PUBLIC_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export const fetchAlerts = async (
  isPast: boolean,
  page: number,
  rowsPerPage: number
): Promise<AlertsResponse> => {
  const period = isPast ? "past" : "recent";
  const url = `${NEXT_PUBLIC_API_BASE_URL}/alerts?period=${period}&page=${page}&limit=${rowsPerPage}`;
  const response = await authenticatedFetch(url, { method: "GET" });
  const data = await response.json();

  return {
    alerts: data.alerts,
    totalCount: data.totalCount,
  };
};

export const fetchAlert = async (alertId: string): Promise<AlertResponse> => {
  const url = `${NEXT_PUBLIC_API_BASE_URL}/alerts/${alertId}`;
  const response = await authenticatedFetch(url, { method: "GET" });
  return response.json();
};

export const updateAlert = async (
  alertId: string,
  data: AlertUpdateRequest
): Promise<void> => {
  const url = `${NEXT_PUBLIC_API_BASE_URL}/alerts/${alertId}`;
  await authenticatedFetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
