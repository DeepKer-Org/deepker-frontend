import React from 'react'

interface CheckboxInputProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({ label, checked, onChange }) => {
    return (
        <label className="checkbox-input">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)} // Pass the checked state
                className="checkbox-input__box"
            />
            <span className="form-input__label">{label}</span>
        </label>
    );
};

export default CheckboxInput;