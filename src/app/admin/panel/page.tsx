"use client";
import React, {useCallback, useEffect, useState} from 'react'
import Button from "@/src/components/ui/buttons/Button";
import {ButtonColor} from "@/src/enums/ButtonColor";
import { useRouter } from 'next/navigation';
import UsersTable from "@/src/components/sections/admin/UsersTable";
import {User} from "@/src/types/auth";
import {fetchUsers} from "@/src/api/auth";

const AdminPanel = () => {
    const router = useRouter();
    const [users, setUsers] = React.useState<User[]>([]);
    const [totalCount, setTotalCount] = useState(0); // Total device count
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1); // Pagination current page
    const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page

    const handleRegisterUser = () => {
        router.push("/admin/panel/register");
    }

    const handleFetchUsers = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetchUsers(currentPage, rowsPerPage);
            setUsers(response.users);
            setTotalCount(response.totalCount);
        } catch {
            setError('Error fetching devices');
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, rowsPerPage]);

    useEffect(() => {
        handleFetchUsers(); // Fetch devices whenever filters, pagination, or refresh changes
    }, [currentPage, rowsPerPage, handleFetchUsers]);


    return (
        <div className="flex h-full">
            <div className="flex-1 overflow-x-auto">
                <h1>Panel de Administración de Usuarios</h1>
                <div className="table-toolbar flex flex-row justify-start">
                    <div className="flex flex-row items-center gap-x-1 mt-1">
                        <Button
                            text="Agregar Usuario"
                            color={ButtonColor.SUCCESS}
                            onClick={handleRegisterUser}
                            className="hidden xl:block"
                        />
                    </div>
                </div>
                <UsersTable
                    users={users}
                    totalCount={totalCount}
                    currentPage={currentPage}
                    rowsPerPage={rowsPerPage}
                    onPageChange={setCurrentPage}
                    onRowsPerPageChange={setRowsPerPage}
                    onRefresh={handleFetchUsers}
                    error={error}
                    isLoading={isLoading}
                />
            </div>
        </div>

    )
}
export default AdminPanel
