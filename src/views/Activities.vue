<template>
    <FiltersActivities />
</template>










<script lang="ts">
import { defineComponent } from 'vue';
import SportList from '../components/lists/SportList.vue';
import FiltersActivities from '../components/filters/FiltersActivities.vue';

export default defineComponent({
    name: 'Activities',
    components: {
        SportList,
        FiltersActivities,
    },
});






</script>
