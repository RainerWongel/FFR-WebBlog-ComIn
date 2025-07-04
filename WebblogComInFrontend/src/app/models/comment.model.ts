export interface Comment
{
    id: number;
    text: string;
    userId: number;
    postId: number;
    user?: {
        id: number;
        username: string;
    };

    parentCommentId?: number;
    parentComment?: Comment;

    replies?: Comment[];
}