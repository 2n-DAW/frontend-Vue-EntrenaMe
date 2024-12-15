export const usernameRegex = (username: String): string => {
    const username_regex = /^[a-zA-Z][a-zA-Z0-9._]{3,15}[^._]$/;

    if (!username) {
        return 'El nombre de usuario es un campo obligatorio'
    }
    
    if (username.length < 4) {
        return 'El nombre de usuario debe tener al menos 4 caracteres'
    }
    
    if (username.length > 16) {
        return 'El nombre de usuario debe tener menos de 16 caracteres'
    }

    if (!username_regex.test(username.toString())) {
        return 'Introduce un nombre de usuario valido'
    }
    return '';
}