export const emailRegex = (email: String): String => {
    const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
        return 'El email es un campo obligatorio'
    }

    if (!email_regex.test(email.toString())) {
        return 'Introduce un email valido'
    }
    return '';
}