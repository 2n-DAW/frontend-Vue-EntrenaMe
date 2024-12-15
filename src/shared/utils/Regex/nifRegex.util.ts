export const nifRegex = (nif:String):string=>{
    
    const nif_regex = /^[0-9]{8}[A-Z]$/;
    if(!nif){
        return 'El nif es un campo obligatorio';
    }
    if(nif.length < 8){
        return 'El nif debe tener al menos 8 caracteres';
    }
        
    if(!nif_regex.test(nif.toString())){
        return 'Introduce un nif valido';
    }
    
    return '';   
}