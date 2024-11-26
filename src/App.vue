<template>
    <body class="bg-background1 text-text1 flex flex-col min-h-screen">
        <Header />
        <div class="w-full mx-auto flex-grow py-10">
            <router-view class="flex-1 p-6"></router-view>
        </div>
        <Footer />
    </body>
</template>



<script setup lang="ts">
import Header from './components/layout/Header.vue';
import Footer from './components/layout/Footer.vue';
</script>
