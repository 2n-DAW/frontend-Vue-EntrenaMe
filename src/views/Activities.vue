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
    console.table(filters);
    let filters_btoa = "";
    if(filters.hour!=="" || filters.day!=="" || filters.text!==""){
        filters_btoa = btoa(JSON.stringify(filters));
        router.push({ name: 'activities', query: { filtros: filters_btoa } });
    }
    else{
        router.push({ name: 'activities' });
    }
};

const getActivities = async () => {
    const resp = await ActivityService.getAllFiltered({});
    if(resp){
        activities = resp.activities;
        activities_count = resp.activities_count;
    }
};

onMounted(getActivities);


</script>