"use client";
import React, { useState } from 'react';
import { formatDate } from "@/src/utils/formatTime";

interface TimelineElementProps {
    entry_date: string;
    discharge_date: string | null;
    title: string;
    description: string;
}

const TimelineElement: React.FC<TimelineElementProps> = ({ entry_date, discharge_date, title, description }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const entryDateObject = new Date(entry_date);
    const dischargeDateObject = discharge_date ? new Date(discharge_date) : null;

    const handleToggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    const isValidDateRange = !dischargeDateObject || entryDateObject <= dischargeDateObject;

    if (!isValidDateRange) {
        return null;
    }

    return (
        <div className={"timeline__element"}>
            <div className={"timeline__disc"} />
            <div className={"timeline__details"}>
                <p className={"timeline__date"}>
                    {formatDate(entry_date)}
                    {discharge_date && " - " + formatDate(discharge_date)}
                </p>
                <p className={"timeline__title"}>{title}</p>
                <p
                    className={`timeline__description ${isExpanded ? '' : 'line-clamp-2'}`}
                    onClick={handleToggleDescription}
                >
                    {description}
                </p>
            </div>
        </div>
    );
};

export default TimelineElement;
