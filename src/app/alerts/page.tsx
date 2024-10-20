"use client";

import UnattendedAlertsTable from "@/src/components/sections/alerts/unattended/UnattendedAlertsTable";
import {AttendedAlertsTable} from "@/src/components/sections/alerts/attended/AttendedAlertsTable";
import {useEffect, useState} from "react";

export default function UnattendedAlerts() {
    const [showUnattendedAlerts, setShowUnattendedAlerts] = useState(true);
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
                            className={`option ${showUnattendedAlerts ? "option-unattended" : ""}`}
                            onClick={() => setShowUnattendedAlerts(true)}
                        >
                            <p>No Atendidas</p>
                        </div>
                        <div
                            className={`option ${!showUnattendedAlerts ? "option-unattended" : ""}`}
                            onClick={() => setShowUnattendedAlerts(false)}
                        >
                            <p>Atendidas</p>
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-x-1">
                        <p className={"update__text"}>
                            ÚLTIMA ACTUALIZACIÓN: <span className="update__text--time">{updateTime}</span>
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
                {showUnattendedAlerts ? <UnattendedAlertsTable refresh={isRefreshing}/> :
                    <AttendedAlertsTable refresh={isRefreshing}/>}
            </div>
        </div>
    );
}
