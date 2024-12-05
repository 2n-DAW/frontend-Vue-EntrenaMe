<script setup lang="ts">
import { ref } from 'vue';
import TextInputForm from '../text_input/TextInputForm.vue';
import { emailRegex } from '../../shared/utils/Regex/emailRegex.util';
import { passwordRegex } from '../../shared/utils/Regex/passwordRegex.util';


const email_data = ref('');
const password_data = ref('');
const error_email = ref('');
const error_password = ref('');


const submitLogin = () => {
    console.log(validateLogin());
    
};

const validateLogin = ():boolean=>{
    error_email.value = emailRegex(email_data.value);
    error_password.value = passwordRegex(password_data.value);
    
    if(error_email.value ||error_password.value){
        return false;
    }
    
    return true;
}



</script>

<template>

    <div class="flex flex-col gap-6 w-1/2 mx-auto">
        <TextInputForm
            label="Email" 
            type="email" 
            id="email_input_login" 
            v-model:data="email_data" 
            placeholder="ejemplo123@email.com" 
            :error= "error_email"
        />
        
        <TextInputForm 
            label="Contraseña"
            type="password" 
            id="password_input_login" 
            v-model:data="password_data" 
            placeholder="contraseña1234" 
            :error="error_password"
        />
        
        
        <button class="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" @click="submitLogin">
            Logearse
        </button>
    </div>

</template>