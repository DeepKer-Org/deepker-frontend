"use client";
import Image from "next/image";
import Button from "@/src/components/ui/buttons/Button";
import {ButtonColor} from "@/src/enums/ButtonColor";
import {useRouter} from "next/navigation";
import IconInput from "@/src/components/ui/inputs/IconInput";
import PasswordInput from "@/src/components/ui/inputs/PasswordInput";

export default function Login() {
    const router = useRouter();
    const handleRecover = () => {
        router.push("/auth/recover");
    }
    return (
        <div className={"auth__page"}>
            <div className={"auth__container"}>
                <Image src={"/icons/deepker-original.webp"} alt={"Deepker"} className={"auth__logo"} width={200}
                       height={200}/>
                <h1>Bienvenido</h1>
                <div className={"auth__form"}>
                    <div className={"auth__form--inputs"}>
                        <IconInput icon="person" placeholder="Usuario"/>
                        <PasswordInput icon="key" placeholder="Contraseña"/>
                    </div>
                    <small className={"auth__small--text"}>¿Olvidó su contraseña? <span className={"auth__link"} onClick={handleRecover}>Restablézcala aquí.</span></small>
                    <Button text={"INGRESAR"} color={ButtonColor.SUCCESS}/>
                </div>
            </div>
        </div>
    )
}