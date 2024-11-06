export interface Doctor {
    doctor_id: string;
    dni: string;
    name: string;
    specialization: string;
}

export interface DoctorsResponse {
    doctors: Doctor[];
}

export interface DoctorResponse {
    doctor: Doctor;
}

export interface DoctorRegisterRequest {
    dni: string;
    password: string;
    issuance_date: string;
    name: string;
    specialization: string;
    roles: string[];
}