export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const formatDate = new Intl.DateTimeFormat("es-ES", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
    }).format(date);
    return formatDate;
}

export const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    const formatTime = new Intl.DateTimeFormat("es-ES", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    }).format(date);
    return formatTime;
}