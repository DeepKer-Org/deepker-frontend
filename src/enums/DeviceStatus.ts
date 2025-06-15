export enum DeviceStatus {
  IN_USE = "In Use",
  FREE = "Free",
  UNAVAILABLE = "Unavailable",
  CONNECTING = "Connecting"
}

export const getDeviceStatusValues = (): string[] => {
  return Object.values(DeviceStatus);
};

export const getDeviceStatusDisplay = (status: string): string => {
  return status;
};