import { DeviceStatus } from "../enums/DeviceStatus";

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
    status: DeviceStatus;
    patient: Patient; // Embedded Patient object
    linked_by: Doctor; // Doctor (LinkedBy) object
}

export interface MonitoringDeviceUpdateRequest {
    status: DeviceStatus;
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

export interface MonitoringDeviceSimple {
    device_id: string;
    status: DeviceStatus;
}

export interface DevicesSimpleResponse {
    devices: MonitoringDeviceSimple[];
}