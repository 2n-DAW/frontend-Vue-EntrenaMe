export const sortWeekDays = (days: Array<string>): Array<string> => {
    const week_days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    
    
    //Buscamo el indice de cada día y si el el dia a es un indice menor qeu el dia b en ese caso
    //a estará por delante de b ya que el resultado de la resta de indices será negativo en caso 
    //contrario a estará por detrás de b
    
    return days.sort((a, b) => {
        return week_days.indexOf(a) - week_days.indexOf(b);
    });
}