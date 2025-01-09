<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import CommentCard from '../cards/CommentCard.vue';

const store = useStore();
const route = useRoute();

const username = computed(() => route.params.username);

const comments = computed(() => store.getters['comment/allUserComments'](username.value));

const initializeComments = async () => {
    try {
        await store.dispatch('comment/initializeComments');
        console.log('Reservas inicializadas:', comments.value);
    } catch (error) {
        console.error('Error al obtener las reservas:', error);
    }
};

initializeComments();

</script>


<template>
    <div class="w-full flex justify-center items-center">
        <div class="w-full md:w-1/2">
            <h1 class="text-3xl font-bold text-center mb-6">Comentarios</h1>
            <div class="flex flex-col gap-4">
                <div v-if="comments.length === 0" class="text-center text-text1">
                    No hay comentarios para mostrar
                </div>
                <div v-else>
                    <div v-for="comment in comments" :key="comment.id_comment" class="mb-4">
                        <CommentCard :comment="comment" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>