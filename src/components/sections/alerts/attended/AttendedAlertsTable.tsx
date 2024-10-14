"use client";
import AttendedAlertsElement from "./AttendedAlertsElement";
import {useEffect, useState} from "react";
import Pagination from "../../../ui/Pagination";
import {fetchAlerts} from "@/src/api/alerts";

export const AttendedAlertsTable = () => {
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
    }, [currentPage, rowsPerPage]);

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
                className="table-header-row attended-grid-cols xl:grid-cols-[15%_22%_10%_22%_15%_16%] tableBp:grid-cols-[10%_20%_8%_17%_19%_12%_14%]">
                <p>FECHA</p>
                <p>PACIENTE</p>
                <p className="hidden xl:block">LUGAR</p>
                <p>DIAGNÓSTICO</p>
                <p className="hidden tableBp:block">ATENDIDO POR</p>
                <p className="hidden xl:block">HORA DE ATENCIÓN</p>
                <p>OPCIONES</p>
            </div>
            <div className="table-body">
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
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
