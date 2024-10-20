import React from 'react'

interface DeviceActionButtonProps {
    status: string;
    onUnlink: () => void;
    onLink: () => void;
}
const DeviceActionButton : React.FC<DeviceActionButtonProps> = ({ status, onUnlink, onLink }) => {
    if (status === "In Use") {
        return (
            <div className="table-unlink" onClick={onUnlink}>
                DESVINCULAR
            </div>
        );
    }

    if (status === "Free") {
        return (
            <div className="table-link" onClick={onLink}>
               VINCULAR
            </div>
        );
    }

    // For other statuses, show blocked text in grey
    return (
        <div className="table-no-action">
            SIN ACCIÓN
        </div>
    );
}
export default DeviceActionButton
