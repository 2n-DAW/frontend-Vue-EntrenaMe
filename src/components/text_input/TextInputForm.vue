<template>
    <div class="flex flex-col ">
        <label :for="id" class="text-text2">{{ label }}</label>
        <input 
            :type="type" 
            :id="id" 
            :placeholder="placeholder"
            :class="['bg-input1 text-input1_text p-2 rounded', { 'border border-red-500': error }]"
            v-model="text" />
        <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: 'text',
    },
    id: {
        type: String,
        required: true,
    },
    placeholder: {
        type: String,
        default: '',
    },
    data: { 
        type: String,
        required: true,
    },
    error: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['update:data']);

const text = computed({
    get: () => props.data, 
    set: (value) => emit('update:data', value), 
});
</script>

<style scoped>
.border-red-500 {
    border: 1px solid red;
}
</style>
