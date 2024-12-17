<script setup lang="ts">
import { useRouter } from 'vue-router';
import { AuthService } from '../services/auth.service';
import { ref, onMounted, computed, watch } from 'vue';
import { User } from '../shared/interfaces/User.interface';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

const username_url = router.currentRoute.value.params.username as string;

const user = ref<User | null>(null);

const username = computed(() => user.value?.username || '');
const img_user = computed(() => user.value?.img_user || 'profile.png');

onMounted(async () => {
    try {
        const user_profile = await AuthService.getUserByUsername(username_url);
        if (!user_profile) {
            console.error('Usuario no encontrado');
            router.push('/home');
        } else {
            user.value = user_profile;
        }
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        router.push('/home');
    }
});

const user_logged = computed(() => store.getters['auth/getUser']);

const username_user_logged = ref(user_logged.value?.username || '');

watch(() => user_logged.value, (new_user) => {
        username_user_logged.value = new_user?.username || '';
    }
);

</script>
<template>

    <div class=" mx-auto my-6 flex items-center justify-center bg-background3 p-6">
        <div class="flex items-center">
            <img :src="`../public/img/users/${img_user}`" alt="user image"
                class="w-32 h-32 rounded-full mr-6 object-cover" />
            <div class="content flex flex-col">
                <h4 class="text-2xl font-bold text-color1">{{ username }}</h4>
                <p class="mt-0.5 mb-3 text-color8">bio</p>

                <a v-if="username === username_user_logged"
                    class="mb-2 py-2 px-4 text-white no-underline hover:bg-color4 rounded-full bg-color3"
                    style="box-shadow: inset 0 0 10px rgba(67, 67, 67, 0.15);">
                    Editar perfil
                </a>

            </div>
        </div>
    </div>



</template>