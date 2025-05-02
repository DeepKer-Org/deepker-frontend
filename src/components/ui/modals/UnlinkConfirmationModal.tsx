import React from 'react'
import {MonitoringDeviceUpdateRequest} from "@/src/types/device";
import {updateDevice} from "@/src/api/devices";
import ModalWrapper from "@/src/components/ui/wrappers/ModalWrapper";
import Button from "@/src/components/ui/buttons/Button";
import {ButtonColor} from "@/src/enums/ButtonColor";

interface UnlinkConfirmationModalProps {
    deviceId: string; 
    isOpen: boolean; 
    onClose: () => void; 
    onSuccess: () => void; 
}

const UnlinkConfirmationModal: React.FC<UnlinkConfirmationModalProps> = ({deviceId, isOpen, onClose, onSuccess}) => {
    const handleUnlink = async () => {
        try {
            const data: MonitoringDeviceUpdateRequest = {status: 'Free'};
            await updateDevice(deviceId, data); 
            onSuccess(); 
            onClose(); 
        } catch (err) {
            console.error('Failed to unlink device:', err);
        }
    };

    if (!isOpen) return null;

    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose}>
            <h1 className="mb-6 text-center text-xl">Confirmación de Desvinculación</h1>
            <p className="mb-8 mx-12 text-center">¿Está seguro de que quiere desvincular este dispositivo?</p>
            <div className="flex flex-row justify-center gap-x-4 mt-6">
                <Button text="Cancelar" onClick={onClose} color={ButtonColor.SECONDARY}/>
                <Button text="Desvincular" onClick={handleUnlink} color={ButtonColor.DANGER}/>
            </div>
        </ModalWrapper>
    )
}
export default UnlinkConfirmationModal
