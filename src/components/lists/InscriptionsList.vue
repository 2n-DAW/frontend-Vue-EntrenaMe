<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import InscriptionCard from '../cards/InscriptionCard.vue';

const store = useStore();

const inscriptions = computed(() => store.getters['inscription/allUserInscriptions']);

const initializeinscriptions = async () => {
    try {
        await store.dispatch('inscription/initializeInscriptionsUser');
        console.log('Inscripciones inicializadas:', inscriptions.value);
    } catch (error) {
        console.error('Error al obtener las reservas:', error);
    }
};

initializeinscriptions();

</script>


<template>
    <div class="w-full flex justify-center items-center">
        <div class="w-full md:w-1/2">
            <h1 class="text-3xl font-bold text-center mb-6">Inscripciones</h1>
            <div class="flex flex-col gap-4">
                <div v-if="inscriptions.length === 0" class="text-center text-text1">
                    No estas inscrito en ninguna actividad
                </div>
                <div v-else>
                    <div v-for="inscription in inscriptions" :key="inscription.id_inscription" class="mb-4">
                        <InscriptionCard :inscription="inscription" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>