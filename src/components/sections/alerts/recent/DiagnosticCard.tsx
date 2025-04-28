import React from 'react'
import { Alert } from '@/src/types/alert'

interface DiagnosticCardProps {
  alert: Alert
}

const DiagnosticCard: React.FC<DiagnosticCardProps> = ({alert}) => {
  return (
    <div className="flex flex-row space-x-4 items-center w-[380px] bg-white px-5 py-2.5 border border-border-primary border-l-4 border-l-blue-500 rounded-lg">
        <p className='text-[28px] font-medium text-blue-500'>{alert.computer_diagnostic.percentage}%</p>
        <p className='text-[20px] font-medium text-blue-800'>{alert.computer_diagnostic.diagnosis}</p>
    </div>
  )
}

export default DiagnosticCard