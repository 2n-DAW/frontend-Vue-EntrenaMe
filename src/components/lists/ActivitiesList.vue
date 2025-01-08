<template>
    <section class="flex justify-center">
        <div v-if="activities.length >0" class = "flex flex-col gap-4 mt-8 w-3/5">
            <ActivityCard v-for="activity in activities" :key="activity.id_activity" :activity="activity" />
        </div>
        <div v-else class="flex justify-center items-center h-96 w-full">
            <p class="text-2xl text-gray-500">No hay actividades con estas características</p>
        </div>

    </section>
</template>

<script lang="ts" setup>

import { Activity } from '../../shared/interfaces/entities/Activity.interface';
import ActivityCard from '../cards/ActivityCard.vue';
import { defineProps } from 'vue';


const { activities } = defineProps({
    activities: {
        type: Array as () => Activity[],
        required: true,
    },
});

</script>
