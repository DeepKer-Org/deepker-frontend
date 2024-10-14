"use client";
import UnattendedAlertsElement from "./UnattendedAlertsElement";
import {useEffect, useState} from "react";
import {fetchAlerts} from "@/src/api/alerts";
import Pagination from "@/src/components/ui/Pagination";

const UnattendedAlertsTable = () => {
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
            const response = await fetchAlerts(false, page, rows);
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
            <div className="table-header-row unattended-grid-cols tableBp:grid-cols-[8%_20%_10%_20%_30%_12%]">
                <p>FECHA</p>
                <p>PACIENTE</p>
                <p>LUGAR</p>
                <p>DIAGNÓSTICO</p>
                <p className="block tableBp:hidden">VISTA PREVIA BPM + SPO2</p>
                <p className="hidden tableBp:block">VISTA PREVIA ECG + BPM + SPO2</p>
                <p>OPCIONES</p>
            </div>
            <div className="table-body">
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    data.map((alert) => (
                        <UnattendedAlertsElement key={alert.alert_id} alert={alert}/>
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

export default UnattendedAlertsTable;