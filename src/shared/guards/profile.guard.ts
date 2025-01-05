import { computed } from "vue";
import { useStore } from "vuex";


export async function profileEditGuard(to:any, from:any, next:any) {
    const store = useStore();
    await store.dispatch("auth/currentUser");
    const userLogged = computed(() => store.getters['auth/getUser']);
    

    if (to.params.username === userLogged.value.username) {
        next(); 
    } else {
        next({ name: "home" });
    }
}
