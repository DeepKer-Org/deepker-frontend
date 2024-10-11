"use client";
import React, {useState} from 'react'
import ReturnButton from "@/src/components/ui/buttons/ReturnButton";
import CardWrapper from "@/src/components/ui/wrappers/CardWrapper";
import IconTitle from "@/src/components/ui/IconTitle";
import DetailRow from "@/src/components/ui/DetailRow";
import LastAlertElement from "@/src/components/sections/patients/LastAlertElement";
import {Alert} from "@/src/types/alert";
import {resolvedAlerts} from "@/src/data/alerts";
import MonthYearPicker from "@/src/components/sections/patients/MonthYearPicker";
import {TimelineData} from "@/src/types/timelineData";
import TimelineElement from "@/src/components/sections/patients/TimelineElement";

const PatientDetail = ({params}: { params: { id: string } }) => {
    const alert: Alert = resolvedAlerts[0];
    const [initSelectedDate, setInitSelectedDate] = useState<Date | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const handleInitDateChange = (date: Date | null) => {
        setInitSelectedDate(date); // Update parent component state with the selected date
    };
    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date); // Update parent component state with the selected date
    };
    const timelineElements: TimelineData[] = [
        {
            id: "1",
            date: "Ener 23, 2024",
            title: "Ingreso a la clínica",
            description: "El paciente ingresó a la clínica por un cuadro de fiebre alta y dificultad para respirar. El paciente ingresó a la clínica por un cuadro de fiebre alta y dificultad para respirar."
        },
        {
            id: "2",
            date: "Ener 23, 2024",
            title: "Inicio de tratamiento",
            description: "Se le ha suministro paracetamol y amoxicilina para tratar la fiebre y la infección. El paciente ha presentado una mejoría en su estado de salud."
        },
        {
            id: "3",
            date: "Ener 23, 2024",
            title: "Deterioro del paciente",
            description: "El paciente ha presentado un deterioro en su estado de salud, se le ha suministrado oxígeno. El paciente ha presentado un deterioro en su estado de salud, se le ha suministrado oxígeno."
        },
        {
            id: "4",
            date: "Ener 23, 2024",
            title: "Atención médica",
            description: "El paciente ha sido atendido por el Dr. Francesco Lomparte, se le ha suministrado medicación."
        },
        {
            id: "5",
            date: "Ener 23, 2024",
            title: "Alerta de salud",
            description: "El paciente ha presentado un cuadro de fiebre alta y dificultad para respirar."
        },
        {
            id: "6",
            date: "Ener 23, 2024",
            title: "Atención médica",
            description: "El paciente ha sido atendido por el Dr. Francesco Lomparte, se le ha suministrado medicación."
        },
        {
            id: "7",
            date: "Ener 23, 2024",
            title: "Alerta de salud",
            description: "El paciente ha presentado un cuadro de fiebre alta y dificultad para respirar."
        },
        {
            id: "8",
            date: "Ener 23, 2024",
            title: "Atención médica",
            description: "El paciente ha sido atendido por el Dr. Francesco Lomparte, se le ha suministrado medicación."
        },
        {
            id: "9",
            date: "Ener 23, 2024",
            title: "Alerta de salud",
            description: "El paciente ha presentado un cuadro de fiebre alta y dificultad para respirar."
        },
    ]

    return (
        <div className={"page__container"}>
            <div className="button__container">
                <ReturnButton/>
            </div>
            <div className={"details__container grid-cols-3 grid-rows-11"}>
                <CardWrapper className={"row-span-4"}>
                    <IconTitle className={"mb-4"} icon={"person"} title={"Datos del paciente:"}/>
                    <DetailRow label={"Nombre:"} name={"Nombre Apellido"}/>
                    <DetailRow label={"DNI:"} name={"Mi dni"}/>
                    <DetailRow label={"Edad:"} name={"32 años"}/>
                    <DetailRow label={"Género:"} name={"Hombre"}/>
                    <DetailRow label={"Lugar:"} name={"Mi lugar"}/>
                    <DetailRow label={"Fecha ingreso:"} name={"12/09/2024"}/>
                </CardWrapper>
                <CardWrapper className={"row-span-3"}>
                    <IconTitle className={"mb-4"} icon={"warning"} title={"Riesgos preexistentes:"}/>
                    <ul>
                        <li>Diabetes Mellitus</li>
                        <li>Obesidad</li>
                        <li>Antecedente de Infarto de Miocardio (Preinfarto)</li>
                    </ul>
                </CardWrapper>
                <CardWrapper className={"row-span-8"}>
                    <IconTitle className={"mb-4"} icon={"monitor"} title={"Métricas biométricas en monitoreo:"}/>
                    <div className={"metrics__container"}>
                        <div className={"metrics__grid metrics__item--black"}>
                            <p className={"metrics__grid--left metrics__text--h1"}>BPM</p>
                            <div className={"metrics__grid--right"}>
                                <div className={"metrics__text--h3"}>
                                    <p>120</p>
                                    <p>50</p>
                                </div>
                                <p className={"metrics__text--h1"}>60</p>
                            </div>
                        </div>
                        <div className={"metrics__divider"}/>
                        <div className={"metrics__grid metrics__item--blue"}>
                            <p className={"metrics__grid--left metrics__text--h1"}>SPO2</p>
                            <div className={"metrics__grid--right"}>
                                <div className={"metrics__text--h3"}>
                                    <p>100</p>
                                    <p>90</p>
                                </div>
                                <p className={"metrics__text--h1"}>84</p>
                            </div>
                        </div>
                        <div className={"metrics__divider"}/>
                        <div className={"metrics__grid metrics__item--black"}>
                            <p className={"metrics__grid--left metrics__text--h1"}>Temp</p>
                            <div className={"metrics__grid--right"}>
                                <div className={"metrics__text--h3 metrics__text--tight"}>
                                    <p>40.1</p>
                                    <p>36.9</p>
                                </div>
                                <p className={"metrics__text--h1 metrics__text--tighter"}>37.3</p>
                            </div>
                        </div>
                        <div className={"metrics__divider"}/>
                        <div className={"metrics__grid metrics__item--blue"}>
                            <div className={"metrics__grid--left"}>
                                <div className={"flex flex-col justify-center"}>
                                    <p className={"metrics__text--h2"}>NBP</p>
                                    <p className={"metrics__text--h2"}>Sys.</p>
                                </div>
                            </div>
                            <div className={"metrics__grid--right"}>
                                <div className={"metrics__text--h3"}>
                                    <p>100</p>
                                    <p>90</p>
                                </div>
                                <p className={"metrics__text--h1 metrics__text--tighter"}>121/82</p>
                            </div>
                        </div>
                        <div className={"metrics__divider"}/>
                        <div className={"metrics__grid metrics__item--black"}>
                            <div className={"metrics__grid--left"}>
                                <div className={"flex flex-col justify-center"}>
                                    <p className={"metrics__text--h2"}>NBP</p>
                                    <p className={"metrics__text--h2"}>mmHg</p>
                                </div>
                            </div>
                            <div className={"metrics__grid--right"}>
                                <p className={"metrics__text--h1 metrics__text--tighter"}>(89)</p>
                            </div>
                        </div>
                    </div>
                </CardWrapper>
                <CardWrapper className={"row-span-2"}>
                    <IconTitle className={"mb-4"} icon={"health_and_safety"} title={"Médico asociado:"}/>
                    <ul>
                        <li>Doc. Francesco Lomparte</li>
                    </ul>
                </CardWrapper>
                <CardWrapper className={"row-span-7 timeline__container relative"}>
                    <h4>Linea de tiempo</h4>
                    <div className={"timeline__header "}>
                        <div className={"timeline__date"}><p>Desde:</p> <MonthYearPicker
                            onDateChange={handleInitDateChange}/></div>
                        <div className={"timeline__date"}><p>Hasta:</p> <MonthYearPicker
                            onDateChange={handleDateChange}/></div>
                    </div>
                    <div className={"timeline__body "}>
                        {timelineElements.map((element) => (
                            <TimelineElement key={element.id} date={element.date} title={element.title}
                                             description={element.description}/>
                        ))}
                    </div>
                    <div className={"timeline__line"}></div>
                    <div className={"timeline__circle"}></div>
                </CardWrapper>
                <CardWrapper className={"row-span-3"}>
                    <IconTitle className={"mb-4"} icon={"medication"}
                               title={"Medicación actual:"}/>
                    <ul>
                        <li><span>Hello:</span> 100 mg - Diario</li>
                        <li><span>Hello:</span> 100 mg - Diario</li>
                        <li><span>Hello:</span> 100 mg - Diario</li>
                        <li><span>Hello:</span> 100 mg - Diario</li>
                    </ul>
                </CardWrapper>
                <CardWrapper className={"row-span-3 col-span-2"}>
                    <IconTitle icon={"crisis_alert"} title={"Última alerta:"}/>
                    <div className="table-container">
                        <div className="table-header-row grid-cols-10">
                            <p className={"col-span-2"}>FECHA</p>
                            <p className={"col-span-3"}>DIAGNÓSTICOS</p>
                            <p className={"col-span-3"}>ATENDIDO POR</p>
                            <p className={"col-span-2"}>OPCIONES</p>
                        </div>
                        <div className="table-body">
                            <LastAlertElement alert={alert}/>
                        </div>
                    </div>
                </CardWrapper>
            </div>
        </div>
    )
}

export default PatientDetail