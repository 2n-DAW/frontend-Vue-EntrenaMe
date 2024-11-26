<template>
    <div class="relative group">
        <img :src="`img/sports/${img_sport}`" alt="Ejemplo 1" class="w-full h-auto rounded-lg shadow-lg">
        <div
            class="absolute inset-0 bg-gray-900 bg-opacity-70 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition duration-300 rounded-lg">
            <h3 class="text-xl font-bold text-white">{{ n_sport }}</h3>
            <p class="text-gray-300 mt-2">{{ n_sport }}</p>
        </div>
    </div>
</template>

<script setup  lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
});

const { img_sport, n_sport} = props.data;

console.log("props", props.data);
</script>