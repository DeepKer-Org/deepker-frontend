import { ButtonColor } from "@/src/enums/ButtonColor";
import React from "react";

interface ButtonProps {
  text: string;
  color: ButtonColor;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  text,
  color,
  onClick,
  disabled = false,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={`w-[150px] h-[32px] text-sm rounded-lg font-medium shadow-md transition duration-300 ${color} ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
