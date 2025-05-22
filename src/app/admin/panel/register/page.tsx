"use client";
import React, { useState } from "react";
import ReturnButton from "@/src/components/ui/buttons/ReturnButton";
import SelectInput from "@/src/components/ui/inputs/border/SelectInput";
import DoctorForm from "@/src/components/sections/admin/DoctorForm";
import AdminForm from "@/src/components/sections/admin/AdminForm";
import { useRouter } from "next/navigation";
import { AdminFormValues, DoctorFormValues } from "@/src/types/form";
import { UserRequest } from "@/src/types/auth";
import { DoctorRequest } from "@/src/types/doctor";
import { registerAdminUser } from "@/src/api/auth";
import { registerDoctorUser } from "@/src/api/doctors";
import { useSnackbar } from "notistack";

const RegisterUser = () => {
  const router = useRouter();
  const [role, setRole] = useState("doctor");
  const { enqueueSnackbar } = useSnackbar();

  const roleOptions = [
    { label: "Especialista Médico", value: "doctor" },
    { label: "Administrador", value: "admin" },
  ];

  const handleAdminSubmit = async (values: AdminFormValues) => {
    const request: UserRequest = {
      username: values.username,
      password: values.password,
    };

    try {
      await registerAdminUser(request);
      enqueueSnackbar("¡Se ha creado el usuario exitosamente!", {
        variant: "success",
      });
      router.back();
    } catch {
      enqueueSnackbar("Error al registrar administrador.", {
        variant: "error",
      });
    }
  };

  const handleDoctorSubmit = async (values: DoctorFormValues) => {
    const request: DoctorRequest = {
      dni: values.username,
      password: values.password,
      issuance_date: values.issuanceDate,
      name: values.name,
      specialization: values.specialization,
      roles: values.isAdmin ? ["doctor", "admin"] : ["doctor"],
    };

    try {
      await registerDoctorUser(request);
      enqueueSnackbar("¡Se ha creado el usuario exitosamente!", {
        variant: "success",
      });
      router.back();
    } catch {
      enqueueSnackbar("Error al registrar especialista médico.", {
        variant: "error",
      });
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="form__page">
      <div className="button__container">
        <ReturnButton />
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
            <DoctorForm onCancel={handleCancel} onSubmit={handleDoctorSubmit} />
          ) : (
            <AdminForm onCancel={handleCancel} onSubmit={handleAdminSubmit} />
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
