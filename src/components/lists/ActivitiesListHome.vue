<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import ActivityCard from '../cards/ActivityCard.vue';
import { Activity } from '../../shared/interfaces/entities/Activity.interface';
import { ActivityService } from '../../services/activity.service';

const activities_array = ref<Activity[]>([]);
const loading = ref(false); 
const limit = 1; 
let offset = 0;
const sport = 'Deportes Senior';

const fetchActivities = async () => {
    if (loading.value) return; 
    loading.value = true;

    try {
        const filters = { limit, offset, sport };
        const response = await ActivityService.getAllFiltered(filters);

        if (response.activities.length > 0) {
            activities_array.value = [...activities_array.value, ...response.activities];
            offset += 1; 
        }
    } catch (error) {
        console.error('Error al obtener las actividades:', error);
    } finally {
        loading.value = false;
    }
};

const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
        fetchActivities();
    }
};

onMounted(() => {
    fetchActivities(); 
    window.addEventListener('scroll', handleScroll); 
});

</script>





<template>
    <section class="p-4">
        <h2 class="flex text-2xl font-bold text-deep-orange-600 mb-4 justify-center">Actividades para la tercera edad</h2>
        <div class="flex flex-col gap-4 mt-8 w-4/5 mx-auto">
            <ActivityCard v-for="activity in activities_array" :key="activity.id_activity" :activity="activity" />
        </div>
        <div v-if="loading" class="text-center mt-4">Cargando más actividades...</div>
    </section>
</template>

