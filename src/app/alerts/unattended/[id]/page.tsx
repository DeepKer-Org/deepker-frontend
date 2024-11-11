"use client";
import Button from "@/src/components/ui/buttons/Button";
import ReturnButton from "@/src/components/ui/buttons/ReturnButton";
import {ButtonColor} from "@/src/enums/ButtonColor";
import React, {useEffect, useState} from "react";
import DetailRow from "@/src/components/ui/DetailRow";
import Monitor from "@/src/components/sections/alerts/unattended/Monitor";
import IconTitle from "@/src/components/ui/IconTitle";
import DetailColumnWrapper from "@/src/components/ui/wrappers/DetailColumnWrapper";
import {Alert, AlertMarkAttendanceRequest, AlertResponse} from "@/src/types/alert";
import {fetchAlert, updateAlert} from "@/src/api/alerts";
import {formatTime} from "@/src/utils/formatTime";
import {enqueueSnackbar} from "notistack";
import {useRouter} from "next/navigation";
import {useAuth} from "@/src/context/AuthContext";

const UnattendedAlertDetail = ({params}: { params: { id: string } }) => {
    const [alertData, setAlertData] = useState<Alert | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { doctorId } = useAuth();

    const router = useRouter();

    useEffect(() => {
        const loadAlert = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data: AlertResponse = await fetchAlert(params.id);
                setAlertData(data.alert);
            } catch {
                setError('No se pudo recuperar el detalle de la alerta');
            } finally {
                setIsLoading(false);
            }
        };
        loadAlert();
    }, [params.id]);

    const handleMarkAttendance = async () => {
        const alertMarkAttendanceRequest: AlertMarkAttendanceRequest = {
            attended_by_id: doctorId!,
            attended_timestamp: new Date().toISOString(),
        };
        try {
            await updateAlert(params.id, alertMarkAttendanceRequest);
            router.back(); // Go back to the previous page (tables)
            enqueueSnackbar('¡Asistencia marcada exitosamente!', {
                variant: 'success'
            });
        } catch {
            enqueueSnackbar('Error al marcar la asistencia. Por favor, intente de nuevo.', {
                variant: 'error'
            });
        }
    }

    if (isLoading) {
        return <div className={"table-error"}>Cargando...</div>;
    }

    if (error) {
        return <p className={"table-error"}>{error}</p>
    }

    if (!alertData) {
        return <div>No data found</div>;
    }


    return (
        <div className={"page__container"}>
            <div className="button__container">
                <ReturnButton/>
                <Button text={"Atender"} color={ButtonColor.SUCCESS} onClick={handleMarkAttendance} className="w-40"/>
            </div>
            <div className={"grid grid-cols-4 mb-4"}>
                <DetailColumnWrapper hasLeftBorder={true}>
                    <IconTitle className={"mb-4"} icon={"person"} title={"Datos del paciente:"}/>
                    <DetailRow label={"Nombre:"} name={alertData.patient.name}/>
                    <DetailRow label={"DNI:"} name={alertData.patient.dni}/>
                    <DetailRow label={"Lugar:"} name={alertData.patient.location}/>
                    <DetailRow label={"Hora alerta:"} name={formatTime(alertData.alert_timestamp)}/>
                </DetailColumnWrapper>
                <DetailColumnWrapper hasLeftBorder={true}>
                    <IconTitle className={"mb-4"} icon={"medication"} title={"Medicación actual:"}/>
                    <ul className={"ul__container"}>
                        {
                            alertData.patient.medications &&
                            alertData.patient.medications.map((med, index) => (
                                <li key={index}>
                                    <span>{med.name}:</span>
                                    <div>
                                        {med.dosage} - {med.periodicity}
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </DetailColumnWrapper>
                <DetailColumnWrapper hasLeftBorder={true}>
                    <IconTitle className={"mb-4"} icon={"monitor"} title={"Diagnóstico de Deepker:"}/>
                    <ul className={"ul__container--col xl:mr-6"}>
                        <div>
                            <p>{alertData.computer_diagnostic.diagnosis}</p>
                            <p className="font-semibold">{alertData.computer_diagnostic.percentage}%</p>
                        </div>
                    </ul>

                </DetailColumnWrapper>
                <DetailColumnWrapper>
                    <IconTitle className={"mb-4"} icon={"warning"} title={"Riesgos preexistentes:"}/>
                    <ul className={"ul__container"}>
                        {
                            alertData.patient.comorbidities.map((comorbidity, index) => (
                                <li key={index}>{comorbidity}</li>
                            ))
                        }
                    </ul>

                </DetailColumnWrapper>
            </div>
            <Monitor sensor_id={alertData.patient.monitoring_device_id} biometric_data={alertData.biometric_data}/>
        </div>
    );
};

export default UnattendedAlertDetail;
