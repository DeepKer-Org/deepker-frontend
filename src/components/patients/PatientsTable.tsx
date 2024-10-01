"use client";
import React, { useState } from 'react'
import Pagination from '../shared/Pagination'
import { patients } from '@/src/data/patients';
import PatientsElement from './PatientsElement';

const PatientsTable = () => {
  const data = patients;

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
      <div className="table-header-row patient-grid-cols">
        <p>NOMBRE DE PACIENTE</p>
        <p>DNI</p>
        <p>EDAD</p>
        <p>MÉDICO ASOCIADO</p>
        <p>LUGAR</p>
        <p>FECHA DE INGRESO</p>
        <p>OPCIONES</p>
        
      </div>
      <div className="table-body">
        {paginatedData.map((patient) => (
          <PatientsElement key={patient.patientId} patient={patient} />
        ))}
      </div>
      <Pagination
        totalItems={data.length}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default PatientsTable