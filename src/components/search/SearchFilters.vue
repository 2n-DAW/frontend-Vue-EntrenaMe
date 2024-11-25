<template>
    <div class="flex flex-col">
        <h3 for="search-input" class="text-gray-400">{{ label }}</h3>
        <input 
            type="text"
            id="search-input"
            class="bg-gray-700 text-gray-100 p-1 rounded"
            v-model="text"
            placeholder="Escribe para buscar..."
            @input="emitSelected"
        />
    </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
    props: {
        label: {
            type: String,
            required: true
        },
        input_text_search: {
            type: String,
            required: true
        }
    },
    setup(props, { emit }) {
        const text = ref(props.input_text_search);

        watch(text, (newValue) => {
            emit('update:input_text_search', newValue); //input_text_search es el valor que se pasa al padre
        });

        const emitSelected = () => {
            emit('update:input_text_search', text.value);
        };

        return {
            text,
            emitSelected
        };
    }
};
</script>