<template>
    <div class="flex flex-col">
        <label :for="id" class="text-text2">{{ label }}</label>
        <select 
            :id="id" 
            :class="['bg-input1 text-input1_text p-2 rounded', { 'border border-red-500': error }]"
            v-model="selectedValue">
            <option value="" disabled>{{ placeholder }}</option>
            <option v-for="option in options" :key="option.value" :value="option.value">
                {{ option.label }}
            </option>
        </select>
        <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { OptionSelect } from '../../shared/interfaces/select/OptionSelect.interface';

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    options: {
        type: Array as () => OptionSelect[],
        required: true,
    },
    data: { 
        type: String,
        required: true,
    },
    error: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['update:data']);

const selectedValue = computed({
    get: () => props.data,
    set: (value) => emit('update:data', value),
});
</script>

<style scoped>
.border-red-500 {
    border: 1px solid red;
}
</style>
