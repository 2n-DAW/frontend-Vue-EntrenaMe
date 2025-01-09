<script setup lang="ts">
import { ref } from 'vue';
import FiltersCourts from '../components/filters/FiltersCourts.vue';
import MapCourts from '../components/Maps/MapCourts.vue';

const filteredCourtHours = ref([]);
const filtersAplicated = ref({});

const handleFilteredCourtHours = (filteredData: any) => {
    filteredCourtHours.value = filteredData;
};

const handleFiltersAplicated = (filters: any) => {
    filtersAplicated.value = filters;
};




</script>

<template>
    <div>
        <FiltersCourts @updateFilteredCourtHours="handleFilteredCourtHours" @updateSelectedValues="handleFiltersAplicated"/>

        <MapCourts :filteredCourtHours="filteredCourtHours" :filtersCourts="filtersAplicated"/>
        
    </div>
</template>
