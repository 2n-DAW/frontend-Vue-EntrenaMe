import { computed } from "vue";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { useStore } from "vuex";


export const profileEditGuard = async (to:RouteLocationNormalized, from:RouteLocationNormalized, next:NavigationGuardNext) => {
    const store = useStore();
    await store.dispatch("auth/currentUser");
    const userLogged = computed(() => store.getters['auth/getUser']);
    

    if (to.params.username === userLogged.value.username) {
        next(); 
    } else {
        next({ name: "home" });
    }
}
