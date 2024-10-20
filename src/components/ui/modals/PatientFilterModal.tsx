import React, { useEffect, useState } from "react";
import Button from "../buttons/Button";
import { ButtonColor } from "@/src/enums/ButtonColor";
import ModalInput from "../inputs/ModalInput";
import useForm from "@/src/hooks/useForm";
import { PatientsQueryParams } from "@/src/types/patient";
import { fetchDoctors } from "@/src/api/doctors"; // Assuming this function is already implemented
import { Doctor } from "@/src/types/doctor"; // Assuming the Doctor interface is already defined

interface PatientFilterModalProps {
    onClose: () => void;
    onFilter: (filterData: PatientsQueryParams) => void;
}

const initialFilterData: PatientsQueryParams = {
    name: "",
    dni: "",
    age: undefined,
    doctor_id: "",
    location: "",
    device_id: "",
    comorbidity: "",
    entry_date: "",
    discharge_date: "",
};

const PatientFilterModal: React.FC<PatientFilterModalProps> = ({
                                                                   onClose,
                                                                   onFilter,
                                                               }) => {
    const { formValues, handleInputChange, handleSubmit, setFormValues } = useForm(
        initialFilterData,
        onFilter
    );

    const [doctors, setDoctors] = useState<Doctor[]>([]); // Store the list of doctors
    const [isLoadingDoctors, setIsLoadingDoctors] = useState(true);

    // Fetch the list of doctors when the component loads
    useEffect(() => {
        const loadDoctors = async () => {
            try {
                const doctorsList = await fetchDoctors();
                setDoctors(doctorsList.doctors);
            } catch (err) {
                console.error("Failed to load doctors:", err);
            } finally {
                setIsLoadingDoctors(false);
            }
        };

        loadDoctors();
    }, []);

    const handleDoctorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // Directly update form values for doctor_id
        setFormValues((prevValues) => ({
            ...prevValues,
            doctor_id: e.target.value,
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="mb-6">Búsqueda Avanzada</h1>
            <div className="grid grid-cols-4 grid-rows-3 gap-6 bg-white border border-border-primary rounded-lg p-6">
                <ModalInput
                    name={"name"}
                    value={formValues.name || ""}
                    onChange={handleInputChange}
                    label="Nombre del paciente"
                    className="col-span-2"
                />
                <ModalInput
                    name={"dni"}
                    value={formValues.dni || ""}
                    onChange={handleInputChange}
                    label="DNI"
                />
                <ModalInput
                    name={"age"}
                    value={formValues.age?.toString() || ""}
                    type={"number"}
                    onChange={handleInputChange}
                    label="Edad"
                />

                {/* Doctor Dropdown */}
                <div className="col-span-2" style={{ position: 'relative', width: '100%' }}>
                    <label htmlFor="doctor_id" className="block mb-2 text-sm">
                        Doctor asignado
                    </label>
                    <select
                        id="doctor_id"
                        name="doctor_id"
                        value={formValues.doctor_id || ""}
                        onChange={handleDoctorChange}
                        className="modal__dropdown"
                        disabled={isLoadingDoctors} // Disable dropdown while loading
                    >
                        <option value="">Selecciona un doctor</option>
                        {!isLoadingDoctors &&
                            doctors.map((doctor) => (
                                <option key={doctor.doctor_id} value={doctor.doctor_id}>
                                    {doctor.name} ({doctor.specialization})
                                </option>
                            ))}
                    </select>
                    <div
                        style={{
                            position: 'absolute',
                            top: '70%',
                            right: '0.8rem',
                            transform: 'translateY(-50%)',
                            pointerEvents: 'none',
                        }}
                    >
                        {/* Custom arrow as SVG */}
                        <svg width="10" height="10" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 6L0 0H10L5 6Z" fill="black" />
                        </svg>
                    </div>
                </div>

                <ModalInput
                    name={"location"}
                    value={formValues.location || ""}
                    onChange={handleInputChange}
                    label="Lugar"
                />
                <ModalInput
                    name={"device_id"}
                    value={formValues.device_id || ""}
                    onChange={handleInputChange}
                    label="Identificado del dispositivo"
                />
                <ModalInput
                    name={"comorbidity"}
                    value={formValues.comorbidity || ""}
                    onChange={handleInputChange}
                    label="Riesgo preexistente"
                    className="col-span-2"
                />
                <ModalInput
                    name={"entry_date"}
                    value={formValues.entry_date || ""}
                    type={"date"}
                    onChange={handleInputChange}
                    label="Fecha de ingreso"
                />
                <ModalInput
                    name={"discharge_date"}
                    value={formValues.discharge_date || ""}
                    type={"date"}
                    onChange={handleInputChange}
                    label="Última fecha de alta"
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
