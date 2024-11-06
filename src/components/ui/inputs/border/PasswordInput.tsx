import React, {useState} from 'react'

interface PasswordInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    name: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({value, onChange, label, name}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="form-input">
            {label && <label className="form-input__label">{label}</label>}
            <div className="form-input__wrapper">
                <input
                    type={isPasswordVisible ? "text" : "password"}
                    className="form-input__field"
                    value={value}
                    onChange={onChange}
                    name={name}
                />
                <span
                    className="material-symbols-outlined password-input__icon"
                    onClick={togglePasswordVisibility}
                    style={{cursor: "pointer"}} // Optional for better UX
                >
                {isPasswordVisible ? "visibility_off" : "visibility"}
            </span>
            </div>
        </div>
    )
}
export default PasswordInput
