import {AlertMarkAttendanceRequest, AlertResponse, AlertsResponse} from "@/src/types/alert";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080";

export const fetchAlerts = async (
    isAttended: boolean,
    page: number,
    rowsPerPage: number
): Promise<AlertsResponse> => {
    const attendance = isAttended ? "attended" : "unattended";
    const res = await fetch(
        `${API_BASE_URL}/alerts?status=${attendance}&page=${page}&limit=${rowsPerPage}`,
        { method: 'GET' }
    );

    if (!res.ok) {
        throw new Error('Failed to fetch alerts');
    }

    const data = await res.json();

    return {
        alerts: data.alerts,
        totalCount: data.totalCount,
    };
};

export const fetchAlert = async (alertId: string): Promise<AlertResponse> => {
    const res = await fetch(`${API_BASE_URL}/alerts/${alertId}`, { method: 'GET' });

    if (!res.ok) {
        throw new Error('Failed to fetch alert');
    }

    return res.json();
};

export const updateAlert = async (alertId: string, data: AlertMarkAttendanceRequest): Promise<void> => {
    const res = await fetch(`${API_BASE_URL}/alerts/${alertId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error('Failed to update alert');
    }
}