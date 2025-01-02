<script setup lang="ts">
import { ref } from 'vue';
import TextInputForm from '../text_input/TextInputForm.vue';
import { emailRegex } from '../../shared/utils/Regex/emailRegex.util';
import { passwordRegex } from '../../shared/utils/Regex/passwordRegex.util';
import { useStore } from 'vuex';

import Noty from 'noty';
import 'noty/lib/noty.css';
import 'noty/lib/themes/mint.css';
import { useRouter } from 'vue-router';


const email_data = ref('');
const password_data = ref('');
const error_email = ref('');
const error_password = ref('');
const router = useRouter();

const store = useStore();


const submitLogin = async () => {

    if (validateLogin()) {

        try {
            await store.dispatch('auth/initialize', {
                email: email_data.value,
                password: password_data.value
            });
            
            new Noty({
                type: 'success',
                text: 'Login exitoso',
                timeout: 3000,
                progressBar: true,
            }).show();
            
            router.push('/home');
        
        } catch (error: unknown) {

            console.error('Error durante el login:', error);
            
            let message: string;
            if (error instanceof Error) {
                switch (error.message) {
                    case 'User not found':
                        error_email.value = 'El email no está registrado';
                        message = 'El email no está registrado';
                        break;
                    case 'Invalid password':
                        error_password.value = 'La contraseña es incorrecta';
                        message = 'La contraseña es incorrecta';
                        break;
                    default:
                        message = 'Error inesperado';
                        break;
                }

                new Noty({
                    type: 'error',
                    text: message,
                    timeout: 3000,
                    progressBar: true,
                }).show();

            }
        }
    }

};

const validateLogin = (): boolean => {
    error_email.value = emailRegex(email_data.value);
    error_password.value = passwordRegex(password_data.value);

    if (error_email.value || error_password.value) {
        return false;
    }

    return true;
}



</script>

<template>

    <div class="flex flex-col gap-6 w-1/2 mx-auto">
        <TextInputForm label="Email" type="email" id="email_input_login" v-model:data="email_data"
            placeholder="ejemplo123@email.com" :error="error_email" />

        <TextInputForm label="Contraseña" type="password" id="password_input_login" v-model:data="password_data"
            placeholder="contraseña1234" :error="error_password" />


        <button class="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" @click="submitLogin">
            Logearse
        </button>
    </div>

</template>