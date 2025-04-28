export interface BiometricData {
    o2_saturation: number;
    heart_rate: number;
}

export interface ComputerDiagnostic {
    diagnosis: string;
    percentage: number;
}

interface Medications {
    name: string;
    start_date: string;
    end_date: string;
    dosage: string;
    periodicity: string;
}

export interface Patient {
    dni: string;
    name: string;
    location: string;
    age: number;
    sex: string;
    monitoring_device_id: string;
    comorbidities: string[];
    medications: Medications[];
}

export interface Doctor {
    doctor_id: string;
    dni: string;
    name: string;
    specialization: string;
}

export interface Alert {
    final_diagnosis: string;
    alert_id: string;
    alert_timestamp: string;
    attended_by: Doctor;
    attended_timestamp: string;
    alert_status: string;
    biometric_data: BiometricData;
    computer_diagnostic: ComputerDiagnostic;
    patient: Patient;
}

export interface AlertMarkAttendanceRequest {
    attended_by_id: string | null;
    attended_timestamp: string | null;
}

export interface AlertsResponse {
    alerts: Alert[];
    totalCount: number;
}

export interface AlertResponse {
    alert: Alert;
}