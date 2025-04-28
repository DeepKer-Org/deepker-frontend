import React from "react";
import Button from "../buttons/Button";
import { ButtonColor } from "@/src/enums/ButtonColor";
import { Alert, AlertMarkAttendanceRequest } from "@/src/types/alert";
import { updateAlert } from "@/src/api/alerts";
import { enqueueSnackbar } from "notistack";

const LiberateConfirmationModal = ({
  setLiberateModal,
  alert,
  onAlertUpdate,
}: {
  setLiberateModal: (modal: boolean) => void;
  alert: Alert;
  onAlertUpdate: () => void;
}) => {


  const handleLiberate = async () => {
    const alertMarkAttendanceRequest: AlertMarkAttendanceRequest = {
      attended_by_id: null,
      attended_timestamp: null,
    };
    try {
      await updateAlert(alert.alert_id, alertMarkAttendanceRequest);
      enqueueSnackbar("¡Liberación exitosa!", {
        variant: "success",
      });
      onAlertUpdate();
    } catch {
      enqueueSnackbar(
        "Error al liberar la alerta. Por favor, intente de nuevo.",
        {
          variant: "error",
        }
      );
    }
    setLiberateModal(false);
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="mb-6 text-center text-xl">Confirmación de Liberación</h2>
      <p className="mb-8 mx-12 text-center">
        ¿Está seguro de que quiere liberar la alerta de este paciente?
      </p>
      <div className="flex flex-row justify-center gap-x-4">
        <Button
          text="Cancelar"
          color={ButtonColor.SECONDARY}
          onClick={() => setLiberateModal(false)}
        />
        <Button
          text="Liberar"
          color={ButtonColor.DANGER}
          onClick={handleLiberate}
        />
      </div>
    </div>
  );
};

export default LiberateConfirmationModal;
