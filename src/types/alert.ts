import { Biometric } from "./biometric";
import { ComputerDiagnosis } from "./computerDiagnosis";
import { Patient } from "./patient";

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