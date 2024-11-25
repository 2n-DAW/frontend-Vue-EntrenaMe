<template>
    <div class="flex flex-col">
        
        <h3 for="tipo-instalacion" class=" text-gray-400">{{ label }}</h3>
        
        <select 
            class="bg-gray-700 text-gray-100  p-1 rounded"
            v-model="selected_option"
            @change="emitSelected">
            
            <option value="" disabled selected>Selecciona</option>
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
import { ref } from 'vue'; // Importamos ref para manejo reactivo de estados

export default {
    props: {
        label: {
            type: String,
            required: true
        },
        data: {
            type: Array,
            required: true
        }
    },
    setup(props, { emit }) {
        // Estado reactivo para la opción seleccionada
        const selected_option = ref('');

        const emitSelected = () => {
            emit('update:selected', selected_option.value);
        };

        return {
            selected_option,
            emitSelected
        };
    }
};
</script>