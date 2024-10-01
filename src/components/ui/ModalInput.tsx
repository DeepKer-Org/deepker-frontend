import React from "react";

interface ModalInputProps {
  label: string;
  name: string;
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "date" | "email" | "password";
}

const ModalInput: React.FC<ModalInputProps> = ({
  label,
  name,
  value,
  onChange,
  className = "col-span-1",
  type = "text",
}) => {
  return (
    <div className={`w-full ${className}`}>
      <p className="text-sm mb-2">{label}</p>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        className="border border-border-secondary rounded-lg p-2 text-sm w-full"
      />
    </div>
  );
};

export default ModalInput;
