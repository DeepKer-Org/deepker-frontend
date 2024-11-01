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

interface DeviceLinkModalProps {
    isOpen: boolean; // Added to control modal visibility
    onClose: () => void;
    onLinkSuccess: () => void;
    initialDeviceId?: string;
}

const initialDeviceLinkData = {
    device_id: "",
    patient_id: "",
};

const DeviceLinkModal: React.FC<DeviceLinkModalProps> = ({
                                                             isOpen,
                                                             onClose,
                                                             onLinkSuccess,
                                                             initialDeviceId = ""
                                                         }) => {
    const {formValues, handleSubmit, setFormValues} = useForm(
        {...initialDeviceLinkData, device_id: initialDeviceId}, // Pre-fill `device_id` if provided
        handleLink
    );

    const [freeDevices, setFreeDevices] = useState<MonitoringDevice[]>([]); // Devices with "Free" status
    const [patients, setPatients] = useState<Patient[]>([]); // Patients list
    const [isLoading, setIsLoading] = useState(true); // To show loading state while fetching devices
    const [isLoadingPatients, setIsLoadingPatients] = useState(true); // Loading state for patients
    const [error, setError] = useState<string | null>(null); // Error handling

    useEffect(() => {
        if (isOpen) {  // Check if modal is open before fetching data
            setFormValues({
                device_id: initialDeviceId || "",
                patient_id: ""
            });

            const fetchFreeDevices = async () => {
                try {
                    const response = await fetchDevicesByStatus("Free"); // Only fetch free devices
                    setFreeDevices(response.devices);
                } catch {
                    setError("Error fetching free devices");
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

            setIsLoading(true); // Reset loading states before fetching
            setIsLoadingPatients(true);
            fetchFreeDevices();
            fetchAllPatients();
        }
    }, [isOpen, initialDeviceId, setFormValues]);


    async function handleLink(linkData: typeof initialDeviceLinkData) {
        try {
            const updateData: MonitoringDeviceUpdateRequest = {
                status: "In Use",
                patient_id: linkData.patient_id, // We are now correctly sending `patient_id`
                linked_by_id: "66778899-aaaa-bbbb-cccc-ddddeeeeffff", // Provide the actual ID of the logged-in user
            };

            // Call the updateDevice API to update the device
            await updateDevice(linkData.device_id, updateData);

            // Call the success handler to notify the parent of the success
            onLinkSuccess();
        } catch {
            setError("Falla al vincular el dispositivo");
        }
    }

    const handleDeviceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // Directly update form values for device_id
        setFormValues((prevValues) => ({
            ...prevValues,
            device_id: e.target.value,
        }));
    };

    const handlePatientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            patient_id: e.target.value, // We are now setting `patient_id` correctly
        }));
    };

    const isLinkingDisabled = !formValues.device_id || !formValues.patient_id;

    return (
        <ModalWrapper isOpen={isOpen} width="28rem">
            <form onSubmit={handleSubmit}>
                <h1 className="mb-6">Vincular Dispositivos</h1>
                {isLoading || isLoadingPatients ? (
                    <p>Loading devices...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <div className="flex flex-col gap-y-6 bg-white border border-border-primary rounded-lg p-6">
                        <div className="col-span-2" style={{position: 'relative', width: '100%'}}>
                            <label htmlFor="device_id" className="block mb-2 text-sm">
                                Seleccione un device
                            </label>
                            <select
                                id="device_id"
                                name="device_id"
                                value={formValues.device_id || ""}
                                onChange={handleDeviceChange}
                                className="modal__dropdown"
                                disabled={!!initialDeviceId} // Disable the dropdown if `device_id` was passed
                            >
                                <option value="">Selecciona un device</option>
                                {freeDevices.map((device) => (
                                    <option key={device.device_id} value={device.device_id}>
                                        {device.device_id}
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
                    <Button text={"Vincular"} className="w-40" color={ButtonColor.SUCCESS} type="submit" disabled={isLinkingDisabled}/>
                </div>
            </form>
        </ModalWrapper>
    );
};

export default DeviceLinkModal;
