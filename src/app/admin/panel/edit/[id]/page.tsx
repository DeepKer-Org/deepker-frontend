"use client";
import React, {useEffect, useState} from 'react';
import ReturnButton from "@/src/components/ui/buttons/ReturnButton";
import SelectInput from "@/src/components/ui/inputs/border/SelectInput";
import DoctorForm from "@/src/components/sections/admin/DoctorForm";
import AdminForm from "@/src/components/sections/admin/AdminForm";
import {useParams, useRouter} from "next/navigation";
import {UserRequest} from "@/src/types/auth";
import {DoctorRequest} from "@/src/types/doctor";
import {fetchUserById, updateUser} from "@/src/api/auth";
import {fetchDoctorByUserId, updateDoctorByUserId} from "@/src/api/doctors";
import {useSnackbar} from "notistack";
import {AdminFormValues, DoctorFormValues} from "@/src/types/form";
import {getCookie} from "@/src/utils/getCookie";

const EditUser = () => {
    const router = useRouter();
    const {id} = useParams(); // assuming userId is passed in the route
    const [role, setRole] = useState("doctor");
    const [initialDoctorData, setInitialDoctorData] = useState<DoctorFormValues | null>(null);
    const [initialAdminData, setInitialAdminData] = useState<AdminFormValues | null>(null);
    const {enqueueSnackbar} = useSnackbar();
    const token = getCookie("token");

    const roleOptions = [
        {label: "Especialista Médico", value: "doctor"},
        {label: "Administrador", value: "admin"}
    ];

    // Fetch data based on user roles
    useEffect(() => {
        if (!id) return;

        // Fetch roles and determine the data to fetch based on roles
        const fetchData = async () => {
            try {
                const userData = await fetchUserById(id.toString());

                if (userData.roles.includes("admin")) {
                    setRole("admin");
                    setInitialAdminData({
                        username: userData.username,
                        password: "", // Not prefilling password for security
                        confirmPassword: "",
                    });
                }

                // Set the role based on userData.roles
                if (userData.roles.includes("doctor")) {
                    setRole("doctor");
                    const doctorData = await fetchDoctorByUserId(id.toString(), token!);
                    setInitialDoctorData({
                        name: doctorData.doctor.name,
                        specialization: doctorData.doctor.specialization,
                        username: doctorData.doctor.dni,
                        issuanceDate: doctorData.doctor.issuance_date,
                        password: "", // Not prefilling password for security
                        confirmPassword: "",
                        isAdmin: userData.roles.includes("admin"),
                    });
                }
            } catch {
                enqueueSnackbar("Error al obtener la información del usuario.", {variant: "error"});
            }
        };

        fetchData();
    }, [id, enqueueSnackbar, token]);

    // Handlers for form submission
    const handleAdminSubmit = async (values: AdminFormValues) => {
        const request: UserRequest = {
            username: values.username,
            password: values.password
        };

        try {
            await updateUser(id.toString(), request);
            router.back();
        } catch {
            enqueueSnackbar("Error updating administrador.", {variant: "error"});
        }
    };

    const handleDoctorSubmit = async (values: DoctorFormValues) => {
        const request: DoctorRequest = {
            dni: values.username,
            password: values.password,
            issuance_date: values.issuanceDate,
            name: values.name,
            specialization: values.specialization,
            roles: values.isAdmin ? ["doctor", "admin"] : ["doctor"]
        };

        try {
            await updateDoctorByUserId(id.toString(), request);
            router.back();
        } catch {
            enqueueSnackbar("Error updating especialista médico.", {variant: "error"});
        }
    };

    const handleCancel = () => {
        router.back();
    };

    return (
        <div className="form__page">
            <div className="button__container">
                <ReturnButton/>
            </div>
            <div className="form__container">
                <h1>Edición de Usuario</h1>
                <div className="form__wrapper">
                    <SelectInput
                        options={roleOptions}
                        value={role}
                        disabled
                        onChange={setRole}
                        label="Seleccione un rol"
                    />
                    {role === "doctor" && initialDoctorData ? (
                        <DoctorForm
                            initialValues={initialDoctorData}
                            onCancel={handleCancel}
                            onSubmit={handleDoctorSubmit}
                        />
                    ) : role === "admin" && initialAdminData ? (
                        <AdminForm
                            initialValues={initialAdminData}
                            onCancel={handleCancel}
                            onSubmit={handleAdminSubmit}
                        />
                    ) : (
                        <p>Cargando datos del usuario...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditUser;
