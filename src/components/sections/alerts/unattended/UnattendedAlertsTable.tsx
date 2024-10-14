"use client";
import { activeAlerts } from "@/src/data/alerts";
import UnattendedAlertsElement from "./UnattendedAlertsElement";

const UnattendedAlertsTable = () => {
  const data = activeAlerts;

  return (
    <div className="table-container">
      <div className="table-header-row unattended-grid-cols tableBp:grid-cols-[8%_20%_10%_20%_30%_12%]">
        <p>FECHA</p>
        <p>PACIENTE</p>
        <p>LUGAR</p>
        <p>DIAGNÓSTICO</p>
        <p className="block tableBp:hidden">VISTA PREVIA BPM + SPO2</p>
        <p className="hidden tableBp:block">VISTA PREVIA ECG + BPM + SPO2</p>
        <p>OPCIONES</p>
      </div>
      <div className="table-body">
        {data.map((alert) => (
          <UnattendedAlertsElement key={alert.alertId} alert={alert} />
        ))}
      </div>
    </div>
  );
};

export default UnattendedAlertsTable;