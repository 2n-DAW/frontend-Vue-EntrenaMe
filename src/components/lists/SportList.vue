<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import SportCard from '../cards/SportCard.vue';

const store = useStore();
store.dispatch('sport/initializeSports');

const sports = computed(() => store.getters['sport/allSports']);
const curren_index = ref(0);

const sport_array = computed(() => {
    const chunks = [];
    for (let i = 0; i < sports.value.length; i += 3) {
        chunks.push(sports.value.slice(i, i + 3));
    }
    return chunks;
});


const prev = () => {
    if (curren_index.value > 0) {
        curren_index.value--;
    }
};

const next = () => {
    if (curren_index.value < sport_array.value.length - 1) {
        curren_index.value++;
    }
};

</script>

<template>
    <section class="sport-carousel p-4">
        <h2 class="text-2xl font-bold text-deep-orange-600 mb-4">Deportes</h2>
        <div class="carousel-container flex items-center justify-center relative">
            <button @click="prev"
                class="flex justify-center items-center hover:text-color1">
                <
            </button>
            
            <div class="carousel-wrapper overflow-hidden mx-16">
                <div class="carousel flex transition-transform duration-500 ease-in-out"
                    :style="{ transform: `translateX(-${curren_index * 100}%)` }">
                    <div v-for="chunk in sport_array" :key="chunk[0]?.id_sport"
                        class="carousel-slide flex-shrink-0 w-full grid grid-cols-3 gap-4">
                        
                        <SportCard v-for="sport in chunk" :key="sport.id_sport" :data="sport" />
                        
                    </div>
                </div>
            </div>

            <button @click="next"
                class="flex justify-center items-center hover:text-color1">
                >
            </button>
        </div>
    </section>
</template>

<style scoped>
.carousel-container {
    position: relative;
}

.carousel-wrapper {
    overflow: hidden;
    position: relative;
}

.carousel {
    display: flex;
    width: 100%;
    transition: transform 0.5s ease-in-out;
    will-change: transform;
}

.carousel-slide {
    min-width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

button {
    font-size: 2rem;
}
button:hover {
    cursor: pointer;
}
</style>
