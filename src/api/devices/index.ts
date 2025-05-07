import {
  DevicesQueryParams,
  DevicesResponse,
  MonitoringDeviceUpdateRequest,
} from "@/src/types/device";
import { authenticatedFetch, getCookie } from "@/src/api/authenticatedFetch";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080";

export const fetchDevices = async (
  page: number,
  rowsPerPage: number,
  filters: DevicesQueryParams = {}
): Promise<DevicesResponse> => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: rowsPerPage.toString(),
    ...Object.fromEntries(
      Object.entries(filters).filter(
        ([, value]) => value !== undefined && value !== null
      )
    ),
  }).toString();

  // Fetch data using authenticatedFetch
  const res = await authenticatedFetch(
    `${API_BASE_URL}/monitoring-devices?${queryParams}`,
    { method: "GET" }
  );
  const data = await res.json();

  return {
    devices: data.devices,
    totalCount: data.totalCount,
  };
};

export const fetchDevicesByStatus = async (
  status: string
): Promise<DevicesResponse> => {
  const res = await authenticatedFetch(
    `${API_BASE_URL}/monitoring-devices?status=${status}`,
    { method: "GET" }
  );
  const data = await res.json();

  return {
    devices: data.devices,
    totalCount: data.totalCount,
  };
};

export const updateDevice = async (
  deviceId: string,
  data: MonitoringDeviceUpdateRequest
): Promise<any> => {
  //   try {
  const token = getCookie("token"); // Retrieve token from cookie

  if (!token) {
    throw new Error("Authentication token missing.");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const res = await fetch(`${API_BASE_URL}/monitoring-devices/${deviceId}`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify(data),
  });
  const response = await res.json();
  if (!res.ok) {
    if (response.code === "23505") {
      return {
        error: {
          code: "PatientAlreadyLinked",
        },
      };
    } else {
      return {
        error: {
          code: "ServerError",
        },
      };
    }
  }
  return response
};
