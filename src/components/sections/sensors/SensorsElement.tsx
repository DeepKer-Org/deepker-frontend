import { Sensor } from "@/src/types/sensor";
import { useRouter } from "next/navigation";
import React from "react";
import Button from "../../ui/buttons/Button";
import { ButtonColor } from "@/src/enums/ButtonColor";
interface SensorsElementProps {
  sensor: Sensor;
}

const SensorsElement: React.FC<SensorsElementProps> = ({ sensor }) => {
  const router = useRouter();
  const handleDetails = () => {
    router.push(`/patients/${sensor.patient.patientId}`);
  };

  const handleUnlink = () => {
    console.log("Unlink sensor");
  };

  return (
    <div className="table-row sensor-grid-cols tableBp:grid-cols-[20%_25%_25%_30%]">
      <div className="cell-border table-row-group px-4">
        <p>{sensor.sensorId}</p>
      </div>
      <div className="cell-border table-row-group px-4">
        <p>{sensor.patient.name}</p>
        <p className="table-row-subtitle">{sensor.patient.dni}</p>
      </div>
      <div className="hidden tableBp:flex flex-col h-full row-border px-4">
        <p>{sensor.linkedBy}</p>
        <p className="table-row-subtitle">{sensor.linkedBy}</p>
      </div>
      <div className="flex flex-row h-full">
        <div className="flex w-1/2 justify-center h-full items-center cell-border">
            <div className="table-unlink cursor-pointer w-full" onClick={handleUnlink}>DESVINCULAR</div>
        </div>
        <div
          className="flex w-1/2 items-center justify-center cursor-pointer text-gray-600 gap-x-4 px-4 h-full"
          onClick={handleDetails}
        >
          <p>VER PACIENTE</p>
          <span className="material-symbols-outlined">arrow_forward_ios</span>
        </div>
      </div>
    </div>
  );
};

export default SensorsElement;
