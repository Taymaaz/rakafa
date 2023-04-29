import {ApiResponse} from "~/models/response/ApiResponse";
import {FetchApi} from "~/utils/CustomFechApi";
import {DiscountDTO} from "~/models/order/DiscountDTO";

export const UseCoupon = (code:string): Promise<ApiResponse<DiscountDTO>> => {
    return FetchApi("/coupon/use/", {
        method: "POST",
        body: {
            code
        }
    })
}