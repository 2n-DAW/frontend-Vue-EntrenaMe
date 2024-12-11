export const tlfRegex = (tlf:String):string=>{
    
    const tlf_regex = /^[0-9]{9}$/;
    if(!tlf){
        return 'El tlf es un campo obligatorio';
    }
    if(tlf.length < 9){
        return 'El tlf debe tener al menos 9 números';
    }
        
    if(!tlf_regex.test(tlf.toString())){
        return 'Introduce un tlf valido';
    }
    
    return '';   
}