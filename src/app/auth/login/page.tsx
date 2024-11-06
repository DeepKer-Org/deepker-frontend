"use client";
import Image from "next/image";
import Button from "@/src/components/ui/buttons/Button";
import {ButtonColor} from "@/src/enums/ButtonColor";
import {useRouter} from "next/navigation";
import IconInput from "@/src/components/ui/inputs/IconInput";
import PasswordInput from "@/src/components/ui/inputs/PasswordInput";
import {useAuth} from "@/src/context/AuthContext";
import {useState} from "react";
import {useSnackbar} from "notistack";

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
        let valid = true;

        if (username.length === 0) {
            valid = false;
            enqueueSnackbar("Ingrese un nombre de usuario.", { variant: "error" });
        }

        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*_])[A-Za-z\d!@#$%^&*_]{8,}$/;
        if (!passwordRegex.test(password)) {
            valid = false;
            enqueueSnackbar("La contraseña debe tener al menos 8 caracteres, un número y un carácter especial.", { variant: "error" });
        }

        return valid;
    };

    const handleLogin = async () => {
        if (!validateInputs()) {
            return;
        }

        const result = await signIn(username, password);

        if (!result.success) {
            enqueueSnackbar(result.message, { variant: "error" });
        } else {
            const { roles } = result; // Get roles from signIn response
            if (roles && roles.includes("admin")) {
                router.push("/admin/panel"); // Redirect to admin panel if user has admin role
            } else {
                router.push("/alerts"); // Redirect to alerts if user does not have admin role
            }
        }
    };

    return (
        <div className={"auth__page"}>
            <div className={"auth__container"}>
                <Image src={"/icons/deepker-original.webp"} alt={"Deepker"} className={"auth__logo"} width={200} height={200} />
                <h1>Bienvenido</h1>
                <div className={"auth__form"}>
                    <div className={"auth__form--inputs"}>
                        <IconInput icon="person" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <PasswordInput icon="key" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <small className={"auth__small--text"}>
                        ¿Olvidó su contraseña?{" "}
                        <span className={"auth__link"} onClick={handleRecover}>Restablézcala aquí.</span>
                    </small>
                    <Button text={"INGRESAR"} color={ButtonColor.SUCCESS} onClick={handleLogin} disabled={isLoading} />
                </div>
            </div>
        </div>
    );
}