import React from 'react'
import {MonitoringDeviceUpdateRequest} from "@/src/types/device";
import {updateDevice} from "@/src/api/devices";
import ModalWrapper from "@/src/components/ui/wrappers/ModalWrapper";
import Button from "@/src/components/ui/buttons/Button";
import {ButtonColor} from "@/src/enums/ButtonColor";

interface UnlinkConfirmationModalProps {
    deviceId: string; // Device ID for the device to be unlinked
    isOpen: boolean; // Whether the modal is open
    onClose: () => void; // Function to close the modal
    onSuccess: () => void; // Function to call after successful unlinking
}

const UnlinkConfirmationModal: React.FC<UnlinkConfirmationModalProps> = ({deviceId, isOpen, onClose, onSuccess}) => {
    const handleUnlink = async () => {
        try {
            const data: MonitoringDeviceUpdateRequest = {status: 'Free'};
            await updateDevice(deviceId, data); // Call the API to update the device's status
            onSuccess(); // Notify the parent that the unlink was successful
            onClose(); // Close the modal
        } catch (err) {
            console.error('Failed to unlink device:', err);
        }
    };

    if (!isOpen) return null;

    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose}>
            <h2 className="mb-6 text-center text-xl">Confirmación de Desvinculación</h2>
            <p className="mb-8 mx-12 text-center">¿Está seguro de que quiere desvincular este dispositivo?</p>
            <div className="flex flex-row justify-center gap-x-4 mt-6">
                <Button text="Cancelar" onClick={onClose} color={ButtonColor.SECONDARY}/>
                <Button text="Desvincular" onClick={handleUnlink} color={ButtonColor.DANGER}/>
            </div>
        </ModalWrapper>
    )
}
export default UnlinkConfirmationModal
