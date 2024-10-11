"use client";
import React from 'react'
import {formatDate, formatTime} from "@/src/utils/formatTime";
import {useRouter} from "next/navigation";
import {Alert} from "@/src/types/alert";

interface LastAlertElementProps {
    alert: Alert
}
const LastAlertElement: React.FC<LastAlertElementProps> = ({alert}) => {
    const router = useRouter();
    const handleDetails = () => {
        router.push(`/alerts/resolved/${alert.alertId}`);
    };

    return (
        <div className="table-row grid-cols-10">
            <div className="cell-border table-row-group text-center col-span-2">
                <p>{formatDate(alert.alertTimestamp)}</p>
                <p>{formatTime(alert.alertTimestamp)}</p>
            </div>
            <div className="cell-border table-row-group px-4 col-span-3">
                <p>{alert.patient.finalDiagnosis}</p>
                <div className="table-row-subtitle table-row-icon">
                    <span className="material-symbols-outlined">monitor</span>
                    <p>DeepKer</p>
                </div>
            </div>
            <div className="flex flex-col row-border h-full px-4 col-span-3">
                <p>{alert.attendedBy}</p>
                <div className="table-row-subtitle">
                    <p>{alert.attendedBy}</p>
                </div>
            </div>
            <div
                className="flex items-center justify-center cursor-pointer text-gray-600 gap-x-4 px-4 h-full col-span-2"
                onClick={handleDetails}
            >
                <p>VER DETALLE</p>
                <span className="material-symbols-outlined">arrow_forward_ios</span>
            </div>
        </div>
    )
}
export default LastAlertElement
