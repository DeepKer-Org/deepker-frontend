"use client";

import ActiveAlertsTable from "@/src/components/sections/alerts/active/ActiveAlertsTable";
import { ResolvedAlertsTable } from "@/src/components/sections/alerts/resolved/ResolvedAlertsTable";
import { useEffect, useState } from "react";

export default function ActiveAlerts() {
  const [showActiveAlerts, setShowActiveAlerts] = useState(true);
  const [updateTime, setUpdateTime] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const updateTimeNow = () => {
    const currentTime = new Date().toLocaleTimeString();
    setUpdateTime(currentTime);
  };

  useEffect(() => {
    updateTimeNow();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    updateTimeNow();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 700);
  };

  return (
    <div className="flex h-full">
      <div className="flex-1 overflow-x-auto">
        <h1>Panel de Alertas</h1>
        <div className="table-toolbar flex flex-row justify-between">
          <div className="flex flex-row gap-x-4 mx-2">
            <div
              className={`option ${showActiveAlerts ? "option-active" : ""}`}
              onClick={() => setShowActiveAlerts(true)}
            >
              <p>Alertas Activas</p>
            </div>
            <div
              className={`option ${!showActiveAlerts ? "option-active" : ""}`}
              onClick={() => setShowActiveAlerts(false)}
            >
              <p>Alertas Resueltas</p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-x-1">
            <p>
              ÚLTIMA ACTUALIZACIÓN: <span className="time">{updateTime}</span>
            </p>
            <span
              className={`material-symbols-outlined cursor-pointer ${
                isRefreshing ? "spin-animation" : ""
              }`}
              onClick={handleRefresh}
            >
              refresh
            </span>
          </div>
        </div>
        {showActiveAlerts ? <ActiveAlertsTable /> : <ResolvedAlertsTable />}
      </div>
    </div>
  );
}
