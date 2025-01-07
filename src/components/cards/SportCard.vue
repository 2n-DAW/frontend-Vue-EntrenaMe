<template>
    <div class="relative group cursor-pointer" @click="handleCardClick">
        <img :src="`img/sports/${img_sport}`" alt="Imagen del deporte" class="w-full h-auto rounded-lg shadow-lg">
        <div
            class="absolute inset-0 bg-gray-900 bg-opacity-70 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition duration-300 rounded-lg">
            <h3 class="text-xl font-bold text-white">{{ n_sport }}</h3>
            <p class="text-gray-300 mt-2">Explora actividades relacionadas</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { defineProps } from 'vue';

const router = useRouter();

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
});

const { img_sport, n_sport } = props.data;

const handleCardClick = () => {
    const filters = { sport: n_sport };
    const filters_btoa = btoa(JSON.stringify(filters));
    router.push({ name: 'activities', query: { filtros: filters_btoa } });
};
</script>
