<script setup lang="ts">
import { ref } from 'vue';
import FiltersCourts from '../components/filters/FiltersCourts.vue';
import MapCourts from '../components/Maps/MapCourts.vue';

const filteredCourtHours = ref([]);

const handleFilteredCourtHours = (filteredData: any) => {
    filteredCourtHours.value = filteredData;
};
</script>

<template>
    <div>
        <FiltersCourts @updateFilteredCourtHours="handleFilteredCourtHours" />

        <MapCourts :filteredCourtHours="filteredCourtHours" />
    </div>
</template>
