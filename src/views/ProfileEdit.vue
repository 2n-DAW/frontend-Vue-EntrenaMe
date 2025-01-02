<script setup lang="ts">
import { useStore } from 'vuex';
import TextInputForm from '../components/text_input/TextInputForm.vue';
import { computed } from 'vue';


const store = useStore();

store.dispatch('auth/getUser');

const user = computed(() => store.getters['auth/getUser']);




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
                    <TextInputForm 
                        class="w-3/5"
                        label="Email" 
                        type="email" 
                        id="email_input" 
                        :data="user.email"
                        placeholder="ejemplo123@email.com" 
                        :readonly="true" />

                    <TextInputForm 
                        class="w-2/5 pl-4"
                        label="Nombre de usuario" 
                        type="text" 
                        id="username_input" 
                        :data="user.username"
                        placeholder="Nombre de usuario" 
                        :readonly="true" />
                </div>

                <div class="flex">
                    <TextInputForm 
                        class="w-2/5"
                        label="Nombre" 
                        type="text" 
                        id="name_input" 
                        :data="user.name" 
                        placeholder="Nombre"
                        :readonly="false" />

                    <TextInputForm 
                        class="w-3/5 pl-4"
                        label="Apellidos" 
                        type="text" 
                        id="surname_input" 
                        :data="user.surname"
                        placeholder="Apellidos" 
                        :readonly="false" />
                </div>
                
                <TextInputForm 
                    label="Biografía" 
                    type="text" 
                    id="bio_input" 
                    :data="user.bio" 
                    placeholder="Biografía"
                    :readonly="false" />
                    
                
                <div v-if="user.client || user.instructor" class = "flex">
                    <TextInputForm 
                        class="w-1/2"
                        label="NIF" 
                        type="text" 
                        id="nif_input" 
                        :data="user.client.nif" 
                        placeholder="NIF"
                        :readonly="false" />

                    <TextInputForm 
                        class="w-1/2 pl-4"
                        label="Teléfono" 
                        type="text" 
                        id="tlf_input" 
                        :data="user.client.tlf"
                        placeholder="Teléfono" 
                        :readonly="false" />
                </div>
                
                <TextInputForm 
                    v-if="user.instructor"
                    label="Dirección" 
                    type="text" 
                    id="address_input" 
                    :data="user.client.address" 
                    placeholder="Dirección"
                    :readonly="false" />


                <TextInputForm label="Cambiar Contraseña" type="password" id="password_input" :data="user.password"
                    placeholder="Contraseña" :readonly="false" />

                <TextInputForm label="Confirmar contraseña" type="password" id="confirm_password_input"
                    :data="user.password" placeholder="Confirmar contraseña" :readonly="false" />

            </div>
        </div>
    </div>


</template>