<template>
    <header class="w-full fixed top-0 flex justify-between items-center bg-header py-4 text-text1 p-5">
        <h1 class="text-2xl font-bold">EntrenaMe</h1>
        <div class="flex items-center space-x-4">
            <nav>
                <ul class="flex gap-4">
                    <li>
                        <router-link to="/home" class="hover:text-text1_hover">
                            Home
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/activities" class="hover:text-text1_hover">
                            Actividades
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/courts" class="hover:text-text1_hover">
                            Reservas
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/activities" class="hover:text-text1_hover">
                            Actividades
                        </router-link>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>




<style>
header{
  z-index: 10;
}
</style>