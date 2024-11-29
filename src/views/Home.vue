<template>



    <section class="bg-background2 text-white py-10 mt-4 w-full">
        <div class="container mx-auto px-4 flex items-center space-x-8">

            <div class="w-1/4">
                <img src="img_home/EmpleaMe.png" alt="Imagen Corporativa">
            </div>

            <div class=" mx-auto w-2/4 ">
                <h2 class="text-4xl font-bold mb-4">EmpleaMe</h2>
                <p class="text-xl mb-8">Tu próximo empleo, a un clic de distancia.</p>









                <div class="max-w-max flex items-center space-x-4">

                    <div class="relative ">
                        <input placeholder="Busca tus ofertas de trabajo"
                            class="w-96 px-3 py-2 border  border-color2 rounded-xl focus:ring-2 bg-input1 focus:outline-none text-input1_text" />


                        <div class="absolute z-10 bg-input1 border border-color2 rounded-xl mt-1 w-full shadow-lg text-input1_text">
                            <div class="p-2 cursor-pointer hover:bg-backgoround3 text-input1_text"></div>
                        </div>
                        
                        
                    </div>


                    <div>
                        <button
                            class="bg-button1 text-text1 px-3 py-2 rounded-full hover:bg-button1_hover  focus:outline-none">
                            Buscar
                        </button>
                    </div>
                </div>









            </div>
        </div>
    </section>














    <SportList />
</template>

<script setup lang="ts">
import SportList from '../components/lists/SportList.vue';
</script>
