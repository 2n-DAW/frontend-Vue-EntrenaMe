<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { AuthService } from '../services/auth.service';
import { ref, onMounted, computed, watch } from 'vue';
import { User } from '../shared/interfaces/entities/User.interface';
import { useStore } from 'vuex';

const router = useRouter();
const route = useRoute();
const store = useStore();

const username_url = ref(route.params.username as string);

const user = ref<User | null>(null);

const username = computed(() => user.value?.username || '');
const img_user = computed(() => user.value?.img_user || 'profile.png');
const name = computed(() => user.value?.name || '');
const surname = computed(() => user.value?.surname || '');
const bio = computed(() => user.value?.bio || 'Nada que contar');
const client = computed(() => user.value?.client || {});
const nif_client = computed(() => user.value?.client?.nif || '');
const tlf_client = computed(() => user.value?.client?.tlf || '');

const instructor = computed(() => user.value?.instructor || {});
const nif_instructor = computed(() => user.value?.instructor?.nif || '');
const tlf_instructor = computed(() => user.value?.instructor?.tlf || '');
const address_instructor = computed(() => user.value?.instructor?.address || '');

const fetchUserProfile = async () => {
    try {
        const user_profile = await AuthService.getUserByUsername(username_url.value);
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
};

onMounted(fetchUserProfile);

watch(() => route.params.username, (newUsername) => {
    username_url.value = newUsername as string;
    fetchUserProfile();
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
                <h6 class="text-m font-semibold text-color8">{{ name }} {{ surname }}</h6>

                <p class="mt-0.5 mb-3 text-color8">{{ bio }}</p>
                <!-- <p v-if="admin" class="text-color1">{{ id_admin }}</p> -->
                <p v-if="client && nif_client !== ''" class="text-color1">NIF: {{ nif_client }}</p>
                <p v-if="client && tlf_client" class="text-color1">Teléfono: {{ tlf_client }}</p>
                <p v-if="instructor && nif_instructor !== ''" class="text-color1">NIF: {{ nif_instructor }}</p>
                <p v-if="instructor && tlf_instructor" class="text-color1">Teléfono: {{ tlf_instructor }}</p>
                <p v-if="instructor && address_instructor" class="text-color1">Dirección: {{ address_instructor }}</p>




                <button v-if="username === username_user_logged"
                    class="mb-2 py-2 px-4 text-white no-underline hover:bg-color4 rounded-full bg-color1"
                    style="box-shadow: inset 0 0 10px rgba(67, 67, 67, 0.15);"
                    :onClick="() => router.push(`/profile/${username}/edit`)">
                    Editar perfil
                </button>

            </div>
        </div>
    </div>

</template>