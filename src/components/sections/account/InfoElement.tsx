import React from "react";

interface InfoElementProps {
  label: string;
  value: string;
  lastElement?: boolean;
}

const InfoElement: React.FC<InfoElementProps> = ({
  label,
  value,
  lastElement,
}) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row w-full justify-between py-1">
        <p>{label}</p>
        <p>{value}</p>
      </div>
      {!lastElement && <div className="border border-b-blue-500 w-full" />}
    </div>
  );
};

export default InfoElement;
