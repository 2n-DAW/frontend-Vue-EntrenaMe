<template>
    <FiltersActivities @filters="filters_Selected" />
    
    
    
    
    
    
    
    
    
    
    
    <!-- paginación -->
    
    <div class="pagination flex justify-center mb-4 justify-end fixed bottom-16 w-full">
        <nav>
            <ul class="flex space-x-2">
                <!-- Botón de Prev -->
                    <li>
                        <span role="button" tabindex="0"
                            class="w-10 h-10 flex items-center justify-center text-pagination_arrow
                                cursor-pointer transition-colors duration-300 ease-in-out hover:text-pagination_arrow_hover">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7M9 19l-7-7 7-7" />
                            </svg>
                        </span>
                    </li>
                    
                    
                    <!-- <li>
                        <span role="button" tabindex="0"
                            class="w-10 h-10 flex items-center justify-center text-pagination_arrow
                                cursor-pointer transition-colors duration-300 ease-in-out opacity-0">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7M15 5l7 7-7 7" />
                            </svg>
                        </span>
                    </li> -->
                    
                
                
                <!-- Páginas -->
            
                    <li>
                        <span role="button" tabindex="0"
                            class="w-10 h-10 flex items-center justify-center rounded-full shadow-md
                                cursor-pointer transition-colors duration-300 ease-in-out text-lg  
                                
                                bg-pagination_button_selected text-pagination_text_selected 
                                hover:text-pagination_text_selected_hover border hover:bg-pagination_button_selected_hover
                                border-pagination_border_selected hover:border-pagination_border_selected_hover">
                                
                                1
                        </span>
                    </li>
                    
                    
                    <li>
                        <span role="button" tabindex="0"
                            class="w-10 h-10 flex items-center justify-center rounded-full shadow-md
                                cursor-pointer transition-colors duration-300 ease-in-out text-lg  
                                
                                bg-pagination_button text-pagination_text border hover:text-pagination_text_hover
                                hover:bg-pagination_button_hover border-pagination_border hover:border-pagination_border_hover">
                                2
                        </span>
                    </li>
                
                
                <!-- Botón de Next -->
                    <li>
                        <span role="button" tabindex="0"
                            class="w-10 h-10 flex items-center justify-center text-pagination_arrow
                                cursor-pointer transition-colors duration-300 ease-in-out hover:text-pagination_arrow_hover">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7M15 5l7 7-7 7" />
                            </svg>
                        </span>
                    </li>  
                    
                    
                
                    <li>
                        <span role="button" tabindex="0"
                            class="w-10 h-10 flex items-center justify-center text-pagination_arrow
                                cursor-pointer transition-colors duration-300 ease-in-out opacity-0">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7M15 5l7 7-7 7" />
                            </svg>
                        </span>
                    </li>
                    
                
                
            </ul>
        </nav>
    
</div>

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
</template>





<script setup lang="ts">
import FiltersActivities from '../components/filters/FiltersActivities.vue';
import { useRouter } from 'vue-router';


const router = useRouter();

defineEmits(['filters']);

const filters_Selected = async (filters: any) => {
    console.table(filters);
    let filters_btoa = "";
    if(filters.hour!=="" || filters.day!=="" || filters.text!==""){
        filters_btoa = btoa(JSON.stringify(filters));
        router.push({ name: 'activities', query: { filtros: filters_btoa } });
    }
    else{
        router.push({ name: 'activities' });
    }
};


</script>