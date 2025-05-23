"use client";
import PastAlertsElement from "./PastAlertsElement";
import React, {useEffect, useState} from "react";
import Pagination from "../../../ui/Pagination";
import {fetchAlerts} from "@/src/api/alerts";
import {Alert} from "@/src/types/alert";

interface PastAlertsTableProps {
    refresh: boolean;
}

export const PastAlertsTable: React.FC<PastAlertsTableProps> = ({refresh}) => {
    const [data, setData] = useState<Alert[]>([])
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
            setTotalItems(response.totalCount); 
        } catch {
            setError('Error loading alerts: ');
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
                className="table-header-row past-grid-cols xl:grid-cols-[10%_25%_25%_20%_20%] tableBp:grid-cols-[10%_20%_20%_20%_15%_15%]">
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
                ) : data.length === 0 ? (
                    <p className={"table-error"}>No se han encontrado alertas</p>
                ) : (
                    data.map((alert) => (
                        <PastAlertsElement key={alert.alert_id} alert={alert}/>
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
