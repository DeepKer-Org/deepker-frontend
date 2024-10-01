import React from "react";

interface ModalInputProps {
  label: string;
  className?: string;
}

const ModalInput: React.FC<ModalInputProps> = ({
  label,
  className = "col-span-1",
}) => {
  return (
    <div className={`w-full ${className}`}>
      <p className="text-sm mb-2">{label}</p>
      <input className="border border-border-secondary rounded-lg p-2 text-sm w-full" />
    </div>
  );
};

export default ModalInput;
