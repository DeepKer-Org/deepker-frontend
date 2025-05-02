import React from "react";

import { Alert } from "@/src/types/alert";
import DetailRow from "../DetailRow";
import { formatDate, formatTime } from "@/src/utils/formatTime";

interface AlertDetailModalProps {
  alert: Alert;
}

const AlertDetailModal: React.FC<AlertDetailModalProps> = ({ alert }) => {
  return (
    <div className="alert__modal flex flex-col gap-4 px-4 max-h-[68vh] overflow-y-auto">
      <h1 className="mx-auto">Detalle de la Alerta</h1>
      <div className="space-y-5">
        <div className="space-y-1.5">
          <div className={"flex"}>
            <span className={`material-symbols-outlined mr-2 text-green-500`}>
              person
            </span>
            <p className={"highlight"}>Datos del paciente</p>
          </div>
          <div className={"ml-8"}>
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
          </div>
        </div>
        <div className="space-y-1.5">
          <div className={"flex"}>
            <span className={`material-symbols-outlined mr-2 text-green-500`}>
              warning
            </span>
            <p className={"highlight"}>Riesgos preexistentes:</p>
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
        {alert.final_diagnosis !== "" && (
          <div className="space-y-1.5">
            <div className={"flex"}>
              <span className={`material-symbols-outlined mr-2 text-green-500`}>
              health_metrics
              </span>
              <p className={"highlight"}>Diagnóstico final:</p>
            </div>
            <div className={"ml-8"}>
              <p className="text">{alert.final_diagnosis}</p>
              <ul className="ul__container">
                <li>
                  "{alert.final_diagnosis}", confirmado por médico.
                </li>
              </ul>
            </div>
          </div>
        )}
        <div className="space-y-1.5">
          <div className={"flex"}>
            <span className={`material-symbols-outlined mr-2 text-green-500`}>
              monitor
            </span>
            <p className={"highlight"}>Diagnóstico de DeepKer:</p>
          </div>
          <div className={"ml-8"}>
            <ul className="ul__container">
              <li>
                "{alert.computer_diagnostic.diagnosis}", confirmado por Deepker con un{" "}
                {alert.computer_diagnostic.percentage}% de precisión.
              </li>
            </ul>
          </div>
        </div>
        <div className="space-y-1.5">
          <div className={"flex"}>
            <span className={`material-symbols-outlined mr-2 text-green-500`}>
              health_and_safety
            </span>
            <p className={"highlight"}>Atendido por:</p>
          </div>
          <div className={"ml-8"}>
            {alert.attended_by.name !== "" ? (
              <p className="text">
                {alert.attended_by.name}, {alert.attended_by.specialization}
              </p>
            ) : (
              <p className="text">Sin información</p>
            )}
          </div>
        </div>
        <div className="space-y-1.5">
          <div className={"flex"}>
            <span className={`material-symbols-outlined mr-2 text-green-500`}>
              crisis_alert
            </span>
            <p className={"highlight"}>Hora de alerta:</p>
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
            <span className={`material-symbols-outlined mr-2 text-green-500`}>
              schedule
            </span>
            <p className={"highlight"}>Hora de atención:</p>
          </div>
          <div className={"ml-8"}>
            <p className="text">
              {alert.attended_timestamp
                ? `${formatDate(alert.attended_timestamp)} a las ${formatTime(
                    alert.attended_timestamp
                  )}`
                : "No se ha atendido"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertDetailModal;
