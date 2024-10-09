import { Patient } from "@/src/types/patient";
import { useRouter } from "next/navigation";
import React from "react";

interface PatientsElementProps {
  patient: Patient;
}

const PatientsElement: React.FC<PatientsElementProps> = ({ patient }) => {
  const router = useRouter();
  const handleDetails = () => {
    router.push(`/patients/${patient.patientId}`);
  };

  return (
    <div className="table-row patient-grid-cols xl:grid-cols-[22%_12%_12%_22%_16%_16%] tableBp:grid-cols-[20%_9%_7%_21%_13%_14%_16%]">
      <div className="cell-border table-row-group px-4">
        <p>{patient.name}</p>
      </div>
      <div className="cell-border table-row-group px-4 text-center">
        <p>{patient.dni}</p>
      </div>
      <div className="cell-border table-row-group px-4 text-center">
        <p>{patient.age}</p>
      </div>
      <div className="cell-border table-row-group px-4">
        <p>{patient.medicalStaff[0]}</p>
        <div className="table-row-subtitle">
          <p>{patient.medicalStaff[0]}</p>
        </div>
      </div>
      <div className="hidden xl:flex row-border items-center px-4 text-center">
        <p>{patient.location}</p>
      </div>
      <div className="hidden tableBp:flex row-border items-center px-4 text-center">
        <p>Entry Date</p>
      </div>
      <div
        className="flex items-center justify-center cursor-pointer text-gray-600 gap-x-4 px-4 h-full"
        onClick={handleDetails}
      >
        <p>VER DETALLE</p>
        <span className="material-symbols-outlined">arrow_forward_ios</span>
      </div>
    </div>
  );
};

export default PatientsElement;
