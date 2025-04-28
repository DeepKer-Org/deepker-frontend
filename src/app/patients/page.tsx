"use client";
import PatientFilterModal from "@/src/components/ui/modals/PatientFilterModal";
import PatientsTable from "@/src/components/sections/patients/PatientsTable";
import ModalWrapper from "@/src/components/ui/wrappers/ModalWrapper";
import Button from "@/src/components/ui/buttons/Button";
import SearchInput from "@/src/components/ui/inputs/border/SearchInput";
import { ButtonColor } from "@/src/enums/ButtonColor";
import { useEffect, useState } from "react";
import { Patient, PatientsQueryParams } from "@/src/types/patient";
import { fetchPatientsPaginated } from "@/src/api/patients";
import { useAuth } from "@/src/context/AuthContext";

export default function Patients() {
  const [hasOnlyMyPatients, setHasOnlyMyPatients] = useState(false);
  const [updateTime, setUpdateTime] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false); // Using this for both refresh and animation
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { doctorId } = useAuth();

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

  const [filterParams, setFilterParams] =
    useState<PatientsQueryParams>(initialFilterParams);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const updateTimeNow = () => {
    const currentTime = new Date().toLocaleTimeString();
    setUpdateTime(currentTime);
  };

  useEffect(() => {
    const fetchPatientsPaginatedData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchPatientsPaginated(
          currentPage,
          rowsPerPage,
          filterParams
        );
        setPatients(response.patients);
        setTotalCount(response.totalCount);
      } catch {
        setError("Failed to fetch patients");
      } finally {
        setIsLoading(false);
        updateTimeNow();
      }
    };

    fetchPatientsPaginatedData();
  }, [filterParams, currentPage, rowsPerPage, isRefreshing]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setFilterParams(initialFilterParams);
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

  const handleFilter = (filterData: PatientsQueryParams) => {
    setFilterParams(filterData);
    setCurrentPage(1);
    handleCloseModal();
  };

  const handleSearch = (value: string) => {
    setFilterParams((prev) => ({
      ...prev,
      name: value,
    }));
    setCurrentPage(1);
  };

  const handleSetMyPatients = () => {
    if (!doctorId) return;
    console.log(doctorId)

    setFilterParams((prev) => ({
      ...prev,
      doctor_id: hasOnlyMyPatients ? "" : doctorId,
    }));

    setHasOnlyMyPatients((prev) => !prev);
    setCurrentPage(1);
  };

  const handleSetAllPatients = () => {
    setFilterParams(initialFilterParams);
    setHasOnlyMyPatients(false);
    setCurrentPage(1);
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
          <div className="flex flex-row items-center gap-x-2.5">
            {filterParams.doctor_id !== "" ? (
              <Button
                text="Todos los Pacientes"
                color={ButtonColor.SECONDARY}
                onClick={handleSetAllPatients}
                className="hidden tableBp:block"
              />
            ) : (
              <Button
                text="Mis Pacientes"
                color={ButtonColor.SUCCESS}
                onClick={handleSetMyPatients}
                className="hidden tableBp:block"
              />
            )}
            {filterParams.name ||
            filterParams.dni ||
            filterParams.age ||
            filterParams.location ||
            filterParams.device_id ||
            filterParams.comorbidity ||
            filterParams.entry_date ||
            filterParams.discharge_date ? (
              <Button
                text="Restablecer Filtros"
                color={ButtonColor.SECONDARY}
                onClick={() => setFilterParams(initialFilterParams)}
                className="hidden tableBp:block"
              />
            ) : (
              <Button
                text="Filtros Avanzados"
                color={ButtonColor.PRIMARY}
                onClick={handleOpenModal}
                className="hidden tableBp:block"
              />
            )}
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
        <ModalWrapper onClose={() => setIsModalOpen(false)} isOpen={isModalOpen} width="66rem">
          <PatientFilterModal
            onClose={handleCloseModal}
            onFilter={handleFilter}
          />
        </ModalWrapper>
        <PatientsTable
          patients={patients}
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
