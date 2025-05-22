import React, { useState } from "react";

interface PasswordInputProps {
    icon: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ icon, placeholder, value, onChange }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="auth__input">
            <span className="material-symbols-outlined auth__input--icon">{icon}</span>
            <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder={placeholder}
                className="auth__input--text"
                value={value}
                onChange={onChange}
            />
            <span
                className="material-symbols-outlined auth__input--icon--password"
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }} // Optional for better UX
            >
                {isPasswordVisible ? "visibility_off" : "visibility"}
            </span>
        </div>
    );
};

export default PasswordInput;