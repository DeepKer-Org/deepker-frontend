import React, { useEffect, useState } from "react";
import Button from "../buttons/Button";
import { ButtonColor } from "@/src/enums/ButtonColor";
import ModalInput from "@/src/components/ui/inputs/border/ModalInput";
import useForm from "@/src/hooks/useForm";
import { PatientsQueryParams } from "@/src/types/patient";
import { fetchDoctors } from "@/src/api/doctors";
import { Doctor } from "@/src/types/doctor";
import { Comorbidity } from "@/src/types/comorbidity";
import { fetchComorbidities } from "@/src/api/comorbities";

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

    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [comorbidities, setComorbidities] = useState<Comorbidity[]>([]);
    const [isLoadingDoctors, setIsLoadingDoctors] = useState(true);
    const [isLoadingComorbidities, setIsLoadingComorbidities] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const doctorsList = await fetchDoctors();
                setDoctors(doctorsList.doctors);

                const comorbiditiesList = await fetchComorbidities();
                setComorbidities(comorbiditiesList.comorbidities);
            } catch (err) {
                console.error("Failed to load data:", err);
            } finally {
                setIsLoadingDoctors(false);
                setIsLoadingComorbidities(false);
            }
        };

        loadData();
    }, []);

    const handleDoctorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            doctor_id: e.target.value,
        }));
    };

    const handleComorbidityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            comorbidity: e.target.value,
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-between mb-6">
                <h1>Búsqueda Avanzada</h1>
                <p className="text-sm text-gray-600">Todos los filtros son opcionales</p>
            </div>
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
                        disabled={isLoadingDoctors}
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
                {/* Comorbidity Dropdown */}
                <div className="col-span-2" style={{ position: 'relative', width: '100%' }}>
                    <label htmlFor="comorbidity" className="block mb-2 text-sm">
                        Riesgo preexistente
                    </label>
                    <select
                        id="comorbidity"
                        name="comorbidity"
                        value={formValues.comorbidity || ""}
                        onChange={handleComorbidityChange}
                        className="modal__dropdown"
                        disabled={isLoadingComorbidities}
                    >
                        <option value="">Selecciona un riesgo preexistente</option>
                        {!isLoadingComorbidities &&
                            comorbidities.map((comorbidity) => (
                                <option key={comorbidity.comorbidity_id} value={comorbidity.comorbidity}>
                                    {comorbidity.comorbidity}
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
                        <svg width="10" height="10" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 6L0 0H10L5 6Z" fill="black" />
                        </svg>
                    </div>
                </div>
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
