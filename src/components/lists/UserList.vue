<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import UserCard from '../cards/UserCard.vue';

const props = defineProps<{ type: 'followers' | 'followings' }>(); 
const store = useStore();

const users = computed(() =>
    props.type === 'followers'
        ? store.getters['auth/getFollowers']
        : store.getters['auth/getFollowings']
);
</script>

<template>
    <div class="w-full flex justify-center items-center">
        <div class="w-full md:w-1/2">
            <h1 class="text-3xl font-bold text-center mb-6">
                {{ props.type === 'followers' ? 'Seguidores' : 'Seguidos' }}
            </h1>
            <div class="flex flex-col gap-4">
                <div v-if="users.length === 0" class="text-center text-text1">
                    <p>
                        {{ props.type === 'followers' ? 'Aún no te sigue nadie' : 'Aún no sigues a nadie' }}
                    </p>
                </div>
                <div v-else>
                    <div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
                        <div v-for="user in users" :key="user.id_user">
                            <UserCard :user="user" :isFollowing="props.type === 'followings'" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
