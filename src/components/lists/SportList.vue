<template>
    <section class="sport_list">
        <h2 class="text-deep-orange-6">Sports</h2>
        <div class="load_sports">
            <!-- <SportCard :data="sports" /> -->
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
// import SportCard from '../cards/SportCard.vue';

export default defineComponent({
    name: 'SportList',
    components: {
        // SportCard,
    },
    setup() {
        const store = useStore();
        console.log("yeeeeeeeeeee");
        store.dispatch('sport/initializeSports');

        const sports = computed(() => store.getters['sport/allSports']);
        console.log("sporfdsfsdfasts", sports.value);

        return {
            sports,
        };
    },
});
</script>