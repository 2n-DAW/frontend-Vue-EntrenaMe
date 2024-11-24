<template>
    <SportList />
</template>











<script lang="ts">
import { defineComponent } from 'vue';
import SportList from '../components/lists/SportList.vue';

console.log("home");
export default defineComponent({
    name: 'Home',
    components: {
        SportList,
    },
});
</script>

<style scoped>
</style>