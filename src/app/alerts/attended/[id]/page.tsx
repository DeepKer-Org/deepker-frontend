"use client";
import React, {useEffect, useState} from 'react'
import CardWrapper from "@/src/components/ui/wrappers/CardWrapper";
import IconTitle from "@/src/components/ui/IconTitle";
import DetailRow from "@/src/components/ui/DetailRow";
import ReturnButton from "@/src/components/ui/buttons/ReturnButton";
import {Alert, AlertResponse} from "@/src/types/alert";
import {fetchAlert} from "@/src/api/alerts";
import {formatTime, formatDate} from "@/src/utils/formatTime";

const AttendedAlertDetail = ({params}: { params: { id: string } }) => {
    const [alertData, setAlertData] = useState<Alert | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadAlert = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data: AlertResponse = await fetchAlert(params.id);
                setAlertData(data.alert);
            } catch (err) {
                setError('Failed to fetch alert details: ' + err.message);
            } finally {
                setIsLoading(false);
            }
        };
        loadAlert();
    }, [params.id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!alertData) {
        return <div>No data found</div>;
    }


    return (
        <div className={"page__container"}>
            <div className="button__container">
                <ReturnButton/>
            </div>
            <div className={"details__container grid-cols-3 grid-rows-2"}>
                <CardWrapper>
                    <IconTitle className={"mb-4"} icon={"person"} title={"Datos del paciente:"}/>
                    <DetailRow label={"Nombre:"} name={alertData.patient.name}/>
                    <DetailRow label={"DNI:"} name={alertData.patient.dni}/>
                    <DetailRow label={"Edad:"} name={(alertData.patient.age).toString() + " años"}/>
                    <DetailRow label={"Género:"} name={(alertData.patient.sex === "F" ? "Mujer" : "Hombre")}/>
                </CardWrapper>
                <CardWrapper>
                    <IconTitle className={"mb-4"} icon={"monitor"} title={"Diagnóstico final:"}/>
                    <p className={"font-semibold"}>{
                        alertData.final_diagnosis !== "" ? alertData.final_diagnosis : (alertData.computer_diagnoses.length > 0 ? alertData.computer_diagnoses[0].diagnosis : "En proceso")
                    }</p>
                    {alertData.final_diagnosis !== "" ?
                        (<p>Confirmado por médico.</p>)
                        :
                        (
                            alertData.computer_diagnoses.length > 0 ? (
                                <p>Predicción de DeepKer con un {alertData.computer_diagnoses[0].percentage}% de
                                    precisión.</p>
                            ) : (
                                <p>La predicción está siendo procesada.</p>
                            )
                        )
                    }
                </CardWrapper>
                <CardWrapper>
                    <IconTitle className={"mb-4"} icon={"health_and_safety"} title={"Atendido por:"}/>
                    <ul className={"ul__container"}>
                        {
                            alertData.patient.doctors &&
                            alertData.patient.doctors.map((doctor, index) => (
                                <li key={index}>{doctor}</li>
                            ))
                        }
                    </ul>
                </CardWrapper>
                <CardWrapper>
                    <IconTitle className={"mb-4"} icon={"warning"} title={"Riesgos preexistentes:"}/>
                    <ul className={"ul__container"}>
                        {
                            alertData.patient.comorbidities &&
                            alertData.patient.comorbidities.map((comorbidity, index) => (
                                <li key={index}>{comorbidity}</li>
                            ))
                        }
                    </ul>
                </CardWrapper>
                <CardWrapper>
                    <IconTitle className={"mb-4"} icon={"crisis_alert"} title={"Hora de alerta:"}/>
                    <p>{formatDate(alertData.alert_timestamp)} a las {formatTime(alertData.alert_timestamp)}</p>
                </CardWrapper>
                <CardWrapper>
                    <IconTitle className={"mb-4"} icon={"schedule"} title={"Hora de atención:"}/>
                    <p>{formatDate(alertData.attended_timestamp)} a las {formatTime(alertData.attended_timestamp)}</p>
                </CardWrapper>
            </div>
        </div>
    )
}

export default AttendedAlertDetail