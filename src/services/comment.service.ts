import ApiService from "../core/api.service";
import { CommentActivity, CommentActivityCreate, CommentsActivities } from "../shared/interfaces/entities/CommentActivity.interface";

export const CommentService = {
    getAll(): Promise<CommentsActivities> {
        return ApiService.get<CommentsActivities>("activities/comments/detailed");
    },
    create(comment: CommentActivityCreate, slug: string): Promise<CommentActivity> {
        return ApiService.post(`activities/${slug}/comments`, comment);
    },
    delete(slug: string) {
        return ApiService.delete(`activities/comments/${slug}`);
    },
};


