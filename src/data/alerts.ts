import { Alert } from "../types/alert";

export const activeAlerts: Alert[] = [
  {
    alertId: "ALERT-001",
    alertStatus: "Active",
    attendedBy: "Dr. Juanita Jones",
    room: "Room 101",
    alertTimestamp: "2024-09-29T12:45:00Z",
    attendedTimestamp: "2024-09-29T12:50:00Z",
    biometrics: {
      O2Saturation: 96,
      heartRate: 78,
      systolicBloodPressure: 120,
      diastolicBloodPressure: 80,
    },
    computerDiagnoses: [
      {
        diagnosis: "Tachycardia",
        percentage: 70,
      },
      {
        diagnosis: "Normal O2 Saturation",
        percentage: 95,
      },
    ],
    patient: {
      dni: "12345678",
      name: "Jonathan Franco Fernandes",
      currentLocation: "Room 101",
      finalDiagnosis: "Hypertension",
      associatedDoctors: ["Dr. Juanita Jones", "Dr. Pedro Martinez"],
    },
  },
  {
    alertId: "ALERT-002",
    alertStatus: "Active",
    attendedBy: "Dr. Lupita Montenegro",
    room: "Room 202",
    alertTimestamp: "2024-09-29T13:00:00Z",
    attendedTimestamp: "2024-09-29T13:10:00Z",
    biometrics: {
      O2Saturation: 88,
      heartRate: 95,
      systolicBloodPressure: 140,
      diastolicBloodPressure: 90,
    },
    computerDiagnoses: [
      {
        diagnosis: "Low Oxygen Saturation",
        percentage: 85,
      },
      {
        diagnosis: "Hypertension",
        percentage: 75,
      },
    ],
    patient: {
      dni: "87654321",
      name: "Maria Rodriguez de la Cruz",
      currentLocation: "Room 202",
      finalDiagnosis: "Heart Disease",
      associatedDoctors: ["Dr. Lupita Montenegro"],
    },
  },
  {
    alertId: "ALERT-003",
    alertStatus: "Active",
    attendedBy: "Dr. Dominik Mendoza",
    room: "Room 303",
    alertTimestamp: "2024-09-29T14:20:00Z",
    attendedTimestamp: "2024-09-29T14:25:00Z",
    biometrics: {
      O2Saturation: 92,
      heartRate: 65,
      systolicBloodPressure: 110,
      diastolicBloodPressure: 70,
    },
    computerDiagnoses: [
      {
        diagnosis: "Bradycardia",
        percentage: 60,
      },
      {
        diagnosis: "Normal Blood Pressure",
        percentage: 90,
      },
    ],
    patient: {
      dni: "11223344",
      name: "Carlos Hernandez de la Rosa",
      currentLocation: "Room 303",
      finalDiagnosis: "Mild Bradycardia",
      associatedDoctors: ["Dr. Dominik Mendoza"],
    },
  },
];

export const resolvedAlerts: Alert[] = [
  {
    alertId: "ALERT-004",
    alertStatus: "Resolved",
    attendedBy: "Dr. Ana Sofia Martinez",
    room: "Room 404",
    alertTimestamp: "2024-09-28T10:00:00Z",
    attendedTimestamp: "2024-09-28T10:05:00Z",
    biometrics: {
      O2Saturation: 90,
      heartRate: 82,
      systolicBloodPressure: 130,
      diastolicBloodPressure: 85,
    },
    computerDiagnoses: [
      {
        diagnosis: "Hypoxia",
        percentage: 65,
      },
      {
        diagnosis: "Hypertension",
        percentage: 80,
      },
    ],
    patient: {
      dni: "99887766",
      name: "Lucia Gomez Perez",
      currentLocation: "Room 404",
      finalDiagnosis: "Chronic Hypertension",
      associatedDoctors: ["Dr. Ana Sofia Martinez"],
    },
  },
  {
    alertId: "ALERT-005",
    alertStatus: "Resolved",
    attendedBy: "Dr. Francisco Alvarez",
    room: "Room 505",
    alertTimestamp: "2024-09-27T09:30:00Z",
    attendedTimestamp: "2024-09-27T09:40:00Z",
    biometrics: {
      O2Saturation: 97,
      heartRate: 70,
      systolicBloodPressure: 115,
      diastolicBloodPressure: 75,
    },
    computerDiagnoses: [
      {
        diagnosis: "Normal Vitals",
        percentage: 98,
      },
    ],
    patient: {
      dni: "55667788",
      name: "Eduardo Ramirez Lopez",
      currentLocation: "Room 505",
      finalDiagnosis: "False Alarm",
      associatedDoctors: ["Dr. Francisco Alvarez"],
    },
  },
  {
    alertId: "ALERT-006",
    alertStatus: "Resolved",
    attendedBy: "Dr. Valeria Ortiz",
    room: "Room 606",
    alertTimestamp: "2024-09-26T11:15:00Z",
    attendedTimestamp: "2024-09-26T11:20:00Z",
    biometrics: {
      O2Saturation: 85,
      heartRate: 100,
      systolicBloodPressure: 150,
      diastolicBloodPressure: 95,
    },
    computerDiagnoses: [
      {
        diagnosis: "Tachycardia",
        percentage: 80,
      },
      {
        diagnosis: "Hypertension",
        percentage: 85,
      },
    ],
    patient: {
      dni: "33445566",
      name: "Fernando Torres Gutierrez",
      currentLocation: "Room 606",
      finalDiagnosis: "Acute Hypertension",
      associatedDoctors: ["Dr. Valeria Ortiz"],
    },
  },
  {
    alertId: "ALERT-007",
    alertStatus: "Resolved",
    attendedBy: "Dr. Camila Castillo",
    room: "Room 707",
    alertTimestamp: "2024-09-25T15:50:00Z",
    attendedTimestamp: "2024-09-25T15:55:00Z",
    biometrics: {
      O2Saturation: 93,
      heartRate: 88,
      systolicBloodPressure: 130,
      diastolicBloodPressure: 85,
    },
    computerDiagnoses: [
      {
        diagnosis: "Normal Blood Pressure",
        percentage: 90,
      },
      {
        diagnosis: "Moderate Tachycardia",
        percentage: 75,
      },
    ],
    patient: {
      dni: "22334455",
      name: "Laura Mendoza Rivera",
      currentLocation: "Room 707",
      finalDiagnosis: "Resolved Tachycardia",
      associatedDoctors: ["Dr. Camila Castillo"],
    },
  },
  {
    alertId: "ALERT-008",
    alertStatus: "Resolved",
    attendedBy: "Dr. Alejandro Fernandez",
    room: "Room 808",
    alertTimestamp: "2024-09-24T14:30:00Z",
    attendedTimestamp: "2024-09-24T14:35:00Z",
    biometrics: {
      O2Saturation: 94,
      heartRate: 68,
      systolicBloodPressure: 120,
      diastolicBloodPressure: 80,
    },
    computerDiagnoses: [
      {
        diagnosis: "Normal Vitals",
        percentage: 95,
      },
    ],
    patient: {
      dni: "66554433",
      name: "Isabella Ramirez Soto",
      currentLocation: "Room 808",
      finalDiagnosis: "Stable Condition",
      associatedDoctors: ["Dr. Alejandro Fernandez"],
    },
  },
];
