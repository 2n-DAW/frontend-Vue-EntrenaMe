<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import Select from '../selects/select.vue';
import { useStore } from 'vuex';
import { sortHoursOptions } from '../../shared/utils/shortHours.util';
import { sortMonthsOptions } from '../../shared/utils/shortMonths.util';

const store = useStore();

const isLoading = ref(true);

const select_hour_selected = ref('');
const select_day_selected = ref('');
const select_sports_selected = ref('');
const select_month_selected = ref('');

const initializeData = async () => {
    try {
        console.log('Iniciando la carga de datos...');
        await store.dispatch('courtHour/initializeCourtsHours');
        console.log('Datos cargados correctamente');
    } catch (error) {
        console.error('Error al cargar los datos', error);
    } finally {
        isLoading.value = false;
    }
};

initializeData();

const initialDays = computed(() => store.getters['courtHour/allDays'] || []);
const initialHours = computed(() => store.getters['courtHour/allHours'] || []);
const initialCourts = computed(() => store.getters['courtHour/allCourts'] || []);
const initialMonths = computed(() => store.getters['courtHour/allMonths'] || []); 

const filtered_days = ref<any>([]);
const filtered_hours = ref<any>([]);
const filtered_courts = ref<any>([]);
const filtered_months = ref<any>([]); 

watch(() => [initialDays.value, initialHours.value, initialCourts.value, initialMonths.value],
    ([days, hours, courts, months]) => {
        filtered_days.value = [...days];
        filtered_hours.value = [...hours];
        filtered_courts.value = [...courts];
        filtered_months.value = [...months];
    },
    { immediate: true }
);

const recalculateFilters = () => {
    const allCourtHours = store.getters['courtHour/allCourtHours'] || [];

    let filtered = allCourtHours;

    if (select_month_selected.value) {
        filtered = filtered.filter((court_hour: any) => court_hour.month?.n_month === select_month_selected.value);
    }
    if (select_hour_selected.value) {
        filtered = filtered.filter((court_hour: any) => court_hour.hour?.slot_hour === select_hour_selected.value);
    }
    if (select_day_selected.value) {
        filtered = filtered.filter((court_hour: any) => court_hour.day_number === parseInt(select_day_selected.value));
    }
    if (select_sports_selected.value) {
        filtered = filtered.filter((court_hour: any) => court_hour.court?.n_court === select_sports_selected.value);
    }

    const removeDuplicates = (items: any[], key: string) => {
        const map = new Map();
        items.forEach((item) => map.set(item[key], item));
        return Array.from(map.values());
    };

    const sortDays = (options: any[]) => {
        return options.sort((a, b) => parseInt(a.value) - parseInt(b.value));
    };

    filtered_days.value = sortDays(
        removeDuplicates(
            filtered.map((court_hour: any) => ({
                value: String(court_hour.day_number),
                label: String(court_hour.day_number),
            })),
            'value'
        )
    );

    filtered_hours.value = sortHoursOptions(
        removeDuplicates(
            filtered.map((court_hour: any) => ({
                value: court_hour.hour?.slot_hour,
                label: court_hour.hour?.slot_hour,
            })),
            'value'
        )
    );

    filtered_courts.value = removeDuplicates(
        filtered.map((court_hour: any) => ({
            value: court_hour.court?.n_court,
            label: court_hour.court?.n_court,
        })),
        'value'
    );

    filtered_months.value = sortMonthsOptions(
        removeDuplicates(
            filtered.map((court_hour: any) => ({
                value: court_hour.month?.n_month,
                label: court_hour.month?.n_month,
            })),
            'value'
        )
    );
};





watch(select_hour_selected, recalculateFilters);
watch(select_day_selected, recalculateFilters);
watch(select_sports_selected, recalculateFilters);
watch(select_month_selected, recalculateFilters);

</script>

<template>
    <div v-if="isLoading" class="flex justify-center items-center min-h-screen">
        <p>Cargando datos...</p>
    </div>
    <div v-else class="filters grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-background3">
        <Select label="Mes" :data="filtered_months" v-model:selected="select_month_selected" />
        <Select label="Horario" :data="filtered_hours" v-model:selected="select_hour_selected" />
        <Select label="Día" :data="filtered_days" v-model:selected="select_day_selected" />
        <Select label="Deporte" :data="filtered_courts" v-model:selected="select_sports_selected" />
        <div class="flex flex-col justify-end">
            <button id="button-delete-filters"
                class="bg-button1 hover:bg-button1_hover text-button1_text p-1 rounded transition duration-200"
                @click="() => {
                    select_month_selected = '';
                    select_hour_selected = '';
                    select_day_selected = '';
                    select_sports_selected = '';
                    recalculateFilters();
                }">
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
