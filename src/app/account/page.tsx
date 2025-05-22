"use client";
import InfoElement from "@/src/components/sections/account/InfoElement";
import {useEffect, useState} from "react";
import {fetchDoctor} from "@/src/api/doctors";
import {Doctor} from "@/src/types/doctor";

export default function Account() {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [accountData, setAccountData] = useState<Doctor | null>(null);

    useEffect(() => {
        // Fetch account data
        const fetchAccountData = async () => {
            setIsLoading(true); // Start loading
            setError(null); // Clear any existing error before fetching
            try {
                const response = await fetchDoctor("44556677-8888-9999-aaaa-bbbbccccdddd");
                setAccountData(response.doctor);
            } catch {
                setError("Failed to fetch account data");
            } finally {
                setIsLoading(false); // Stop loading after fetch completes
            }
        };
        fetchAccountData()
    }, []);


    if (isLoading) {
        return (
            <div className="flex items-center justify-center w-full h-full">
                <div>Cargando...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center w-full h-full">
                <div>{error}</div>
            </div>
        );
    }

    return (
        <div className="w-[660px] mx-auto">
            <h1>Cuenta</h1>
            <div className="flex flex-col w-full gap-y-6 mt-6">
                <div>
                    <h4 className={"mb-4"}>Usuario</h4>
                    <InfoElement
                        label="Nombre Completo"
                        value={accountData?.name || "N/A"}
                    />
                    <InfoElement label="DNI" value={accountData?.dni || "N/A"}/>
                    <InfoElement label="Especialidad" lastElement value={accountData?.specialization || "N/A"}/>
                </div>
                <div>
                    <h4 className={"mb-4"}>Aplicación</h4>
                    <InfoElement label="Nombre del Sistema" value="DeepKer"/>
                    <InfoElement label="Versión" value="1.0.0" lastElement/>
                </div>
            </div>
        </div>
    );
}
