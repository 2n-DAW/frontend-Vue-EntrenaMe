<template>
    <div class="pagination mt-8">
        <ul class="flex list-none">
            <li v-if="current_page > 1">
                <span role="button" tabindex="0"
                    class="w-10 h-10 flex items-center justify-center text-pagination_arrow cursor-pointer transition-colors duration-300 ease-in-out hover:text-pagination_arrow_hover"
                    @click="prevPage" :class="{ 'cursor-not-allowed': current_page === 1 }">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </span>
            </li>
            
            
            <li v-if="current_page <= 1">
                <span role="button" tabindex="0"
                    class="w-10 h-10 flex items-center justify-center text-disabled cursor-pointer transition-colors duration-300 ease-in-out ">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </span>
            </li>


            <li v-for="page in total_pages" :key="page">
                <span role="button" tabindex="0" class="w-10 h-10 flex items-center justify-center rounded-full shadow-md
                cursor-pointer transition-colors duration-300 ease-in-out text-lg" :class="{
                    'bg-pagination_button_selected text-pagination_text_selected hover:text-pagination_text_selected_hover border hover:bg-pagination_button_selected_hover border-pagination_border_selected hover:border-pagination_border_selected_hover': page === current_page,
                    'bg-pagination_button text-pagination_text border hover:text-pagination_text_hover hover:bg-pagination_button_hover border-pagination_border hover:border-pagination_border_hover': page !== current_page
                }" @click="goToPage(page)">
                    {{ page }}
                </span>
            </li>


            <li v-if="current_page < total_pages">
                <span role="button" tabindex="0"
                    class="w-10 h-10 flex items-center justify-center text-pagination_arrow cursor-pointer transition-colors duration-300 ease-in-out hover:text-pagination_arrow_hover"
                    @click="nextPage" :class="{ 'cursor-not-allowed': current_page === total_pages }">

                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19l7-7-7-7" />
                    </svg>
                </span>
            </li>
            
            <li v-if="current_page >= total_pages">
                <span role="button" tabindex="0"
                    class="w-10 h-10 flex items-center justify-center text-disabled cursor-pointer transition-colors duration-300 ease-in-out ">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19l7-7-7-7" />
                    </svg>
                </span>
            </li>

        </ul>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed, watch } from 'vue';

const { total_items, items_page, current_page } = defineProps({
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


const emit = defineEmits(['update:current_page_output']);
const current_page_output = computed({
    get: () => current_page,
    set: (value) => emit('update:current_page_output', value),
});


const prevPage = ():void => {
    if (current_page > 1) {
        current_page_output.value = current_page - 1;
    }
};

const nextPage = ():void => {
    if (current_page < total_pages) {
        current_page_output.value = current_page + 1;
    }
}
const goToPage = (page: number):void => {
    current_page_output.value = page;
}

watch(current_page_output, ():void => {
    emit('update:current_page_output', current_page_output.value);
});


</script>

<style scoped>
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>