import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const useUserCard = () => {
    const store = useStore();
    const router = useRouter();

    const userLogged = computed(() => store.getters['auth/getUser'] || '');
    const route = computed(() => router.currentRoute.value);
    const usernameUrl = computed(() => route.value.params.username);

    const profile = (username: string) => {
        router.push({ path: `/profile/${username}` });
    };
    const unfollowUser = async (username: string) => {
        try {
            await store.dispatch('auth/unFollow', { username, loggedUser: userLogged.value.username });
        } catch (error) {
            console.error('Error al dejar de seguir al usuario:', error);
        }
    };

    return {
        userLogged,
        usernameUrl,
        profile,
        unfollowUser,
    };
}

export default useUserCard;