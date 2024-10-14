"use client";
import { resolvedAlerts } from "@/src/data/alerts";
import AttendedAlertsElement from "./AttendedAlertsElement";
import { useState } from "react";
import Pagination from "../../../ui/Pagination";

export const AttendedAlertsTable = () => {
  const data = resolvedAlerts;
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const startIdx = (currentPage - 1) * rowsPerPage;
  const endIdx = startIdx + rowsPerPage;
  const paginatedData = data.slice(startIdx, endIdx);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1); // Reset to first page when rows per page changes
  };

  return (
    <div className="table-container">
      <div className="table-header-row attended-grid-cols xl:grid-cols-[15%_22%_10%_22%_15%_16%] tableBp:grid-cols-[10%_20%_8%_17%_19%_12%_14%]">
        <p>FECHA</p>
        <p>PACIENTE</p>
        <p className="hidden xl:block">LUGAR</p>
        <p>DIAGNÓSTICO</p>
        <p className="hidden tableBp:block">ATENDIDO POR</p>
        <p className="hidden xl:block">HORA DE ATENCIÓN</p>
        <p>OPCIONES</p>
        
      </div>
      <div className="table-body">
        {paginatedData.map((alert) => (
          <AttendedAlertsElement key={alert.alertId} alert={alert} />
        ))}
      </div>
      <Pagination
        totalItems={data.length}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
