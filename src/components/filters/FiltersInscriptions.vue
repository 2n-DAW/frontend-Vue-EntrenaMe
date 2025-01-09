<script setup lang="ts">
import { useStore } from 'vuex';
import Select from '../selects/select.vue';
import { computed, ref, watch, defineEmits } from 'vue';
import { Activity } from '../../shared/interfaces/entities/Activity.interface';

const store = useStore();
const is_loading = ref(true);

const emit = defineEmits(['inscriptions']);

const activities = computed(() => store.getters['activity/allActivities'] || []);
const inscriptions = computed(() => store.getters['inscription/allInscriptions'] || []);

const select_activity_selected = ref('');

const inscriptions_filtered = computed(() => 
    inscriptions.value.filter((inscription: any) => 
        inscription.id_activity === Number(select_activity_selected.value) &&
        inscription.state === 2 
    )
);

const activities_options = computed(() => activities.value.map((activity: Activity) => ({
    value: String(activity.id_activity), 
    label: activity.n_activity,
})));

watch(inscriptions_filtered, () => {
    console.log('Filtrar inscriptions:', inscriptions_filtered.value);
    emit('inscriptions', inscriptions_filtered.value);
});

const fetchActivities = async () => {
    try {
        await store.dispatch('activity/initializeActivities');
    } catch (error) {
        console.error('Error fetching activities:', error);
    } finally {
        is_loading.value = false;
    }
};

const fetchInscriptions = async () => {
    try {
        await store.dispatch('inscription/initializeInscriptions');
    } catch (error) {
        console.error('Error fetching inscriptions:', error);
    } finally {
        is_loading.value = false;
    }
};

fetchActivities();
fetchInscriptions();

const clearFilters = () => {
    select_activity_selected.value = '';
};
</script>

<template>
    <div v-if="is_loading" class="flex justify-center items-center min-h-screen">
        <p>Cargando datos...</p>
    </div>
    <div v-else class="filters grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 bg-background3">
        <Select label="Actividades" :data="activities_options" v-model:selected="select_activity_selected" />
        
        <div class="flex items-end justify-center w-full mt-auto">
            <button id="button-delete-filters"
                class="bg-button1 hover:bg-button1_hover text-button1_text p-1 rounded transition duration-200 h-8 w-full"
                @click="clearFilters">
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
