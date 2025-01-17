import { Module } from "vuex";
import { CommentActivity } from "../shared/interfaces/entities/CommentActivity.interface";
import { CommentService } from "../services/comment.service";
import { CommentStore } from "../shared/interfaces/storeInterfaces/CommentStore.interface";

const state: CommentStore = {
    comments: [],
};

export const comment: Module<CommentStore, any> = {
    namespaced: true,
    state,

    actions: {
        async initializeComments({ commit }) {
            try {
                const response = await CommentService.getAll();
                
                if (response){
                    commit('setComments', response.comments);
                }
                

            } catch (error) {
                console.error('Error loading comments:', error);
            }
        },
        
        async addComment({ commit }, payload: { comment: CommentActivity, slug_activity: string }) {
            try {
                await CommentService.create(payload.comment, payload.slug_activity);
                const response = await CommentService.getAll();
                if (response){
                    commit('setComments', response.comments);
                }
            } catch (error) {
                console.error('Error adding comment:', error);
            }
        },
        async deleteComment({ commit }, slug: string) {
            try {
                await CommentService.delete(slug);
                const comments_filtered = state.comments.filter((comment:CommentActivity)=> comment.slug_comment !== slug);
                commit('setComments', comments_filtered);
            } catch (error) {
                console.error('Error deleting comment:', error);
            }
        }
    },

    mutations: {
        setComments(state, comments: CommentActivity[]) {
            state.comments = comments;
        },
    },
    getters: {
        allComments(state:CommentStore): CommentActivity[] {
            return state.comments;
        },
        
        allUserComments: (state: CommentStore) => (username: string): CommentActivity[] => {
            return state.comments.filter((comment:CommentActivity)=> comment.user!.username === username);
        },

        allActivityComments: (state: CommentStore) => (id_activity: number): CommentActivity[] | [] => {
            return state.comments.filter((comment:CommentActivity)=> comment.id_activity === id_activity);
        },
    },
};

