<script setup lang="ts">
import { ref, watch } from 'vue';
import TextInputForm from '../text_input/TextInputForm.vue';


const email_data = ref('');
const password_data = ref('');

watch([email_data, password_data], (new_value) => {
    console.log(new_value);
});

</script>

<template>

    <div class="flex flex-col gap-6 w-1/2 mx-auto">
       
        <TextInputForm
            label="Email" 
            type="email" 
            id="email_input_login" 
            v-model:data="email_data" 
            placeholder="ejemplo123@email.com" 
        />
        
        <TextInputForm 
            label="Contraseña"
            type="password" 
            id="password_input_login" 
            v-model:data="password_data" 
            placeholder="contraseña1234" 
        />
        
        
        <button class="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" >
            Logearse
        </button>
    </div>

</template>