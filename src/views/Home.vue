<template>
    
    <section class="bg-background2 text-white py-10 mt-4 w-full">
        <div class="container mx-auto px-4 flex items-center space-x-8">

            <div class="w-1/4">
                <img src="img_home/EmpleaMe.png" alt="Imagen Corporativa">
            </div>

            <div class=" mx-auto w-2/4 ">
                <h2 class="text-4xl font-bold mb-4">EntrenaMe</h2>
                <p class="text-xl mb-8">No hay escusa, actívate.</p>

                <SearchHome />
                
            </div>
        </div>
    </section>

    <SportList />
</template>

<script setup lang="ts">
import SportList from '../components/lists/SportList.vue';
import SearchHome from '../components/search/SearchHome.vue';
</script>
