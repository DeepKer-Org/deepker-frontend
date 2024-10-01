import { sensors } from '@/src/data/sensors';
import React, { useState } from 'react'
import Pagination from '../ui/Pagination';
import SensorsElement from './SensorsElement';

const SensorsTable = () => {
  const data = sensors;

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const startIdx = (currentPage - 1) * rowsPerPage;
  const endIdx = startIdx + rowsPerPage;
  const paginatedData = data.slice(startIdx, endIdx);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="table-container">
      <div className="table-header-row sensor-grid-cols">
        <p>ID DE SENSOR</p>
        <p>PACIENTE VINCULADO</p>
        <p>VINCULADO POR</p>
        <p>OPCIONES</p>
      </div>
      <div className="table-body">
        {paginatedData.map((sensor) => (
          <SensorsElement key={sensor.sensorId} sensor={sensor} />
        ))}
      </div>
      <Pagination
        totalItems={data.length}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default SensorsTable