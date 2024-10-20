"use client";
import useForm from "@/src/hooks/useForm";
import React, {useEffect, useState} from "react";
import Button from "../buttons/Button";
import {ButtonColor} from "@/src/enums/ButtonColor";
import {MonitoringDevice, MonitoringDeviceUpdateRequest} from "@/src/types/devices";
import {fetchDevicesByStatus, updateDevice} from "@/src/api/devices";
import {fetchPatients} from "@/src/api/patients";
import {Patient} from "@/src/types/patient";
import ModalWrapper from "@/src/components/ui/wrappers/ModalWrapper";

interface SensorLinkModalProps {
    isOpen: boolean; // Added to control modal visibility
    onClose: () => void;
    onLinkSuccess: () => void;
    initialSensorId?: string;
}

const initialSensorLinkData = {
    sensor_id: "",
    patient_id: "",
};

const SensorLinkModal: React.FC<SensorLinkModalProps> = ({
                                                             isOpen,
                                                             onClose,
                                                             onLinkSuccess,
                                                             initialSensorId = ""
                                                         }) => {
    const {formValues, handleSubmit, setFormValues} = useForm(
        {...initialSensorLinkData, sensor_id: initialSensorId}, // Pre-fill `sensor_id` if provided
        handleLink
    );

    const [freeSensors, setFreeSensors] = useState<MonitoringDevice[]>([]); // Sensors with "Free" status
    const [patients, setPatients] = useState<Patient[]>([]); // Patients list
    const [isLoading, setIsLoading] = useState(true); // To show loading state while fetching sensors
    const [isLoadingPatients, setIsLoadingPatients] = useState(true); // Loading state for patients
    const [error, setError] = useState<string | null>(null); // Error handling

    useEffect(() => {
        const fetchFreeSensors = async () => {
            try {
                const response = await fetchDevicesByStatus("Free"); // Only fetch free devices
                setFreeSensors(response.devices);
            } catch {
                setError("Error fetching free sensors");
            } finally {
                setIsLoading(false);
            }
        };

        const fetchAllPatients = async () => {
            try {
                const response = await fetchPatients(); // Fetch patients
                setPatients(response.patients);
            } catch {
                setError("Error fetching patients");
            } finally {
                setIsLoadingPatients(false);
            }
        };

        fetchFreeSensors();
        fetchAllPatients();
    }, []);


    async function handleLink(linkData: typeof initialSensorLinkData) {
        try {
            const updateData: MonitoringDeviceUpdateRequest = {
                status: "In Use",
                patient_id: linkData.patient_id, // We are now correctly sending `patient_id`
                linked_by_id: "66778899-aaaa-bbbb-cccc-ddddeeeeffff", // Provide the actual ID of the logged-in user
            };

            // Call the updateDevice API to update the sensor
            await updateDevice(linkData.sensor_id, updateData);

            // Call the success handler to notify the parent of the success
            onLinkSuccess();
        } catch {
            setError("Failed to link sensor");
        }
    }

    const handleSensorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // Directly update form values for sensor_id
        setFormValues((prevValues) => ({
            ...prevValues,
            sensor_id: e.target.value,
        }));
    };

    const handlePatientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            patient_id: e.target.value, // We are now setting `patient_id` correctly
        }));
    };

    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose} width="28rem">
            <form onSubmit={handleSubmit}>
                <h1 className="mb-6">Vincular Dispositivos</h1>
                {isLoading || isLoadingPatients ? (
                    <p>Loading sensors...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <div className="flex flex-col gap-y-6 bg-white border border-border-primary rounded-lg p-6">
                        <div className="col-span-2" style={{position: 'relative', width: '100%'}}>
                            <label htmlFor="sensor_id" className="block mb-2 text-sm">
                                Seleccione un sensor
                            </label>
                            <select
                                id="sensor_id"
                                name="sensor_id"
                                value={formValues.sensor_id || ""}
                                onChange={handleSensorChange}
                                className="modal__dropdown"
                                disabled={!!initialSensorId} // Disable the dropdown if `sensor_id` was passed
                            >
                                <option value="">Selecciona un sensor</option>
                                {freeSensors.map((sensor) => (
                                    <option key={sensor.device_id} value={sensor.device_id}>
                                        {sensor.device_id}
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
                                <svg width="10" height="10" viewBox="0 0 10 6" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 6L0 0H10L5 6Z" fill="black"/>
                                </svg>
                            </div>
                        </div>
                        <div className="col-span-2" style={{position: 'relative', width: '100%'}}>
                            <label htmlFor="patient_id" className="block mb-2 text-sm">
                                Seleccione un Paciente
                            </label>
                            <select
                                id="patient_id"
                                name="patient_id"
                                value={formValues.patient_id || ""}
                                onChange={handlePatientChange} // Handle patient selection
                                className="modal__dropdown"
                            >
                                <option value="">Seleccione un Paciente</option>
                                {patients.map((patient) => (
                                    <option key={patient.patient_id} value={patient.patient_id}>
                                        {patient.dni} - {patient.name}
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
                                <svg width="10" height="10" viewBox="0 0 10 6" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 6L0 0H10L5 6Z" fill="black"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex flex-row justify-center gap-x-4 mt-6">
                    <Button text={"Cancelar"} className="w-40" color={ButtonColor.SECONDARY} onClick={onClose}
                            type="button"/>
                    <Button text={"Vincular"} className="w-40" color={ButtonColor.SUCCESS} type="submit"/>
                </div>
            </form>
        </ModalWrapper>
    );
};

export default SensorLinkModal;
