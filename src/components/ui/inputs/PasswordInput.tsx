import React, { useState } from "react";

interface PasswordInputProps {
    icon: string;
    placeholder: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ icon, placeholder }) => {
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
            />
            <span
                className="material-symbols-outlined auth__input--icon--password"
                onClick={togglePasswordVisibility}
            >
        {isPasswordVisible ? "visibility_off" : "visibility"}
      </span>
        </div>
    );
};

export default PasswordInput;
