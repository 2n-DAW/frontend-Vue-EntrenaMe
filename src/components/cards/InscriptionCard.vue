<script setup lang="ts">
import { defineProps } from 'vue';
import { ref } from 'vue';
import store from '../../store';
import { Inscription } from '../../shared/interfaces/entities/Inscription.interface';


const props = defineProps({
    inscription: {
        type: Object as () => Inscription,
        required: true,
    },
});

const inscription = ref<Inscription>(props.inscription);

const deleteInscription = () => {
    console.log('Borrando inscripción:', inscription.value.slug_inscription);
    store.dispatch('inscription/deleteInscription', inscription.value.slug_inscription);
};
</script>

<template>
    <div class="flex gap-4 bg-background3 p-4 rounded-lg shadow-lg justify-center items-center">

        <div class="flex flex-col items-center mb-4 w-1/5">
            <img :src="`../public/img/users/${inscription.user!.img_user}`" alt="Imagen de usuario"
                class="w-20 h-20 rounded-full border border-gray-600 mb-2" />
            <p class="text-lg font-semibold text-color1">{{ inscription.user!.username }}</p>
        </div>

        <div class="w-3/5">
            <div class="flex w-full">

                <div class="flex flex-col gap-4 w-1/2">
                    <div>
                        <span class="block text-gray-400 text-sm font-medium">ID Inscripción</span>
                        <p class="text-lg font-semibold text-white">{{ inscription.id_inscription }}</p>
                    </div>

                    <div>
                        <span class="block text-gray-400 text-sm font-medium">Fecha</span>
                        <p class="text-lg font-semibold text-white">{{ inscription.date }}</p>
                    </div>
                </div>

                <div class="flex flex-col gap-4 w-1/2">
                    <div>
                        <span class="block text-gray-400 text-sm font-medium">Actividad</span>
                        <p class="text-lg font-semibold text-white">{{ inscription.activity!.n_activity }}</p>
                    </div>

                    <div>
                        <span class="block text-gray-400 text-sm font-medium">Horario</span>
                        <p class="text-lg font-semibold text-white">{{ inscription.activity!.slot_hour }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex flex-col justify-end w-1/5">
            <div class="w-full justify-end">
                <span class="block text-gray-400 text-sm font-medium">Día</span>
                <p class="text-lg font-semibold text-white">{{ inscription.activity!.week_day }}</p>
            </div>

            <button @click="deleteInscription"
                class="bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-700 transition mt-4">
                Borrarse
            </button>
        </div>
    </div>
</template>

