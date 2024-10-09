import useForm from "@/src/hooks/useForm";
import { LinkData } from "@/src/types/linkData";
import React from "react";
import ModalInput from "../../ui/inputs/ModalInput";
import Button from "../../ui/buttons/Button";
import { ButtonColor } from "@/src/enums/ButtonColor";

interface SensorLinkModalProps {
  onClose: () => void;
  onLink: (linkData: LinkData) => void;
}

const initialSensorLinkData = {
  sensorId: "",
  patientDni: "",
};

const SensorLinkModal: React.FC<SensorLinkModalProps> = ({
  onClose,
  onLink,
}) => {
  const { formValues, handleInputChange, handleSubmit } = useForm(
    initialSensorLinkData,
    onLink
  );

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="mb-6">Vincular Sensor</h1>
      <div className="flex flex-col gap-y-6 bg-white border border-border-primary rounded-lg p-6">
        <ModalInput
          name={"sensorId"}
          value={formValues.sensorId}
          onChange={handleInputChange}
          label="ID del Sensor"
        />
        <ModalInput
          name={"patientDni"}
          value={formValues.patientDni}
          onChange={handleInputChange}
          label="DNI de Paciente"
        />
      </div>
      <div className="flex flex-row justify-center gap-x-4 mt-6">
        <Button text={"Cancelar"} className="w-40" color={ButtonColor.SECONDARY} onClick={onClose} type="button"/>
        <Button text={"Vincular"} className="w-40" color={ButtonColor.SUCCESS} type="submit" />
      </div>
    </form>
  );
};

export default SensorLinkModal;
