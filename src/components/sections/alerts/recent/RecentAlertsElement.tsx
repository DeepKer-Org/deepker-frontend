import { Alert, AlertUpdateRequest } from "@/src/types/alert";
import { formatDate, formatTime } from "@/src/utils/formatTime";
import { useRouter } from "next/navigation";
import React from "react";
import { updateAlert } from "@/src/api/alerts";
import { enqueueSnackbar } from "notistack";
import ModalWrapper from "@/src/components/ui/wrappers/ModalWrapper";
import LiberateConfirmationModal from "@/src/components/ui/modals/LiberateConfirmationModal";

interface RecentAlertsElementsProps {
  alert: Alert;
  onAlertUpdate: () => void;
  doctorId: string | undefined;
}

const RecentAlertsElement: React.FC<RecentAlertsElementsProps> = ({
  alert,
  onAlertUpdate,
  doctorId,
}) => {
  const router = useRouter();
  const handleDetails = () => {
    router.push(`/alerts/recent/${alert.alert_id}`);
  };
  const [liberateModal, setLiberateModal] = React.useState(false);

  const handleMarkAttendance = async () => {
    const alertMarkAttendanceRequest: AlertUpdateRequest = {
      attended_by_id: doctorId!,
      attended_timestamp: new Date().toISOString(),
    };
    try {
      await updateAlert(alert.alert_id, alertMarkAttendanceRequest);
      enqueueSnackbar("¡Asistencia marcada exitosamente!", {
        variant: "success",
      });
      onAlertUpdate();
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
    <div className="table-row recent-grid-cols tableBp:grid-cols-[10%_20%_10%_20%_23%_17%]">
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
        {alert.attended_timestamp === "" ? (
          <div className="table-attend w-2/3 cursor-pointer" onClick={handleMarkAttendance}>ATENDER</div>
        ) : alert.attended_by.doctor_id !== doctorId ? (
          <div className="table-in-attention w-2/3">EN ATENCIÓN</div>
        ) : (
          <div className="table-unlink w-2/3 cursor-pointer" onClick={() => setLiberateModal(true)}>LIBERAR</div>
        )}
        <div
          className="flex items-center justify-center w-1/3 cursor-pointer"
          onClick={handleDetails}
        >
          <span className="material-symbols-outlined text-gray-600 p-4">
            arrow_forward_ios
          </span>
        </div>
      </div>
      <ModalWrapper isOpen={liberateModal} onClose={() => setLiberateModal(false)}>
        <LiberateConfirmationModal setLiberateModal={setLiberateModal} alert={alert} onAlertUpdate={onAlertUpdate} />
      </ModalWrapper>
    </div>
  );
};

export default RecentAlertsElement;
