import React from 'react'

interface DetailRowProps {
    label: string;
    name: string;
}

const DetailRow: React.FC<DetailRowProps> = ({label, name}) => {
    return (
        <div className={"flex py-0.5"}>
            <div className={"font-medium text-base"}>{label}</div>
            <div className={"pl-2 text-base font-normal"}>{name}</div>
        </div>
    )
}
export default DetailRow