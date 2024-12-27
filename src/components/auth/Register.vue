<script setup lang="ts">
import { useStore } from 'vuex';
import { OptionSelect } from '../../shared/interfaces/select/OptionSelect.interface';
import { emailRegex, passwordRegex, nifRegex, usernameRegex, addressRegex, phoneRegex, nameRegex, surnameRegex } from '../../shared/utils/Regex';
import SelectForm from '../selects/SelectForm.vue';
import TextInputForm from '../text_input/TextInputForm.vue';
import { ref} from 'vue';
import { useRouter } from 'vue-router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../shared/interfaces/entities/User.interface';
import Noty from 'noty';
import { i } from 'vite/dist/node/types.d-aGj9QkWt';


const store = useStore();
const router = useRouter();

const email_data = ref('');
const username_data = ref('');
const password_data = ref('');
const password_repeat_data = ref('');
const select_roles_selected = ref('');
const nif_data = ref('');
const tlf_data = ref('');
const address_data = ref('');
const name_data = ref('');
const surname_data = ref('');


const error_username = ref('');
const error_email = ref('');
const error_password = ref('');
const error_select_roles = ref('');
const error_password_repeat = ref('');
const error_nif = ref('');
const error_tlf = ref('');
const error_address = ref('');
const error_name = ref('');
const error_surname = ref('');


const roles : OptionSelect[]= [
    { value: 'client', label: 'Cliente' },
    { value: 'instructor', label: 'Instructor' },
    { value: 'admin', label: 'Admin' },
];


const submitRegister = async()=>{
    
    if(validateRegister()){
        
        
        try {
            
            const user:User = {
                email: email_data.value,
                username: username_data.value,
                password: password_data.value,
                type_user: select_roles_selected.value,
                name: name_data.value,
                surname: surname_data.value,
                img_user: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
                is_active: true,
                is_deleted: false,
            };
            
            if (select_roles_selected.value === 'client') {
                user.client = {
                    tlf: tlf_data.value,
                    address: address_data.value,
                };
            }
            
            if (select_roles_selected.value === 'instructor') {
                user.instructor = {
                    nif: nif_data.value,
                    tlf: tlf_data.value,
                    address: address_data.value,
                };
            }
            
            if (select_roles_selected.value === 'admin') {
                user.admin = {};
            }
            
            console.log('user:', user);
            
            await AuthService.register(user);
            console.log('Registro exitoso');
            
            new Noty({
                type: 'success',
                text: 'Registro exitoso',
                timeout: 1000,
                progressBar: true,
            }).show();
            
            router.push('/home');
        
        } catch (error: unknown) {

            console.error('Error durante el login:', error);
            
            let message: string;
            if (error instanceof Error) {
                // switch (error.message) {
                //     case 'El correo electrónico ya está en uso. Introduce otro':
                //         error_email.value = 'El nombre de usuario ya está en uso';
                //         message = 'El nombre de usuario ya está en uso';
                //         break;
                //     case 'El correo electrónico ya está en uso. Introduce otro':
                //         error_password.value = 'El correo electrónico ya está en uso';
                //         message = 'El correo electrónico ya está en uso';
                //         break;
                //     default:
                //         console.log(error.message);
                //         message = 'Error inesperado';
                //         break;
                // }
                

                new Noty({
                    type: 'error',
                    // text: message,
                    text: error.message,
                    timeout: 1000,
                    progressBar: true,
                }).show();

            }
        }
        
        
        
        
        
        
    }
    
}

const validateRegister = ():boolean=>{

    error_email.value = emailRegex(email_data.value);
    error_password.value = passwordRegex(password_data.value);
    error_username.value = usernameRegex(username_data.value);
    error_name.value = nameRegex(name_data.value);
    error_surname.value = surnameRegex(surname_data.value);
    
    if(!select_roles_selected.value) {
        error_select_roles.value = 'Selecciona un tipo de usuario'
    }else{
        error_select_roles.value = '';
    }
    
    if (select_roles_selected.value === 'client' || select_roles_selected.value === 'instructor') {
        error_nif.value = nifRegex(nif_data.value);
        error_tlf.value = phoneRegex(tlf_data.value);
    }
    
    if (select_roles_selected.value === 'instructor') {
        error_address.value = addressRegex(address_data.value);
    }
    
    
    if(select_roles_selected.value === 'client' || select_roles_selected.value === 'instructor'){
        if(error_nif.value || error_tlf.value){
            return false;
        }
    }
    const error = (
        error_email.value || 
        error_password.value || 
        error_username.value || 
        error_select_roles.value || 
        error_name.value || 
        error_surname.value || 
        error_address.value
    );
    
    if(error){ 
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
        <div class ="flex">
        <TextInputForm 
                class="w-2/5"
                label="Nombre"
                type="text" 
                id="name_input_register" 
                v-model:data="name_data" 
                placeholder="Nombre" 
                :error="error_name"
            />
            
            <TextInputForm 
                class="w-3/5 pl-4"
                label="Apellidos"
                type="text" 
                id="surname_input_register" 
                v-model:data="surname_data" 
                placeholder="Apellidos" 
                :error="error_surname"
            />
        </div>
        <div class ="flex">
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
                class="w-2/5 pl-4"
                id="select_roles_register"
                placeholder="Selecciona un rol"
                v-model:data="select_roles_selected"
                :options="roles"
                :error ="error_select_roles"
            />
        </div>
        
        <div v-if="select_roles_selected === 'client' || select_roles_selected === 'instructor'" class ="flex">
            
            <TextInputForm 
                class="w-3/5"
                label="Nif"
                type="text" 
                id="nif_input_register" 
                v-model:data="nif_data" 
                placeholder="12345678A" 
                :error="error_nif"
            />
            
            <TextInputForm 
                class="w-2/5 pl-4"
                label="Telefono"
                type="text" 
                id="tlf_input_register" 
                v-model:data="tlf_data" 
                placeholder="6543210123" 
                :error="error_tlf"
            />
            
        </div>
        
        
        <div v-if=" select_roles_selected === 'instructor'" >
            
            <TextInputForm 
                label="Dirección"
                type="text" 
                id="address_input_register" 
                v-model:data="address_data" 
                placeholder="Calle false 123" 
                :error="error_address"
            />
        </div>
        
        <div class ="flex">
            <TextInputForm
                class="w-3/5"
                label="Email" 
                type="email" 
                id="email_input_register" 
                v-model:data="email_data" 
                placeholder="ejemplo123@email.com" 
                :error="error_email"
            />
            
            <TextInputForm 
                class="w-2/5 pl-4"
                label="Fecha de nacimiento"
                type="date" 
                id="password_input_register" 
                v-model:data="password_data" 
                placeholder="contraseña1234" 
                :error="error_password" 
            />
        </div>
        
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


