<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { AuthService } from '../services/auth.service';
import { ref, onMounted, computed, watch, Comment } from 'vue';
import { User } from '../shared/interfaces/entities/User.interface';
import { useStore } from 'vuex';
import BookingList from '../components/lists/BookingList.vue';
import CommentsListProfile from '../components/lists/CommentsListProfile.vue';

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
const birthday = computed(() => user.value?.birthday || '');
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
});

</script>















<template>

    <div class=" mx-auto my-6 bg-background3 p-6 flex flex-col gap-6 rounded-lg shadow-lg justify-center items-center">
        <div class="flex items-center">
            
            <div class="flex flex-col gap-2 ml-6 items-center justify-center">
                <img :src="`../public/img/users/${img_user}`" alt="user image"
                    class="w-32 h-32 rounded-full mr-6 object-cover" />
                <button v-if="username === username_user_logged"
                    class="mb-2 py-2 px-4 text-white no-underline hover:bg-color1_hover rounded-full bg-color1"
                    style="box-shadow: inset 0 0 10px rgba(67, 67, 67, 0.15);"
                    :onClick="() => router.push(`/profile/${username}/edit`)">
                    Editar perfil
                </button>
            </div>
            
            <div class="content flex flex-col justify-center">

                <div class="content flex flex-col justify-center items-center text-center">
                    <h4 class="text-2xl font-bold text-color1">{{ username }}</h4>
                    <h6 class="text-m font-semibold text-color8">{{ name }} {{ surname }}</h6>
                    <p class="mt-0.5 text-color8">{{ bio }}</p>
                </div>

                <div class="flex flex-col gap-2 ml-6">
                    <p v-if="birthday" class="text-color4">
                        Nacimiento: <span class="text-white">{{ birthday }}</span>
                    </p>
                    <p v-if="client && nif_client !== ''" class="text-color4">
                        NIF/DNI: <span class="text-white">{{ nif_client }}</span>
                    </p>
                    <p v-if="client && tlf_client" class="text-color4">
                        Teléfono: <span class="text-white">{{ tlf_client }}</span>
                    </p>
                    <p v-if="instructor && nif_instructor !== ''" class="text-color4">
                        NIF/DNI: <span class="text-white">{{ nif_instructor }}</span>
                    </p>
                    <p v-if="instructor && tlf_instructor" class="text-color4">
                        Teléfono: <span class="text-white">{{ tlf_instructor }}</span>
                    </p>
                    <p v-if="instructor && address_instructor" class="text-color4">
                        Dirección: <span class="text-white">{{ address_instructor }}</span>
                    </p>
                </div>
            </div>


        </div>
        <div class="flex gap-2 ml-6">
            <button v-if="username === username_user_logged"
                class="mb-2 py-2 px-4 text-white no-underline hover:bg-color1_hover rounded-full bg-color1"
                style="box-shadow: inset 0 0 10px rgba(67, 67, 67, 0.15);"
                :onClick="() => router.push(`/profile/${username}/edit`)">
                Mis Comentarios
            </button>
            
            <button v-if="username === username_user_logged"
                class="mb-2 py-2 px-4 text-white no-underline hover:bg-color1_hover rounded-full bg-color1"
                style="box-shadow: inset 0 0 10px rgba(67, 67, 67, 0.15);"
                :onClick="() => router.push(`/profile/${username}/edit`)">
                Mis Reservas
            </button>
            <button v-if="username === username_user_logged"
                class="mb-2 py-2 px-4 text-white no-underline hover:bg-color1_hover rounded-full bg-color1"
                style="box-shadow: inset 0 0 10px rgba(67, 67, 67, 0.15);"
                :onClick="() => router.push(`/profile/${username}/edit`)">
                Siguiendo
            </button>
            <button v-if="username === username_user_logged"
                class="mb-2 py-2 px-4 text-white no-underline hover:bg-color1_hover rounded-full bg-color1"
                style="box-shadow: inset 0 0 10px rgba(67, 67, 67, 0.15);"
                :onClick="() => router.push(`/profile/${username}/edit`)">
                Seguidos
            </button>
        </div>
    </div>
    
    <div>
        <!-- <BookingList /> -->
        <CommentsListProfile />
        
    </div>




</template>
