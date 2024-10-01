export type Alert = {
    alertId: string;
    alertStatus: string;
    attendedBy: string;
    room: string;
    alertTimestamp: string;
    attendedTimestamp: string;
    biometrics: Biometric;
    computerDiagnoses: ComputerDiagnosis[];
    patient: Patient;
}

type Patient = {
    dni: string;
    name: string;
    currentLocation: string;
    finalDiagnosis: string;
    associatedDoctors: string[];
}

type Biometric = {
    O2Saturation: number;
    heartRate: number;
    systolicBloodPressure: number;
    diastolicBloodPressure: number;
}

type ComputerDiagnosis = {
    diagnosis: string;
    percentage: number;
}