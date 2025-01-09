import { OptionSelect } from "../interfaces/select/OptionSelect.interface";

export const sortHours = (hours: string[]): string[] => {
    return hours.sort((a, b) => {
        const hour_a = parseInt(a.split(":")[0]);
        const hour_b = parseInt(b.split(":")[0]);
        return hour_a - hour_b;
    });
}

export const sortHoursOptions = (hours: OptionSelect[]): OptionSelect[] => {
    const unique_hours = Array.from(new Set(hours.map((hour) => hour.value)));
    const hours_sorted = sortHours(unique_hours);

    return hours_sorted.map((hour) => {
        return { value: hour, label: hour };
    });
}