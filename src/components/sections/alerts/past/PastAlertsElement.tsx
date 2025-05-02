import AlertDetailModal from "@/src/components/ui/modals/AlertDetailModal";
import ModalWrapper from "@/src/components/ui/wrappers/ModalWrapper";
import { Alert } from "@/src/types/alert";
import { formatDate, formatTime } from "@/src/utils/formatTime";
import React from "react";

interface PastAlertsElementsProps {
  alert: Alert;
}

const PastAlertsElement: React.FC<PastAlertsElementsProps> = ({
  alert,
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleDetails = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="table-row past-grid-cols xl:grid-cols-[10%_25%_25%_20%_20%] tableBp:grid-cols-[10%_20%_20%_20%_15%_15%]">
      <div className="cell-border table-row-group text-center">
        <p>{formatDate(alert.alert_timestamp)}</p>
        <p>{formatTime(alert.alert_timestamp)}</p>
      </div>
      <div className="cell-border table-row-group px-4">
        <p>{alert.patient.name}</p>
        <p className="table-row-subtitle">{alert.patient.dni}</p>
      </div>
      <div className="cell-border table-row-group px-4">
        <p>
          {alert.final_diagnosis === ""
            ? alert.computer_diagnostic.diagnosis
            : alert.final_diagnosis}
        </p>
        {alert.final_diagnosis === "" ? (
          <div className="table-row-subtitle table-row-icon">
            <span className="material-symbols-outlined">monitor</span>
            <p>DeepKer</p>
          </div>
        ) : (
          <div className="table-row-subtitle table-row-icon">
            <span className="material-symbols-outlined">person</span>
            <p>Médico</p>
          </div>
        )}
      </div>
      <div className="hidden tableBp:flex flex-col row-border h-full px-4">
        <p>{alert.attended_by.name}</p>
        <div className="table-row-subtitle">
          <p>{alert.attended_by.specialization}</p>
        </div>
      </div>
      <div className="hidden xl:flex row-border text-center items-center justify-center h-full">
        <p>{alert.attended_timestamp ? formatTime(alert.attended_timestamp) : "No se ha atendido"}</p>
      </div>
      <div
        className="flex items-center justify-center cursor-pointer text-gray-600 gap-x-4 px-4 h-full"
        onClick={handleDetails}
      >
        <p>VER DETALLE</p>
        <span className="material-symbols-outlined">arrow_forward_ios</span>
      </div>
      <ModalWrapper isOpen={isModalOpen} onClose={handleCloseModal} width="40rem">
        <AlertDetailModal alert={alert}/>
      </ModalWrapper>
    </div>
  );
};

export default PastAlertsElement;
