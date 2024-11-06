"use client";
import React, {useState} from 'react';
import ReturnButton from "@/src/components/ui/buttons/ReturnButton";
import SelectInput from "@/src/components/ui/inputs/border/SelectInput";
import DoctorForm from "@/src/components/sections/admin/DoctorForm";
import AdminForm from "@/src/components/sections/admin/AdminForm";
import {useRouter} from "next/navigation";
import {AdminFormValues, DoctorFormValues} from "@/src/types/form";
import {RegisterUserRequest} from "@/src/types/auth";
import {DoctorRegisterRequest} from "@/src/types/doctor";
import {registerAdminUser} from "@/src/api/auth";
import {registerDoctorUser} from "@/src/api/doctors";
import {useSnackbar} from "notistack";


const RegisterUser = () => {
    const router = useRouter();
    const [role, setRole] = useState("doctor");
    const { enqueueSnackbar } = useSnackbar();

    const roleOptions = [
        {label: "Especialista Médico", value: "doctor"},
        {label: "Administrador", value: "admin"}
    ];

    // Handler for submitting AdminForm values after mapping
    const handleAdminSubmit = async (values: AdminFormValues) => {
        const request: RegisterUserRequest = {
            username: values.username,
            password: values.password
        };

        try {
            await registerAdminUser(request);
            router.back();
        } catch {
            enqueueSnackbar("Error al registrar administrador.", { variant: "error" });
        }
    };

    // Handler for submitting DoctorForm values after mapping
    const handleDoctorSubmit = async (values: DoctorFormValues) => {
        const request: DoctorRegisterRequest = {
            dni: values.username,
            password: values.password,
            issuance_date: values.issueDate,
            name: values.name,
            specialization: values.specialization,
            roles: values.isAdmin ? ["doctor", "admin"] : ["doctor"]
        };

        try {
            await registerDoctorUser(request);
            router.back();
        } catch {
            enqueueSnackbar("Error al registrar especialista médico.", { variant: "error" });
        }
    };


    const handleCancel = () => {
        router.back();
    }

    return (
        <div className="form__page">
            <div className="button__container">
                <ReturnButton/>
            </div>
            <div className="form__container">
                <h1>Registro de Usuario</h1>
                <div className="form__wrapper">
                    <SelectInput
                        options={roleOptions}
                        value={role}
                        onChange={setRole}
                        label="Seleccione un rol"
                    />
                    {role === "doctor" ? (
                        <DoctorForm onCancel={handleCancel} onSubmit={handleDoctorSubmit}/>
                    ) : (
                        <AdminForm onCancel={handleCancel} onSubmit={handleAdminSubmit}/>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegisterUser;
