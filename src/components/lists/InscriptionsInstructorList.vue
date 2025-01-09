<script setup lang="ts">

import InscriptionCard from '../cards/InscriptionCard.vue';

const props = defineProps<{
    inscriptions_filtered: any;
}>();

</script>


<template>
    <div class="w-full flex justify-center items-center">
        <div class="w-full md:w-1/2">
            <h1 class="text-3xl font-bold text-center mb-6">Inscripciones</h1>
            <div class="flex flex-col gap-4">
                <div v-if="props.inscriptions_filtered.length === 0" class="text-center text-text1">
                    No hay nadie inscrito en esta actividad
                </div>
                <div v-else>
                    <div v-for="inscription in props.inscriptions_filtered" :key="inscription.id_inscription" class="mb-4">
                        <InscriptionCard :inscription="inscription" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>