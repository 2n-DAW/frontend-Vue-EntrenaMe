<template>
    <div class="flex flex-col">
        <h3 for="tipo-instalacion" class="text-text2">{{ label }}</h3>
        <select class="bg-imput1 text-imput1_text p-1 rounded" v-model="selected_option">
            <option value="" disabled>Selecciona</option>
            <option v-for="(item, index) in data" :key="index" :value="item.value">
                {{ item.label }}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface DataItem {
    value: string;
    label: string;
}

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    data: {
        type: Array as () => DataItem[],
        required: true,
    },
    selected: {
        type: String,
        required: true,
    },
});

const emit = defineEmits(['update:selected']);

const selected_option = computed({
    get: () => props.selected, // Accede al valor actual de 'selected' desde props
    set: (value) => emit('update:selected', value), // Emite el nuevo valor
});
</script>