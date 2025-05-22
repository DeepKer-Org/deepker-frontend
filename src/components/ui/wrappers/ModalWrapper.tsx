import React from "react";

interface ModalWrapperProps {
  isOpen: boolean;
  children: React.ReactNode;
  width?: string;
  onClose?: () => void;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  onClose,
  isOpen,
  children,
  width = "30rem",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
      <div
        className="relative bg-background rounded-lg shadow-lg z-10"
        style={{ width, padding: "2rem" }}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <span className="material-symbols-outlined">close_small</span>
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
