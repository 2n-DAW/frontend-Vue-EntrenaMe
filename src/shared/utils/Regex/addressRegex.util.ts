export const addressRegex = (address: String): string => {
    const address_regex = /^[A-Za-zÀ-ÿ0-9\s,.'-]{3,40}$/ ;
    if (!address) {
        return 'El address es un campo obligatorio'
    }

    if (!address_regex.test(address.toString())) {
        return 'Introduce un address valido'
    }
    return '';
}