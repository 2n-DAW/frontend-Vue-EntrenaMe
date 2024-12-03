<script setup lang="ts">
import { OptionSelect } from '../../shared/interfaces/select/OptionSelect.interface';
import SelectForm from '../selects/SelectForm.vue';
import TextInputForm from '../text_input/TextInputForm.vue';
import { ref, watch } from 'vue';

const email_data = ref('');
const username_data = ref('');
const password_data = ref('');
const password_repeat_data = ref('');
const select_roles_selected = ref('');


const roles : OptionSelect[]= [
    { value: 'client', label: 'Cliente' },
    { value: 'instructor', label: 'Instructor' },
    { value: 'admin', label: 'Admin' },
];

watch([email_data, username_data, password_data, password_repeat_data, select_roles_selected], (new_value) => {
    console.log(new_value);
});
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
            />
            
            <SelectForm 
                label="Rol" 
                class="w-2/5"
                id="select_roles_register"
                placeholder="Selecciona un rol"
                v-model:data="select_roles_selected"
                :options="roles"    
            />
        </div>
        
        <TextInputForm
            label="Email" 
            type="email" 
            id="email_input_register" 
            v-model:data="email_data" 
            placeholder="ejemplo123@email.com" 
        />
        
        <TextInputForm 
            label="Contraseña"
            type="password" 
            id="password_input_register" 
            v-model:data="password_data" 
            placeholder="contraseña1234" 
        />
        
        <TextInputForm 
            label="Repetir contraseña"
            type="password" 
            id="password_input_register" 
            v-model:data="password_repeat_data" 
            placeholder="contraseña1234" 
        />
        
        
        
        <button class="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Registrarse
        </button>
        
    </div>



</template>
