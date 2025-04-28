import React from "react";
import { Alert } from "@/src/types/alert";

interface MonitorProps {
  alert: Alert;
}

export const Monitor: React.FC<MonitorProps> = ({ alert }) => {
  return (
    <div>
      <div className="font-roboto-mono grid grid-cols-3 gap-y-2.5 bg-blue-800 w-52 rounded-2xl pl-2 pr-6 py-4">
        <div className="text-green-100 text-end">
          <p className="text-xl font-medium">HR</p>
          <div>
            <p className="text-lg leading-none">120</p>
            <p className="text-lg leading-none">50</p>
          </div>
        </div>
        <div className="text-green-100 self-end text-end col-span-2">
          <p className="text-[60px] font-medium leading-none tracking-tighter">{alert.biometric_data.heart_rate}</p>
        </div>
        <div className="text-blue-100 text-end">
          <p className="text-xl font-medium">SPO2</p>
          <div>
            <p className="text-lg leading-none">100</p>
            <p className="text-lg leading-none">90</p>
          </div>
        </div>
        <div className="text-blue-100 self-end text-end col-span-2">
          <p className="text-[60px] font-medium leading-none tracking-tighter">{alert.biometric_data.o2_saturation}</p>
        </div>
      </div>
    </div>
  );
};
