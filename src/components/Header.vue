<template>
    <header class="bg-gray-900 text-white p-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold">Polideportivo</h1>
        <div class="flex items-center space-x-4">
            <nav>
                <ul class="flex space-x-4">
                    <li><router-link to="/" class="hover:text-blue-400">Inicio</router-link></li>
                    <li><router-link to="/activities" class="hover:text-blue-400">Actividades</router-link></li>
                    <li><router-link to="/reservations" class="hover:text-blue-400">Reservas</router-link></li>
                    <li><router-link to="/profile" class="hover:text-blue-400">Perfil</router-link></li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Header',
    methods: {
        toggleDarkMode() {
            document.documentElement.classList.toggle('dark');
        },
    },
});
</script>

<style scoped>
/* Opcionalmente agrega estilos personalizados aquí */
</style>