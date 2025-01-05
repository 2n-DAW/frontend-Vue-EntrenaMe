<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import BookingCard from '../cards/BookingCard.vue';

const store = useStore();

const bookings = computed(() => store.getters['booking/allBookings']);

const initializeBookings = async () => {
    try {
        await store.dispatch('booking/initializeBookings');
        console.log('Reservas inicializadas:', bookings.value);
    } catch (error) {
        console.error('Error al obtener las reservas:', error);
    }
};

initializeBookings();

</script>

<template>
    <div class="w-full flex justify-center items-center">
        <div class="w-full md:w-1/2">
            <h1 class="text-3xl font-bold text-center mb-6">Reservas</h1>
            <div class="flex flex-col gap-4">
                <div v-if="bookings.length === 0" class="text-center text-text1">
                    No tienes reservas
                </div>
                <div v-else >
                    <div v-for="booking in bookings" :key="booking.id_booking" class = "mb-4">
                        <BookingCard :booking="booking" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
