import React from "react";

interface IconInputProps {
    icon: string;
    placeholder: string;
    type?: string;
}

const IconInput: React.FC<IconInputProps> = ({ icon, placeholder, type = "text" }) => {
    return (
        <div className="auth__input">
            <span className="material-symbols-outlined auth__input--icon">{icon}</span>
            <input
                type={type}
                placeholder={placeholder}
                className="auth__input--text"
            />
        </div>
    );
};

export default IconInput;
