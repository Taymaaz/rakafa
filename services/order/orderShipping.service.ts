import {ApiResponse} from "~/models/response/ApiResponse";
import {FetchApi} from "~/utils/CustomFechApi";
import {ShippingPriceDTO} from "~/models/order/ShippingMethodDTO";


export const GetShippingMethods = (): Promise<ApiResponse<ShippingPriceDTO[]>> =>
{
return FetchApi('/order/shipping/')
}