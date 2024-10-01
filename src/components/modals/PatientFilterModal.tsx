import React from "react";
import Button from "../ui/Button";
import { ButtonColor } from "@/src/enums/ButtonColor";
import ModalInput from "../ui/ModalInput";

interface PatientFilterModalProps {
  onClose: () => void;
  onFilter: () => void;
}

const PatientFilterModal: React.FC<PatientFilterModalProps> = ({
  onClose,
  onFilter,
}) => {
  return (
    <div>
      <h1 className="mb-6">Búsqueda Avanzada</h1>
      <div className="grid grid-cols-4 grid-rows-3 gap-6 bg-white border border-border-primary rounded-lg p-6">
        <ModalInput label="Nombre del Paciente" className="col-span-2" />
        <ModalInput label="Nombre del Paciente" />
        <ModalInput label="Nombre del Paciente" />
        <ModalInput label="Nombre del Paciente" className="col-span-2" />
        <ModalInput label="Nombre del Paciente" />
        <ModalInput label="Nombre del Paciente" />
        <ModalInput label="Nombre del Paciente" className="col-span-2" />
        <ModalInput label="Nombre del Paciente" />
        <ModalInput label="Nombre del Paciente" />
      </div>
      <div className="w-full flex justify-end gap-x-4 mt-8">
        <Button
          text={"Cancelar"}
          color={ButtonColor.SECONDARY}
          onClick={onClose}
          className="w-40"
        />
        <Button
          text={"Filtrar"}
          color={ButtonColor.PRIMARY}
          onClick={onFilter}
          className="w-40"
        />
      </div>
    </div>
  );
};

export default PatientFilterModal;
