import Button from "@/src/components/ui/buttons/Button";
import ReturnButton from "@/src/components/ui/buttons/ReturnButton";
import {ButtonColor} from "@/src/enums/ButtonColor";
import React from "react";
import DetailRow from "@/src/components/ui/DetailRow";
import Monitor from "@/src/components/sections/alerts/active/Monitor";
import IconTitle from "@/src/components/ui/IconTitle";
import DetailColumnWrapper from "@/src/components/ui/wrappers/DetailColumnWrapper";

const ActiveAlertDetail = ({params}: { params: { id: string } }) => {
    console.log(params.id);
    return (
        <div className={"h-full overflow-y-auto leading-7 "}>
            <div className="flex flex-row gap-x-8 items-center">
                <ReturnButton/>
                <Button text={"Atender"} color={ButtonColor.SUCCESS} className="w-40"/>
            </div>
            <div className={"grid grid-cols-4 mt-2 mb-4"}>
                <DetailColumnWrapper hasLeftBorder={true}>
                    <IconTitle icon={"person"} title={"Datos del paciente:"} className={"mb-2"}/>
                    <DetailRow label={"Nombre:"} name={"Nombre Apellido"}/>
                    <DetailRow label={"DNI:"} name={"Mi dni"}/>
                    <DetailRow label={"Lugar:"} name={"Mi lugar"}/>
                    <DetailRow label={"Hora alerta:"} name={"Mi hora"}/>
                </DetailColumnWrapper>
                <DetailColumnWrapper hasLeftBorder={true}>
                    <IconTitle icon={"medication"} title={"Medicación actual:"}/>
                    <ul className={"list-disc ml-8 mt-2"}>
                        <li><span className={"font-semibold mr-1"}>Hello:</span> 100 mg - Diario</li>
                        <li><span className={"font-semibold mr-1"}>Hello:</span> 100 mg - Diario</li>
                        <li><span className={"font-semibold mr-1"}>Hello:</span> 100 mg - Diario</li>
                        <li><span className={"font-semibold mr-1"}>Hello:</span> 100 mg - Diario</li>
                        <li><span className={"font-semibold mr-1"}>Hello:</span> 100 mg - Diario</li>
                        <li><span className={"font-semibold mr-1"}>Hello:</span> 100 mg - Diario</li>
                        <li><span className={"font-semibold mr-1"}>Hello:</span> 100 mg - Diario</li>
                    </ul>
                </DetailColumnWrapper>
                <DetailColumnWrapper hasLeftBorder={true}>
                    <IconTitle icon={"monitor"} title={"Diagnósticos de Deepker:"}/>
                    <ul className={"list-disc ml-8 mt-2 xl:mr-4"}>
                        <li>
                            <div className={"flex flex-row w-full justify-between"}>
                                <p>Paro Cardíaco</p>
                                <p className={"font-semibold"}>90%</p>
                            </div>
                        </li>
                        <li>
                            <div className={"flex flex-row w-full justify-between"}>
                                <p>Paro Cardíaco</p>
                                <p className={"font-semibold"}>90%</p>
                            </div>
                        </li>
                        <li>
                            <div className={"flex flex-row w-full justify-between"}>
                                <p>Paro Cardíaco</p>
                                <p className={"font-semibold"}>90%</p>
                            </div>
                        </li>
                    </ul>

                </DetailColumnWrapper>
                <DetailColumnWrapper>
                    <IconTitle icon={"warning"} title={"Riesgos preexistentes:"}/>
                    <ul className={"list-disc ml-8 mt-2"}>
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

export default ActiveAlertDetail;
