<template>
    <div class="filters grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 bg-background3">
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
        <Select 
            label="Deporte" 
            :data="sports" 
            v-model:selected="select_sports_selected" 
        />
        <SearchFilters 
            label="Buscar" 
            v-model:input_text_search="text_search" 
        />

        <div class="flex flex-col justify-end">
            <button id="button-delete-filters"
                class="bg-button1 hover:bg-button1_hover text-button1_text p-1 rounded transition duration-200"
                @click="deleteFilters">
                Borrar filtros
            </button>
        </div>

    </div>
</template>

<script lang="ts" setup>

import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import Select from '../selects/select.vue';
import SearchFilters from '../search/SearchFilters.vue';
import { FilterActivity } from '../../shared/interfaces/fiters/FilterActivity.interface';

const store = useStore();


store.dispatch('activity/initializeActivities');

const hours = computed(() => store.getters['activity/getHours']);
const days = computed(() => store.getters['activity/getDays']);
const sports = computed(() => store.getters['activity/getSports']);

const select_hours_selected = ref('');
const select_days_selected = ref('');
const select_sports_selected = ref('');
const text_search = ref('');

const props = defineProps({
    filters_URL: {
        type: Object as () => Partial<FilterActivity>,
        required: false,
    },
});


const deleteFilters = ():void => {
    select_hours_selected.value = '';
    select_days_selected.value = '';
    select_sports_selected.value = '';
    text_search.value = '';

};


const highlight = ():void => {
    if (props.filters_URL) {
        if (props.filters_URL.slot_hour) select_hours_selected.value = props.filters_URL.slot_hour;
        if (props.filters_URL.week_day) select_days_selected.value = props.filters_URL.week_day;
        if (props.filters_URL.n_activity) text_search.value = props.filters_URL.n_activity;
        if (props.filters_URL.sport) select_sports_selected.value = props.filters_URL.sport;
    }

};

watch(props, ():void => {
    highlight();
});



const emit = defineEmits(['filters']);

const emitFilters = ():void => {
    const filters = {
        slot_hour: select_hours_selected.value,
        week_day: select_days_selected.value,
        n_activity: text_search.value,
        sport: select_sports_selected.value,
    };
    emit('filters', filters);
};

watch([select_days_selected, text_search, select_hours_selected, select_sports_selected], () => {
    emitFilters();
});



</script>

<style scoped>
.filters {
    padding-left: 15%;
    padding-right: 15%;
    padding-top: 35px;
    padding-bottom: 15px;
}
</style>