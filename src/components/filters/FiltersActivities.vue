<template>
    <div class="filters grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-background3">
        <Selector 
            label="Horario" 
            :data="hours" 
            v-model:selected="selected1"
        />
        <Selector 
            label="Día" 
            :data="days" 
            v-model:selected="selected2"
        />
        <SearchFilters
            label="Buscar" 
            v-model:input_text_search="text_search"
        />
        
        <div class="flex flex-col justify-end">
            <button 
                id="button-delete-filters" 
                class="bg-buton1 hover:bg-button1_hover text-button1_text p-1 rounded transition duration-200"  @click="deleteFilters">
                Borrar filtros
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>

import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import Selector from '../selects/select.vue';
import SearchFilters from '../search/SearchFilters.vue';

const store = useStore();
store.dispatch('activity/initializeActivities');

const hours = computed(() => store.getters['activity/getHours']);
const days = computed(() => store.getters['activity/getDays']);

const selected1 = ref('');
const selected2 = ref('');
const text_search = ref('');

watch(selected1, (new_value) => {
    console.log("selected1", new_value);
});

watch(selected2, (new_value) => {
    console.log("selected2", new_value);
});

watch(text_search, (new_value) => {
    console.log("text_search", new_value);
});

const deleteFilters = () => {
    console.log("deleteFilters", selected1.value, selected2.value, text_search.value);
    selected1.value = '';
    selected2.value = '';
    text_search.value = '';
};


</script>

<style scoped>
.filters{
    padding-left: 15%;
    padding-right: 15%;
    padding-top: 35px;
}
</style>