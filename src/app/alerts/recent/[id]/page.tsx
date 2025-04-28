"use client";
import Button from "@/src/components/ui/buttons/Button";
import ReturnButton from "@/src/components/ui/buttons/ReturnButton";
import { ButtonColor } from "@/src/enums/ButtonColor";
import React, { useEffect, useState } from "react";
import DetailRow from "@/src/components/ui/DetailRow";
import {
  Alert,
  AlertMarkAttendanceRequest,
  AlertResponse,
} from "@/src/types/alert";
import { fetchAlert, updateAlert } from "@/src/api/alerts";
import { formatDate, formatTime } from "@/src/utils/formatTime";
import { enqueueSnackbar } from "notistack";
import { useAuth } from "@/src/context/AuthContext";
import ModalWrapper from "@/src/components/ui/wrappers/ModalWrapper";
import LiberateConfirmationModal from "@/src/components/ui/modals/LiberateConfirmationModal";
import { Monitor } from "@/src/components/sections/alerts/recent/Monitor";
import DiagnosticCard from "@/src/components/sections/alerts/recent/DiagnosticCard";

const PastAlertDetail = ({ params }: { params: { id: string } }) => {
  const [alert, setAlert] = useState<Alert | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liberateModal, setLiberateModal] = React.useState(false);
  const { doctorId } = useAuth();

  const loadAlert = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data: AlertResponse = await fetchAlert(params.id);
      setAlert(data.alert);
    } catch {
      setError("No se pudo recuperar el detalle de la alerta");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAlert();
  }, [params.id]);

  const handleMarkAttendance = async () => {
    const alertMarkAttendanceRequest: AlertMarkAttendanceRequest = {
      attended_by_id: doctorId!,
      attended_timestamp: new Date().toISOString(),
    };
    try {
      await updateAlert(params.id, alertMarkAttendanceRequest);
      enqueueSnackbar("¡Asistencia marcada exitosamente!", {
        variant: "success",
      });
      onAlertUpdate();
    } catch {
      enqueueSnackbar(
        "Error al marcar la asistencia. Por favor, intente de nuevo.",
        {
          variant: "error",
        }
      );
    }
  };

  if (isLoading) {
    return <div className={"table-error"}>Cargando...</div>;
  }

  if (error) {
    return <p className={"table-error"}>{error}</p>;
  }

  if (!alert) {
    return <div>No data found</div>;
  }

  const onAlertUpdate = () => {
    loadAlert();
  };

  return (
    <div className={"page__container"}>
      <div className="button__container">
        <ReturnButton />
        {alert.attended_timestamp === "" ? (
          <Button
            text={"Atender"}
            color={ButtonColor.SUCCESS}
            onClick={handleMarkAttendance}
            className="w-40"
          />
        ) : alert.attended_by.doctor_id !== doctorId ? (
          <Button
            text={"En Atención"}
            color={ButtonColor.PRIMARY}
            className="w-40"
          />
        ) : (
          <Button
            text={"Liberar"}
            color={ButtonColor.DANGER}
            onClick={() => setLiberateModal(true)}
            className="w-40"
          />
        )}
      </div>
      <div className="px-6 h-full flex flex-col">
        <div className="flex-1 grid grid-cols-2 gap-4">
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className={"flex"}>
                <span
                  className={`material-symbols-outlined mr-2 text-green-500`}
                >
                  person
                </span>
                <p className={"font-semibold"}>Datos del paciente</p>
              </div>
              <div className={"ml-8 space-y-1"}>
                <DetailRow label={"Nombre:"} name={alert.patient.name} />
                <DetailRow label={"DNI:"} name={alert.patient.dni} />
                <DetailRow
                  label={"Edad:"}
                  name={alert.patient.age.toString() + " años"}
                />
                <DetailRow
                  label={"Género:"}
                  name={alert.patient.sex === "M" ? "Hombre" : "Mujer"}
                />
                <DetailRow label="Lugar" name={alert.patient.location} />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className={"flex"}>
                <span
                  className={`material-symbols-outlined mr-2 text-green-500`}
                >
                  crisis_alert
                </span>
                <p className={"font-semibold"}>Hora de alerta:</p>
              </div>
              <div className={"ml-8"}>
                <p className="text">
                  {formatDate(alert.alert_timestamp)} a las{" "}
                  {formatTime(alert.alert_timestamp)}
                </p>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className={"flex"}>
                <span
                  className={`material-symbols-outlined mr-2 text-green-500`}
                >
                  schedule
                </span>
                <p className={"font-semibold"}>Hora de atención:</p>
              </div>
              <div className={"ml-8"}>
                <p className="text">
                  {alert.attended_timestamp ? (
                    <>
                      {formatDate(alert.attended_timestamp)} a las{" "}
                      {formatTime(alert.attended_timestamp)}
                    </>
                  ) : (
                    "No se ha marcado la asistencia"
                  )}
                </p>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className={"flex"}>
                <span
                  className={`material-symbols-outlined mr-2 text-green-500`}
                >
                  health_and_safety
                </span>
                <p className={"font-semibold"}>Atendido por:</p>
              </div>
              <div className={"ml-8"}>
                {alert.attended_by.name !== "" ? (
                  <p className="text">
                    {alert.attended_by.name}, {alert.attended_by.specialization}
                  </p>
                ) : (
                  <p className="text">No se ha marcado la asistencia</p>
                )}
              </div>
            </div>
            <div className="space-y-1.5">
              <div className={"flex"}>
                <span
                  className={`material-symbols-outlined mr-2 text-green-500`}
                >
                  medication
                </span>
                <p className={"font-semibold"}>Medicación actual:</p>
              </div>
              <div className={"ml-8"}>
                <ul className="ul__container">
                  {alert.patient.medications?.length > 0 ? (
                    alert.patient.medications?.map((medication, index) => (
                      <li key={index}>
                        <span>{medication.name}:</span> {medication.dosage} -{" "}
                        {medication.periodicity}
                      </li>
                    ))
                  ) : (
                    <li>No hay medicación actual</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className={"flex"}>
                <span
                  className={`material-symbols-outlined mr-2 text-green-500`}
                >
                  warning
                </span>
                <p className={"font-medium"}>Riesgos preexistentes:</p>
              </div>
              <div className={"ml-8"}>
                <ul className={"ul__container"}>
                  {alert.patient.comorbidities?.length > 0 ? (
                    alert.patient.comorbidities.map((comorbidity, index) => (
                      <li key={index}>{comorbidity}</li>
                    ))
                  ) : (
                    <li>No hay riesgos preexistentes</li>
                  )}
                </ul>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className={"flex"}>
                <span
                  className={`material-symbols-outlined mr-2 text-green-500`}
                >
                  monitor
                </span>
                <p className={"font-medium"}>Diagnósticos de Deepker:</p>
              </div>
              <div className={"ml-8"}>
                {alert.computer_diagnostic?.diagnosis !== "" ? (
                  <DiagnosticCard alert={alert} />
                ) : (
                  <p className="text">No hay diagnósticos de Deepker</p>
                )}
              </div>
            </div>
            <div className="space-y-1.5">
              <div className={"flex"}>
                <span
                  className={`material-symbols-outlined mr-2 text-green-500`}
                >
                  health_metrics
                </span>
                <p className={"font-medium"}>Datos biométricos de la alerta:</p>
              </div>
              <div className={"ml-8"}>
                <Monitor alert={alert} />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#ECF5FF] border-[#B6D6FE] text-[#003649] border p-4 rounded-lg space-y-1">
          <p className="font-semibold">
            Información para Especialistas en Salud
          </p>
          <p>
            Los diagnósticos proporcionados por el sistema DeepKer son una
            herramienta de apoyo para los especialistas médicos, pero no
            sustituyen su experiencia ni juicio clínico. Estos resultados deben
            ser evaluados cuidadosamente, siempre considerando el criterio del
            profesional médico.
          </p>
        </div>
      </div>
      <ModalWrapper
        isOpen={liberateModal}
        onClose={() => setLiberateModal(false)}
      >
        <LiberateConfirmationModal
          setLiberateModal={setLiberateModal}
          alert={alert}
          onAlertUpdate={onAlertUpdate}
        />
      </ModalWrapper>
    </div>
  );
};

export default PastAlertDetail;
