import React from 'react';

interface SelectInputProps {
    options: { label: string; value: string }[];
    value: string;
    onChange: (value: string) => void;
    label?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({ options, value, onChange, label }) => {
    return (
        <div className="form-input">
            {label && <label className="form-input__label">{label}</label>}
            <div className="form-input__wrapper">
                <select
                    className="form-input__field"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <span className="material-symbols-outlined select-input__icon">arrow_drop_down</span>
            </div>
        </div>
    );
};

export default SelectInput;
