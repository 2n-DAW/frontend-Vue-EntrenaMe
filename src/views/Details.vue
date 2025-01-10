<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { ActivityService } from '../services/activity.service';
import { useStore } from 'vuex';
import { Activity } from '../shared/interfaces/entities/Activity.interface';
import { Inscription } from '../shared/interfaces/entities/Inscription.interface';
import CommentsList from '../components/lists/CommentsList.vue';

import Noty from 'noty';
import 'noty/lib/noty.css';
import 'noty/lib/themes/mint.css';


const route = useRoute();
const slug = route.params.slug as string;
const store = useStore();

const activity = ref<Activity | null>(null);
const is_loading = ref(true);
const error_activity = ref<string | null>(null);
const is_registered = ref(false);

const inscriptions = computed(() => store.getters['inscription/allUserInscriptions']);
const isLogged = computed(() => store.getters['auth/getIsLogged']);

const fetchActivity = async () => {
    try {
        is_loading.value = true;
        activity.value = await ActivityService.getBySlug(slug);
    } catch (error) {
        error_activity.value = 'No se pudo cargar la actividad. Por favor, inténtalo de nuevo más tarde.';
    } finally {
        is_loading.value = false;
    }
};

const fetchInscriptions = async () => {
    try {
        await store.dispatch('inscription/initializeInscriptionsUser');
    } catch (error) {
        console.error('Error inscripciones:', error);
    }
};

const checkIfRegistered = () => {
    if (activity.value?.id_activity && inscriptions.value.length > 0) {
        is_registered.value = inscriptions.value.some(
            (inscription: Inscription) => inscription.id_activity === activity.value!.id_activity
        );
    }
    console.log('is_registered:', is_registered.value);
};

onMounted(async () => {
    await fetchActivity();
    await fetchInscriptions();
    checkIfRegistered();
});

const suscribeActivity = async () => {
    try {
        if (activity.value?.id_activity) {
            await store.dispatch('inscription/addInscription', activity.value.id_activity);
            activity.value = await ActivityService.getBySlug(slug);
            await fetchInscriptions();
            checkIfRegistered();

            new Noty({
                type: 'success',
                text: 'Inscrito',
                timeout: 1000,
                progressBar: true,
            }).show();


        }
    } catch (error) {
        console.error('Error al unirse a la actividad:', error);
    }
};

const unsuscribeActivity = async () => {
    try {
        const inscription = inscriptions.value.find(
            (inscription: Inscription) => inscription.id_activity === activity.value!.id_activity
        );

        if (inscription?.slug_inscription) {
            await store.dispatch('inscription/deleteInscription', inscription.slug_inscription);
            activity.value = await ActivityService.getBySlug(slug);
            await fetchInscriptions();
            is_registered.value = false;
            
            
            new Noty({
                type: 'success',
                text: 'Borrado',
                timeout: 1000,
                progressBar: true,
            }).show();
            
        }

    } catch (error) {
        console.error('Error actividad:', error);
    }

};






</script>

<template>
    <div v-if="is_loading" class="text-center py-10 text-gray-400">
        Cargando actividad...
    </div>
    <div v-else-if="error_activity" class="text-center py-10 text-red-500">
        {{ error_activity }}
    </div>
    <div v-else-if="activity"
        class="w-3/5 mt-16 mx-auto bg-background3 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
        <div class="w-full h-64 bg-background3 flex items-center justify-center">
            <img :src="`/img/activities/${activity.img_activity}`" alt="Imagen de la actividad"
                class="w-full h-full object-contain rounded-lg" />
        </div>
        <div class="px-16 py-8">
            <div class="mb-16 text-center">
                <h1 class="text-3xl font-bold text-white">{{ activity.n_activity }}</h1>
                <p class="text-xl text-gray-400">Deporte: {{ activity.sport?.n_sport }}</p>
                <p class="text-gray-400">{{ activity.description }}</p>
            </div>
            <div class="flex gap-4 mb-8">
                <div class="flex flex-col items-center justify-center mb-4 w-1/3 text-center">
                    <router-link v-if="activity.instructor" :to="`/profile/${activity.instructor.username}`"
                        class="flex flex-col items-center">
                        <img :src="`/img/users/${activity.instructor.img_user}`" alt="Imagen del instructor"
                            class="w-16 h-16 rounded-full border border-gray-600 hover:scale-105 transition-transform" />
                        <p class="text-lg font-semibold text-color1 mt-2 hover:underline">
                            {{ activity.instructor.username }}
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
            <div v-if="isLogged && !is_registered" class="flex justify-end">
                <button @click="suscribeActivity"
                    class="bg-color1 text-white font-semibold py-2 px-4 rounded-lg hover:bg-color1_hover transition">
                    Apuntarse
                </button>
            </div>
            <div v-if="isLogged && is_registered" class="flex justify-end">
                <button @click="unsuscribeActivity"
                    class="border border-color1 bg-background3 text-white font-semibold py-2 px-4 rounded-lg hover:bg-color1_hover transition">
                    Borrarse
                </button>
            </div>
        </div>
    </div>
    <div v-else class="text-center py-10 text-gray-400">
        No se encontró la actividad.
    </div>
    <div v-if="activity?.id_activity">
        <CommentsList :id_activity="activity.id_activity" />
    </div>
</template>
