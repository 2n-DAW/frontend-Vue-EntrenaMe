<template>
    <section class="flex justify-center">
        <div class = "flex flex-col gap-4 mt-8 w-3/5">
            <ActivityCard v-for="activity in activities" :key="activity.id_activity" :activity="activity" />
        </div>

    </section>
</template>

<script lang="ts" setup>
import { Activity } from '../../shared/interfaces/Activity.interface';
import ActivityCard from '../cards/ActivityCard.vue';
import { defineProps } from 'vue';


const { activities } = defineProps({
    activities: {
        type: Array as () => Activity[],
        required: true,
    },
});

</script>
