<template>
    <FiltersActivities @filters="filtros" />
</template>





<script setup lang="ts">
import { watch } from 'vue';
import SportList from '../components/lists/SportList.vue';
import FiltersActivities from '../components/filters/FiltersActivities.vue';

// Props
defineProps({
    filtros: {
        type: Object,
        required: true
    }
});

// Emit (si es necesario)
defineEmits(['filters']);

// Función para manejar filtros
const filtros = async (filters: any) => {
    console.log("filtros", filters);
};

// Observador (watch)
watch(filtros, (new_value) => {
    console.log("filtros", new_value);
});
</script>