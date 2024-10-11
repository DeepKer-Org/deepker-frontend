import React from 'react'
import CardWrapper from "@/src/components/ui/wrappers/CardWrapper";
import IconTitle from "@/src/components/ui/IconTitle";
import DetailRow from "@/src/components/ui/DetailRow";
import ReturnButton from "@/src/components/ui/buttons/ReturnButton";

const ResolvedAlertDetail = ({params}: { params: { id: string } }) => {
    return (
        <div className={"page__container"}>
            <div className="button__container">
                <ReturnButton/>
            </div>
            <div className={"details__container grid-cols-3 grid-rows-4"}>
                <CardWrapper className={"row-span-2"}>
                    <IconTitle className={"mb-4"} icon={"person"} title={"Datos del paciente:"}/>
                    <DetailRow label={"Nombre:"} name={"Nombre Apellido"}/>
                    <DetailRow label={"DNI:"} name={"Mi dni"}/>
                    <DetailRow label={"Lugar:"} name={"Mi lugar"}/>
                    <DetailRow label={"Fecha alerta:"} name={"Mi hora"}/>
                    <DetailRow label={"Hora alerta:"} name={"Mi fecha"}/>
                </CardWrapper>
                <CardWrapper>
                    <IconTitle className={"mb-4"} icon={"monitor"} title={"Diagnóstico final:"}/>
                    <p className={"font-semibold"}>Paro Cardíaco</p>
                    <p>Confirmado por médico y por Deepker.</p>
                </CardWrapper>
                <CardWrapper className={"row-span-2"}>
                    <IconTitle className={"mb-4"} icon={"health_and_safety"} title={"Atendido por:"}/>
                    <ul className={"ul__container"}>
                        <li>Doc. Francesco Lomparte</li>
                        <li>Enf. Juliana Bautista</li>
                    </ul>
                </CardWrapper>
                <CardWrapper>
                    <IconTitle className={"mb-4"} icon={"schedule"} title={"Hora de atención:"}/>
                    <p>12/15/2024 a las 12:17 PM</p>
                </CardWrapper>
                <CardWrapper className={"row-span-2"}>
                    <IconTitle className={"mb-4"} icon={"warning"} title={"Riesgos preexistentes:"}/>
                    <ul className={"ul__container"}>
                        <li>Diabetes Mellitus</li>
                        <li>Obesidad</li>
                        <li>Antecedente de Infarto de Miocardio (Preinfarto)</li>
                    </ul>
                </CardWrapper>
                <CardWrapper className={"row-span-2"}>
                    <IconTitle altIconColor className={"mb-4"} icon={"medication"}
                               title={"Medicina previa a la alerta:"}/>
                    <ul className={"ul__container"}>
                        <li><span>Hello:</span> 100 mg - Diario</li>
                        <li><span>Hello:</span> 100 mg - Diario</li>
                        <li><span>Hello:</span> 100 mg - Diario</li>
                        <li><span>Hello:</span> 100 mg - Diario</li>
                    </ul>
                </CardWrapper>
                <CardWrapper className={"row-span-2"}>
                    <IconTitle className={"mb-4"} icon={"medication"}
                               title={"Medicina aplicada tras la alerta:"}/>
                    <ul className={"ul__container"}>
                        <li><span>Hello:</span> 100 mg - Diario</li>
                        <li><span>Hello:</span> 100 mg - Diario</li>
                        <li><span>Hello:</span> 100 mg - Diario</li>
                        <li><span>Hello:</span> 100 mg - Diario</li>
                    </ul>
                </CardWrapper>
            </div>
        </div>
    )
}

export default ResolvedAlertDetail