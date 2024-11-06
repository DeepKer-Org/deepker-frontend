import React from 'react';
import { useSnackbar } from 'notistack';
import ModalInput from "@/src/components/ui/inputs/border/ModalInput";
import DateInput from "@/src/components/ui/inputs/border/DateInput";
import PasswordInput from "@/src/components/ui/inputs/border/PasswordInput";
import Button from "@/src/components/ui/buttons/Button";
import { ButtonColor } from "@/src/enums/ButtonColor";
import CheckboxInput from "@/src/components/ui/inputs/CheckboxInput";
import useForm from "@/src/hooks/useForm";
import { DoctorFormValues } from "@/src/types/form";
import {passwordRegex} from "@/src/utils/regex";

interface DoctorFormProps {
    onCancel: () => void;
    onSubmit: (values: DoctorFormValues) => void;
}

const DoctorForm: React.FC<DoctorFormProps> = ({ onCancel, onSubmit }) => {
    const { formValues, handleInputChange, handleSubmit, setFormValues } = useForm<DoctorFormValues>(
        {
            name: '',
            specialization: '',
            username: '',
            issueDate: '',
            password: '',
            confirmPassword: '',
            isAdmin: false
        },
        (values) => {
            if (validateForm()) {
                onSubmit(values); // Submit only if the form is valid
            }
        }
    );

    const { enqueueSnackbar } = useSnackbar();

    // Function to validate the form on submit
    const validateForm = (): boolean => {
        if (formValues.name.trim() === '') {
            enqueueSnackbar("El nombre completo es obligatorio.", { variant: "error" });
            return false;
        }
        if (formValues.specialization.trim() === '') {
            enqueueSnackbar("La especialización es obligatoria.", { variant: "error" });
            return false;
        }
        if (formValues.username.trim() === '') {
            enqueueSnackbar("El DNI es obligatorio.", { variant: "error" });
            return false;
        }
        if (formValues.issueDate.trim() === '') {
            enqueueSnackbar("La fecha de emisión es obligatoria.", { variant: "error" });
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
                label="Nombre completo"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
            />
            <ModalInput
                label="Especialización"
                name="specialization"
                value={formValues.specialization}
                onChange={handleInputChange}
            />
            <ModalInput
                label="DNI"
                name="username"
                value={formValues.username}
                onChange={handleInputChange}
            />
            <DateInput
                label="Fecha de emisión"
                value={formValues.issueDate}
                onChange={(date) => setFormValues(prev => ({ ...prev, issueDate: date }))}
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
            <CheckboxInput
                label="Asignar como Administrador"
                checked={formValues.isAdmin}
                onChange={(checked) => {
                    setFormValues(prev => ({ ...prev, isAdmin: checked }));
                }}
            />
            <div className="button__container">
                <Button text="Cancelar" onClick={onCancel} color={ButtonColor.SECONDARY} />
                <Button text="Aceptar" color={ButtonColor.SUCCESS} type="submit" />
            </div>
        </form>
    );
};

export default DoctorForm;
