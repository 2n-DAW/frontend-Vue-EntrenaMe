<template>
    <div class="flex flex-col">
        <h3 for="search-input" class="text-text2">{{ label }}</h3>
        <input 
            type="text" 
            id="search-input" 
            class="bg-input1 text-input1_text p-1 rounded" 
            v-model="text"
            placeholder="Escribe para buscar..." 
        />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    input_text_search: {
        type: String,
        required: true,
    },
});

const emit = defineEmits(['update:input_text_search']);

const text = computed({
    get: () => props.input_text_search,
    set: (value) => emit('update:input_text_search', value),
});

</script>