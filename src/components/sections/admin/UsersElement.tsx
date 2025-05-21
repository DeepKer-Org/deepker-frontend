"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { User } from "@/src/types/auth";
import DeleteUserConfirmationModal from "@/src/components/ui/modals/DeleteUserConfirmationModal";
import { enqueueSnackbar } from "notistack";

interface UsersElementProps {
  user: User;
  onRefresh: () => void;
}

const mapRoles = (roles: string[]) => {
  return roles
    .map((role) => {
      switch (role) {
        case "admin":
          return "Administrador";
        case "doctor":
          return "Especialista Médico";
        default:
          return "Desconocido";
      }
    })
    .join(", ");
};

const UsersElement: React.FC<UsersElementProps> = ({ user, onRefresh }) => {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteSuccess = () => {
    enqueueSnackbar("¡Se ha eliminado el usuario exitosamente!", {
      variant: "success",
    });
    onRefresh();
  };

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
          onClick={() => {
            const query = `roles=${encodeURIComponent(
              JSON.stringify(user.roles)
            )}`;
            router.push(`/admin/panel/edit/${user.user_id}?${query}`);
          }}
        >
          <span className="material-symbols-outlined text-white mt-1">
            edit
          </span>
        </button>
        <button
          className="bg-red-500 rounded-full cursor-pointer w-10 h-10 hover:bg-red-550 transition-all"
          onClick={handleOpenDeleteModal}
        >
          <span className={"material-symbols-outlined text-white mt-1"}>
            delete
          </span>
        </button>
      </div>
      {isDeleteModalOpen && (
        <DeleteUserConfirmationModal
          userId={user.user_id}
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
};

export default UsersElement;
