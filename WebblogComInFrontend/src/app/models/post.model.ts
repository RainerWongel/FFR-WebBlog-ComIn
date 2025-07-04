import { NumberSymbol } from "@angular/common";
import { Comment } from "./comment.model";


export interface Post 
{
    title: string;
    content: string;
    userId: number;
    user: {
        id: number;
    username?: string;
    };
    categoryId: number;
    id: number;
    comments?: Comment[];
    postTags?: { tagId: number, tag:{ tagId: number, name: string}}[]
}