export const passwordRegex = (password:String):string=>{
    
    const password_regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    
    if(!password){
        return 'La contraseña es un campo obligatorio';
    }
    if(password.length < 8){
        return 'La contraseña debe tener al menos 8 caracteres';
    }
    
    if(!password_regex.test(password.toString())){
        return 'La contraseña debe tener una letra minúsculay un número como mínimo';
    }
    
    return '';   
}