export const formatDate = (date: string | Date): string => {
    const dateObj = typeof date === 'string' ? new Date(`${date}T00:00:00`) : date;

    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    const day = dateObj.getDate();
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();

    return `${day} de ${month} de ${year}`;
};
