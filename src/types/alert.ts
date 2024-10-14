export interface BiometricData {
    o2_saturation: number;
    heart_rate: number;
    systolic_blood_pressure: number;
    diastolic_blood_pressure: number;
}

export interface ComputerDiagnosis {
    diagnosis: string;
    percentage: number;
}

export interface Patient {
    dni: string;
    name: string;
    current_location: string;
    final_diagnosis: string;
    doctors: string[];
}

export interface Doctor {
    doctor_id: string;
    dni: string;
    name: string;
    specialization: string;
}

export interface Alert {
    alert_id: string;
    alert_timestamp: string;
    room: string;
    attended_by: Doctor;
    attended_timestamp: string;
    alert_status: string;
    biometric_data: BiometricData;
    computer_diagnoses: ComputerDiagnosis[];
    patient: Patient;
}

export interface AlertResponse {
    alerts: Alert[];
    totalCount: number;
}
