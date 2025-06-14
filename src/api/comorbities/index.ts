import { authenticatedFetch } from "@/src/api/authenticatedFetch";
import { ComorbiditiesResponse } from "@/src/types/comorbidity";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export const fetchComorbidities = async (): Promise<ComorbiditiesResponse> => {
  const res = await authenticatedFetch(
    `${API_BASE_URL}/comorbidities`,
    { method: "GET" }
  );
  const data = await res.json();

  return {
    comorbidities: data.comorbidities,
  };
};