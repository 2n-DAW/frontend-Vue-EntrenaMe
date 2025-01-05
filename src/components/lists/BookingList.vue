<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { Booking } from '../../shared/interfaces/entities/booking.interface';


const store = useStore();
const bookings = ref<Booking[]>([]);

const fetchBookings = async () => {
    try {
        await store.dispatch('booking/initializeBookings');
        bookings.value = store.getters['booking/allBookings'];
        console.log('Reservas:', bookings.value);
    } catch (error) {
        console.error('Error al obtener las reservas:', error);
    }
};

fetchBookings();




</script>
<template>


    <div class="w-full flex justify-center items-center">
        <div class="w-full md:w-1/2">
            <h1 class="text-3xl font-bold text-center">Reservas</h1>
            <div class="flex flex-col gap-4">

                <div v-if="bookings.length === 0" class="text-center text-text1">
                    No tienes reservas
                </div>
                <div v-else>
                    <div v-for="booking in bookings" :key="booking.id_booking"
                        class="bg-background3 p-4 rounded-lg shadow-lg">
                        Hola
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>