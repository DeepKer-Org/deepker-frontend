import { IconName } from "@/src/enums/IconName";
import React, { useEffect, useState } from "react";

interface SectionBlockProps {
  icon: IconName;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  size?: number;
  label?: string;
  sidebarOpen?: boolean;
  showHover?: boolean;
}

const SectionBlock: React.FC<SectionBlockProps> = ({
  icon,
  selected = false,
  onClick,
  className,
  size = 24,
  label,
  sidebarOpen = true,
  showHover = true,
}) => {
  const [renderLabel, setRenderLabel] = useState(sidebarOpen);

  useEffect(() => {
    if (sidebarOpen) {
      const timer = setTimeout(() => setRenderLabel(true), 200); // Wait for transition to complete
      return () => clearTimeout(timer); // Cleanup on unmount
    } else {
      setRenderLabel(false); // Hide label when closing
    }
  }, [sidebarOpen]);

  return (
    <div
      className={`cursor-pointer ${
        selected
          ? "selected text-blue-800 bg-white"
          : `text-white ${showHover && "hover:bg-blue-850"}`
      } p-2 rounded-md font-poppins flex flex-row ${className}`}
      onClick={onClick}
    >
      <span
        className={`material-symbols-outlined ${label ? "mr-2" : ""} `}
        style={{ fontSize: `${size}px` }}
      >
        {icon}
      </span>
      {renderLabel && <p>{label}</p>}
    </div>
  );
};

export default SectionBlock;