export const surnameRegex = (surname: String): string => {
    const surname_regex = /^[a-zA-Z\s]*$/;
    if (!surname) {
        return 'El o los apellidos es un campo obligatorio'
    }

    if (!surname_regex.test(surname.toString())) {
        return 'Introduce un o unos apellidos validos'
    }
    return '';
}