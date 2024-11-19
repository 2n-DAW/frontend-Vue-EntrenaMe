<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
    <Header />
    <div class="flex">
      <router-view class="flex-1 p-6"></router-view>
    </div>
  </div>
</template>






<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header.vue';


export default defineComponent({
  name: 'App',
  components: {
    Header,
  },
});
</script>

