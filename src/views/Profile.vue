<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { AuthService } from '../services/auth.service';
import { ref, onMounted, computed, watch } from 'vue';
import { User } from '../shared/interfaces/entities/User.interface';
import { useStore } from 'vuex';


// import MyComments from '../components/MyComments.vue';
// import Favorites from '../components/Favorites.vue';
// import Followers from '../components/Followers.vue';
// import Following from '../components/Following.vue';
// import MyJobs from '../components/MyJobs.vue';
// import CreateJob from '../components/CreateJob.vue';
// import PendingInscriptions from '../components/PendingInscriptions.vue';
// import AcceptedInscriptions from '../components/AcceptedInscriptions.vue';
// import RejectedInscriptions from '../components/RejectedInscriptions.vue';

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

// Control de las pestañas
const activeTab = ref('MyComments');

// const componentsMap: Record<string, any> = {
//     MyComments,
//     Favorites,
//     Followers,
//     Following,
//     MyJobs,
//     CreateJob,
//     PendingInscriptions,
//     AcceptedInscriptions,
//     RejectedInscriptions,
// };

// const activeComponent = computed(() => componentsMap[activeTab.value]);
</script>















<template>

    <div class=" mx-auto my-6 flex items-center justify-center bg-background3 p-6">
        <div class="flex items-center">
            <img :src="`../public/img/users/${img_user}`" alt="user image"
                class="w-32 h-32 rounded-full mr-6 object-cover" />
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



                <div class="flex flex-col gap-2 ml-6">
                    <button v-if="username === username_user_logged"
                        class="mb-2 py-2 px-4 text-white no-underline hover:bg-color1_hover rounded-full bg-color1"
                        style="box-shadow: inset 0 0 10px rgba(67, 67, 67, 0.15);"
                        :onClick="() => router.push(`/profile/${username}/edit`)">
                        Editar perfil
                    </button>

                </div>
            </div>
        </div>
    </div>
    
    
    
<!--     
    
    <div class="container max-w-screen-xl flex mx-auto px-10 pt-2 pb-1.5">
        <ul class="outline-active flex justify-center">
            <li class="nav-item">
                <button @click="activeTab = 'MyComments'" :class="{
                    'py-2 px-4 bg-color3 text-white hover:bg-color4 rounded-t-2xl border-l border-r border-color13 transition-all': true,
                    '!bg-color13 !text-color9 border-l border-t border-r !border-color14 border-b !border-b-color13 shadow-inner': activeTab === 'MyComments'
                }">
                    Mis comentarios
                </button>
            </li>
            <li class="nav-item">
                <button @click="activeTab = 'Favorites'" :class="{
                    'py-2 px-4 bg-color3 text-white hover:bg-color4 rounded-t-2xl border-l border-r border-color13 transition-all': true,
                    '!bg-color13 !text-color9 border-l border-t border-r !border-color14 border-b !border-b-color13 shadow-inner': activeTab === 'Favorites'
                }">
                    Favoritos
                </button>
            </li>
            <li class="nav-item">
                <button @click="activeTab = 'Followers'" :class="{
                    'py-2 px-4 bg-color3 text-white hover:bg-color4 rounded-t-2xl border-l border-r border-color13 transition-all': true,
                    '!bg-color13 !text-color9 border-l border-t border-r !border-color14 border-b !border-b-color13 shadow-inner': activeTab === 'Followers'
                }">
                    Seguidores
                </button>
            </li>
            <li class="nav-item">
                <button @click="activeTab = 'Following'" :class="{
                    'py-2 px-4 bg-color3 text-white hover:bg-color4 rounded-t-2xl border-l border-r border-color13 transition-all': true,
                    '!bg-color13 !text-color9 border-l border-t border-r !border-color14 border-b !border-b-color13 shadow-inner': activeTab === 'Following'
                }">
                    Siguiendo
                </button>
            </li>
            <li class="nav-item">
                <button @click="activeTab = 'MyJobs'" :class="{
                    'py-2 px-4 bg-color3 text-white hover:bg-color4 rounded-t-2xl border-l border-r border-color13 transition-all': true,
                    '!bg-color13 !text-color9 border-l border-t border-r !border-color14 border-b !border-b-color13 shadow-inner': activeTab === 'MyJobs'
                }">
                    Mis ofertas
                </button>
            </li>
            <li class="nav-item">
                <button @click="activeTab = 'CreateJob'" :class="{
                    'py-2 px-4 bg-color3 text-white hover:bg-color4 rounded-t-2xl border-l border-r border-color13 transition-all': true,
                    '!bg-color13 !text-color9 border-l border-t border-r !border-color14 border-b !border-b-color13 shadow-inner': activeTab === 'CreateJob'
                }">
                    Crear oferta
                </button>
            </li>
            <li class="nav-item">
                <button @click="activeTab = 'PendingInscriptions'" :class="{
                    'py-2 px-4 bg-color3 text-white hover:bg-color4 rounded-t-2xl border-l border-r border-color13 transition-all': true,
                    '!bg-color13 !text-color9 border-l border-t border-r !border-color14 border-b !border-b-color13 shadow-inner': activeTab === 'PendingInscriptions'
                }">
                    Insc. pendientes
                </button>
            </li>
            <li class="nav-item">
                <button @click="activeTab = 'AcceptedInscriptions'" :class="{
                    'py-2 px-4 bg-color3 text-white hover:bg-color4 rounded-t-2xl border-l border-r border-color13 transition-all': true,
                    '!bg-color13 !text-color9 border-l border-t border-r !border-color14 border-b !border-b-color13 shadow-inner': activeTab === 'AcceptedInscriptions'
                }">
                    Insc. aceptadas
                </button>
            </li>
            <li class="nav-item">
                <button @click="activeTab = 'RejectedInscriptions'" :class="{
                    'py-2 px-4 bg-color3 text-white hover:bg-color4 rounded-t-2xl border-l border-r border-color13 transition-all': true,
                    '!bg-color13 !text-color9 border-l border-t border-r !border-color14 border-b !border-b-color13 shadow-inner': activeTab === 'RejectedInscriptions'
                }">
                    Insc. rechazadas
                </button>
            </li>
        </ul>

        <div class="content_div container bg-color13 rounded-t-md border border-color14 shadow">
            <component :is="activeComponent" />
        </div>
    </div>
    
     -->
    
    
    
    
    
    

</template>
