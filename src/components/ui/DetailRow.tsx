import React from 'react'

interface DetailRowProps {
    label: string;
    name: string;
}

const DetailRow: React.FC<DetailRowProps> = ({label, name}) => {
    return (
        <div className={"grid grid-cols-3"}>
            <div className={"font-semibold col-span-1"}>{label}</div>
            <div className={"pl-2 col-span-2"}>{name}</div>
        </div>
    )
}
export default DetailRow