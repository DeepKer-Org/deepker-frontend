import React from 'react'
import ModalWrapper from "@/src/components/ui/wrappers/ModalWrapper";
import Button from "@/src/components/ui/buttons/Button";
import {ButtonColor} from "@/src/enums/ButtonColor";
import {deleteUser} from "@/src/api/auth";
import {useAuth} from "@/src/context/AuthContext";

interface DeleteUserConfirmationModalProps {
    userId: string;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const DeleteUserConfirmationModal: React.FC<DeleteUserConfirmationModalProps> = ({
                                                                                     userId,
                                                                                     isOpen,
                                                                                     onClose,
                                                                                     onSuccess
                                                                                 }) => {
    const { uid } = useAuth();

    const handleDelete = async () => {
        try {
            await deleteUser(userId);
            onSuccess();
            onClose();
        } catch (err) {
            console.error('Failed to unlink device:', err);
        }
    };

    // Render nothing if the modal is closed
    if (!isOpen) return null;

    const isSelfDelete = userId === uid;

    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose} width="24rem">
            <h1 className="mb-6 text-center">Confirmación de Eliminación</h1>
            <p className="mb-8 mx-12 text-center"> ¿Está seguro de que desea eliminar a este usuario?</p>
            <div className="flex flex-row justify-center gap-x-4 mt-6">
                <Button text="Cancelar" onClick={onClose} color={ButtonColor.SECONDARY}/>
                <Button text="Eliminar" onClick={handleDelete} color={ButtonColor.DANGER} disabled={isSelfDelete}/>
            </div>
        </ModalWrapper>
    )
}
export default DeleteUserConfirmationModal
