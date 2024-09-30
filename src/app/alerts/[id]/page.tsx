import React from 'react'

const AlertDetail = ({ params }: { params: { id: string } }) => {
  return (
    <div>My alert: {params.id}</div>
  )
}

export default AlertDetail