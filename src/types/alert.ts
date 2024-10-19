export interface BiometricData {
    o2_saturation: number;
    heart_rate: number;
    systolic_blood_pressure: number;
    diastolic_blood_pressure: number;
    temperature: number;
}

export interface ComputerDiagnosis {
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
    computer_diagnoses: ComputerDiagnosis[];
    patient: Patient;
}

export interface AlertMarkAttendanceRequest {
    attended_by_id: string;
    attended_timestamp: string;
}

export interface AlertsResponse {
    alerts: Alert[];
    totalCount: number;
}

export interface AlertResponse {
    alert: Alert;
}