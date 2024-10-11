import React from 'react'

const DetailColumnWrapper = ({children, hasLeftBorder = false}: {
    children: React.ReactNode,
    hasLeftBorder?: boolean
}) => {
    return (
        <div
            className={`flex flex-col my-4 px-8 h-40 overflow-auto no-scrollbar ${hasLeftBorder ? "border-r border-r-border-primary" : ""}`}>
            {children}
        </div>
    )
}
export default DetailColumnWrapper
