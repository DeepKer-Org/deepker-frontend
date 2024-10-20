"use client";
import {MonitoringDevice} from "@/src/types/devices";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import DeviceActionButton from "@/src/components/ui/buttons/DeviceActionButton";
import UnlinkConfirmationModal from "@/src/components/ui/modals/UnlinkConfirmationModal";
import SensorLinkModal from "@/src/components/ui/modals/SensorLinkModal";

interface DevicesElementProps {
    device: MonitoringDevice;
    onRefresh: () => void;
}

const DevicesElement: React.FC<DevicesElementProps> = ({device, onRefresh}) => {
    const router = useRouter();
    const [isUnlinkModalOpen, setIsUnlinkModalOpen] = useState(false);
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false); // For link modal
    const [selectedSensorId, setSelectedSensorId] = useState<string | null>(null); // Store the sensor ID for linking

    const handleDetails = () => {
        router.push(`/patients/${device.patient.patient_id}`);
    };

    const mapStatusNames = (status: string) => {
        if (status === "In Use") {
            return "En Uso";
        } else if (status === "Free") {
            return "Disponible";
        } else if (status === "Connecting") {
            return "Conectando";
        } else if (status === "Unavailable") {
            return "No Disponible";
        } else {
            return "Desconocido";
        }
    }

    const handleLink = (sensorId: string) => {
        setSelectedSensorId(sensorId);
        setIsLinkModalOpen(true); // Open link modal
    };

    const handleUnlinkSuccess = () => {
        onRefresh();
    };

    const handleLinkSuccess = () => {
        setIsLinkModalOpen(false); // Close link modal
        onRefresh(); // Refresh table after linking
    };

    return (
        <div className="table-row device-grid-cols tableBp:grid-cols-[12%_25%_25%_10%_28%]">
            <div className="cell-border table-row-group px-4">
                <p>{device.device_id}</p>
            </div>
            <div className="cell-border table-row-group px-4">
                <p>{device.patient.name}</p>
                <p className="table-row-subtitle">{device.patient.dni}</p>
            </div>
            <div className="hidden tableBp:flex row-border flex-col px-4">
                {device.linked_by?.name && (
                    <>
                        <p>{device.linked_by.name}</p>
                        <p className="table-row-subtitle">{device.linked_by.specialization}</p>
                    </>
                )}
            </div>
            <div className="cell-border table-row-group px-4">
                <p>{mapStatusNames(device.status)}</p>
            </div>
            <div className="flex flex-row h-full">
                <div className="flex w-1/2 justify-center h-full items-center cell-border">
                    <DeviceActionButton status={device.status} onUnlink={() => setIsUnlinkModalOpen(true)}
                                        onLink={(() => handleLink(device.device_id))}/>
                </div>
                <div
                    className={`flex w-1/2 items-center justify-center gap-x-4 px-4 h-full ${
                        device.patient?.name ? "cursor-pointer text-gray-600" : "text-gray-400"
                    }`}
                    onClick={device.patient?.name ? handleDetails : undefined} // Make sure it's not clickable if no patient
                >
                    {device.patient?.name && (
                        <>
                            <p>VER PACIENTE</p>
                            <span className="material-symbols-outlined">arrow_forward_ios</span>
                        </>
                    )}
                </div>
            </div>
            {isUnlinkModalOpen && (
                <UnlinkConfirmationModal
                    deviceId={device.device_id}
                    isOpen={isUnlinkModalOpen}
                    onClose={() => setIsUnlinkModalOpen(false)}
                    onSuccess={handleUnlinkSuccess}
                />
            )}

            {isLinkModalOpen && (
                <SensorLinkModal
                    onClose={() => setIsLinkModalOpen(false)}
                    onLinkSuccess={handleLinkSuccess}
                    initialSensorId={selectedSensorId} // Pass the selected sensor ID to the modal
                    isOpen={isLinkModalOpen}
                />
            )}
        </div>

    );
};

export default DevicesElement;
