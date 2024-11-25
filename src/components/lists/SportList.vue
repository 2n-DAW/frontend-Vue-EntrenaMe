<template>
    <section class="sport_list p-4">
        <h2 class="text-2xl font-bold text-deep-orange-600 mb-4">Deportes</h2>

        <div 
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <SportCard 
                v-for="sport in sports" 
                :key="sport.id_sport" 
                :data="sport" 
            />
        </div>
    </section>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useStore } from 'vuex';
import SportCard from '../cards/SportCard.vue';

const store = useStore();
store.dispatch('sport/initializeSports'); 
const sports = reactive(computed(() => store.getters['sport/allSports']));

console.log("sports", sports.value);
</script>
