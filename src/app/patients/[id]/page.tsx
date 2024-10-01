import React from 'react'

const PatientDetail = ({ params }: { params: { id: string } }) => {
  return (
    <div>Patient: {params.id}</div>
  )
}

export default PatientDetail