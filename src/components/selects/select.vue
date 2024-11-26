<template>
    <div class="flex flex-col">
        <h3 for="tipo-instalacion" class="text-text2">{{ label }}</h3>
        <select 
            class="bg-imput1 text-imput1_text p-1 rounded"
            v-model="selected_option">
            <option value="" disabled>Selecciona</option>
            <option 
                v-for="(item, index) in data" 
                :key="index" 
                :value="item.value">
                {{ item.label }}
            </option>
        </select>
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
        data: {
            type: Array,
            required: true
        },
        selected: {
            type: String,
            required: true
        }
    },

    setup(props, { emit }) {
        
        const selected_option = computed({
            get: () => props.selected, // Obtiene el valor actual de la prop
            set: (value) => emit('update:selected', value) // Emite el nuevo valor
        });

        return {
            selected_option
        };
    }
};
</script>
