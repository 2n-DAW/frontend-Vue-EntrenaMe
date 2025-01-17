<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import Select from '../selects/select.vue';
import { useStore } from 'vuex';
import { sortHoursOptions } from '../../shared/utils/shortHours.util';
import { sortMonthsOptions } from '../../shared/utils/shortMonths.util';
import { CourtHour } from '../../shared/interfaces/entities/CourtHour.interface';

const emit = defineEmits(['updateFilteredCourtHours', 'updateSelectedValues']);

const store = useStore();

const is_loading = ref(true);

const select_hour_selected = ref('');
const select_day_selected = ref('');
const select_sports_selected = ref('');
const select_month_selected = ref('');

const initializeData = async () => {
    try {
        await store.dispatch('courtHour/initializeCourtsHours');
    } catch (error) {
    } finally {
        is_loading.value = false;
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

    const currentDate = new Date();
    filtered = filtered.filter((court_hour: CourtHour) => {
        const courtDate = new Date(court_hour.year, court_hour.id_month, court_hour.day_number);
        return courtDate >= currentDate && court_hour.available;
    });

    if (select_month_selected.value) {
        filtered = filtered.filter((court_hour: CourtHour) => court_hour.month?.n_month === select_month_selected.value);
    }
    if (select_hour_selected.value) {
        filtered = filtered.filter((court_hour: CourtHour) => court_hour.hour?.slot_hour === select_hour_selected.value);
    }
    if (select_day_selected.value) {
        filtered = filtered.filter((court_hour: CourtHour) => court_hour.day_number === parseInt(select_day_selected.value));
    }
    if (select_sports_selected.value) {
        filtered = filtered.filter((court_hour: CourtHour) => court_hour.court?.n_court === select_sports_selected.value);
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
            filtered.map((court_hour: CourtHour) => ({
                value: String(court_hour.day_number),
                label: String(court_hour.day_number),
            })),
            'value'
        )
    );

    filtered_hours.value = sortHoursOptions(
        removeDuplicates(
            filtered.map((court_hour: CourtHour) => ({
                value: court_hour.hour?.slot_hour,
                label: court_hour.hour?.slot_hour,
            })),
            'value'
        )
    );

    filtered_courts.value = removeDuplicates(
        filtered.map((court_hour: CourtHour) => ({
            value: court_hour.court?.n_court,
            label: court_hour.court?.n_court,
        })),
        'value'
    );

    filtered_months.value = sortMonthsOptions(
        removeDuplicates(
            filtered.map((court_hour: CourtHour) => ({
                value: court_hour.month?.n_month,
                label: court_hour.month?.n_month,
            })),
            'value'
        )
    );

    emit('updateFilteredCourtHours', filtered);

    if (!select_month_selected.value && !select_hour_selected.value && !select_day_selected.value && !select_sports_selected.value) {
        emit('updateFilteredCourtHours', []);
    }
    
    if (!select_month_selected.value || !select_hour_selected.value || !select_day_selected.value || !select_sports_selected.value) {
        emit('updateFilteredCourtHours', []);
    }
    
    
};

const emitSelectedValues = () => {
    const selectedValues = {
        month: select_month_selected.value,
        hour: select_hour_selected.value,
        day: select_day_selected.value,
        sport: select_sports_selected.value,
    };
    emit('updateSelectedValues', selectedValues);
};

const clearFilters = () => {
    select_month_selected.value = '';
    select_hour_selected.value = '';
    select_day_selected.value = '';
    select_sports_selected.value = '';
    emit('updateFilteredCourtHours', []);
    emitSelectedValues();
};

watch(select_hour_selected, () => {
    recalculateFilters();
    emitSelectedValues();
});
watch(select_day_selected, () => {
    recalculateFilters();
    emitSelectedValues();
});
watch(select_sports_selected, () => {
    recalculateFilters();
    emitSelectedValues();
});
watch(select_month_selected, () => {
    recalculateFilters();
    emitSelectedValues();
});
</script>


<template>
    <div v-if="is_loading" class="flex justify-center items-center min-h-screen">
        <p>Cargando datos...</p>
    </div>
    <div v-else class="filters grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 bg-background3">
        <Select label="Pista" :data="filtered_courts" v-model:selected="select_sports_selected" />
        <Select label="Mes" :data="filtered_months" v-model:selected="select_month_selected" />
        <Select label="Día" :data="filtered_days" v-model:selected="select_day_selected" />
        <Select label="Horario" :data="filtered_hours" v-model:selected="select_hour_selected" />
        
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
