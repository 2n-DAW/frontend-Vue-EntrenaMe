<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { CommentActivityCreate } from '../../shared/interfaces/entities/CommentActivity.interface';
import store from '../../store';

const route = useRoute();
const slug_activity = route.params.slug as string;

const comment_info = ref<CommentActivityCreate>({} as CommentActivityCreate);

const createComment = () => {
    if (comment_info.value.body.trim() === '') {
        alert('El comentario no puede estar vacío.');
        return;
    }
    store.dispatch('comment/addComment', { comment: comment_info.value, slug_activity });
    resetComment();
};

const resetComment = () => {
    comment_info.value.body = '';
};
</script>

<template>
    <div class="create-comment-section w-full shadow p-4 bg-background3 rounded-lg mb-4">
        <h2 class="text-xl font-bold mb-4">Crear un comentario</h2>
        <form @submit.prevent="createComment">
            <textarea v-model="comment_info.body" 
                class="w-full p-2 border border-color1 rounded mb-4 bg-background2"
                rows="4" 
                placeholder="Escribe tu comentario aquí..."></textarea>

            <div class="flex items-center justify-end space-x-4">
                <button type="button" @click="resetComment" class="text-gray-500 hover:text-gray-700">
                    Cancelar
                </button>
                <button type="submit" class="bg-color1 text-white px-4 py-2 rounded-lg hover:bg-color1_hover">
                    Publicar
                </button>
            </div>
        </form>
    </div>
</template>
