import { Alert } from "@/src/types/alert";
import { formatDate, formatTime } from "@/src/utils/formatTime";
import React from "react";

interface ActiveAlertsElementsProps {
  alert: Alert;
}

const ActiveAlertsElement: React.FC<ActiveAlertsElementsProps> = ({
  alert,
}) => {
  return (
    <div className="table-row active-grid-cols ecgBp:grid-cols-[8%_20%_10%_20%_30%_12%]">
      <div className="row-border table-row-group text-center">
        <p>{formatDate(alert.alertTimestamp)}</p>
        <p>{formatTime(alert.alertTimestamp)}</p>
      </div>
      <div className="row-border table-row-group px-4">
        <p>{alert.patient.name}</p>
        <p className="table-row-subtitle">{alert.patient.dni}</p>
      </div>
      <div className="row-border table-row-group text-center">{alert.room}</div>
      <div className="row-border table-row-group px-4">
        <p>{alert.patient.finalDiagnosis}</p>
        <div className="table-row-subtitle table-row-icon">
          <span className="material-symbols-outlined">monitor</span>
          <p>DeepKer</p>
        </div>
      </div>
      <div className="row-border flex flex-row">
        <div className="w-9/12 bg-red-100 hidden ecgBp:flex justify-center items-center">
          <p>ECG</p>
        </div>
        <div className="w-full ecgBp:w-3/12 grid grid-rows-2">
          <div className="table-row-icon border-b-border-primary border w-full justify-center">
            <span className="material-symbols-outlined text-red-500">
              favorite
            </span>
            <p>{alert.biometrics.O2Saturation} %</p>
          </div>
          <div className="table-row-icon justify-center">
            <span className="material-symbols-outlined text-blue-500">
              monitor_heart
            </span>
            <p>{alert.biometrics.heartRate} bpm</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row h-full">
        <div className="table-attend w-2/3">ATENDER</div>
        <div className="flex items-center justify-center w-1/3">
          <span className="material-symbols-outlined text-gray-600 p-4">
            arrow_forward_ios
          </span>
        </div>
      </div>
    </div>
  );
};

export default ActiveAlertsElement;
