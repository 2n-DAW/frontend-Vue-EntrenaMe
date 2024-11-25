<template>
    <div class="flex flex-col">
        <h3 for="search-input" class="text-gray-400">{{ label }}</h3>
        <input 
            type="text"
            id="search-input"
            class="bg-gray-700 text-gray-100 p-1 rounded"
            v-model="text"
            placeholder="Escribe para buscar..."
        />
    </div>
</template>

<script>
import { computed } from 'vue';

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
        const text = computed({
            get: () => props.input_text_search,
            set: (value) => emit('update:input_text_search', value)
        });

        return {
            text
        };
    }
};
</script>
