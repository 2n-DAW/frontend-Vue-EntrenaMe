<script setup lang="ts">
import TextInputForm from '../text_input/TextInputForm.vue';
import { ref, watch } from 'vue';

const email_data = ref('');

watch(email_data, (new_value) => {
    console.log(new_value);
});
</script>




<template>

    <div class="flex flex-col gap-6">
        <TextInputForm 
            label="Email" 
            type="email" 
            id="email-input-login" 
            v-model:data="email_data" 
            placeholder="Enter your email" 
        />
        
        <!-- <button class="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" @click="handleSubmit">
            Login
        </button> -->
        
    </div>



</template>
