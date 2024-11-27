<template>
    <FiltersActivities 
    @filters="filters_Selected" 
    />
    
    
    <Pagination 
        :total_items="total_items" 
        :current_page="current_page" 
        :items_page="3" 
        @update:currentPage="currentPage = $event" 
    />
    
    
    
    
    
    
    
</template>





<script setup lang="ts">
import { useStore } from 'vuex';
import FiltersActivities from '../components/filters/FiltersActivities.vue';
import Pagination from '../components/pagination/Pagination.vue';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const router = useRouter();
const store = useStore();

const total_items = computed(() => store.getters['activity/getTotalItems']);

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


</script>