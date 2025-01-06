<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { ActivityService } from '../services/activity.service';
import { Activity } from '../shared/interfaces/entities/Activity.interface';
import store from '../store';
import { computed } from 'vue';

const route = useRoute();
const slug = route.params.slug as string;
const activity = ref<Activity | null>(null);
const isLoading = ref(true);
const errorMessage = ref<string | null>(null);

const fetchActivity = async () => {
    try {
        isLoading.value = true;
        activity.value = await ActivityService.getBySlug(slug);
    } catch (error) {
        errorMessage.value = 'No se pudo cargar la actividad. Por favor, inténtalo de nuevo más tarde.';
    } finally {
        isLoading.value = false;
    }
};

const isLogged = computed(() => store.getters['auth/getIsLogged']);


    onMounted(() => {
        fetchActivity();
    });

    const joinActivity = () => {

    };

</script>

<template>
    <div v-if="isLoading" class="text-center py-10 text-gray-400">
        Cargando actividad...
    </div>
    <div v-else-if="errorMessage" class="text-center py-10 text-red-500">
        {{ errorMessage }}
    </div>
    <div v-else-if="activity"
        class="w-3/5 mt-16 mx-auto bg-background3 border border-gray-700 rounded-lg shadow-lg overflow-hidden">

        <div class="w-full h-64 bg-background3 flex items-center justify-center ">
            <img :src="`../public/img/activities/${activity.img_activity}`" alt="Imagen de la actividad"
                class="w-full h-full object-contain rounded-lg" />
        </div>

        <div class="px-16 py-8">

            <div class="mb-16 text-center">
                <h1 class="text-3xl font-bold text-white">{{ activity.n_activity }}</h1>
                <p class="text-xl text-gray-400">Deporte: {{ activity.sport!.n_sport }}</p>
                <p class="text-gray-400">{{ activity.description }}</p>
            </div>


            <div class="flex gap-4 mb-8">

                <div class="flex flex-col items-center justify-center mb-4 w-1/3 text-center">
                    <router-link :to="`/profile/${activity.instructor!.username}`" class="flex flex-col items-center">
                        <img :src="`../public/img/users/${activity.instructor!.img_user}`" alt="Imagen del instructor"
                            class="w-16 h-16 rounded-full border border-gray-600 hover:scale-105 transition-transform" />
                        <p class="text-lg font-semibold text-color1 mt-2 hover:underline">
                            {{ activity.instructor!.username }}
                        </p>
                    </router-link>
                </div>



                <div class="w-1/3">
                    <div>
                        <span class="block text-sm text-gray-400">Día</span>
                        <p class="text-lg font-semibold text-white">{{ activity.week_day }}</p>
                    </div>
                    <div>
                        <span class="block text-sm text-gray-400">Horario</span>
                        <p class="text-lg font-semibold text-white">{{ activity.slot_hour }}</p>
                    </div>

                </div>
                <div class="w-1/3">
                    <div>
                        <span class="block text-sm text-gray-400">Plazas Totales</span>
                        <p class="text-lg font-semibold text-white">{{ activity.spots }}</p>
                    </div>
                    <div>
                        <span class="block text-sm text-gray-400">Plazas Disponibles</span>
                        <p class="text-lg font-semibold text-white">{{ activity.spots_available }}</p>
                    </div>
                </div>


            </div>

            <div v-if="isLogged" class="flex justify-end">
                <button @click="joinActivity"
                    class="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition">
                    Apuntarse
                </button>
            </div>
        </div>
    </div>
    <div v-else class="text-center py-10 text-gray-400">
        No se encontró la actividad.
    </div>
</template>
