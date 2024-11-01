import React from "react";

interface IconInputProps {
    icon: string;
    placeholder: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const IconInput: React.FC<IconInputProps> = ({ icon, placeholder, type = "text", value, onChange }) => {
    return (
        <div className="auth__input">
            <span className="material-symbols-outlined auth__input--icon">{icon}</span>
            <input
                type={type}
                placeholder={placeholder}
                className="auth__input--text"
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default IconInput;