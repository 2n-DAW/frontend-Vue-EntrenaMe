import { computed } from 'vue';
import { useStore } from 'vuex';

import { formatDate } from '../shared/utils/date/formatDate.util';
import { CommentActivity } from '../shared/interfaces/entities/CommentActivity.interface';

const useComment = (comment: CommentActivity) =>{
    const store = useStore();
    const user_logged = computed(() => store.getters['auth/getUser'] || '');


    const deleteComment = async (slug: string) => {
        try {
            await store.dispatch('comment/deleteComment', slug);
        } catch (error) {
            console.error('Error eliminando comentario:', error);
        }
    };
    
    const formatedDate = computed(() => formatDate(comment.date));

    return {
        user_logged,
        deleteComment,
        formatedDate
    };
}
export default useComment;
