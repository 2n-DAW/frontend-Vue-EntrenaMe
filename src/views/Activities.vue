<template>
    <FiltersActivities 
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
import { Activity } from '../shared/interfaces/Activity.interface';
import Pagination from '../components/pagination/Pagination.vue';

const router = useRouter();

const activities = ref<Activity[]>([]);
const activities_count = ref(10);
const currentFilters = ref<{ offset?: number; limit?: number }>({});
const current_page = ref(1);
const current_page_output = ref(1);

const filters_Selected = async (filters: any) => {
    currentFilters.value = filters;
    let filters_btoa = "";
    if (filters.slot_hour !== "" || filters.week_day !== "" || filters.n_activity !== "") {
        filters_btoa = btoa(JSON.stringify(filters));
        router.push({ name: 'activities', query: { filtros: filters_btoa } });
    } else {
        router.push({ name: 'activities' });
    }
    console.log(currentFilters.value);
    await getActivities(currentFilters.value);
};

const getActivities = async (filters: any = {}) => {
    const resp = await ActivityService.getAllFiltered(filters);
    if (resp) {
        activities.value = resp.activities; 
        activities_count.value = resp.activities_count;
    }
};

watch(current_page_output, () => {
    current_page.value = current_page_output.value;
    console.log("Current page:", current_page.value);
    
    currentFilters.value.offset = (current_page.value - 1);
    currentFilters.value.limit = 2;
    console.log("Current page output:", currentFilters.value);
    getActivities(currentFilters.value);
});

onMounted(() => getActivities());

</script>
