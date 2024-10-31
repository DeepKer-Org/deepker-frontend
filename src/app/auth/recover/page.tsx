"use client";
import React from 'react'
import {useRouter} from "next/navigation";
import Image from "next/image";
import IconInput from "@/src/components/ui/inputs/IconInput";
import PasswordInput from "@/src/components/ui/inputs/PasswordInput";
import Button from "@/src/components/ui/buttons/Button";
import {ButtonColor} from "@/src/enums/ButtonColor";
import DateInput from "@/src/components/ui/inputs/DateInput";

const Recover = () => {
    const router = useRouter();
    const handleRecover = () => {
    }
    const handleLogin = () => {
        router.push("/auth/login");
    }

    return (
        <div className={"auth__page"}>
            <div className={"auth__container"}>
                <Image src={"/icons/deepker-original.webp"} alt={"Deepker"} className={"auth__logo"} width={200}
                       height={200}/>
                <h1>Bienvenido</h1>
                <div className={"auth__form"}>
                    <div className={"auth__form--inputs"}>
                        <IconInput icon="person" placeholder="DNI"/>
                        <DateInput icon="date_range" placeholder="Fecha de emisión de DNI"/>
                        <PasswordInput icon="key" placeholder="Nueva contraseña"/>
                        <PasswordInput icon="key" placeholder="Confirme su contraseña"/>
                    </div>
                    <small className={"auth__small--text"}>¿Tiene una cuenta? <span className={"auth__link"} onClick={handleLogin}>Inicie sesión aquí.</span></small>
                    <Button text={"RESTABLECER"} color={ButtonColor.SUCCESS}/>
                </div>
            </div>
        </div>
    )
}
export default Recover
