export type Sensor = {
  sensorId: string;
  patient: Patient
  linkedBy: string;
};

type Patient = {
    patientId: string;
    dni: string;
    name: string;
}
