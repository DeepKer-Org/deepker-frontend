"use client";

import DeviceLinkModal from "@/src/components/ui/modals/DeviceLinkModal";
import DevicesTable from "@/src/components/sections/devices/DevicesTable";
import Button from "@/src/components/ui/buttons/Button";
import SearchInput from "@/src/components/ui/inputs/border/SearchInput";
import { ButtonColor } from "@/src/enums/ButtonColor";
import { useCallback, useEffect, useState } from "react";
import { DevicesQueryParams, MonitoringDevice } from "@/src/types/device";
import { fetchDevices } from "@/src/api/devices";

export default function Devices() {
  const [updateTime, setUpdateTime] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [devices, setDevices] = useState<MonitoringDevice[]>([]); // Device list
  const [totalCount, setTotalCount] = useState(0); // Total device count
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1); // Pagination current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page
  const [filters, setFilters] = useState<DevicesQueryParams>({});

  const updateTimeNow = () => {
    const currentTime = new Date().toLocaleTimeString();
    setUpdateTime(currentTime);
  };

  const handleFetchDevices = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchDevices(currentPage, rowsPerPage, filters);
      setDevices(response.devices);
      setTotalCount(response.totalCount);
    } catch {
      setError("Error fetching devices");
    } finally {
      setIsLoading(false);
    }
  }, [filters, currentPage, rowsPerPage]);

  useEffect(() => {
    updateTimeNow();
    handleFetchDevices(); // Fetch devices whenever filters, pagination, or refresh changes
  }, [currentPage, rowsPerPage, filters, isRefreshing, handleFetchDevices]);

  const handleSearchSubmit = (value: string) => {
    setFilters({ dni: value }); // Update the filters with the search term (DNI)
    setCurrentPage(1); // Reset pagination to first page when a search is performed
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    updateTimeNow();
    setTimeout(() => {
      setIsRefreshing(false); // Stop refreshing after a short delay
    }, 700);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLinkSuccess = () => {
    handleCloseModal();
    handleFetchDevices(); // Refresh the devices list after linking a device
  };

  return (
    <div className="flex h-full">
      <div className="flex-1 overflow-x-auto">
        <h1>Panel de Dispositivos</h1>
        <div className="table-toolbar flex flex-row justify-between">
          <div className="flex flex-row gap-x-4">
            <SearchInput
              type={"number"}
              placeholder="Busca por DNI del paciente..."
              onSubmit={handleSearchSubmit}
            />
          </div>
          <div className="flex flex-row items-center gap-x-2.5">
            <Button
              text="Vincular Dispositivos"
              color={ButtonColor.SUCCESS}
              onClick={handleOpenModal}
              className="hidden xl:block"
            />
            <div className="flex flex-row items-center gap-x-1">
              <p className="ml-2 update__text">
                ÚLTIMA ACTUALIZACIÓN:{" "}
                <span className="update__text--time">{updateTime}</span>
              </p>
              <span
                className={`material-symbols-outlined cursor-pointer ${
                  isRefreshing ? "spin-animation" : ""
                }`}
                onClick={handleRefresh}
              >
                refresh
              </span>
            </div>
          </div>
        </div>
        <DeviceLinkModal
          onClose={handleCloseModal}
          onLinkSuccess={handleLinkSuccess}
          isOpen={isModalOpen}
        />
        <DevicesTable
          devices={devices}
          totalCount={totalCount}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          onPageChange={setCurrentPage}
          onRowsPerPageChange={setRowsPerPage}
          onRefresh={handleFetchDevices}
          error={error}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
