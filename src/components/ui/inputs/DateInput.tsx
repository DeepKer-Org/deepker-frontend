import React from "react";

interface DateInputProps {
    icon?: string;
    placeholder?: string;
}

const DateInput: React.FC<DateInputProps> = ({
                                                 icon = "date_range", // Default to a calendar icon if none is provided
                                                 placeholder = "",
                                             }) => {
    return (
        <div className="auth__input">
            <span className="material-symbols-outlined auth__input--icon">{icon}</span>
            <input
                type="date"
                placeholder={placeholder}
                className="auth__input--text"
            />
        </div>
    );
};

export default DateInput;