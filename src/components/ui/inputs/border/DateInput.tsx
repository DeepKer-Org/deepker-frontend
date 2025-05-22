import React from 'react';

interface DateInputProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
}

const DateInput: React.FC<DateInputProps> = ({ value, onChange, label }) => {
    return (
        <div className="form-input">
            {label && <label className="form-input__label">{label}</label>}
            <input
                type="date"
                value={value}
                onChange={(e) => onChange(e.target.value)} // Pass the date string directly
                className="form-input__field"
            />
        </div>
    );
};

export default DateInput;