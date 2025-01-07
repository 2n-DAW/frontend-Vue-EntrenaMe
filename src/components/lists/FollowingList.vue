<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router'; 
import UserCard from '../cards/UserCard.vue';

const store = useStore();
const route = useRoute();
const followings = computed(() => store.getters['auth/getFollowings']);
</script>

<template>
    <div class="w-full flex justify-center items-center">
        <div class="w-full md:w-1/2">
            <h1 class="text-3xl font-bold text-center mb-6">Seguidos</h1>
            <div class="flex flex-col gap-4">
                <div v-if="followings.length === 0" class="text-center text-text1">
                    <p>Aún no sigues a nadie</p>
                </div>
                <div v-else>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div v-for="user in followings" :key="user.id_user">
                            <UserCard :user="user" :isFollowing="true"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
