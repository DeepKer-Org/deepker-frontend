import React from 'react'

const ActiveAlertDetail = ({ params }: { params: { id: string } }) => {
  return (
    <div>My alert: {params.id}</div>
  )
}

export default ActiveAlertDetail