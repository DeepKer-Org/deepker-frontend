"use client";
import {useRouter} from "next/navigation";
import React from "react";
import {User} from "@/src/types/auth";

interface UsersElementProps {
    user: User;
    onRefresh: () => void;
}

const mapRoles = (roles: string[]) => {
    return roles.map((role) => {
        switch (role) {
            case "admin":
                return "Administrador";
            case "doctor":
                return "Especialista Médico";
            default:
                return "Desconocido";
        }
    }).join(", ");
}

const UsersElement: React.FC<UsersElementProps> = ({user, onRefresh}) => {
    const router = useRouter();

    return (
        <div className="table-row grid-cols-[25%_30%_25%_20%]">
            <div className="cell-border table-row-group px-4">
                <p>{user.user_id}</p>
            </div>
            <div className="cell-border table-row-group px-4">
                <p className={"truncate"}>{user.username}</p>
            </div>
            <div className="cell-border table-row-group px-4">
                <p>{mapRoles(user.roles)}</p>
            </div>
            <div className={"table-row-circle-buttons"}>
                <button
                    className="bg-green-500 rounded-full cursor-pointer w-10 h-10 hover:bg-green-550 transition-all"
                    onClick={() => router.push(`/admin/panel/edit/${user.user_id}`)}
                >
                    <span className={"material-symbols-outlined text-white mt-1"}>edit</span>
                </button>
                <button
                    className="bg-red-500 rounded-full cursor-pointer w-10 h-10 hover:bg-red-550 transition-all"
                    onClick={() => console.log("Delete user")}
                >
                    <span className={"material-symbols-outlined text-white mt-1"}>delete</span>
                </button>
            </div>
        </div>
    );
};

export default UsersElement;
