interface Doctor {
    doctor_id: string;
    dni: string;
    name: string;
    specialization: string;
}

interface Medication {
    name: string;
    start_date: string;
    end_date: string;
    dosage: string;
    periodicity: string;
}

export interface MedicalVisit {
    reason: string;
    diagnosis: string;
    treatment: string;
    entry_date: string;
    discharge_date: string;
}

export interface Patient {
    patient_id: string;
    dni: string;
    name: string;
    age: number;
    weight: number;
    height: number;
    sex: "M" | "F";
    location: string;
    entry_date: string;
    comorbidities: string[];
    medical_staff: Doctor[];
    medications: Medication[];
    medical_visits: MedicalVisit[];
}

export interface PatientsResponse {
    patients: Patient[];
    totalCount: number;
}

export interface PatientResponse {
    patient: Patient;
}
