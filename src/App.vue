<template>
 
  <body class="bg-gray-900 text-gray-100 flex flex-col min-h-screen">
    <Header />
    <div class="container mx-auto flex-grow py-10">
      <router-view class="flex-1 p-6"></router-view>
    </div>
    <Footer />
  </body>

</template>






<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header.vue';
import TestServer from './components/TestServer.vue';
import Footer from './components/Footer.vue';


export default defineComponent({
  name: 'App',
  components: {
    Header,
    TestServer,
    Footer,
  },
});
</script>

