"use client";
import PatientFilterModal from "@/src/components/modals/PatientFilterModal";
import PatientsTable from "@/src/components/patients/PatientsTable";
import ModalWrapper from "@/src/components/ui/ModalWrapper";
import Button from "@/src/components/ui/Button";
import SearchInput from "@/src/components/ui/SearchInput";
import { ButtonColor } from "@/src/enums/ButtonColor";
import { useEffect, useState } from "react";
import { FilterData } from "@/src/types/filterData";

export default function Patients() {
  const [updateTime, setUpdateTime] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateTimeNow = () => {
    const currentTime = new Date().toLocaleTimeString();
    setUpdateTime(currentTime);
  };
  useEffect(() => {
    updateTimeNow();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    updateTimeNow();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 700);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFilter = (filterData: FilterData) => {
    console.log("Filter Data:", filterData);
    // TODO: Implement filter logic

    handleCloseModal();
  };

  return (
    <div className="flex h-full">
      <div className="flex-1 overflow-x-auto">
        <h1>Panel de Pacientes</h1>
        <div className="table-toolbar flex flex-row justify-between">
          <div className="flex flex-row gap-x-4">
            <SearchInput
              placeholder="Busca por nombre o DNI del paciente..."
              onSubmit={function (value: string): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
          <div className="flex flex-row items-center gap-x-1">
            <Button
              text="Filtros Avanzados"
              color={ButtonColor.PRIMARY}
              onClick={handleOpenModal}
              className="hidden xl:block"
            />
            <p className="ml-2">
              ÚLTIMA ACTUALIZACIÓN: <span className="time">{updateTime}</span>
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
        <ModalWrapper isOpen={isModalOpen} width="66rem">
          <PatientFilterModal onClose={handleCloseModal} onFilter={handleFilter} />
        </ModalWrapper>
        <PatientsTable />
      </div>
    </div>
  );
}
