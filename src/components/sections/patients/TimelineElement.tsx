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

    // Convert dates to JavaScript Date objects for comparison
    const entryDateObject = new Date(entry_date);
    const dischargeDateObject = discharge_date ? new Date(discharge_date) : null;

    // Handle toggle for expanding and collapsing description
    const handleToggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    // Check if entry_date is valid compared to discharge_date (if discharge_date exists)
    const isValidDateRange = !dischargeDateObject || entryDateObject <= dischargeDateObject;

    // If the date range is not valid, return null or render an alternative message
    if (!isValidDateRange) {
        return null;  // Optionally: render an error or warning message here
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
