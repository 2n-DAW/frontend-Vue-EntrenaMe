<script setup lang="ts">
import { ref } from 'vue';
import FiltersInscriptions from '../components/filters/FiltersInscriptions.vue';
import InscriptionsInstructorList from '../components/lists/InscriptionsInstructorList.vue';

const filteredInscriptions = ref([]);

const handleFilteredInscriptions = (filteredData: any) => {
    filteredInscriptions.value = filteredData;
};

</script>

<template>
    <div>
        <FiltersInscriptions @inscriptions="handleFilteredInscriptions" />

        <InscriptionsInstructorList :inscriptions_filtered="filteredInscriptions" />
    </div>
</template>
