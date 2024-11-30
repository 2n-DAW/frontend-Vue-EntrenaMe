<template>
    <div class=" bg-card_background rounded-lg shadow-md overflow-hidden border flex border-card_border justify-center ">

        <div class="w-2/5">
            <img :src="`img/activities/${activity.img_activity}`" alt="Imagen de la actividad"
                class="w-full h-full object-cover rounded-l-lg" />
        </div>

        <div class="p-6 w-3/5 flex  justify-between justify-center p-8">
            <div class= "flex flex-col justify-center">
                <h2 class="text-3xl font-bold text-card_text_h2 mb-4">{{ activity.n_activity }}</h2>
                <p class="text-card_text2 mb-6">{{ activity.description }}</p>
                <div class="text-sm text-card_text1 mb-6">
                    <p><strong>Día:</strong> {{ activity.week_day }}</p>
                    <p><strong>Hora:</strong> {{ activity.slot_hour }}</p>
                    <p><strong>Deporte:</strong> {{ activity.sport.n_sport }}</p>
                </div>
            </div>

            <div class= "flex flex-col justify-center gap-4">
                
                <div class="flex items-center gap-4">
                    <img :src="`img/users/${activity.instructor.img_user}`" alt="Instructor"
                    class="w-12 h-12 rounded-full object-cover" />
                    <span class="text-lg font-medium text-card_text1 mr-4">{{ activity.instructor.username }}</span>
                </div>

            </div>
        </div>
    </div>
</template>




<script setup lang="ts">
import { defineProps } from 'vue';
const { activity } = defineProps({
    activity: {
        type: Object,
        required: true,
    },
});


</script>