"use client";
import { activeAlerts } from "@/src/data/alerts";
import ActiveAlertsElement from "./ActiveAlertsElement";

const ActiveAlertsTable = () => {
  const data = activeAlerts;

  return (
    <div className="table-container">
      <div className="table-header-row active-grid-cols ecgBp:grid-cols-[8%_20%_10%_20%_30%_12%]">
        <p>FECHA</p>
        <p>PACIENTE</p>
        <p>LUGAR</p>
        <p>DIAGNÓSTICO</p>
        <p className="block ecgBp:hidden">VISTA PREVIA BPM + SPO2</p>
        <p className="hidden ecgBp:block">VISTA PREVIA ECG + BPM + SPO2</p>
        <p>OPCIONES</p>
      </div>
      <div className="table-body">
        {data.map((alert) => (
          <ActiveAlertsElement key={alert.alertId} alert={alert} />
        ))}
      </div>
    </div>
  );
};

export default ActiveAlertsTable;