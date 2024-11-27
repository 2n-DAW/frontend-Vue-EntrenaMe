<template>
    <div class="pagination">
        <ul class="flex list-none">
            <li>
                <span role="button" tabindex="0"
                    class="w-10 h-10 flex items-center justify-center text-pagination_arrow cursor-pointer transition-colors duration-300 ease-in-out hover:text-pagination_arrow_hover"
                    @click="prevPage" 
                    :class="{ 'cursor-not-allowed': current_page === 1 }">
                    
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </span>
            </li>
            
            
            <li v-for="page in total_pages" :key="page">
                <span role="button" tabindex="0"
                    class="w-10 h-10 flex items-center justify-center cursor-pointer transition-colors duration-300 ease-in-out"
                    :class="{ 'text-pagination_arrow': current_page !== page, 'text-pagination_arrow_hover': currentPage === page }"
                    @click="goToPage(page)">
                    {{ page }}
                </span>
            </li>
            
            
            <li>
                <span role="button" tabindex="0"
                    class="w-10 h-10 flex items-center justify-center text-pagination_arrow cursor-pointer transition-colors duration-300 ease-in-out hover:text-pagination_arrow_hover"
                    @click="nextPage" 
                    :class="{ 'cursor-not-allowed': current_page === total_pages }">
                    
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19l7-7-7-7" />
                    </svg>
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
    const {total_items, current_page, items_page} = defineProps({
        total_items: {
            type: Number,
            required: true,
        },
        current_page: {
            type: Number,
            required: true,
        },
        items_page: {
            type: Number,
            required: true,
        },
    });
        const total_pages = Math.ceil(total_items / items_page);
    
        
        const emit = defineEmits(['update:currentPage']);
        const currentPage = computed({
            get: () => current_page,
            set: (value) => emit('update:currentPage', value),
        });
        
    
        const prevPage = () => {
            if (current_page > 1) {
            current_page - 1;
            }
        };
        
        const nextPage = () =>{
            if (current_page < total_pages) {
                current_page + 1;
            }
        }
        const goToPage = (page) =>{
            currentPage.value = page;
        }
        
        watch(currentPage, () => {
            emit('update:currentPage', currentPage.value);
        });
        
    
</script>

<style scoped>
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>