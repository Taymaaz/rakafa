import {baseFilterResult} from "~/models/base/baseFilterResult";
import {UserDTO} from "~/models/user/userDTO";

export interface CommentDTO {
    id: number;
    product: number;
    comment: string;
    suggest: UserSuggest;
    score: string;
    create_date: string;
    accept_by_admin: boolean;
}

export interface ProductCommentFilterResult
    extends baseFilterResult<CommentDTO> {
}

export enum UserSuggest {
    Suggest = 'y',
    NotSuggest = 'n',
}

export interface AddProductCommentDTO {
    user: number;
    product: number;
    comment: string;
    suggest: UserSuggest;
    score: string;

}
