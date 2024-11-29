export const sortHours = (hours: Array<string>): Array<string> => {
    return hours.sort((a, b) => {
        const hour_a = parseInt(a.split(":")[0]);
        const hour_b = parseInt(b.split(":")[0]);
        return hour_a - hour_b;
    });
}