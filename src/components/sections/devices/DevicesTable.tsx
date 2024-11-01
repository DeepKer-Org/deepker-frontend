"use client";
import React from 'react'
import Pagination from '../../ui/Pagination';
import DevicesElement from './DevicesElement';
import {MonitoringDevice} from "@/src/types/devices";

interface DevicesTableProps {
    devices: MonitoringDevice[];
    totalCount: number;
    currentPage: number;
    rowsPerPage: number;
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (rows: number) => void;
    error: string | null;
    isLoading: boolean;
    onRefresh: () => void;
}

const DevicesTable: React.FC<DevicesTableProps> = ({
                                                       devices,
                                                       totalCount,
                                                       currentPage,
                                                       rowsPerPage,
                                                       onPageChange,
                                                       onRowsPerPageChange,
                                                       error,
                                                       isLoading,
                                                       onRefresh
                                                   }) => {
    return (
        <div className="table-container">
            <div className="table-header-row device-grid-cols tableBp:grid-cols-[12%_25%_25%_10%_28%]">
                <p>ID DE DISPOSITIVO</p>
                <p>PACIENTE VINCULADO</p>
                <p className="hidden tableBp:block">VINCULADO POR</p>
                <p>ESTADO</p>
                <p>OPCIONES</p>
            </div>
            <div className="table-body">
                {isLoading ? (
                    <p className={"table-error"}>Cargando...</p>
                ) : error ? (
                    <p className={"table-error"}>{error}</p>
                ) : devices.length === 0 ? (
                    <p className={"table-error"}>No devices found.</p>
                ) : (
                    devices.map((device) => (
                        <DevicesElement key={device.device_id} device={device} onRefresh={onRefresh}/>
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
}

export default DevicesTable