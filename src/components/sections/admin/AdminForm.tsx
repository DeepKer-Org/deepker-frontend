import React, {useEffect} from 'react';
import { useSnackbar } from 'notistack';
import ModalInput from "@/src/components/ui/inputs/border/ModalInput";
import PasswordInput from "@/src/components/ui/inputs/border/PasswordInput";
import Button from "@/src/components/ui/buttons/Button";
import { ButtonColor } from "@/src/enums/ButtonColor";
import useForm from "@/src/hooks/useForm";
import { AdminFormValues } from "@/src/types/form";
import {emailRegex, passwordRegex} from "@/src/utils/regex";

interface AdminFormProps {
    initialValues?: AdminFormValues; // Optional initialValues prop
    onCancel: () => void;
    onSubmit: (values: AdminFormValues) => void;
}

const AdminForm: React.FC<AdminFormProps> = ({ initialValues, onCancel, onSubmit }) => {
    const { formValues, handleInputChange, handleSubmit, setFormValues } = useForm<AdminFormValues>(
        {
            username: '',
            password: '',
            confirmPassword: '',
            ...initialValues // Merge with default values
        },
        (values) => {
            if (validateForm()) {
                onSubmit(values);
            }
        }
    );

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (initialValues) {
            setFormValues({ ...initialValues });
        }
    }, [initialValues, setFormValues]);

    // Function to validate the form on submit
    const validateForm = (): boolean => {
        if (formValues.username.trim() === '') {
            enqueueSnackbar("El correo electrónico es obligatorio.", { variant: "error" });
            return false;
        }
        if (!emailRegex.test(formValues.username)) {
            enqueueSnackbar("Por favor, introduzca un correo electrónico válido.", { variant: "error" });
            return false;
        }
        if (formValues.password.trim() === '') {
            enqueueSnackbar("La contraseña es obligatoria.", { variant: "error" });
            return false;
        }
        if (!passwordRegex.test(formValues.password)) {
            enqueueSnackbar("La contraseña debe tener al menos 12 caracteres, un número y un carácter especial.", { variant: "error" });
            return false;
        }
        if (formValues.password !== formValues.confirmPassword) {
            enqueueSnackbar("Las contraseñas no coinciden.", { variant: "error" });
            return false;
        }
        return true;
    };

    return (
        <form onSubmit={handleSubmit} className="form__wrapper">
            <ModalInput
                label="Correo electrónico"
                name="username"
                value={formValues.username}
                onChange={handleInputChange}
            />
            <PasswordInput
                label="Contraseña"
                name="password"
                value={formValues.password}
                onChange={handleInputChange}
            />
            <PasswordInput
                label="Confirmar Contraseña"
                name="confirmPassword"
                value={formValues.confirmPassword}
                onChange={handleInputChange}
            />
            <div className="button__container">
                <Button text="Cancelar" onClick={onCancel} color={ButtonColor.SECONDARY} />
                <Button text="Aceptar" color={ButtonColor.SUCCESS} type="submit" />
            </div>
        </form>
    );
};

export default AdminForm;
