<script setup lang="ts">
</script>

<template>
    <div class="w-1/2 mx-auto flex flex-col items-center justify-center mt-16">


        <div class="flex justify-between w-full">

            <div class="w-9/12 aspect_athletics rounded-capsule bg-color1"></div>


            <div class="w-3/12 flex flex-col items-center justify-center">
                <div class="w-2/3 aspect_volley bg-color1 m2"></div>
                <div class="w-2/3 aspect_volley bg-color1 m2"></div>
                <div class="w-2/3 aspect_volley bg-color1 m2"></div>
                <div class="w-2/3 flex justify-between">
                    <div class="w-5/12 aspect_padel bg-color1 m2"></div>
                    <div class="w-5/12 aspect_padel bg-color1 m2"></div>
                </div>
            </div>
        </div>

        <div class="flex justify-between w-full mb-4">

            <div class="w-1/6 flex flex-col items-center justify-center m2">
                <div class="w-full aspect_tenis bg-color1 m2"></div>
                <div class="w-full aspect_tenis bg-color1 m2"></div>
            </div>

            <div class="w-1/6 flex flex-col items-center justify-center m2">
                <div class="w-full aspect_basketball bg-color1 m2"></div>
            </div>

            <div class="w-1/6 flex flex-col items-center justify-center m2">
                <div class="w-full aspect_basketball bg-color1 m2"></div>
            </div>
            
            <div class="w-2/5 flex flex-col items-center justify-center m2">
                <div class="w-full aspect_football bg-color1 m2"></div>
            </div>

            
        </div>
    </div>
</template>

<style scoped>
.aspect_athletics {
    aspect-ratio: 2 / 1;
}

.aspect_basketball {
    aspect-ratio: 3 / 5;
}

.aspect_football {
    aspect-ratio: 5 / 3;
}

.aspect_volley {
    aspect-ratio: 5 / 3;
}

.aspect_padel {
    aspect-ratio: 3 / 5;
}

.aspect_tenis {
    aspect-ratio: 5 / 3;
}

.aspect-1-2 {
    aspect-ratio: 1 / 2;
}

.rounded-capsule {
    border-radius: 50% / 100%;
    border-end-end-radius: 0;
}

.rounded-full {
    border-radius: 50%;
}


.m2 {
    margin: 0.5rem;
}
</style>
