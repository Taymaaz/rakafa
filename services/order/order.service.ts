import {FetchApi} from "~/utils/CustomFechApi";
import {ApiResponse} from "~/models/response/ApiResponse";
import {OrderDetailDTO, OrderDTO, OrderFilterResult} from "~/models/order/OrderDTO";
import {CurrentOrderDTO} from "~/models/order/CurrentOrderDTO";





export const GetCurrentOrder = (): Promise<ApiResponse<CurrentOrderDTO>> => {
    return FetchApi("/order/current/")
}

export const AddItemToCurrentOrder = (productId: number, variantId: number, count: number): Promise<ApiResponse<number>> => {
    return FetchApi("/order/current/add/", {
        method: "POST",
        body: {
            productId,
            variantId,
            count
        }
    })
}

export const IncreaseOrderItemCount = (variantId: number, itemId: number): Promise<ApiResponse<any>> => {
    return FetchApi("/order/current/item/count/increase/", {
        method: "PUT",
        body: {
            itemId,
            variantId
        }
    })
}

export const DecreaseOrderItemCount = (variantId: number, itemId: number): Promise<ApiResponse<any>> => {
    return FetchApi("/order/current/item/count/decrease/", {
        method: "PUT",
        body: {
            itemId,
            variantId
        }
    })
}
export const RemoveOrderItem = (itemId: number): Promise<ApiResponse<any>> => {
    return FetchApi("/order/current/item/remove/", {
        method: "DELETE",
        body: {
            itemId,
        }
    })
}


export const PaymentRequest = (command: any): Promise<ApiResponse<any>> => {
    return FetchApi("/payment/request/", {
        method: "POST",
        body: command,
    })
}

export const GetOrders=(pageId:number,take:number):Promise<ApiResponse<OrderFilterResult>> =>{
    return FetchApi('/order/list/',{
        method:"GET",
        query:{
            pageId,
            take
        }
    })
}
export const GetOrderDetail=(transaction:number,):Promise<ApiResponse<OrderDetailDTO>> =>{
    return FetchApi('/order/'+transaction,{
        method:"GET",

    })
}