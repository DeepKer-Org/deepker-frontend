"use client";
import { MonitoringDevice } from "@/src/types/device";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DeviceActionButton from "@/src/components/ui/buttons/DeviceActionButton";
import UnlinkConfirmationModal from "@/src/components/ui/modals/UnlinkConfirmationModal";
import DeviceLinkModal from "@/src/components/ui/modals/DeviceLinkModal";
import { enqueueSnackbar } from "notistack";

interface DevicesElementProps {
  device: MonitoringDevice;
  onRefresh: () => void;
}

const DevicesElement: React.FC<DevicesElementProps> = ({
  device,
  onRefresh,
}) => {
  const router = useRouter();
  const [isUnlinkModalOpen, setIsUnlinkModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [deviceStatus] = useState(device.status); // Track status locally

  const handleDetails = () => {
    router.push(`/patients/${device.patient.patient_id}`);
  };

  const mapStatusNames = (status: string) => {
    switch (status) {
      case "In Use":
        return "En Uso";
      case "Free":
        return "Disponible";
      case "Connecting":
        return "Conectando";
      case "Unavailable":
        return "No Disponible";
      default:
        return "Desconocido";
    }
  };

  const handleLink = (deviceId: string) => {
    setSelectedDeviceId(deviceId);
    setIsLinkModalOpen(true);
  };

  const handleUnlinkSuccess = () => {
    enqueueSnackbar("¡Se ha desvinculado el dispositivo exitosamente!", {
      variant: "success",
    });
    onRefresh();
  };

  const handleLinkSuccess = () => {
    enqueueSnackbar("¡Se ha vinculado el dispositivo exitosamente!", {
      variant: "success",
    });
    setIsLinkModalOpen(false);
    onRefresh();
  };

  return (
    <div className="table-row device-grid-cols tableBp:grid-cols-[12%_25%_25%_10%_28%]">
      <div className="cell-border table-row-group px-4">
        <p>{device.device_id}</p>
      </div>
      <div className="cell-border table-row-group px-4">
        <p>{device.patient.name}</p>
        <p className="table-row-subtitle">{device.patient.dni}</p>
      </div>
      <div className="hidden tableBp:flex row-border flex-col px-4">
        {device.linked_by?.name && (
          <>
            <p>{device.linked_by.name}</p>
            <p className="table-row-subtitle">
              {device.linked_by.specialization}
            </p>
          </>
        )}
      </div>
      <div className="cell-border table-row-group px-4">
        <p>{mapStatusNames(deviceStatus)}</p>
      </div>
      <div className="flex flex-row h-full">
        <div className="flex w-1/2 justify-center h-full items-center cell-border">
          <DeviceActionButton
            status={deviceStatus}
            onUnlink={() => setIsUnlinkModalOpen(true)}
            onLink={() => handleLink(device.device_id)}
          />
        </div>
        <div
          className={`flex w-1/2 items-center justify-center gap-x-4 px-4 h-full ${
            device.patient?.name
              ? "cursor-pointer text-gray-600"
              : "text-gray-400"
          }`}
          onClick={device.patient?.name ? handleDetails : undefined}
        >
          {device.patient?.name && (
            <>
              <p>VER PACIENTE</p>
              <span className="material-symbols-outlined">
                arrow_forward_ios
              </span>
            </>
          )}
        </div>
      </div>
      {isUnlinkModalOpen && (
        <UnlinkConfirmationModal
          deviceId={device.device_id}
          isOpen={isUnlinkModalOpen}
          onClose={() => setIsUnlinkModalOpen(false)}
          onSuccess={handleUnlinkSuccess}
        />
      )}

      {isLinkModalOpen && (
        <DeviceLinkModal
          onClose={() => setIsLinkModalOpen(false)}
          onLinkSuccess={handleLinkSuccess}
          initialDeviceId={selectedDeviceId!}
          isOpen={isLinkModalOpen}
        />
      )}
    </div>
  );
};

export default DevicesElement;
