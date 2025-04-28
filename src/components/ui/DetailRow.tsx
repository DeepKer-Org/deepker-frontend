import React from 'react'

interface DetailRowProps {
    label: string;
    name: string;
}

const DetailRow: React.FC<DetailRowProps> = ({label, name}) => {
    return (
        <div className={"flex"}>
            <div className={"font-medium"}>{label}</div>
            <div className={"pl-2"}>{name}</div>
        </div>
    )
}
export default DetailRow