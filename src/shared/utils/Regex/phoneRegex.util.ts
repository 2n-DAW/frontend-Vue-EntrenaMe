export const phoneRegex = (phone:String):string=>{
    
    const phone_regex = /^[0-9]{9}$/;
    if(!phone){
        return 'El tlf es un campo obligatorio';
    }
    if(phone.length < 9){
        return 'El tlf debe tener al menos 9 números';
    }
        
    if(!phone_regex.test(phone.toString())){
        return 'Introduce un tlf valido';
    }
    
    return '';   
}