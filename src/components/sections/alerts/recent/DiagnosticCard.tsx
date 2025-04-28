import React from "react";
import { Alert } from "@/src/types/alert";

interface DiagnosticCardProps {
  alert: Alert;
  isFinal?: boolean;
}

const DiagnosticCard: React.FC<DiagnosticCardProps> = ({
  alert,
  isFinal = false,
}) => {
  return (
    <div className="flex w-[380px] bg-white px-5 py-3 border border-border-primary border-l-4 border-l-blue-500 rounded-lg">
      {isFinal ? (
        <p className="text-[20px] font-medium text-blue-800">
          {alert.final_diagnosis}
        </p>
      ) : (
        <div className="flex flex-row space-x-4">
          <p className="text-[28px] font-medium text-blue-500">
            {alert.computer_diagnostic.percentage}%
          </p>
          <p className="text-[20px] font-medium text-blue-800">
            {alert.computer_diagnostic.diagnosis}
          </p>
        </div>
      )}
    </div>
  );
};

export default DiagnosticCard;
