"use client";
import React from "react";
import Pagination from "../../ui/Pagination";
import PatientsElement from "./PatientsElement";
import {Patient} from "@/src/types/patient";


interface PatientsTableProps {
    patients: Patient[]; // Your patients data type
    totalCount: number;
    currentPage: number;
    rowsPerPage: number;
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (rows: number) => void;
    error: string | null;
    isLoading: boolean;
}

const PatientsTable: React.FC<PatientsTableProps> = ({
                                                         patients,
                                                         totalCount,
                                                         currentPage,
                                                         rowsPerPage,
                                                         onPageChange,
                                                         onRowsPerPageChange,
                                                         error,
                                                         isLoading,
                                                     }) => {
       return (
        <div className="table-container">
            <div className="table-header-row patient-grid-cols xl:grid-cols-[22%_12%_12%_22%_16%_16%] tableBp:grid-cols-[20%_9%_7%_21%_13%_14%_16%]">
                <p>NOMBRE DE PACIENTE</p>
                <p>DNI</p>
                <p>EDAD</p>
                <p>MÉDICO ASOCIADO</p>
                <p className="hidden xl:block">LUGAR</p>
                <p className="hidden tableBp:block">FECHA DE INGRESO</p>
                <p>OPCIONES</p>
            </div>
            <div className="table-body">
                {isLoading ? (
                    <p className={"table-error"}>Cargando...</p>
                ) : error ? (
                    <p className={"table-error"}>{error}</p>
                ) : patients.length === 0 ? (
                    <p className={"table-error"}>No se ha encontrado pacientes.</p>
                ) : (
                    patients.map((patient) => (
                        <PatientsElement key={patient.patient_id} patient={patient} />
                    ))
                )}
            </div>
            <Pagination
                totalItems={totalCount}
                rowsPerPage={rowsPerPage}
                onPageChange={onPageChange}
                currentPage={currentPage}
                onRowsPerPageChange={onRowsPerPageChange}
            />
        </div>
    );
};

export default PatientsTable;
