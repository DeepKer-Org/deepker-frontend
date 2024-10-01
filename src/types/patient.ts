export type Patient = {
    patientId: string;
    dni: string;
    name: string;
    age: number;
    weight: number;
    height: number;
    sex: "Male" | "Female" | "Other"; 
    location: string;
    currentState: string;
    finalDiagnosis: string;
    comorbidities: string[];
    medicalStaff: string[];
    medications: string[]; 
    lastAlertId: string;
  };
  