export interface Doctor {
    doctor_id: string;
    dni: string;
    name: string;
    specialization: string;
    issuance_date: string;
}

export interface DoctorsResponse {
    doctors: Doctor[];
}

export interface DoctorResponse {
    doctor: Doctor;
}

export interface DoctorRequest {
    dni: string;
    password: string;
    issuance_date: string;
    name: string;
    specialization: string;
    roles: string[];
}