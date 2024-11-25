<template>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <Selector 
            label="Tipo de instalación" 
            :data="[
                { value: '1', label: 'Gimnasio' },
                { value: '2', label: 'Piscina' },
                { value: '3', label: 'Pista de atletismo' }
            ]" 
            v-model:selected="selected1"
        />
        <Selector 
            label="Tipo de instalación" 
            :data="[
                { value: '4', label: 'Gimnasio' },
                { value: '5', label: 'Piscina' },
                { value: '6', label: 'Pista de atletismo' }
            ]" 
            v-model:selected="selected2"
        />
        
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import Selector from '../selects/select.vue';


const store = useStore();
store.dispatch('');








const selected1 = ref('');
const selected2 = ref('');
const selected3 = ref('');
const selected4 = ref('');
const selected5 = ref('');
const selected6 = ref('');

watch(selected1, (newValue) => {
    console.log("selected1", newValue);
});

watch(selected2, (newValue) => {
    console.log("selected2", newValue);
});

watch(selected3, (newValue) => {
    console.log("selected3", newValue);
});

watch(selected4, (newValue) => {
    console.log("selected4", newValue);
});

watch(selected5, (newValue) => {
    console.log("selected5", newValue);
});

watch(selected6, (newValue) => {
    console.log("selected6", newValue);
});





</script>