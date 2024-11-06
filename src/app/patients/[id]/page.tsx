"use client";
import React, {useEffect, useState} from 'react'
import ReturnButton from "@/src/components/ui/buttons/ReturnButton";
import CardWrapper from "@/src/components/ui/wrappers/CardWrapper";
import IconTitle from "@/src/components/ui/IconTitle";
import DetailRow from "@/src/components/ui/DetailRow";
import MonthYearPicker from "@/src/components/sections/patients/MonthYearPicker";
import {Patient, PatientResponse} from "@/src/types/patient";
import {formatDate} from "@/src/utils/formatTime";
import {fetchPatient} from "@/src/api/patients";
import TimelineElement from "@/src/components/sections/patients/TimelineElement";

const PatientDetail = ({params}: { params: { id: string } }) => {
    const [patientData, setPatientData] = useState<Patient | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [initSelectedDate, setInitSelectedDate] = useState<Date | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [filteredVisits, setFilteredVisits] = useState(patientData?.medical_visits || []);

    useEffect(() => {
        const loadPatient = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data: PatientResponse = await fetchPatient(params.id);
                setPatientData(data.patient);
            } catch {
                setError('No se pudo recuperar el detalle de la alerta: ');
            } finally {
                setIsLoading(false);
            }
        };
        loadPatient();
    }, [params.id]);


    const handleInitDateChange = (date: Date | null) => {
        setInitSelectedDate(date);
    };
    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };


    useEffect(() => {
        if (!patientData) return;

        // Filter and sort logic
        const filterAndSortVisits = () => {
            const isWithinDateRange = (entryDateStr: string, dischargeDateStr: string | null) => {
                const entryDate = new Date(entryDateStr); // Convert entry_date string to Date
                const dischargeDate = dischargeDateStr && dischargeDateStr !== "" ? new Date(dischargeDateStr) : null;

                const entryYear = entryDate.getFullYear();
                const entryMonth = entryDate.getMonth();
                const dischargeYear = dischargeDate ? dischargeDate.getFullYear() : null;
                const dischargeMonth = dischargeDate ? dischargeDate.getMonth() : null;

                const initYear = initSelectedDate ? initSelectedDate.getFullYear() : null;
                const initMonth = initSelectedDate ? initSelectedDate.getMonth() : null;
                const selectedYear = selectedDate ? selectedDate.getFullYear() : null;
                const selectedMonth = selectedDate ? selectedDate.getMonth() : null;

                // If there's no dischargeDate, filter only by entryDate
                if (!dischargeDate) {
                    return (
                        (initYear === null || (entryYear > initYear || (entryYear === initYear && entryMonth >= initMonth!))) &&
                        (selectedYear === null || (entryYear < selectedYear || (entryYear === selectedYear && entryMonth <= selectedMonth!)))
                    );
                }

                // Check if the entry date is after or in the "Desde" (initSelectedDate) month
                const isAfterInitDate =
                    initYear === null || // If no initSelectedDate, it's valid
                    (entryYear > initYear || (entryYear === initYear && entryMonth >= initMonth!));

                // Check if the discharge date is before or in the "Hasta" (selectedDate) month
                const isBeforeSelectedDate =
                    selectedYear === null || // If no selectedDate, it's valid
                    dischargeYear! < selectedYear ||
                    (dischargeYear === selectedYear && dischargeMonth! <= selectedMonth!);

                return isAfterInitDate && isBeforeSelectedDate;
            };

            // Update the filtered visits based on the date range
            const filtered = patientData.medical_visits
                .filter(visit => {
                    const entryDateStr = visit.entry_date;
                    const dischargeDateStr = visit.discharge_date || ""; // Discharge date can be empty
                    return isWithinDateRange(entryDateStr, dischargeDateStr);
                })
                .sort((a, b) => {
                    // Sort by entry_date in descending order (most recent first)
                    const dateA = new Date(a.entry_date);
                    const dateB = new Date(b.entry_date);
                    return dateB.getTime() - dateA.getTime(); // Descending order
                });

            setFilteredVisits(filtered);
        };

        // Call filter and sort whenever initSelectedDate or selectedDate changes
        filterAndSortVisits();
    }, [initSelectedDate, selectedDate, patientData]);


    if (isLoading) {
        return <div className={"table-error"}>Cargando...</div>;
    }

    if (error) {
        return  <p className={"table-error"}>{error}</p>

    }

    if (!patientData) {
        return <div>No data found</div>;
    }

    return (
        <div className={"page__container"}>
            <div className="button__container">
                <ReturnButton/>
            </div>
            <div className={"details__container grid-cols-3 grid-rows-11"}>
                <CardWrapper className={"row-span-4"}>
                    <IconTitle className={"mb-4"} icon={"person"} title={"Datos del paciente:"}/>
                    <DetailRow label={"Nombre:"} name={patientData.name}/>
                    <DetailRow label={"DNI:"} name={patientData.dni}/>
                    <DetailRow label={"Edad:"} name={(patientData.age).toString() + " años"}/>
                    <DetailRow label={"Género:"} name={patientData.sex === "M" ? "Hombre" : "Mujer"}/>
                    <DetailRow label={"Lugar:"} name={patientData.location}/>
                    <DetailRow label={"Fecha ingreso:"}
                               name={patientData.entry_date === "" ? "No está en centro" : formatDate(patientData.entry_date)}/>
                </CardWrapper>
                <CardWrapper className={"row-span-4"}>
                    <IconTitle className={"mb-4"} icon={"warning"} title={"Riesgos preexistentes:"}/>
                    <ul className={"ul__container"}>
                        {
                            patientData.comorbidities.map((comorbidity) => (
                                <li key={comorbidity}>{comorbidity}</li>
                            ))
                        }
                    </ul>
                </CardWrapper>
                <CardWrapper className={"row-span-11 timeline__container relative"}>
                    <h4>Linea de tiempo</h4>
                    <div className={"timeline__header"}>
                        <div className={"timeline__date"}><p>Desde:</p> <MonthYearPicker
                            onDateChange={handleInitDateChange}/></div>
                        <div className={"timeline__date"}><p>Hasta:</p> <MonthYearPicker
                            onDateChange={handleDateChange}/></div>
                    </div>
                    <div className={"timeline__body no-scrollbar"}>
                        {filteredVisits.length > 0 &&
                            filteredVisits.map(visit => (
                                <div key={visit.entry_date} className={"timeline__element"}>
                                    <TimelineElement
                                        key={visit.entry_date}
                                        entry_date={visit.entry_date}
                                        discharge_date={visit.discharge_date}
                                        title={visit.reason}
                                        description={`El diagnóstico ha sido: ${visit.diagnosis}. El tratamiento ha sido: ${visit.treatment}`}
                                    />
                                </div>
                            ))}
                    </div>
                    <div className={"timeline__line"}></div>
                    <div className={"timeline__circle"}></div>
                </CardWrapper>
                <CardWrapper className={"row-span-4"}>
                    <IconTitle className={"mb-4"} icon={"health_and_safety"} title={"Médicos asociados:"}/>
                    <ul className={"ul__container"}>
                        {
                            patientData.medical_staff.map((doctor) => (
                                <div key={doctor.doctor_id}>
                                    <li>{doctor.name}</li>
                                    <div className={"font-semibold"}>{doctor.specialization}</div>
                                </div>
                            ))
                        }
                    </ul>
                </CardWrapper>
                <CardWrapper className={"row-span-4"}>
                    <IconTitle className={"mb-4"} icon={"monitor"} title={"Métricas biométricas en monitoreo:"}/>
                    <div className={"metrics__container"}>
                        <div className={"metrics__grid metrics__item--black"}>
                            <p className={"metrics__grid--left metrics__text--h1"}>HR</p>
                            <div className={"metrics__grid--right"}>
                                <div className={"metrics__text--h3"}>
                                    <p>120</p>
                                    <p>50</p>
                                </div>
                                <p className={"metrics__text--h1"}>60</p>
                            </div>
                        </div>
                        <div className={"metrics__divider"}/>
                        <div className={"metrics__grid metrics__item--blue"}>
                            <p className={"metrics__grid--left metrics__text--h1"}>SPO2</p>
                            <div className={"metrics__grid--right"}>
                                <div className={"metrics__text--h3"}>
                                    <p>100</p>
                                    <p>90</p>
                                </div>
                                <p className={"metrics__text--h1"}>84</p>
                            </div>
                        </div>
                    </div>
                </CardWrapper>
                <CardWrapper className={"row-span-3 col-span-2"}>
                    <IconTitle icon={"medication"} title={"Medicación actual:"}/>
                    <table>
                        <thead>
                        <tr>
                            <th>Medicamento</th>
                            <th>Dosis</th>
                            <th>Fecha de inicio</th>
                            <th>Fecha de término</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            patientData.medications.map((medication) => (
                                <tr key={medication.name}>
                                    <td>{medication.name}</td>
                                    <td>{medication.dosage + " - " + medication.periodicity}</td>
                                    <td>{formatDate(medication.start_date)}</td>
                                    <td>{formatDate(medication.end_date)}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </CardWrapper>
            </div>
        </div>
    )
}

export default PatientDetail