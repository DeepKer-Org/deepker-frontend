"use client";
import React, {useEffect, useState} from "react";
import Pagination from "../../ui/Pagination";
import {patients} from "@/src/data/patients";
import PatientsElement from "./PatientsElement";
import {fetchAlerts} from "@/src/api/alerts";
import {fetchPatients} from "@/src/api/patients";
import AttendedAlertsElement from "@/src/components/sections/alerts/attended/AttendedAlertsElement";

interface PatientsTableProps {
    refresh: boolean;
}

const PatientsTable: React.FC<PatientsTableProps> = ({refresh}) => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);
    const loadData = async (page: number, rows: number) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetchPatients(page, rows);
            setData(response.patients);
            setTotalItems(response.totalCount); // Set total items from the server response
        } catch (err) {
            setError('Error loading patients: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadData(currentPage, rowsPerPage);
    }, [currentPage, rowsPerPage, refresh]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (rows: number) => {
        setRowsPerPage(rows);
        setCurrentPage(1);
        console.log(rows)
    };

    return (
        <div className="table-container">
            <div
                className="table-header-row patient-grid-cols xl:grid-cols-[22%_12%_12%_22%_16%_16%] tableBp:grid-cols-[20%_9%_7%_21%_13%_14%_16%]">
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
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    data.map((patient) => (
                        <PatientsElement key={patient.patient_id} patient={patient}/>
                    ))
                )}
            </div>
            <Pagination
                totalItems={totalItems}
                rowsPerPage={rowsPerPage}
                onPageChange={handlePageChange}
                currentPage={currentPage}
                onRowsPerPageChange={handleRowsPerPageChange}
            />
        </div>
    );
};

export default PatientsTable;
