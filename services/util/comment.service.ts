import {AddProductCommentDTO, ProductCommentFilterResult} from "~/models/comment/CommentDTO";
import {ApiResponse} from "~/models/response/ApiResponse";
import {FetchApi} from "~/utils/CustomFechApi";


export const GetProductComments = (
    productId: number,
    pageId: number,
    take: number
): Promise<ApiResponse<ProductCommentFilterResult>> => {
    return FetchApi("/comment/productComments/", {
        params: {
            pageId: pageId,
            take: take,
            product_id: productId,
        },
    });
};
export const AddProductComment = (
  command: AddProductCommentDTO
): Promise<ApiResponse<undefined>> => {
  return FetchApi("comment/add/", {
    method: "POST",
    body: command,
  });
};
