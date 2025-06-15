import React from "react";

interface ModalSelectProps {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    label: string;
    options: Array<{ value: string; label: string; key?: string }>;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    colSpan?: number;
}

const ModalSelect: React.FC<ModalSelectProps> = ({
    name,
    value,
    onChange,
    label,
    options,
    placeholder = "Selecciona una opción",
    disabled = false,
    className = "",
    colSpan = 1,
}) => {
    const getColSpanClass = (colSpan: number): string => {
        switch (colSpan) {
            case 2:
                return "col-span-2";
            case 3:
                return "col-span-3";
            case 4:
                return "col-span-4";
            default:
                return "";
        }
    };

    const combinedClassName = `${getColSpanClass(colSpan)} ${className}`.trim();

    return (
        <div className={combinedClassName} style={{ position: 'relative', width: '100%' }}>
            <label htmlFor={name} className="block mb-2 text-sm">
                {label}
            </label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="modal__dropdown"
                disabled={disabled}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option 
                        key={option.key || option.value} 
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
            <div
                style={{
                    position: 'absolute',
                    top: '70%',
                    right: '0.8rem',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                }}
            >
                <svg width="10" height="10" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 6L0 0H10L5 6Z" fill="black" />
                </svg>
            </div>
        </div>
    );
};

export default ModalSelect;
