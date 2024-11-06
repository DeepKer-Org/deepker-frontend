"use client";
import React from 'react'
import Pagination from '../../ui/Pagination';
import UsersElement from './UsersElement';
import {User} from "@/src/types/auth";

interface UsersTableProps {
    users: User[];
    totalCount: number;
    currentPage: number;
    rowsPerPage: number;
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (rows: number) => void;
    error: string | null;
    isLoading: boolean;
    onRefresh: () => void;
}

const UsersTable: React.FC<UsersTableProps> = ({
                                                       users,
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
            <div className="table-header-row grid-cols-[25%_30%_25%_20%]">
                <p className={"text-center"}>ID DE USUARIO</p>
                <p>DNI / CORREO ELECTRÓNICO</p>
                <p>ROL</p>
                <p>OPCIONES</p>
            </div>
            <div className="table-body">
                {isLoading ? (
                    <p className={"table-error"}>Cargando...</p>
                ) : error ? (
                    <p className={"table-error"}>{error}</p>
                ) : users.length === 0 ? (
                    <p className={"table-error"}>No se encontro usuarios.</p>
                ) : (
                    users.map((user) => (
                        <UsersElement key={user.user_id} user={user} onRefresh={onRefresh}/>
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

export default UsersTable