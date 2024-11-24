<template>
    <section class="sport_list">
        <h2 class="text-deep-orange-6">Sports</h2>
        <div class="load_sports">
            <SportCard v-for="sport in sports" :key="sport.id_sport" :data="sport" />
        </div>
    </section>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive } from 'vue';
import { useStore } from 'vuex';
import SportCard from '../cards/SportCard.vue';

const store = useStore();
store.dispatch('sport/initializeSports');
const sports = reactive(computed(() => store.getters['sport/allSports']));

console.log("sports", sports.value);

</script>