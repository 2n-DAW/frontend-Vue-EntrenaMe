export const usernameRegex = (username: String): string => {
    const username_regex = /^[a-zA-Z][a-zA-Z0-9._]{2,15}[^._]$/;

    if (!username) {
        return 'El nombre de usuario es un campo obligatorio'
    }

    if (!username_regex.test(username.toString())) {
        return 'Introduce un nombre de usuario valido'
    }
    return '';
}