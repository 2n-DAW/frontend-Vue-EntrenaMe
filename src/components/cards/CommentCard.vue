<script setup lang="ts">
import { defineProps } from 'vue';
import { CommentActivity } from '../../shared/interfaces/entities/CommentActivity.interface';
import useComment from '../../composables/useComment';

const props = defineProps<{ comment: CommentActivity }>();

const { user_logged, deleteComment, formatedDate } = useComment(props.comment);
</script>



<template>
    <div class="comments-section w-full shadow rounded-lg bg-background3 p-4">
        <div class="card mb-4">
            <div class="card-block pl-4 pt-2 pb-2 bg-background2 rounded-lg border border-color1">
                <p class="card-text">
                    {{ props.comment.body }}
                </p>
            </div>
            <div class="card-footer flex items-center space-x-4 mt-4">
                <div class="flex items-center space-x-2 w-1/4 justify-center">
                    <router-link :to="`/profile/${props.comment.user!.username}`" class="comment-user">
                        <img :src="`../public/img/users/${props.comment.user!.img_user}`"
                            alt="user image" class="comment-user-img w-8 h-8 rounded-full" />
                    </router-link>
                    <router-link :to="`/profile/${props.comment.user!.username}`"
                        class="comment-user text-color1 font-bold hover:underline">
                        {{ props.comment.user!.username }}
                    </router-link>

                </div>

                
                
                
                <span class="date-posted block text-gray-500 text-sm w-1/4 flex justify-center">
                    {{ formatedDate }}
                </span>
                
                <div class="flex items-center w-1/4 justify-center">
                    <router-link :to="`/activities/${props.comment.activity!.slug_activity}`"
                        class="comment-user text-color2 font-bold hover:underline">
                        {{ props.comment.activity!.n_activity }}
                    </router-link>
                </div>
                
                
                

                <span v-if="props.comment.user!.username === user_logged.username" class="mod-options cursor-pointer flex items-center text-sm text-rojo_pastel
            pl-1 hover:scale-105 duration-200 ease-in-out w-1/4 justify-center">
                    <button @click="deleteComment(props.comment.slug_comment)"
                        class="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition ease-in-out">
                        Eliminar
                    </button>
                </span>

            </div>
        </div>
    </div>
</template>