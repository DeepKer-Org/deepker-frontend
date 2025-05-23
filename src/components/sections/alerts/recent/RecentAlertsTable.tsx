"use client";
import PastAlertsElement from "./RecentAlertsElement";
import React, {useEffect, useState} from "react";
import {fetchAlerts} from "@/src/api/alerts";
import Pagination from "@/src/components/ui/Pagination";
import {Alert} from "@/src/types/alert";
import { useAuth } from "@/src/context/AuthContext";

interface RecentAlertsTableProps {
    refresh: boolean;
}

const RecentAlertsTable: React.FC<RecentAlertsTableProps> = ({refresh}) => {
    const [data, setData] = useState<Alert[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);
    const { doctorId } = useAuth();

    const loadData = async (page: number, rows: number, showLoading: boolean = true) => {
        if (showLoading) {
            setIsLoading(true);
        }
        setError(null);
        try {
            const response = await fetchAlerts(false, page, rows);
            setData(response.alerts!);
            setTotalItems(response.totalCount);
        } catch {
            setError('Error loading alerts');
        } finally {
            if (showLoading) {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        loadData(currentPage, rowsPerPage, true);
    }, [currentPage, rowsPerPage, refresh]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            loadData(currentPage, rowsPerPage, false);
        }, 5000); 
    
        return () => clearInterval(interval); 
    }, [currentPage, rowsPerPage]);

    const handleRowsPerPageChange = (rows: number) => {
        setRowsPerPage(rows);
        setCurrentPage(1);
    };

    const handleAlertUpdate = () => {
        loadData(currentPage, rowsPerPage);
    };

    return (
        <div className="table-container">
            <div className="table-header-row recent-grid-cols tableBp:grid-cols-[10%_20%_10%_20%_23%_17%]">
                <p>FECHA</p>
                <p>PACIENTE</p>
                <p>LUGAR</p>
                <p>DIAGNÓSTICO</p>
                <p className="hidden tableBp:block">VISTA PREVIA DE MÉTRICAS</p>
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
                        <PastAlertsElement key={alert.alert_id} alert={alert} onAlertUpdate={handleAlertUpdate} doctorId={doctorId!}/>
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

export default RecentAlertsTable;