<template>
    <div class="main_div">
        <div class="img_div">
            <ImgAuth class="img_auth" />
        </div>
        <div class="form_div">
            <div class="w-full flex flex-col gap-6">
                <h2 class="text-2xl font-bold text-gray-800 text-center">
                    {{ isLogin ? 'Login' : 'Register' }}
                </h2>

                <div v-if="isLogin">
                    <Login />
                </div>

                <div v-else>
                    <Register />
                </div>


                <p class="text-center text-gray-600">
                    {{ isLogin ? "¿Aún no tienes una cuenta?" : "¿Ya tientes una cuenta?" }}
                    <button class="text-blue-600 underline hover:text-blue-800 transition" @click="toggleForm">
                        {{ isLogin ? 'Registrarse' : 'Logearse' }}
                    </button>
                </p>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">

import { ref } from 'vue';
import ImgAuth from '../components/img_svg/imgAuth.vue';
import Register from '../components/auth/Register.vue';
import Login from '../components/auth/Login.vue';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const isLogin = ref(true);

const toggleForm = () => {
    isLogin.value = !isLogin.value;
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
};


</script>

<style>
.main_div {
    display: flex;
    margin-top: 15vh
}

.img_div {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.form_div {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
