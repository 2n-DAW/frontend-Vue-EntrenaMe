<template>
    <div class="filters grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-background3">
        <Select
            label="Horario" 
            :data="hours" 
            v-model:selected="select_hours_selected"
        />
        <Select
            label="Día" 
            :data="days" 
            v-model:selected="select_days_selected"
        />
        <SearchFilters
            label="Buscar" 
            v-model:input_text_search="text_search"
        />
        
        <div class="flex flex-col justify-end">
            <button 
                id="button-delete-filters" 
                class="bg-button1 hover:bg-button1_hover text-button1_text p-1 rounded transition duration-200"  @click="deleteFilters">
                Borrar filtros
            </button>
        </div>
        
    </div>
</template>

<script lang="ts" setup>

import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import Select from '../selects/Select.vue';
import SearchFilters from '../search/SearchFilters.vue';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();


store.dispatch('activity/initializeActivities');

const hours = computed(() => store.getters['activity/getHours']);
const days = computed(() => store.getters['activity/getDays']);

const select_hours_selected = ref('');
const select_days_selected = ref('');
const text_search = ref('');

const deleteFilters = () => {
    select_hours_selected.value = '';
    select_days_selected.value = '';
    text_search.value = '';
};



const emit = defineEmits(['filters']);

const emitFilters = () => {
    const filters = {
        slot_hour: select_hours_selected.value,
        week_day: select_days_selected.value,
        n_activity: text_search.value,
    };
    emit('filters', filters);
};

watch([select_days_selected, text_search, select_hours_selected], () => {
    emitFilters();
});


const filters_URL = ():void => {
    const filters = router.currentRoute.value.query.filtros;
    if(filters){

        
        const resp_filters = JSON.parse(atob(filters as string));
        if(resp_filters.slot_hour!==""){
            select_hours_selected.value = resp_filters.slot_hour;
        }
        if(resp_filters.week_day!==""){
            select_days_selected.value = resp_filters.week_day;
        }
        if(resp_filters.n_activity!==""){
            text_search.value = resp_filters.n_activity;
        }
    }
};

onMounted(filters_URL);


</script>

<style scoped>
.filters{
    padding-left: 15%;
    padding-right: 15%;
    padding-top: 35px;
    padding-bottom: 15px;
}
</style>