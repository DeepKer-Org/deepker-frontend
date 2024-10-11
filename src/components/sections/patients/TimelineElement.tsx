"use client";
import React, {useState} from 'react'

interface TimelineElementProps {
    date: string;
    title: string;
    description: string;
}

const TimelineElement: React.FC<TimelineElementProps> = ({date, title, description}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={"timeline__element"}>
            <div className={"timeline__disc"}/>
            <div className={"timeline__details"}>
                <p className={"timeline__date"}>{date}</p>
                <p className={"timeline__title"}>{title}</p>
                <p
                    className={`timeline__description ${isExpanded ? '' : 'line-clamp-2'}`}
                    onClick={handleToggleDescription}
                >
                    {description}
                </p>
            </div>
        </div>
    )
}
export default TimelineElement
