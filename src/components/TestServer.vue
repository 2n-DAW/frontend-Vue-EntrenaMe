<template>
    <div>
        <h2>Prueba de Conexión al Servidor</h2>
        <button @click="testConnection">Probar Conexión</button>
        <p v-if="response">{{ response }}</p>
        <p v-if="error">{{ error }}</p>
    </div>
</template>

<script lang="ts">
console.log('--------------------');
import { defineComponent, ref } from 'vue';
import axios from 'axios';

export default defineComponent({
    name: 'TestServer',
    setup() {
        const response = ref<string | null>(null);
        const error = ref<string | null>(null);
    

        const testConnection = async () => {
            try {
                console.log('yeeeeeee');
                const res = await axios.get('http://localhost:8000/api/sports');
                response.value = `Respuesta del servidor: ${res.data}`;
                console.log(res.data);
                error.value = null;
            } catch (err) {
                response.value = null;
                console.log(err);
                error.value = `Error: ${err}`;
            }
        };
        testConnection();

        return {
            response,
            error,
            testConnection                                                                                                      ,
        };
    },
});
</script>

<style scoped>
/* Opcionalmente agrega estilos personalizados aquí */
</style>