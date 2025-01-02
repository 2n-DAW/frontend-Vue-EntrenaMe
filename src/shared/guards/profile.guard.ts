import { computed } from "vue";
import { useStore } from "vuex";


export async function profileEditGuard(to:any, from:any, next:any) {
    const store = useStore();
    await store.dispatch("auth/currentUser");
    const userLogged = computed(() => store.getters['auth/getUser']);
    
    console.log(userLogged.value);

    if (to.params.username === userLogged.value.username && userLogged.value.type_user !== "admin") {
        next(); 
    } else {
        next({ name: "home" });
    }
}
