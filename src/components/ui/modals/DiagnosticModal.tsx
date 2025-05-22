import React from "react";
import { Alert, AlertUpdateRequest } from "@/src/types/alert";
import ModalInput from "../inputs/border/ModalInput";
import CheckboxInput from "../inputs/CheckboxInput";
import Button from "../buttons/Button";
import { ButtonColor } from "@/src/enums/ButtonColor";
import { updateAlert } from "@/src/api/alerts";
import { enqueueSnackbar } from "notistack";

interface DiagnosticModalProps {
  alert: Alert;
  isOpen: boolean;
  onClose: () => void;
  onAlertUpdate: () => void;
}

const DiagnosticModal: React.FC<DiagnosticModalProps> = ({
  alert,
  onClose,
  onAlertUpdate,
}) => {
  const [formValues, setFormValues] = React.useState({
    diagnosis: "",
  });
  const [acceptTerms, setAcceptTerms] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const alertDiagnosisRequest: AlertUpdateRequest = {
      final_diagnosis: formValues.diagnosis,
    };

    try {
      await updateAlert(alert.alert_id, alertDiagnosisRequest);
      enqueueSnackbar("¡Diagnóstico actualizado exitosamente!", {
        variant: "success",
      });
      onClose();
      onAlertUpdate();
    } catch {
      enqueueSnackbar(
        "Error al actualizar el diagnóstico. Por favor, intente de nuevo.",
        {
          variant: "error",
        }
      );
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="mb-6">Diagnóstico Médico</h1>
      <div className="bg-white border border-border-primary rounded-lg p-6 mb-10 space-y-3">
        <ModalInput
          name={"diagnosis"}
          value={formValues.diagnosis || ""}
          onChange={handleInputChange}
          label="Diagnóstico"
          className="col-span-2"
        />
        <p className="text-sm font-normal">
          Como especialista en cardiología, confirmo que he revisado
          exhaustivamente el diagnóstico con el paciente, garantizando su
          veracidad. Este será compartido con otros especialistas para
          evaluación.
        </p>
        <p className="font-semibold text-sm">
          Luego de esta acción no se podrá liberar la alerta.
        </p>
        <CheckboxInput
          label="Acepto los términos y condiciones"
          checked={acceptTerms}
          onChange={(e) => setAcceptTerms(e)}
        />
      </div>
      <div className="flex flex-row justify-end gap-4">
        <Button
          text="Cancelar"
          color={ButtonColor.SECONDARY}
          onClick={onClose}
          className="w-40"
        />
        <Button
          text="Diagnosticar"
          disabled={!acceptTerms || formValues.diagnosis === ""}
          color={ButtonColor.PRIMARY}
          type="submit"
          className="w-40"
        />
      </div>
    </form>
  );
};

export default DiagnosticModal;
