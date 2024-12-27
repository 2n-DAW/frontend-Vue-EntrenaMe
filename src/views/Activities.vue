<template>
    <FiltersActivities 
        :filters_URL="filters_selected"
        @filters="filters_Selected" 
    />
    
    <ActivitiesList 
        :activities="activities"
    />
    
    <Pagination 
        :key="activities_count" 
        :total_items="activities_count" 
        :current_page="current_page" 
        :items_page="2" 
        @update:current_page_output="current_page_output = $event" 
    />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import FiltersActivities from '../components/filters/FiltersActivities.vue';
import ActivitiesList from '../components/lists/ActivitiesList.vue';
import { ActivityService } from '../services/activity.service';
import { Activity } from '../shared/interfaces/entities/Activity.interfaceinterface';
import Pagination from '../components/pagination/Pagination.vue';
import { FilterActivity } from '../shared/interfaces/fiters/FilterActivity.interface';

const router = useRouter();

const activities = ref<Activity[]>([]);
const activities_count = ref(10);
const currentFilters = ref<Partial<FilterActivity>>({});
const current_page = ref(1);
const current_page_output = ref(1);
const filters_selected = ref({});




const filters_Selected = async (filters: Partial<FilterActivity>):Promise<void> => {
    currentFilters.value = filters;
    console.log("Filters Selected:", currentFilters.value);
    let filters_btoa = "";
    if (filters.slot_hour !== "" || filters.week_day !== "" || filters.n_activity !== "" || filters.sport !== "") {
        filters_btoa = btoa(JSON.stringify(filters));
        router.push({ name: 'activities', query: { filtros: filters_btoa } });
    } else {
        router.push({ name: 'activities' });
    }
    await getActivities(currentFilters.value);
};

const getActivities = async (filters: Partial<FilterActivity>):Promise<void> => {
    const resp = await ActivityService.getAllFiltered(filters);
    if (resp) {
        activities.value = resp.activities; 
        activities_count.value = resp.activities_count;
    }
};

watch(current_page_output, () => {
    current_page.value = current_page_output.value;    
    currentFilters.value.offset = (current_page.value - 1);
    currentFilters.value.limit = 2;
    getActivities(currentFilters.value);
});


const filters_URL = (): void => {
    const filters = router.currentRoute.value.query.filtros;
    console.log("Filters URL:", filters);
    if (filters) {
        const resp_filters = JSON.parse(atob(filters as string));
        if (resp_filters.slot_hour !== "") {
            currentFilters.value.slot_hour = resp_filters.slot_hour;
        }
        if (resp_filters.week_day !== "") {
            currentFilters.value.week_day = resp_filters.week_day;
        }
        if (resp_filters.n_activity !== "") {
            currentFilters.value.n_activity = resp_filters.n_activity;
        }
        if (resp_filters.sport !== "") {
            currentFilters.value.sport = resp_filters.sport;
        }
        
    }
    filters_selected.value = currentFilters.value;
    getActivities(currentFilters.value);
};









onMounted(() => {
    filters_URL();
});


</script>
