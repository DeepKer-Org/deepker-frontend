"use client";
import React from "react";

interface PaginationProps {
    totalItems: number;
    rowsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (rowsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
                                                   totalItems,
                                                   rowsPerPage,
                                                   currentPage,
                                                   onPageChange,
                                                   onRowsPerPageChange
                                               }) => {
    const totalPages = Math.ceil(totalItems / rowsPerPage);
    const startNumItem = (currentPage - 1) * rowsPerPage + 1;
    const endNumItem = Math.min(currentPage * rowsPerPage, totalItems);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleRowsPerPageChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const newRowsPerPage = Number(event.target.value);
        onRowsPerPageChange(newRowsPerPage);
        onPageChange(1); // Reset to the first page
    };

    return (
        <div className="table-pagination">
            <div className="flex items-center gap-2">
                <span className="p-4">Filas por página:</span>
                <select
                    value={rowsPerPage}
                    onChange={handleRowsPerPageChange}
                    className="border p-1 rounded"
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={35}>35</option>
                </select>
            </div>
            <div className="p-4">
                {startNumItem}-{endNumItem} de {totalItems}
            </div>
            <div className="flex items-center gap-x-4">
        <span
            className={`material-symbols-outlined cursor-pointer ${
                currentPage === 1 ? "text-gray-600" : "text-black"
            }`}
            onClick={handlePrevPage}
        >
          chevron_left
        </span>
                <span
                    className={`material-symbols-outlined cursor-pointer ${
                        currentPage === totalPages ? "text-gray-600" : "text-black"
                    }`}
                    onClick={handleNextPage}
                >
          chevron_right
        </span>
            </div>
        </div>
    );
};

export default Pagination;