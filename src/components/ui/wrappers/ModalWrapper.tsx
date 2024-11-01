import React from "react";

interface ModalWrapperProps {
    isOpen: boolean;
    children: React.ReactNode;
    width?: string;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
                                                       isOpen,
                                                       children,
                                                       width = "30rem",
                                                   }) => {
    if (!isOpen) return null;

      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50"/>
            <div
                className="relative bg-background rounded-lg shadow-lg z-10"
                style={{width, padding: "2rem"}}
            >
                {children}
            </div>
        </div>
    );
};

export default ModalWrapper;
