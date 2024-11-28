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
    
    
    
    
    
</template>





<script setup lang="ts">
import FiltersActivities from '../components/filters/FiltersActivities.vue';
import Pagination from '../components/pagination/Pagination.vue';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { Activity } from '../shared/interfaces/Activity.interface';
import { ActivityService } from '../services/activity.service';

const router = useRouter();

let activities: Activity[] = [];
let activities_count = 0;

defineEmits(['filters']);

const filters_Selected = async (filters: any) => {
    let filters_btoa = "";
    if(filters.slot_hour!=="" || filters.week_day!=="" || filters.week_day!==""){
        filters_btoa = btoa(JSON.stringify(filters));
        router.push({ name: 'activities', query: { filtros: filters_btoa } });
    }
    else{
        router.push({ name: 'activities' });
    }
    console.log(filters);
    getActivities(filters);
};

const getActivities = async (filters:any) => {
    const resp = await ActivityService.getAllFiltered(filters);
    if(resp){
        activities = resp.activities;
        activities_count = resp.activities_count;
        console.log(activities);
    }
};

onMounted(getActivities);


</script>