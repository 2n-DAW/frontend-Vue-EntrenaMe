<script setup lang="ts">
import { useStore } from 'vuex';
import TextInputForm from '../components/text_input/TextInputForm.vue';
import { computed } from 'vue';
import { ref } from 'vue';
import { addressRegex, nameRegex, nifRegex, passwordRegex, phoneRegex, surnameRegex } from '../shared/utils/Regex';


const store = useStore();
store.dispatch('auth/getUser');

const user = computed(() => store.getters['auth/getUser']);
const error_name = ref('');
const error_surname = ref('');
const error_bio = ref('');
const error_nif = ref('');
const error_tlf = ref('');
const error_address = ref('');
const error_password = ref('');
const error_password_repeat = ref('');

const name = ref(user.value.name);
const surname = ref(user.value.surname);
const bio = ref(user.value.bio);
const nif = ref(user.value.client?.nif);
const tlf = ref(user.value.client?.tlf);
const address = ref(user.value.instructor?.address);
const password = ref('');
const password_repeat = ref('');



const validate = (): boolean => {
    error_name.value = '';
    error_surname.value = '';
    error_bio.value = '';
    error_nif.value = '';
    error_tlf.value = '';
    error_address.value = '';
    error_password.value = '';
    error_password_repeat.value = '';
    let addressError = '';
    let nifError = '';
    let tlfError = '';


    const nameError = name.value ? nameRegex(name.value) : 'El nombre es obligatorio';
    const surnameError = surname.value ? surnameRegex(surname.value) : 'Los apellidos son obligatorios';
    const errorPassword = password.value ? passwordRegex(password.value) : '';
    if (user.value.client || user.value.instructor) {
        nifError = nif.value ? nifRegex(nif.value) : 'El NIF es obligatorio';
        tlfError = tlf.value ? phoneRegex(tlf.value) : 'El teléfono es obligatorio';
    }


    if (user.value.instructor) {
        addressError = address.value ? addressRegex(address.value) : 'La dirección es obligatoria';
    }


    if (password.value || password_repeat.value) {
        if (password.value !== password_repeat.value) {
            error_password_repeat.value = 'Las contraseñas no coinciden';
        }
    }

    if (nameError) error_name.value = nameError;
    if (surnameError) error_surname.value = surnameError;
    if (errorPassword) error_password.value = errorPassword;
    if (nifError) error_nif.value = nifError;
    if (tlfError) error_tlf.value = tlfError;
    if (addressError) error_address.value = addressError;

    const hasErrors = error_name.value || error_surname.value || error_nif.value ||
        error_tlf.value || error_address.value || error_password.value || error_password_repeat.value;

    return !hasErrors;
};




const update = () => {
    if (validate()) {
        console.log('Usuario actualizado');
    } else {
        console.log('Error al actualizar el usuario');
    }


};


</script>
<template>
    <div class="flex w-full mt-16 ">
        <div class="flex flex-col gap-6 w-1/2 my-auto">

            <img :src="'/img/users/' + user.img_user" alt="Imagen de perfil" class="w-80 h-80 rounded-full mx-auto" />

        </div>
        <div class="flex flex-col gap-6 w-1/2 mx-auto">
            <div class="w-2/3 flex flex-col gap-6  mx-auto">

                <h2 class="text-2xl font-bold text-gray-800 text-center">Editar Perfil</h2>

                <div class="flex">
                    <TextInputForm class="w-3/5" label="Email" type="email" id="email_input" v-model:data="user.email"
                        placeholder="ejemplo123@email.com" :readonly="true" />

                    <TextInputForm class="w-2/5 pl-4" label="Nombre de usuario" type="text" id="username_input"
                        v-model:data="user.username" placeholder="Nombre de usuario" :readonly="true" />
                </div>

                <div class="flex">
                    <TextInputForm class="w-2/5" label="Nombre" type="text" id="name_input" v-model:data="name"
                        placeholder="Nombre" :readonly="false" :error="error_name" />

                    <TextInputForm class="w-3/5 pl-4" label="Apellidos" type="text" id="surname_input"
                        v-model:data="surname" placeholder="Apellidos" :readonly="false" :error="error_surname" />
                </div>

                <TextInputForm label="Biografía" type="text" id="bio_input" v-model:data="bio" placeholder="Biografía"
                    :readonly="false" :error="error_bio" />


                <div v-if="user.client || user.instructor" class="flex">
                    <TextInputForm class="w-1/2" label="NIF" type="text" id="nif_input" v-model:data="nif"
                        placeholder="NIF" :readonly="false" :error="error_nif" />

                    <TextInputForm class="w-1/2 pl-4" label="Teléfono" type="text" id="tlf_input" v-model:data="tlf"
                        placeholder="Teléfono" :readonly="false" :error="error_tlf" />
                </div>

                <TextInputForm v-if="user.instructor" label="Dirección" type="text" id="address_input"
                    v-model:data="address" placeholder="Dirección" :readonly="false" :error="error_address" />


                <TextInputForm label="Cambiar Contraseña" type="password" id="password_input" v-model:data="password"
                    placeholder="Contraseña" :readonly="false" :error="error_password" />

                <TextInputForm label="Confirmar contraseña" type="password" id="confirm_password_input"
                    v-model:data="password_repeat" placeholder="Confirmar contraseña" :readonly="false"
                    :error="error_password_repeat" />


                <button class="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" @click="update">
                    Guardar cambios
                </button>

            </div>
        </div>
    </div>


</template>