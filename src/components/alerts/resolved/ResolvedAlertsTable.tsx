import { resolvedAlerts } from "@/src/data/alerts";
import ResolvedAlertsElement from "./ResolvedAlertsElement";

export const ResolvedAlertsTable = () => {
  const data = resolvedAlerts;

  return (
    <div className="table-container">
      <div className="table-header-row resolved-grid-cols xl:grid-cols-[15%_22%_10%_22%_15%_16%] tableBp:grid-cols-[10%_20%_8%_17%_19%_12%_14%]">
        <p>FECHA</p>
        <p>PACIENTE</p>
        <p className="hidden xl:block">LUGAR</p>
        <p>DIAGNÓSTICO</p>
        <p className="hidden tableBp:block">ATENDIDO POR</p>
        <p className="hidden xl:block">HORA DE ATENCIÓN</p>
        <p>OPCIONES</p>
      </div>
      <div className="table-body">
        {data.map((alert) => (
          <ResolvedAlertsElement key={alert.alertId} alert={alert} />
        ))}
      </div>
    </div>
  );
};
