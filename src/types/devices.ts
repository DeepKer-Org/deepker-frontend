interface Patient {
    patient_id: string;
    dni: string;
    name: string;
}

// Interface for the Doctor (LinkedBy) object
interface Doctor {
    doctor_id: string;
    dni: string;
    name: string;
    specialization: string;
}

export interface MonitoringDevice {
    device_id: string;
    status: 'In Use' | 'Free' | 'Unavailable' | 'Connecting'; // Strict typing for status
    patient: Patient; // Embedded Patient object
    linked_by: Doctor; // Doctor (LinkedBy) object
}

export interface MonitoringDeviceUpdateRequest {
    status: string; // Status of the device (e.g., 'In Use', 'Free', etc.)
    patient_id?: string; // Nullable, can be undefined if the device is 'Free'
    linked_by_id?: string; // Nullable, can be undefined if the device is 'Free'
}

export interface DevicesQueryParams {
    dni?: string;
}

export interface DevicesResponse {
    devices: MonitoringDevice[]; // Array of MonitoringDevice
    totalCount: number; // Total count of devices
}