<script setup lang="ts">
import { defineProps } from 'vue';
import { Booking } from '../../shared/interfaces/entities/booking.interface';
import { ref } from 'vue';
import store from '../../store';
const props = defineProps({
    booking: {
        type: Object as () => Booking,
        required: true,
    },
});

const booking = ref<Booking>(props.booking);

const deleteBooking = () => {
    store.dispatch('booking/deleteBooking', booking.value.slug_booking);
};
</script>

<template>
    <div class=" flex  gap-4 bg-background3 p-4 rounded-lg shadow-lg justify-center items-center">
        
        <div class="flex flex-col items-center mb-4 w-1/5">
            <img :src="`../public/img/users/${booking.user!.img_user}`" alt="Imagen de usuario"
                class="w-20 h-20 rounded-full border border-gray-600 mb-2" />
            <p class="text-lg font-semibold text-white">{{ booking.user!.username }}</p>
        </div>

        <div class=" w-3/5">

            <div class="flex w-full">


                <div class="flex flex-col gap-4 w-1/2">
                    <div>
                        <span class="block text-gray-400 text-sm font-medium">ID Reserva</span>
                        <p class="text-lg font-semibold text-white">{{ booking.id_booking }}</p>
                    </div>

                    <div>
                        <span class="block text-gray-400 text-sm font-medium">Fecha</span>
                        <p class="text-lg font-semibold text-white">{{ booking.date }}</p>
                    </div>
                </div>

                <div class="flex flex-col gap-4 w-1/2">
                    <div>
                        <span class="block text-gray-400 text-sm font-medium">Pista</span>
                        <p class="text-lg font-semibold text-white">{{ booking.court_hour!.n_court }}</p>
                    </div>

                    <div>
                        <span class="block text-gray-400 text-sm font-medium">Horario</span>
                        <p class="text-lg font-semibold text-white">{{ booking.court_hour!.slot_hour }}</p>
                    </div>
                </div>
            </div>

        </div>

        <div class="flex flex-col justify-end w-1/5">
            
            <div class="w-full justify-end">
                <span class="block text-gray-400 text-sm font-medium">Día</span>
                <p class="text-lg font-semibold text-white">
                    {{ booking.court_hour!.day_number }} de {{ booking.court_hour!.n_month }} de {{
                        booking.court_hour!.year }}
                </p>
            </div>
            
            
            <button @click="deleteBooking"
                class="bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-700 transition mt-4">
                Eliminar Reserva
            </button>
        </div>
    </div>
</template>

<style scoped></style>
