<script setup lang="ts">
import { defineProps } from 'vue';
import { User } from '../../shared/interfaces/entities/User.interface';
import useUserCard from '../../composables/useUserCard';

const props = defineProps<{ user: User, isFollowing: boolean }>();

const { userLogged, usernameUrl, profile, unfollowUser } = useUserCard();
</script>

<template>
    <div
        class="flex items-center p-4 bg-background3 shadow-md rounded-md w-full gap-4 cursor-pointer hover:bg-background4 transition">
        <div class="flex-shrink-0" @click="profile(props.user.username)">
            <img class="w-16 h-16 rounded-full" :src="`../public/img/users/${props.user.img_user}`" alt="User Avatar" />
            <p class="text-center text-sm font-medium mt-2 text-color1">
                {{ props.user.username }}
            </p>
        </div>

        <div class="flex-grow text-center">
            <p class="text-lg font-semibold">{{ props.user.name }}</p>
            <p class="text-sm text-white">{{ props.user.surname }}</p>
        </div>

        <div v-if="isFollowing && userLogged.username === usernameUrl" class="flex-shrink-0">
            <button class="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md shadow"
                @click="unfollowUser(props.user.username)">
                Dejar de seguir
            </button>
        </div>
    </div>
</template>
