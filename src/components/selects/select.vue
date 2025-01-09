<template>
    <div class="flex flex-col">
        <h3 for="tipo-instalacion" class="text-text2">{{ label }}</h3>
        <select class="bg-input1 text-input1_text p-1 rounded" v-model="selected_option">
            <option value="" disabled>Selecciona</option>
            <option v-for="(item, index) in data" :key="index" :value="item.value">
                {{ item.label }}
            </option>
        </select>
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
    data: {
        type: Array as () => OptionSelect[],
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