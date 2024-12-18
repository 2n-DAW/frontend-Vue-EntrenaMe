<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { User } from '../../shared/interfaces/User.interface';

const store = useStore();
const loading = ref(true);

onMounted(async () => {
    try {
        const result = await store.dispatch('auth/currentUser');
        console.log('Resultado de la acción:', result);
    } catch (error) {
        console.error('Error al obtener el usuario actual:', error);
    } finally {
        loading.value = false;
    }
});


const isLogged = computed(() => store.getters['auth/getIsLogged']);
const user = computed(() => store.getters['auth/getUser'] || {});
const username = computed(() => (user.value as User)?.username || '');
const img_user = computed(() => (user.value as User)?.img_user || 'profile.png');
const type_user = computed(() => (user.value as User)?.type_user || 'client');

</script>





<template>

    <header class="w-full fixed top-0 flex justify-between items-center bg-header py-4 text-text1 p-5">
        <h1 class="text-2xl font-bold">EntrenaMe</h1>
        <div class="flex items-center space-x-4">


            <nav v-if="!loading">
                <ul class="flex gap-4">
                    <li>
                        <router-link to="/home" class="hover:text-text1_hover">
                            Home
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/activities" class="hover:text-text1_hover">
                            Actividades
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/courts" class="hover:text-text1_hover">
                            Reservas
                        </router-link>
                    </li>
                    <li v-if="type_user === 'admin'">
                        <a href="/dashboard" class="hover:text-text1_hover">
                            Dashboard
                        </a>
                    </li>
                    <li v-if="!isLogged">
                        <router-link to="/auth" class="hover:text-text1_hover">
                            Login/Register
                        </router-link>
                    </li>
                    <li v-if="isLogged">
                        <router-link :to="`/profile/${username}`"
                            class="flex items-center bg-color1 pr-2 hover:bg-color1_hover rounded-full overflow-hidden">
                            <img :src="`../public/img/users/${img_user}`" alt="user image"
                                class="user-image mr-1 w-7 h-7 rounded-full"
                                style="box-shadow: 0 0 5px rgb(54, 54, 54);" />
                            <span class="text-sm text-white">{{ username }}</span>
                        </router-link>
                    </li>
                    <li v-if="isLogged">
                        <router-link to="/auth" class="hover:text-text1_hover">
                            Logout
                        </router-link>
                    </li>
                </ul>
            </nav>

            <nav v-else class="flex gap-4">
                <div class="w-20 h-1 bg-skeleton rounded-full animate-pulse"></div>
                <div class="w-20 h-1 bg-skeleton rounded-full animate-pulse"></div>
                <div class="w-20 h-1 bg-skeleton rounded-full animate-pulse"></div>
                <div class="w-20 h-1 bg-skeleton rounded-full animate-pulse"></div>
                <div class="w-20 h-1 bg-skeleton rounded-full animate-pulse"></div>
            </nav>
        </div>
    </header>
</template>






<style>
header {
    z-index: 10;
}
</style>