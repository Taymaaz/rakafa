import {ApiResponse} from "~/models/response/ApiResponse";
import {FetchApi} from "~/utils/CustomFechApi";
import {ProductCardDTO} from "~/models/product/ProductCard";

export const GetCurrentFavorite = (): Promise<ApiResponse<ProductCardDTO[]>> => {
    return FetchApi("/product/user/favorite/")
}
export const AddProductToFavorite = (productId: number): Promise<ApiResponse<undefined>> => {
    return FetchApi("/product/user/favorite/", {
        method: "POST",
        body: {
            productId,
        }
    })
}
export const RemoveProductFromFavorite = (productId: number): Promise<ApiResponse<undefined>> => {
    return FetchApi("/product/user/favorite/", {
        method: "DELETE",
        body: {
            productId,
        }
    })
}