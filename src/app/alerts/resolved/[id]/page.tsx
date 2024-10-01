import React from 'react'

const ResolvedAlertDetail = ({ params }: { params: { id: string } }) => {
  return (
    <div>My alert: {params.id}</div>
  )
}

export default ResolvedAlertDetail