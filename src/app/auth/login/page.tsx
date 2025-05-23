"use client";
import Image from "next/image";
import Button from "@/src/components/ui/buttons/Button";
import { ButtonColor } from "@/src/enums/ButtonColor";
import { useRouter } from "next/navigation";
import IconInput from "@/src/components/ui/inputs/icon/IconInput";
import PasswordInput from "@/src/components/ui/inputs/icon/PasswordInput";
import { useAuth } from "@/src/context/AuthContext";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { passwordRegex } from "@/src/utils/regex";

export default function Login() {
  const router = useRouter();
  const { signIn, isLoading } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRecover = () => {
    router.push("/auth/recover");
  };

  const validateInputs = (): boolean => {
    if (username.length === 0) {
      enqueueSnackbar("Ingrese un  de usuario.", { variant: "error" });
      return false;
    }

    if (!passwordRegex.test(password)) {
      enqueueSnackbar(
        "La contraseña debe tener al menos 12 caracteres, un número y un carácter especial.",
        { variant: "error" }
      );
      return false;
    }

    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const result = await signIn(username, password);

    if (!result.success) {
      enqueueSnackbar(result.message, { variant: "error" });
    } else {
      const { roles } = result;
      if (roles && roles.includes("admin")) {
        router.push("/admin/panel");
      } else {
        router.push("/alerts");
      }
    }
  };

  return (
    <div className={"auth__page"}>
      <div className={"auth__container"}>
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
        <h1>Inicio de Sesión</h1>
        <form className="auth__form" onSubmit={handleLogin}>
          <div className={"auth__form--inputs"}>
            <IconInput
              icon="person"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <PasswordInput
              icon="key"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <small className={"auth__small--text"}>
            ¿Olvidó su contraseña?{" "}
            <span className={"auth__link"} onClick={handleRecover}>
              Restablézcala aquí.
            </span>
          </small>
          <Button
            text={"INGRESAR"}
            color={ButtonColor.SUCCESS}
            type="submit"
            disabled={isLoading}
          />
        </form>
      </div>
    </div>
  );
}
