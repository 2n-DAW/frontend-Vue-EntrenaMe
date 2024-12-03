<template>
    <div class="main_div">
        <div class="img_div">
            <ImgAuth class="img_auth" />
        </div>
        <div class="form_div">
            <div class="w-full max-w-md flex flex-col gap-6">
                <h2 class="text-2xl font-bold text-gray-800 text-center">
                    {{ isLogin ? 'Login' : 'Register' }}
                </h2>

                <div v-if="isLogin">
                    <div class="flex flex-col gap-6">
                        <div class="flex flex-col">
                            <h3 for="email-input-login" class="text-text2">Email</h3>
                            <input type="email" id="email-input-login" class="bg-input1 text-input1_text p-2 rounded"
                                v-model="email" placeholder="Enter your email" required />
                        </div>
                        <div class="flex flex-col">
                            <h3 for="password-input-login" class="text-text2">Password</h3>
                            <input type="password" id="password-input-login"
                                class="bg-input1 text-input1_text p-2 rounded" v-model="password"
                                placeholder="Enter your password" required />
                        </div>
                        <button class="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                            @click="handleSubmit">
                            Login
                        </button>
                    </div>
                </div>

                <div v-else>
                    <div class="flex flex-col gap-6">
                        <div class="flex flex-col">
                            <h3 for="email-input-register" class="text-text2">Email</h3>
                            <input type="email" id="email-input-register" class="bg-input1 text-input1_text p-2 rounded"
                                v-model="email" placeholder="Enter your email" required />
                        </div>
                        <div class="flex flex-col">
                            <h3 for="password-input-register" class="text-text2">Password</h3>
                            <input type="password" id="password-input-register"
                                class="bg-input1 text-input1_text p-2 rounded" v-model="password"
                                placeholder="Enter your password" required />
                        </div>
                        <div class="flex flex-col">
                            <h3 for="confirm-password-input-register" class="text-text2">Confirm Password</h3>
                            <input type="password" id="confirm-password-input-register"
                                class="bg-input1 text-input1_text p-2 rounded" v-model="confirmPassword"
                                placeholder="Confirm your password" required />
                        </div>
                        <button class="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                            @click="handleSubmit">
                            Register
                        </button>
                    </div>
                </div>


                <p class="text-center text-gray-600">
                    {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
                    <button class="text-blue-600 underline hover:text-blue-800 transition" @click="toggleForm">
                        {{ isLogin ? 'Register' : 'Login' }}
                    </button>
                </p>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import ImgAuth from '../components/img_svg/imgAuth.vue';

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

const handleSubmit = () => {
    if (!isLogin.value && password.value !== confirmPassword.value) {
        alert("Passwords don't match!");
        return;
    }
    alert(isLogin.value ? 'Logged in successfully!' : 'Registered successfully!');
    // Implement your authentication or registration logic here.
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
