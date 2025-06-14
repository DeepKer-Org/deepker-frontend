export interface Comorbidity {
  comorbidity_id: string;
  patient_id: string;
  comorbidity: string;
}

export interface ComorbiditiesResponse {
  comorbidities: Comorbidity[];
}