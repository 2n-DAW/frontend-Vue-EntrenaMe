<script setup lang="ts">
import { defineProps, watch, ref, computed } from 'vue';

const props = defineProps({
    filteredCourtHours: {
        type: Array,
        required: true,
    },
});

const organizedData = ref<{ [key: string]: { [key: number]: string[] } }>({});

const isCourtSelected = computed(() => {
    return props.filteredCourtHours.length > 0;
});


watch(() => props.filteredCourtHours, (newData) => {
    if (!newData || newData.length === 0) {
        organizedData.value = {};
        return;
    }
    const groupedData: { [key: string]: { [key: number]: string[] } } = {};

    newData.forEach((record: any) => {
        const month = record.month?.n_month || 'N/A';
        const day = record.day_number || 0;
        const hour = record.hour?.slot_hour || 'N/A';

        if (!groupedData[month]) {
            groupedData[month] = {};
        }
        if (!groupedData[month][day]) {
            groupedData[month][day] = [];
        }

        groupedData[month][day].push(hour);
    });

    Object.keys(groupedData).forEach((month) => {
        Object.keys(groupedData[month]).forEach((day) => {
            groupedData[month][parseInt(day)] = groupedData[month][parseInt(day)].sort();
        });
    });

    organizedData.value = groupedData;
});
</script>

<template>
    <div class="w-full flex mt-16 p20">
        <div class="w-3/5 flex flex-col items-center justify-center">
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

        <div class="w-2/5 mx-auto flex flex-col items-center justify-center">
            <!-- <div v-if="isCourtSelected" class="w-full">
        <div v-for="(days, month) in organizedData" :key="month" class="mb-4">
            <h3 class="text-lg font-bold mb-2 text-center rounded">{{ month }}</h3>
            <table class="w-full border-collapse">
                <thead>
                    <tr class="bg-background3">
                        <th class="px-4 py-2 text-left">Día</th>
                        <th class="px-4 py-2 text-left">Horas</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(hours, day, index) in days" :key="day" :class="index % 2 === 0 ? 'bg-gray-100/5' : 'bg-transparent'">
                        <td class="px-4 py-2 font-semibold">{{ day }}</td>
                        <td class="px-4 py-2">
                            <div class="flex flex-wrap gap-2">
                                <button v-for="hour in hours" :key="hour"
                                    class="px-2 rounded-full text-xs bg-transparent border border-color2 text-color2 hover:bg-color2_hover">
                                    {{ hour }}
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div> -->
            <!-- <div v-else>
            <p class="text-gray-500 italic">Selecciona una pista para ver los datos.</p>
        </div> -->

            <div class="max-w-sm mx-auto bg-gray-800 border border-gray-700 rounded-lg shadow-md overflow-hidden">
                <!-- Parte superior: Imagen -->
                <img class="w-full h-48 object-cover" src="https://via.placeholder.com/300x200" alt="Imagen de ejemplo">

                <!-- Parte inferior: Campos y botón -->
                <div class="p-4">
                    <div class="mb-2">
                        <span class="block text-gray-400 text-sm font-medium">Més</span>
                        <p class="text-lg font-semibold text-white">Gener</p>
                    </div>

                    <div class="mb-2">
                        <span class="block text-gray-400 text-sm font-medium">Día</span>
                        <p class="text-lg font-semibold text-white">15</p>
                    </div>

                    <div class="mb-4">
                        <span class="block text-gray-400 text-sm font-medium">Hora</span>
                        <p class="text-lg font-semibold text-white">14:00</p>
                    </div>
                    
                    <div class="mb-4">
                        <span class="block text-gray-400 text-sm font-medium">Pista</span>
                        <p class="text-lg font-semibold text-white">Futbol 1</p>
                    </div>

                    <button
                        class="w-full bg-color2 text-background1 font-semibold py-2 px-4 rounded hover:bg-color2_hover transition">
                        Reservar
                    </button>
                </div>
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


.m2 {
    margin: 0.5rem;
}

.p20 {
    padding-left: 20%;
    padding-right: 5%;
}
</style>
