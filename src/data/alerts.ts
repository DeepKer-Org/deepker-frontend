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
  {
    alertId: "ALERT-009",
    alertStatus: "Resolved",
    attendedBy: "Dr. Sofia Rodriguez",
    room: "Room 909",
    alertTimestamp: "2024-09-23T10:10:00Z",
    attendedTimestamp: "2024-09-23T10:20:00Z",
    biometrics: {
      O2Saturation: 92,
      heartRate: 75,
      systolicBloodPressure: 128,
      diastolicBloodPressure: 82,
    },
    computerDiagnoses: [
      {
        diagnosis: "Hypertension",
        percentage: 70,
      },
    ],
    patient: {
      dni: "12345678",
      name: "Carlos Mendez",
      currentLocation: "Room 909",
      finalDiagnosis: "Controlled Hypertension",
      associatedDoctors: ["Dr. Sofia Rodriguez"],
    },
  },
  {
    alertId: "ALERT-010",
    alertStatus: "Resolved",
    attendedBy: "Dr. Roberto Gonzalez",
    room: "Room 1010",
    alertTimestamp: "2024-09-22T13:00:00Z",
    attendedTimestamp: "2024-09-22T13:10:00Z",
    biometrics: {
      O2Saturation: 95,
      heartRate: 80,
      systolicBloodPressure: 122,
      diastolicBloodPressure: 78,
    },
    computerDiagnoses: [
      {
        diagnosis: "Normal Vitals",
        percentage: 95,
      },
    ],
    patient: {
      dni: "11223344",
      name: "Maria Gonzalez",
      currentLocation: "Room 1010",
      finalDiagnosis: "Routine Checkup",
      associatedDoctors: ["Dr. Roberto Gonzalez"],
    },
  },
  {
    alertId: "ALERT-011",
    alertStatus: "Resolved",
    attendedBy: "Dr. Julia Vega",
    room: "Room 1111",
    alertTimestamp: "2024-09-21T16:20:00Z",
    attendedTimestamp: "2024-09-21T16:25:00Z",
    biometrics: {
      O2Saturation: 90,
      heartRate: 85,
      systolicBloodPressure: 132,
      diastolicBloodPressure: 86,
    },
    computerDiagnoses: [
      {
        diagnosis: "Mild Hypoxia",
        percentage: 60,
      },
    ],
    patient: {
      dni: "99887755",
      name: "Jose Fernandez",
      currentLocation: "Room 1111",
      finalDiagnosis: "Controlled Hypoxia",
      associatedDoctors: ["Dr. Julia Vega"],
    },
  },
  {
    alertId: "ALERT-012",
    alertStatus: "Resolved",
    attendedBy: "Dr. Carlos Lopez",
    room: "Room 1212",
    alertTimestamp: "2024-09-20T14:45:00Z",
    attendedTimestamp: "2024-09-20T14:50:00Z",
    biometrics: {
      O2Saturation: 88,
      heartRate: 95,
      systolicBloodPressure: 145,
      diastolicBloodPressure: 90,
    },
    computerDiagnoses: [
      {
        diagnosis: "Tachycardia",
        percentage: 78,
      },
    ],
    patient: {
      dni: "77665544",
      name: "Diego Alvarez",
      currentLocation: "Room 1212",
      finalDiagnosis: "Severe Tachycardia",
      associatedDoctors: ["Dr. Carlos Lopez"],
    },
  },
  {
    alertId: "ALERT-013",
    alertStatus: "Resolved",
    attendedBy: "Dr. Laura Ruiz",
    room: "Room 1313",
    alertTimestamp: "2024-09-19T11:10:00Z",
    attendedTimestamp: "2024-09-19T11:15:00Z",
    biometrics: {
      O2Saturation: 93,
      heartRate: 72,
      systolicBloodPressure: 120,
      diastolicBloodPressure: 80,
    },
    computerDiagnoses: [
      {
        diagnosis: "Normal Vitals",
        percentage: 92,
      },
    ],
    patient: {
      dni: "33447788",
      name: "Sofia Martinez",
      currentLocation: "Room 1313",
      finalDiagnosis: "Stable Condition",
      associatedDoctors: ["Dr. Laura Ruiz"],
    },
  },
  {
    alertId: "ALERT-014",
    alertStatus: "Resolved",
    attendedBy: "Dr. Hugo Santos",
    room: "Room 1414",
    alertTimestamp: "2024-09-18T12:35:00Z",
    attendedTimestamp: "2024-09-18T12:40:00Z",
    biometrics: {
      O2Saturation: 89,
      heartRate: 90,
      systolicBloodPressure: 135,
      diastolicBloodPressure: 88,
    },
    computerDiagnoses: [
      {
        diagnosis: "Hypertension",
        percentage: 70,
      },
    ],
    patient: {
      dni: "22335566",
      name: "Luis Hernandez",
      currentLocation: "Room 1414",
      finalDiagnosis: "Controlled Hypertension",
      associatedDoctors: ["Dr. Hugo Santos"],
    },
  },
  {
    alertId: "ALERT-015",
    alertStatus: "Resolved",
    attendedBy: "Dr. Paula Moreno",
    room: "Room 1515",
    alertTimestamp: "2024-09-17T08:20:00Z",
    attendedTimestamp: "2024-09-17T08:25:00Z",
    biometrics: {
      O2Saturation: 91,
      heartRate: 76,
      systolicBloodPressure: 125,
      diastolicBloodPressure: 82,
    },
    computerDiagnoses: [
      {
        diagnosis: "Hypoxia",
        percentage: 60,
      },
    ],
    patient: {
      dni: "66553322",
      name: "Carlos Ruiz",
      currentLocation: "Room 1515",
      finalDiagnosis: "Hypoxia",
      associatedDoctors: ["Dr. Paula Moreno"],
    },
  },
  {
    alertId: "ALERT-016",
    alertStatus: "Resolved",
    attendedBy: "Dr. Marta Suarez",
    room: "Room 1616",
    alertTimestamp: "2024-09-16T10:40:00Z",
    attendedTimestamp: "2024-09-16T10:45:00Z",
    biometrics: {
      O2Saturation: 95,
      heartRate: 68,
      systolicBloodPressure: 118,
      diastolicBloodPressure: 77,
    },
    computerDiagnoses: [
      {
        diagnosis: "Normal Vitals",
        percentage: 99,
      },
    ],
    patient: {
      dni: "99885522",
      name: "Elena Diaz",
      currentLocation: "Room 1616",
      finalDiagnosis: "Normal Vitals",
      associatedDoctors: ["Dr. Marta Suarez"],
    },
  },
  {
    alertId: "ALERT-017",
    alertStatus: "Resolved",
    attendedBy: "Dr. Ricardo Vazquez",
    room: "Room 1717",
    alertTimestamp: "2024-09-15T09:50:00Z",
    attendedTimestamp: "2024-09-15T09:55:00Z",
    biometrics: {
      O2Saturation: 87,
      heartRate: 92,
      systolicBloodPressure: 138,
      diastolicBloodPressure: 89,
    },
    computerDiagnoses: [
      {
        diagnosis: "Tachycardia",
        percentage: 70,
      },
    ],
    patient: {
      dni: "44332211",
      name: "Miguel Lopez",
      currentLocation: "Room 1717",
      finalDiagnosis: "Mild Tachycardia",
      associatedDoctors: ["Dr. Ricardo Vazquez"],
    },
  },
];
