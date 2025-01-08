import { computed } from "vue";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { useStore } from "vuex";


export const instructorGuard = async (to:RouteLocationNormalized, from:RouteLocationNormalized, next:NavigationGuardNext) => {
    const store = useStore();
    await store.dispatch("auth/currentUser");
    const userLogged = computed(() => store.getters['auth/getUser']||null);
    
    if (!userLogged.value) {
        next({ name: "home" });
    }
    if (userLogged.value.type_user === 'instructor') {
        next(); 
    } else {
        next({ name: "home" });
    }
}
