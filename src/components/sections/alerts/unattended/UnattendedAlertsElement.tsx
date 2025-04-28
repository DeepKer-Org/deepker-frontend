import { Alert, AlertMarkAttendanceRequest } from "@/src/types/alert";
import { formatDate, formatTime } from "@/src/utils/formatTime";
import { useRouter } from "next/navigation";
import React from "react";
import { updateAlert } from "@/src/api/alerts";
import { enqueueSnackbar } from "notistack";
import { useAuth } from "@/src/context/AuthContext";

interface UnattendedAlertsElementsProps {
  alert: Alert;
  onAlertUpdate: () => void;
}

const UnattendedAlertsElement: React.FC<UnattendedAlertsElementsProps> = ({
  alert,
  onAlertUpdate,
}) => {
  const router = useRouter();
  const { doctorId } = useAuth();
  const handleDetails = () => {
    router.push(`/alerts/unattended/${alert.alert_id}`);
  };

  const handleMarkAttendance = async () => {
    const alertMarkAttendanceRequest: AlertMarkAttendanceRequest = {
      attended_by_id: doctorId!,
      attended_timestamp: new Date().toISOString(),
    };
    try {
      await updateAlert(alert.alert_id, alertMarkAttendanceRequest);
      enqueueSnackbar("¡Asistencia marcada exitosamente!", {
        variant: "success",
      });
      onAlertUpdate(); // Trigger data reload in parent component
    } catch {
      enqueueSnackbar(
        "Error al marcar la asistencia. Por favor, intente de nuevo.",
        {
          variant: "error",
        }
      );
    }
  };

  return (
    <div className="table-row unattended-grid-cols tableBp:grid-cols-[10%_20%_10%_20%_25%_15%]">
      <div className="cell-border table-row-group text-center">
        <p>{formatDate(alert.alert_timestamp)}</p>
        <p>{formatTime(alert.alert_timestamp)}</p>
      </div>
      <div className="cell-border table-row-group px-4">
        <p>{alert.patient.name}</p>
        <p className="table-row-subtitle">{alert.patient.dni}</p>
      </div>
      <div className="cell-border table-row-group text-center">
        {alert.patient.location}
      </div>
      <div className="cell-border table-row-group px-4">
        <p>
          {alert.computer_diagnostic
            ? alert.computer_diagnostic.diagnosis
            : "-"}
        </p>
        <div className="table-row-subtitle table-row-icon">
          <span className="material-symbols-outlined">monitor</span>
          <p>DeepKer</p>
        </div>
      </div>
      <div className="hidden tableBp:flex flex-col row-border">
        <div className="w-full grid grid-cols-2 h-full">
          <div className="table-row-icon border-r-border-primary border w-full justify-center">
            <span className="material-symbols-outlined text-red-500">
              favorite
            </span>
            <p>{alert.biometric_data.o2_saturation} %</p>
          </div>
          <div className="table-row-icon justify-center">
            <span className="material-symbols-outlined text-blue-500">
              monitor_heart
            </span>
            <p>{alert.biometric_data.heart_rate} bpm</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row h-full">
        <div
          className="table-attend w-2/3 cursor-pointer"
          onClick={handleMarkAttendance}
        >
          ATENDER
        </div>
        <div
          className="flex items-center justify-center w-1/3 cursor-pointer"
          onClick={handleDetails}
        >
          <span className="material-symbols-outlined text-gray-600 p-4">
            arrow_forward_ios
          </span>
        </div>
      </div>
    </div>
  );
};

export default UnattendedAlertsElement;
