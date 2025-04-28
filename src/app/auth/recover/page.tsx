"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import IconInput from "@/src/components/ui/inputs/icon/IconInput";
import PasswordInput from "@/src/components/ui/inputs/icon/PasswordInput";
import Button from "@/src/components/ui/buttons/Button";
import { ButtonColor } from "@/src/enums/ButtonColor";
import DateInput from "@/src/components/ui/inputs/icon/DateInput";
import { enqueueSnackbar } from "notistack";
import { changePassword } from "@/src/api/auth";
import { dniRegex, passwordRegex } from "@/src/utils/regex";

const Recover = () => {
  const router = useRouter();
  const [dni, setDni] = useState("");
  const [issuanceDate, setIssuanceDate] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRecover = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      setIsLoading(true);
      await changePassword(dni, issuanceDate, newPassword); 
      router.push("/auth/login");
      enqueueSnackbar("Contraseña restablecida exitosamente", {
        variant: "success",
      });
    } catch {
      enqueueSnackbar(
        "Error al restablecer la contraseña. Verifique los datos ingresados.",
        { variant: "error" }
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    router.push("/auth/login");
  };

  const validateInputs = (): boolean => {
    if (!dniRegex.test(dni)) {
      enqueueSnackbar("El DNI debe tener exactamente 8 caracteres numéricos.", {
        variant: "error",
      });
      return false;
    }
    if (!issuanceDate) {
      enqueueSnackbar("Debe ingresar la fecha de emisión de DNI.", {
        variant: "error",
      });
      return false;
    }
    if (!passwordRegex.test(newPassword)) {
      enqueueSnackbar(
        "La contraseña debe tener al menos 12 caracteres, un número y un carácter especial.",
        { variant: "error" }
      );
      return false;
    }
    if (newPassword !== confirmPassword) {
      enqueueSnackbar("Las contraseñas no coinciden.", { variant: "error" });
      return false;
    }
    return true;
  };

  return (
    <div className="auth__page">
      <div className="auth__container">
        <div className="flex flex-col justify-center mx-auto items-center mb-10">
          <Image
            src={"/icons/deepker-original.webp"}
            alt={"Deepker"}
            className={"auth__logo"}
            width={200}
            height={200}
          />
          <p className="font-merriweather text-3xl">DeepKer</p>
        </div>
        <h1>Recuperar Contraseña</h1>
        <form className="auth__form" onSubmit={handleRecover}>
          <div className="auth__form--inputs">
            <IconInput
              icon="person"
              placeholder="DNI"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
            />
            <DateInput
              icon="date_range"
              placeholder="Fecha de emisión de DNI"
              value={issuanceDate}
              onChange={(formattedDate) => setIssuanceDate(formattedDate)}
            />
            <PasswordInput
              icon="key"
              placeholder="Nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <PasswordInput
              icon="key"
              placeholder="Confirme su contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <small className="auth__small--text">
            ¿Tiene una cuenta?{" "}
            <span className="auth__link" onClick={handleLogin}>
              Inicie sesión aquí.
            </span>
          </small>
          <Button
            text="RESTABLECER"
            color={ButtonColor.SUCCESS}
            type="submit"
            disabled={isLoading}
          />
        </form>
      </div>
    </div>
  );
};

export default Recover;
