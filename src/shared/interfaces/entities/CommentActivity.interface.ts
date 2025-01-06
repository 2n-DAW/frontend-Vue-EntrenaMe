import { Activity } from "./Activity.interface";
import { User } from "./User.interface";

export interface CommentActivity {
    id_comment: number;
    body: string;
    date: string;
    id_user: string;
    id_activity: number;
    slug_comment: string;
    user?: User;
    activity?: Activity;
}

export interface CommentsActivities {
    comments: CommentActivity[];
}