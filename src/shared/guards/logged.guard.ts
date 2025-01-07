import { computed } from "vue";
import { useStore } from "vuex";
import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";

export const loggedGuard = async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const store = useStore();
    await store.dispatch("auth/currentUser");
    const userLogged = computed(() => store.getters["auth/getIsLogged"]);

    if (!userLogged.value) {
        next(); 
    } else {
        next({ name: "home" });
    }
}
