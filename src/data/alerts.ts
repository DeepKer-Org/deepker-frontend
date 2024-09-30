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
        diastolicBloodPressure: 80
      },
      computerDiagnoses: [
        {
          diagnosis: "Tachycardia",
          percentage: 70
        },
        {
          diagnosis: "Normal O2 Saturation",
          percentage: 95
        }
      ],
      patient: {
        dni: "12345678",
        name: "Jonathan Franco Fernandes",
        currentLocation: "Room 101",
        finalDiagnosis: "Hypertension",
        associatedDoctors: ["Dr. Juanita Jones", "Dr. Pedro Martinez"]
      }
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
        diastolicBloodPressure: 90
      },
      computerDiagnoses: [
        {
          diagnosis: "Low Oxygen Saturation",
          percentage: 85
        },
        {
          diagnosis: "Hypertension",
          percentage: 75
        }
      ],
      patient: {
        dni: "87654321",
        name: "Maria Rodriguez de la Cruz",
        currentLocation: "Room 202",
        finalDiagnosis: "Heart Disease",
        associatedDoctors: ["Dr. Lupita Montenegro"]
      }
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
        diastolicBloodPressure: 70
      },
      computerDiagnoses: [
        {
          diagnosis: "Bradycardia",
          percentage: 60
        },
        {
          diagnosis: "Normal Blood Pressure",
          percentage: 90
        }
      ],
      patient: {
        dni: "11223344",
        name: "Carlos Hernandez de la Rosa",
        currentLocation: "Room 303",
        finalDiagnosis: "Mild Bradycardia",
        associatedDoctors: ["Dr. Dominik Mendoza"]
      }
    }
  ];
