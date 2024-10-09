import React from 'react'

interface IconTitleProps {
    icon: string
    title: string
    className?: string
    altIconColor?: boolean
}
const IconTitle: React.FC<IconTitleProps> = ({icon, title, className, altIconColor = false}) => {
    return (
        <div className={`flex flex-row ${className}`}>
            <span className={`material-symbols-outlined mr-2 ${altIconColor ? "text-gray-600" : "text-green-500"}`}>{icon}</span>
            <h4>{title}</h4>
        </div>
    )
}
export default IconTitle
