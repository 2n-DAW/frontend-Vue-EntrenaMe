<template>
    <div class="main_div">
        <div class="img_div">
            <ImgAuth class = "img_auth"/>
        </div>
        <div class="form_div">
         
        </div>
    </div>
</template>

<script setup lang="ts">
import ImgAuth from '../components/img_svg/imgAuth.vue';

</script>

<style>
.main_div {
    display: flex;
    margin-top: 10vh
}

.img_div {
    margin-top: 5vh;
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.form_div {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}




</style>
