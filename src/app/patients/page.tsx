"use client";
import PatientFilterModal from "@/src/components/ui/modals/PatientFilterModal";
import PatientsTable from "@/src/components/sections/patients/PatientsTable";
import ModalWrapper from "@/src/components/ui/wrappers/ModalWrapper";
import Button from "@/src/components/ui/buttons/Button";
import SearchInput from "@/src/components/ui/inputs/border/SearchInput";
import {ButtonColor} from "@/src/enums/ButtonColor";
import {useEffect, useState} from "react";
import {Patient, PatientsQueryParams} from "@/src/types/patient";
import {fetchPatientsPaginated} from "@/src/api/patients";

export default function Patients() {
    const [updateTime, setUpdateTime] = useState<string | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false); // Using this for both refresh and animation
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const initialFilterParams: PatientsQueryParams = {
        name: "",
        dni: "",
        age: undefined,
        doctor_id: "",
        location: "",
        device_id: "",
        comorbidity: "",
        entry_date: "",
        discharge_date: "",
    };

    const [filterParams, setFilterParams] = useState<PatientsQueryParams>(initialFilterParams);

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const updateTimeNow = () => {
        const currentTime = new Date().toLocaleTimeString();
        setUpdateTime(currentTime);
    };

    // Fetch patients whenever pagination or filters change
    useEffect(() => {
        const fetchPatientsPaginatedData = async () => {
            setIsLoading(true); // Start loading
            setError(null); // Clear any existing error before fetching
            try {
                const response = await fetchPatientsPaginated(currentPage, rowsPerPage, filterParams);
                setPatients(response.patients);
                setTotalCount(response.totalCount);
            } catch {
                setError("Failed to fetch patients");
            } finally {
                setIsLoading(false); // Stop loading after fetch completes
                updateTimeNow(); // Update the time
            }
        };

        fetchPatientsPaginatedData();
    }, [filterParams, currentPage, rowsPerPage, isRefreshing]);

    const handleRefresh = () => {
        setIsRefreshing(true);
        setFilterParams(initialFilterParams);
        updateTimeNow();
        setTimeout(() => {
            setIsRefreshing(false); // Stop refreshing after 700ms
        }, 700);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleFilter = (filterData: PatientsQueryParams) => {
        setFilterParams(filterData);
        setCurrentPage(1);
        handleCloseModal();
    };

    const handleSearch = (value: string) => {
        setFilterParams((prev) => ({
            ...prev,
            name: value
        }));
        setCurrentPage(1); // Reset to page 1 when search is applied
    };

    return (
        <div className="flex h-full">
            <div className="flex-1 overflow-x-auto">
                <h1>Panel de Pacientes</h1>
                <div className="table-toolbar flex flex-row justify-between">
                    <div className="flex flex-row gap-x-4">
                        <SearchInput
                            placeholder="Busca por nombre del paciente..."
                            onSubmit={handleSearch}
                        />
                    </div>
                    <div className="flex flex-row items-center gap-x-1">
                        <Button
                            text="Filtros Avanzados"
                            color={ButtonColor.PRIMARY}
                            onClick={handleOpenModal}
                            className="hidden xl:block"
                        />
                        <p className="ml-2 update__text">
                            ÚLTIMA ACTUALIZACIÓN: <span className="update__text--time">{updateTime}</span>
                        </p>
                        <span
                            className={`material-symbols-outlined cursor-pointer ${
                                isRefreshing ? "spin-animation" : ""
                            }`}
                            onClick={handleRefresh} // Trigger data refresh
                        >
                            refresh
                        </span>
                    </div>
                </div>
                <ModalWrapper isOpen={isModalOpen} width="66rem">
                    <PatientFilterModal onClose={handleCloseModal} onFilter={handleFilter}/>
                </ModalWrapper>
                <PatientsTable patients={patients}
                               totalCount={totalCount}
                               currentPage={currentPage}
                               rowsPerPage={rowsPerPage}
                               onPageChange={setCurrentPage}
                               onRowsPerPageChange={setRowsPerPage}
                               error={error}
                               isLoading={isLoading}
                />
            </div>
        </div>
    );
}
