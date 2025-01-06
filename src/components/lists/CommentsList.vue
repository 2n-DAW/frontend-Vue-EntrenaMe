<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import CommentCard from '../cards/CommentCard.vue';
import CommentCardCreate from '../cards/CommentCardCreate.vue';
import { watch } from 'vue';

const store = useStore();
const props = defineProps<{ id_activity: number }>();


const initializeComments = async () => {
    try {
        await store.dispatch('comment/initializeComments');
        console.log('Comentarios inicializados:', comments.value);
    } catch (error) {
        console.error('Error al obtener los comentarios:', error);
    }
};
initializeComments();

const onCommentDeleted = (deletedComment: any) => {
    store.dispatch('comments/deleteComment', deletedComment.id);
};

console.log('ID de la actividad:', props.id_activity);
const comments = computed(() => store.getters['comment/allActivityComments'](props.id_activity) || []);

watch(comments, (newVal) => {
    console.log('Nuevos comentarios:', newVal);
});


</script>

<template>
    <div class="w-full flex justify-center items-center">
        <div class="w-full md:w-1/2">
            <h1 class="text-3xl font-bold text-center my-6">Comentarios</h1>
            <div class="flex flex-col gap-4">

                <div v-if="comments.length === 0" class="text-center text-text1">
                    <p>Aún no hay ningún comentario, se el primero en comentar</p>
                </div>
                <CommentCardCreate />


                <div v-for="comment in comments" :key="comment.id_comment" class="mb-4">
                    <CommentCard :comment="comment" />
                </div>

            </div>
        </div>
    </div>
</template>
