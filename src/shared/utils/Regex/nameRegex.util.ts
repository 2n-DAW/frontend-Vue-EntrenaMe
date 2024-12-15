export const nameRegex = (name: String): string => {
    const name_regex = /^[a-zA-Z\s]*$/; 
    if (!name) {
        return 'El nombre es un campo obligatorio'
    }

    if (!name_regex.test(name.toString())) {
        return 'Introduce un nombre valido'
    }
    return '';
}