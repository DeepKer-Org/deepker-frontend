"use client";
import AttendedAlertsElement from "./AttendedAlertsElement";
import React, {useEffect, useState} from "react";
import Pagination from "../../../ui/Pagination";
import {fetchAlerts} from "@/src/api/alerts";

interface AttendedAlertsTableProps {
    refresh: boolean;
}

export const AttendedAlertsTable: React.FC<AttendedAlertsTableProps> = ({refresh}) => {
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
            const response = await fetchAlerts(true, page, rows);
            setData(response.alerts);
            setTotalItems(response.totalCount); // Set total items from the server response
        } catch (err) {
            setError('Error loading alerts: ' + err.message);
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
    };

    return (
        <div className="table-container">
            <div
                className="table-header-row attended-grid-cols xl:grid-cols-[10%_25%_25%_20%_20%] tableBp:grid-cols-[10%_20%_20%_20%_15%_15%]">
                <p>FECHA</p>
                <p>PACIENTE</p>
                <p>DIAGNÓSTICO</p>
                <p className="hidden tableBp:block">ATENDIDO POR</p>
                <p className="hidden xl:block">HORA DE ATENCIÓN</p>
                <p>OPCIONES</p>
            </div>
            <div className="table-body">
                {isLoading ? (
                    <p className={"table-error"}>Cargando...</p>
                ) : error ? (
                    <p className={"table-error"}>{error}</p>
                ) : (
                    data.map((alert) => (
                        <AttendedAlertsElement key={alert.alert_id} alert={alert}/>
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
