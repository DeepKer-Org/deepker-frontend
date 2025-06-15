import React, { useEffect, useState } from "react";
import Button from "../buttons/Button";
import { ButtonColor } from "@/src/enums/ButtonColor";
import ModalInput from "@/src/components/ui/inputs/border/ModalInput";
import ModalSelect from "@/src/components/ui/inputs/border/ModalSelect";
import useForm from "@/src/hooks/useForm";
import { PatientsQueryParams } from "@/src/types/patient";
import { fetchDoctors } from "@/src/api/doctors";
import { Doctor } from "@/src/types/doctor";
import { Comorbidity } from "@/src/types/comorbidity";
import { fetchComorbidities } from "@/src/api/comorbities";
import { MonitoringDeviceSimple } from "@/src/types/device";
import { fetchDevicesSimple } from "@/src/api/devices";
import { fetchPatientLocations } from "@/src/api/patients";

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
    const [devices, setDevices] = useState<MonitoringDeviceSimple[]>([]);
    const [locations, setLocations] = useState<string[]>([]);
    const [isLoadingDoctors, setIsLoadingDoctors] = useState(true);
    const [isLoadingComorbidities, setIsLoadingComorbidities] = useState(true);
    const [isLoadingDevices, setIsLoadingDevices] = useState(true);
    const [isLoadingLocations, setIsLoadingLocations] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const doctorsList = await fetchDoctors();
                setDoctors(doctorsList.doctors);

                const comorbiditiesList = await fetchComorbidities();
                setComorbidities(comorbiditiesList.comorbidities);

                const devicesList = await fetchDevicesSimple();
                setDevices(devicesList.devices);

                const locationsList = await fetchPatientLocations();
                setLocations(locationsList.locations);
            } catch (err) {
                console.error("Failed to load data:", err);
            } finally {
                setIsLoadingDoctors(false);
                setIsLoadingComorbidities(false);
                setIsLoadingDevices(false);
                setIsLoadingLocations(false);
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

    const handleDeviceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            device_id: e.target.value,
        }));
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            location: e.target.value,
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
                <ModalSelect
                    name="doctor_id"
                    value={formValues.doctor_id || ""}
                    onChange={handleDoctorChange}
                    label="Doctor asignado"
                    placeholder="Selecciona un doctor"
                    disabled={isLoadingDoctors}
                    colSpan={2}
                    options={doctors.map(doctor => ({
                        value: doctor.doctor_id,
                        label: `${doctor.name} (${doctor.specialization})`,
                        key: doctor.doctor_id
                    }))}
                />

                {/* Location Dropdown */}
                <ModalSelect
                    name="location"
                    value={formValues.location || ""}
                    onChange={handleLocationChange}
                    label="Lugar"
                    placeholder="Seleccione una ubicación"
                    disabled={isLoadingLocations}
                    options={locations.map(location => ({
                        value: location,
                        label: location,
                        key: location
                    }))}
                />

                {/* Device Dropdown */}
                <ModalSelect
                    name="device_id"
                    value={formValues.device_id || ""}
                    onChange={handleDeviceChange}
                    label="Identificador del dispositivo"
                    placeholder="Seleccione un dispositivo"
                    disabled={isLoadingDevices}
                    options={devices.map(device => ({
                        value: device.device_id,
                        label: `${device.device_id} - ${device.status}`,
                        key: device.device_id
                    }))}
                />

                {/* Comorbidity Dropdown */}
                <ModalSelect
                    name="comorbidity"
                    value={formValues.comorbidity || ""}
                    onChange={handleComorbidityChange}
                    label="Riesgo preexistente"
                    placeholder="Seleccione un riesgo preexistente"
                    disabled={isLoadingComorbidities}
                    colSpan={2}
                    options={comorbidities.map(comorbidity => ({
                        value: comorbidity.comorbidity,
                        label: comorbidity.comorbidity,
                        key: comorbidity.comorbidity_id
                    }))}
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
