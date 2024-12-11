export const addressRegex = (address: String): string => {
    const address_regex = /^[a-zA-Z0-9\s,'-]*$/ ;
    if (!address) {
        return 'El address es un campo obligatorio'
    }

    if (!address_regex.test(address.toString())) {
        return 'Introduce un address valido'
    }
    return '';
}