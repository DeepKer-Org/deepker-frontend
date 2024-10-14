import Button from "@/src/components/ui/buttons/Button";
import ReturnButton from "@/src/components/ui/buttons/ReturnButton";
import {ButtonColor} from "@/src/enums/ButtonColor";
import React from "react";
import DetailRow from "@/src/components/ui/DetailRow";
import Monitor from "@/src/components/sections/alerts/unattended/Monitor";
import IconTitle from "@/src/components/ui/IconTitle";
import DetailColumnWrapper from "@/src/components/ui/wrappers/DetailColumnWrapper";

const UnattendedAlertDetail = ({params}: { params: { id: string } }) => {
    console.log(params.id);
    return (
        <div className={"page__container"}>
            <div className="button__container">
                <ReturnButton/>
                <Button text={"Atender"} color={ButtonColor.SUCCESS} className="w-40"/>
            </div>
            <div className={"grid grid-cols-4 mb-4"}>
                <DetailColumnWrapper hasLeftBorder={true}>
                    <IconTitle className={"mb-4"} icon={"person"} title={"Datos del paciente:"}/>
                    <DetailRow label={"Nombre:"} name={"Nombre Apellido"}/>
                    <DetailRow label={"DNI:"} name={"Mi dni"}/>
                    <DetailRow label={"Lugar:"} name={"Mi lugar"}/>
                    <DetailRow label={"Hora alerta:"} name={"Mi hora"}/>
                </DetailColumnWrapper>
                <DetailColumnWrapper hasLeftBorder={true}>
                    <IconTitle className={"mb-4"} icon={"medication"} title={"Medicación actual:"}/>
                    <ul className={"ul__container"}>
                        <li><span>Hello:</span> 100 mg - Diario</li>
                        <li><span>Hello:</span> 100 mg - Diario</li>
                        <li><span>Hello:</span> 100 mg - Diario</li>
                        <li><span>Hello:</span> 100 mg - Diario</li>
                        <li><span>Hello:</span> 100 mg - Diario</li>
                        <li><span>Hello:</span> 100 mg - Diario</li>
                        <li><span>Hello:</span> 100 mg - Diario</li>
                    </ul>
                </DetailColumnWrapper>
                <DetailColumnWrapper hasLeftBorder={true}>
                    <IconTitle className={"mb-4"} icon={"monitor"} title={"Diagnósticos de Deepker:"}/>
                    <ul className={"ul__container--col xl:mr-6"}>
                        <li>
                            <div>
                                <p>Paro Cardíaco</p>
                                <p className={"font-semibold"}>90%</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>Paro Cardíaco</p>
                                <p className={"font-semibold"}>90%</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>Paro Cardíaco</p>
                                <p className={"font-semibold"}>90%</p>
                            </div>
                        </li>
                    </ul>

                </DetailColumnWrapper>
                <DetailColumnWrapper>
                    <IconTitle className={"mb-4"} icon={"warning"} title={"Riesgos preexistentes:"}/>
                    <ul className={"ul__container"}>
                        <li>Diabetes Mellitus</li>
                        <li>Diabetes Mellitus</li>
                        <li>Antecedente de Infarto de Miocardio (Preinfarto)</li>
                    </ul>

                </DetailColumnWrapper>
            </div>
            <Monitor/>
        </div>
    );
};

export default UnattendedAlertDetail;
