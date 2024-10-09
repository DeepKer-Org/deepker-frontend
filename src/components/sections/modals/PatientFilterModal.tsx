import React from "react";
import Button from "../../ui/buttons/Button";
import { ButtonColor } from "@/src/enums/ButtonColor";
import ModalInput from "../../ui/inputs/ModalInput";
import useForm from "@/src/hooks/useForm";
import { FilterData } from "@/src/types/filterData";

interface PatientFilterModalProps {
  onClose: () => void;
  onFilter: (filterData: FilterData) => void;
}

const initialFilterData: FilterData = {
  patientName: "",
  dni: "",
  age: "",
  doctorName: "",
  location: "",
  deviceId: "",
  risk: "",
  admissionDate: "",
  dischargeDate: "",
};

const PatientFilterModal: React.FC<PatientFilterModalProps> = ({
  onClose,
  onFilter,
}) => {
  const { formValues, handleInputChange, handleSubmit } = useForm(
    initialFilterData,
    onFilter
  );

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="mb-6">Búsqueda Avanzada</h1>
      <div className="grid grid-cols-4 grid-rows-3 gap-6 bg-white border border-border-primary rounded-lg p-6">
        <ModalInput
          name={"patientName"}
          value={formValues.patientName}
          onChange={handleInputChange}
          label="Nombre del Paciente"
          className="col-span-2"
        />
        <ModalInput
          name={"dni"}
          value={formValues.dni}
          onChange={handleInputChange}
          label="DNI"
        />
        <ModalInput
          name={"age"}
          value={formValues.age}
          type={"number"}
          onChange={handleInputChange}
          label="Edad"
        />
        <ModalInput
          name={"doctorName"}
          value={formValues.doctorName}
          onChange={handleInputChange}
          label="Doctor Asignado"
          className="col-span-2"
        />
        <ModalInput
          name={"location"}
          value={formValues.location}
          onChange={handleInputChange}
          label="Lugar"
        />
        <ModalInput
          name={"deviceId"}
          value={formValues.deviceId}
          onChange={handleInputChange}
          label="ID de Dispositivo"
        />
        <ModalInput
          name={"risk"}
          value={formValues.risk}
          onChange={handleInputChange}
          label="Riesgos Preexistentes"
          className="col-span-2"
        />
        <ModalInput
          name={"admissionDate"}
          value={formValues.admissionDate}
          type={"date"}
          onChange={handleInputChange}
          label="Fecha de Admisión"
        />
        <ModalInput
          name={"dischargeDate"}
          value={formValues.dischargeDate}
          type={"date"}
          onChange={handleInputChange}
          label="Fecha de Alta"
        />
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
          type="submit"
          className="w-40"
        />
      </div>
    </form>
  );
};

export default PatientFilterModal;
