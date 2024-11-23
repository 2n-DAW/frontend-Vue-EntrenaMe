<template>
    <header class="w-full fixed top-0 flex justify-between items-center bg-gray-800 py-4 text-gray-100 p-5">
        <h1 class="text-2xl font-bold">EntrenaMe</h1>
        <div class="flex items-center space-x-4">
            <nav>
                <ul class="flex gap-4">
                    <li>
                        <router-link to="/home" class="hover:text-blue-400">
                            Home
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/courts" class="hover:text-blue-400">
                            Reservas
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/activities" class="hover:text-blue-400">
                            Actividades
                        </router-link>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>




<script>
</script>

