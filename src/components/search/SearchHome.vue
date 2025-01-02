<script setup lang="ts">
import { watch } from 'vue';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const search_content = ref('');
const filtered_activities = ref<string[]>([]);


store.dispatch('activity/initializeActivities');

const activitiesNames = computed(() => store.getters['activity/getActivitiesNames']);

const updateFiltered_activities = () => {
    const query = search_content.value.toLowerCase();
    if (query.trim() === '') {
        filtered_activities.value = [];
    } else {
        filtered_activities.value = activitiesNames.value.filter((name: string) =>
            name.toLowerCase().includes(query)
        );
    }
};

const selectActivity = (activity: string) => {
    search_content.value = activity; 
    filtered_activities.value = []; 
};

const searchActivities = () => {
    if (search_content.value.trim() !== '') {
        const filters = { n_activity: search_content.value }; 
        const filters_btoa = btoa(JSON.stringify(filters));
        router.push({ name: 'activities', query: { filtros: filters_btoa } });
    }
};

</script>

<template>
    <div class="max-w-max flex items-center space-x-4">
        <div class="relative">
            <input v-model="search_content" @input="updateFiltered_activities" placeholder="Explora actividades"
                class="w-96 px-3 py-2 border border-color2 rounded-xl focus:ring-2 bg-input1 focus:outline-none text-input1_text" />

            <div v-if="filtered_activities.length > 0"
                class="absolute z-10 bg-input1 border border-color2 rounded-xl mt-1 w-full shadow-lg text-input1_text">
                <div v-for="(activity, index) in filtered_activities" :key="index"
                    class="p-2 cursor-pointer hover:bg-backgoround3 text-input1_text"
                    @click="selectActivity(activity)">
                    {{ activity }}
                </div>
            </div>
        </div>

        <div>
            <button @click="searchActivities"
                class="bg-button1 text-text1 px-3 py-2 rounded-full hover:bg-button1_hover focus:outline-none">
                Buscar
            </button>
        </div>
    </div>
</template>
