<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { CourtHour } from '../../shared/interfaces/entities/CourtHour.interface';
import { BookingService } from '../../services/booking.service';


import Noty from 'noty';
import 'noty/lib/noty.css';
import 'noty/lib/themes/mint.css';
import { watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const is_logged = computed(() => store.getters['auth/getIsLogged']);

const props = defineProps({
    filteredCourtHours: {
        type: Array as () => CourtHour[],
        required: true,
    },
    filtersCourts: {
        type: Object as () => any,
        required: true,
    },
});

console.log(props.filtersCourts);

watch(() => props.filtersCourts, (newValue) => {
    console.log(newValue);
});

const isCourtSelected = computed(() => {
    return props.filteredCourtHours.length > 0;
});

const booking = async (id_count_hours: number) => {

    try {
        await BookingService.create({ id_count_hours })

        new Noty({
            type: 'success',
            text: 'Reserva realizada',
            timeout: 1000,
            progressBar: true,
        }).show();



    } catch (error) {
        new Noty({
            type: 'error',
            text: 'Error al reservar',
            timeout: 1000,
            progressBar: true,
        }).show();
    }

};

const redirect = () => {
    router.push('/auth');
};



</script>

<template>
    <div class="w-full flex mt-16 p20">
        <div class="w-3/5 flex flex-col items-center justify-center">
            <div class="flex justify-between w-full">
                <div id="1"
                    :class="['w-9/12 aspect_athletics rounded-capsule', props.filtersCourts.sport === 'Atletismo 1' ? 'bg-color1' : 'bg-color5']">
                </div>
                <div class="w-3/12 flex flex-col items-center justify-center">
                    <div id="2"
                        :class="['w-2/3 aspect_volley m2', props.filtersCourts.sport === 'Volei 1' ? 'bg-color1' : 'bg-color5']">
                    </div>
                    <div id="3"
                        :class="['w-2/3 aspect_volley m2', props.filtersCourts.sport === 'Volei 2' ? 'bg-color1' : 'bg-color5']">
                    </div>
                    <div id="4"
                        :class="['w-2/3 aspect_volley m2', props.filtersCourts.sport === 'Volei 3' ? 'bg-color1' : 'bg-color5']">
                    </div>
                    <div class="w-2/3 flex justify-between">
                        <div id="5"
                            :class="['w-5/12 aspect_padel m2', props.filtersCourts.sport === 'Padel 1' ? 'bg-color1' : 'bg-color5']">
                        </div>
                        <div id="6"
                            :class="['w-5/12 aspect_padel m2', props.filtersCourts.sport === 'Padel 2' ? 'bg-color1' : 'bg-color5']">
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex justify-between w-full mb-4">
                <div class="w-1/6 flex flex-col items-center justify-center m2">
                    <div id="7"
                        :class="['w-full aspect_tenis m2', props.filtersCourts.sport === 'Tenis 1' ? 'bg-color1' : 'bg-color5']">
                    </div>
                    <div id="8"
                        :class="['w-full aspect_tenis m2', props.filtersCourts.sport === 'Tenis 2' ? 'bg-color1' : 'bg-color5']">
                    </div>
                </div>

                <div class="w-1/6 flex flex-col items-center justify-center m2">
                    <div id="9"
                        :class="['w-full aspect_basketball m2', props.filtersCourts.sport === 'Basquet 1' ? 'bg-color1' : 'bg-color5']">
                    </div>
                </div>

                <div class="w-1/6 flex flex-col items-center justify-center m2">
                    <div id="10"
                        :class="['w-full aspect_basketball m2', props.filtersCourts.sport === 'Basquet 2' ? 'bg-color1' : 'bg-color5']">
                    </div>
                </div>

                <div class="w-2/5 flex flex-col items-center justify-center m2">
                    <div id="11"
                        :class="['w-full aspect_football m2', props.filtersCourts.sport === 'Futbol 1' ? 'bg-color1' : 'bg-color5']">
                    </div>
                </div>
            </div>
        </div>

        <div class="w-2/5 mx-auto flex flex-col items-center justify-center">
            <div v-if="isCourtSelected"
                class="max-w-sm mx-auto bg-gray-800 border border-gray-700 rounded-lg shadow-md overflow-hidden">
                <img class="w-full h-48 object-cover"
                    :src="`img/courts/${props.filteredCourtHours[0].court!.img_court}`" alt="Imagen de pista">

                <div class="p-4">
                    <div class="mb-2">
                        <span class="block text-gray-400 text-sm font-medium">Mes</span>
                        <p class="text-lg font-semibold text-white">{{ props.filteredCourtHours[0].month!.n_month }}</p>
                    </div>

                    <div class="mb-2">
                        <span class="block text-gray-400 text-sm font-medium">Día</span>
                        <p class="text-lg font-semibold text-white">{{ props.filteredCourtHours[0].day_number }}</p>
                    </div>

                    <div class="mb-4">
                        <span class="block text-gray-400 text-sm font-medium">Hora</span>
                        <p class="text-lg font-semibold text-white">{{ props.filteredCourtHours[0].hour!.slot_hour }}
                        </p>
                    </div>

                    <div class="mb-4">
                        <span class="block text-gray-400 text-sm font-medium">Pista</span>
                        <p class="text-lg font-semibold text-white">{{ props.filteredCourtHours[0].court!.n_court }}</p>
                    </div>

                    <button v-if="is_logged" @click="() => booking(props.filteredCourtHours[0].id_court_hour)"
                        class="w-full bg-color2 text-background1 font-semibold py-2 px-4 rounded hover:bg-color2_hover transition">
                        Reservar
                    </button>
                    <button v-else @click="() => redirect()"
                        class="w-full bg-color2 text-background1 font-semibold py-2 px-4 rounded hover:bg-color2_hover transition">
                        Reservar
                    </button>

                </div>
            </div>
            <div v-else
                class="max-w-sm mx-auto bg-gray-800 border border-gray-700 rounded-lg shadow-md overflow-hidden">
                <img class="w-full h-48 object-cover" :src="`img/courts/polideportivo.jpg`" alt="Imagen de pista">

                <div class="p-4">
                    <div class="mb-2">
                        <span class="block text-gray-400 text-sm font-medium">Mes</span>
                        <p class="text-lg font-semibold text-white">{{ props.filtersCourts.month ?
                            props.filtersCourts.month : "Selecciona un mes" }}</p>
                    </div>

                    <div class="mb-2">
                        <span class="block text-gray-400 text-sm font-medium">Día</span>
                        <p class="text-lg font-semibold text-white">{{ props.filtersCourts.day ? props.filtersCourts.day
                            : "Selecciona un día" }}</p>
                    </div>

                    <div class="mb-4">
                        <span class="block text-gray-400 text-sm font-medium">Hora</span>
                        <p class="text-lg font-semibold text-white">{{ props.filtersCourts.hour ?
                            props.filtersCourts.hour : "Selecciona una hora" }}</p>
                    </div>

                    <div class="mb-4">
                        <span class="block text-gray-400 text-sm font-medium">Pista</span>
                        <p class="text-lg font-semibold text-white">{{ props.filtersCourts.sport ?
                            props.filtersCourts.sport : "Selecciona una pista" }}</p>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
.aspect_athletics {
    aspect-ratio: 2 / 1;
}

.aspect_basketball {
    aspect-ratio: 3 / 5;
}

.aspect_football {
    aspect-ratio: 5 / 3;
}

.aspect_volley {
    aspect-ratio: 5 / 3;
}

.aspect_padel {
    aspect-ratio: 3 / 5;
}

.aspect_tenis {
    aspect-ratio: 5 / 3;
}

.rounded-capsule {
    border-radius: 50% / 100%;
    border-end-end-radius: 0;
}

.m2 {
    margin: 0.5rem;
}

.p20 {
    padding-left: 20%;
    padding-right: 5%;
}
</style>
