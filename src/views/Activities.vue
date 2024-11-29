<template>
    <FiltersActivities 
    @filters="filters_Selected" 
    />
    
    <!-- <Pagination 
        :total_items="activities_count" 
        :current_page="current_page" 
        :items_page="3" 
        @update:currentPage="currentPage = $event" 
    /> -->
    
    <ActivitiesList 
        :activities="activities"
    />
    
    
</template>





<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import FiltersActivities from '../components/filters/FiltersActivities.vue';
import ActivitiesList from '../components/lists/ActivitiesList.vue';
import { ActivityService } from '../services/activity.service';
import { Activity } from '../shared/interfaces/Activity.interface';

const router = useRouter();

const activities = ref<Activity[]>([]);
const activities_count = ref(0);
const currentFilters = ref({});

const filters_Selected = async (filters: any) => {
    currentFilters.value = filters;
    let filters_btoa = "";
    if (filters.slot_hour !== "" || filters.week_day !== "") {
        filters_btoa = btoa(JSON.stringify(filters));
        router.push({ name: 'activities', query: { filtros: filters_btoa } });
    } else {
        router.push({ name: 'activities' });
    }
    console.log(filters);
    await getActivities(currentFilters.value);
};

const getActivities = async (filters: any = {}) => {
    console.log("Filters sent to API:", filters);
    const resp = await ActivityService.getAllFiltered(filters);
    if (resp) {
        activities.value = resp.activities; 
        activities_count.value = resp.activities_count;
        console.log(activities.value);
    }
};

onMounted(() => getActivities());

</script>
