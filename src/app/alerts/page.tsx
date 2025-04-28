"use client";

import RecentAlertsTable from "@/src/components/sections/alerts/recent/RecentAlertsTable";
import {PastAlertsTable} from "@/src/components/sections/alerts/past/PastAlertsTable";
import {useEffect, useState} from "react";

export default function Alerts() {
    const [showRecentAlerts, setShowRecentAlerts] = useState(true);
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
                            className={`option ${showRecentAlerts ? "option-recent" : ""}`}
                            onClick={() => setShowRecentAlerts(true)}
                        >
                            <p>Últimas 24 horas</p>
                        </div>
                        <div
                            className={`option ${!showRecentAlerts ? "option-recent" : ""}`}
                            onClick={() => setShowRecentAlerts(false)}
                        >
                            <p>Pasadas</p>
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
                {showRecentAlerts ? <RecentAlertsTable refresh={isRefreshing}/> :
                    <PastAlertsTable refresh={isRefreshing}/>}
            </div>
        </div>
    );
}
