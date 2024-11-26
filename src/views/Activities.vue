<template>
    <FiltersActivities @filters="filters_Selected"/>
</template>





<script setup lang="ts">
import FiltersActivities from '../components/filters/FiltersActivities.vue';
import { useRouter } from 'vue-router';


const router = useRouter();

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