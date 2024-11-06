export type DoctorFormValues = {
    name: string;
    specialization: string;
    username: string;
    issuanceDate: string;
    password: string;
    confirmPassword: string;
    isAdmin: boolean;
};

export type AdminFormValues = {
    username: string;
    password: string;
    confirmPassword: string;
};