<script setup lang="ts">
import { ref } from 'vue';

const newComment = ref({
    body: '',
    author: {
        username: 'current_user', // Reemplazar con lógica real
        image: null,
    },
    createdAt: new Date(),
});

const defaultImage = 'https://static.productionready.io/images/smiley-cyrus.jpg';

const createComment = () => {
    if (newComment.value.body.trim() === '') {
        alert('El comentario no puede estar vacío.');
        return;
    }

    console.log('Nuevo comentario creado:', newComment.value);
    // Aquí puedes añadir lógica para enviar el comentario al servidor o almacenarlo

    resetComment(); // Reinicia el formulario
};

const resetComment = () => {
    newComment.value.body = '';
};
</script>


<template>
    <div class="create-comment-section w-full shadow p-4 bg-background3 rounded-lg mb-4">
        <h2 class="text-xl font-bold mb-4">Crear un comentario</h2>
        <form @submit.prevent="createComment">
            <textarea v-model="newComment.body" class="w-full p-2 border border-color1 rounded mb-4 bg-background2" rows="4"
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

