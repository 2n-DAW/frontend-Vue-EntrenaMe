<script setup lang="ts">
import { OptionSelect } from '../../shared/interfaces/select/OptionSelect.interface';
import { emailRegex } from '../../shared/utils/Regex/emailRegex.util';
import { passwordRegex } from '../../shared/utils/Regex/passwordRegex.util';
import { usernameRegex } from '../../shared/utils/Regex/usernameRegex.util';
import SelectForm from '../selects/SelectForm.vue';
import TextInputForm from '../text_input/TextInputForm.vue';
import { ref, watch } from 'vue';

const email_data = ref('');
const username_data = ref('');
const password_data = ref('');
const password_repeat_data = ref('');
const select_roles_selected = ref('');
const error_username = ref('');
const error_email = ref('');
const error_password = ref('');
const error_select_roles = ref('');
const error_password_repeat = ref('');


const roles : OptionSelect[]= [
    { value: 'client', label: 'Cliente' },
    { value: 'instructor', label: 'Instructor' },
    { value: 'admin', label: 'Admin' },
];


const submitRegister = ()=>{
    console.log(validateRegister());
}

const validateRegister = ():boolean=>{

    error_email.value = emailRegex(email_data.value);
    error_password.value = passwordRegex(password_data.value);
    error_username.value = usernameRegex(username_data.value);
    
    if(!select_roles_selected.value) {
        error_select_roles.value = 'Selecciona un tipo de usuario'
    }else{
        error_select_roles.value = '';
    }
    
    
    if(error_email.value ||error_password.value || error_username.value || error_select_roles.value){
        return false;
    }
    
    if(password_repeat_data.value !== password_data.value){
        error_password_repeat.value = 'Las contraseñas no coinciden'
        return false;
    }else{
        error_password_repeat.value ='';
    }
    
    return true;
}



</script>




<template>
    <div class="flex flex-col gap-6 w-1/2 mx-auto">
        
        <div class ="flex gap-6">
            <TextInputForm 
                class="w-3/5"
                label="Nombre de usuario"
                type="text" 
                id="username_input_register" 
                v-model:data="username_data" 
                placeholder="Ejemplo123" 
                :error="error_username"
            />
            
            <SelectForm 
                label="Rol" 
                class="w-2/5"
                id="select_roles_register"
                placeholder="Selecciona un rol"
                v-model:data="select_roles_selected"
                :options="roles"
                :error ="error_select_roles"
            />
        </div>
        
        <TextInputForm
            label="Email" 
            type="email" 
            id="email_input_register" 
            v-model:data="email_data" 
            placeholder="ejemplo123@email.com" 
            :error="error_email"
        />
        
        <TextInputForm 
            label="Contraseña"
            type="password" 
            id="password_input_register" 
            v-model:data="password_data" 
            placeholder="contraseña1234" 
            :error="error_password"
        />
        
        <TextInputForm 
            label="Repetir contraseña"
            type="password" 
            id="password_input_register" 
            v-model:data="password_repeat_data" 
            placeholder="contraseña1234" 
             :error="error_password_repeat"
        />
        
        
        
        <button class="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" @click="submitRegister">
            Registrarse
        </button>
        
    </div>



</template>
