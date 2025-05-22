import React, { useState, useEffect } from "react";


interface DateInputProps {
    icon?: string;
    placeholder?: string;
    value: string;
    onChange: (formattedDate: string) => void;
}

const DateInput: React.FC<DateInputProps> = ({
                                                 icon = "date_range",
                                                 placeholder = "DD-MM-YYYY",
                                                 value,
                                                 onChange,
                                             }) => {
    const [displayValue, setDisplayValue] = useState<string>("");

    useEffect(() => {
        if (value) {
            setDisplayValue(formatDateToDisplay(value));
        } else {
            setDisplayValue(""); // Clear display if value is empty
        }
    }, [value]);

    const formatDateToDisplay = (date: string): string => {
        if (!date) return "";
        const [year, month, day] = date.split("-");
        return `${day}-${month}-${year}`;
    };

    const formatDateToISO = (date: string): string => {
        const [day, month, year] = date.split("-");
        return year && month && day ? `${year}-${month}-${day}` : "";
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isoDate = e.target.value; // Format from date picker is always YYYY-MM-DD
        setDisplayValue(formatDateToDisplay(isoDate)); // Update display to DD-MM-YYYY
        onChange(isoDate); // Pass the ISO format (YYYY-MM-DD) to the parent component
    };

    return (
        <div className="auth__input">
            <span className="material-symbols-outlined auth__input--icon">{icon}</span>
            <input
                type="date"
                placeholder={placeholder}
                value={displayValue ? formatDateToISO(displayValue) : ""}
                onChange={handleDateChange}
                className="auth__input--text"
            />
        </div>
    );
};

export default DateInput;