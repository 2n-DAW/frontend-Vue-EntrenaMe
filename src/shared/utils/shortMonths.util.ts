import { OptionSelect } from "../interfaces/select/OptionSelect.interface";

const sortMonths = (months: Array<string>): Array<string> => {
    const months_names = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    
    return months.sort((a, b) => {
        return months_names.indexOf(a) - months_names.indexOf(b);
    });
}


const sortMonthsOptions = (months: OptionSelect[]): OptionSelect[] => {

    const uniqueMonths = Array.from(new Set(months.map((month) => month.value)));
    const months_sorted = sortMonths(uniqueMonths);

    return months_sorted.map((month) => {
        return { value: month, label: month };
    });
}

export {
    sortMonths,
    sortMonthsOptions   
}