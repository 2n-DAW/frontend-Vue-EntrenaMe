<script setup lang="ts">
import { ref } from 'vue';
import Select from '../selects/select.vue';
import { useStore } from 'vuex';

const store = useStore();


const select_hour_selected = ref('');
const select_day_selected = ref('');
const select_sports_selected = ref('');

const data = [
    { value: "hola", label: "dsfsdfsdf" },
    { value: "hola", label: "dsfsdfsdf" },
    ]
    
    store.dispatch('courtHour/initializeCourtsHours');

</script>




<template>
    <div class="filters grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-background3">
        <Select 
            label="Horario" 
            :data="data" 
            v-model:selected="select_hour_selected"
        />
        <Select 
            label="Día" 
            :data="data" 
            v-model:selected="select_day_selected"
        />
        <Select 
            label="Deporte" 
            :data="data" 
            v-model:selected="select_sports_selected" 
        />

        <div class="flex flex-col justify-end">
            <button id="button-delete-filters"
                class="bg-button1 hover:bg-button1_hover text-button1_text p-1 rounded transition duration-200"
                >
                Borrar filtros
            </button>
        </div>

    </div>
</template>

<style scoped>
.filters {
    padding-left: 15%;
    padding-right: 15%;
    padding-top: 35px;
    padding-bottom: 15px;
}
</style>