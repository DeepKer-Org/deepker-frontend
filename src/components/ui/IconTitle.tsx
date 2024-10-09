import React from 'react'

interface IconTitleProps {
    icon: string
    title: string
    className?: string
}
const IconTitle: React.FC<IconTitleProps> = ({icon, title, className}) => {
    return (
        <div className={`flex flex-row ${className}`}>
            <span className="material-symbols-outlined text-green-500 mr-2">{icon}</span>
            <h4>{title}</h4>
        </div>
    )
}
export default IconTitle
