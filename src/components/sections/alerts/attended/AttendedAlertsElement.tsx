import { Alert } from "@/src/types/alert";
import { formatDate, formatTime } from "@/src/utils/formatTime";
import { useRouter } from "next/navigation";
import React from "react";

interface AttendedAlertsElementsProps {
  alert: Alert;
}

const AttendedAlertsElement: React.FC<AttendedAlertsElementsProps> = ({
  alert,
}) => {
  const router = useRouter();
  const handleDetails = () => {
    router.push(`/alerts/attended/${alert.alert_id}`);
  };

  return (
    <div className="table-row attended-grid-cols xl:grid-cols-[15%_22%_10%_22%_15%_16%] tableBp:grid-cols-[10%_20%_8%_17%_19%_12%_14%]">
      <div className="cell-border table-row-group text-center">
        <p>{formatDate(alert.alert_timestamp)}</p>
        <p>{formatTime(alert.alert_timestamp)}</p>
      </div>
      <div className="cell-border table-row-group px-4">
        <p>{alert.patient.name}</p>
        <p className="table-row-subtitle">{alert.patient.dni}</p>
      </div>
      <div className="hidden xl:flex row-border text-center items-center justify-center h-full">
        {alert.room}
      </div>
      <div className="cell-border table-row-group px-4">
        <p>{alert.patient.final_diagnosis}</p>
        <div className="table-row-subtitle table-row-icon">
          <span className="material-symbols-outlined">monitor</span>
          <p>DeepKer</p>
        </div>
      </div>
      <div className="hidden tableBp:flex flex-col row-border h-full px-4">
        <p>{alert.attended_by.name}</p>
        <div className="table-row-subtitle">
          <p>{alert.attended_by.specialization}</p>
        </div>
      </div>
      <div className="hidden xl:flex row-border text-center items-center justify-center h-full">
        <p>{formatTime(alert.attended_timestamp)}</p>
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

export default AttendedAlertsElement;
