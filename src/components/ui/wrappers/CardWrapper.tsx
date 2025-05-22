import React from 'react'

interface CardWrapperProps {
    children: React.ReactNode;
    className?: string;
}

const CardWrapper: React.FC<CardWrapperProps> = ({children, className}) => {
    return (
        <div className={`details__card no-scrollbar ${className}`}>
            {children}
        </div>
    )
}
export default CardWrapper
