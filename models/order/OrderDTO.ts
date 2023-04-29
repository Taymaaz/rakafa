import {AddressDTO} from "~/models/user/addressDTO";
import {OrderItemDTO} from "~/models/order/OrderItemDTO";
import {baseFilterResult} from "~/models/base/baseFilterResult";

export interface OrderFilterResult extends baseFilterResult<OrderDTO> {

}

export interface OrderDTO {
    id: number;
    status: OrderStatus;
    ordered_date: Date;
    shipped_date: Date;
    delivered_date: Date;
    total_price: number;
    total_profit: number;
    total_price_before_discount: number;
    shipping_price: number;
    transaction: string;
    tracking_code: string;
    shipping_method: OrderShippingMethodDTO;
    address: AddressDTO;
}


export interface OrderDetailDTO {
        id: number;
    status: OrderStatus;
    ordered_date: Date;
    shipped_date: Date;
    delivered_date: Date;
    total_price: number;
    total_profit: number;
    total_price_before_discount: number;
    shipping_price: number;
    transaction: string;
    tracking_code: string;
    shipping_method: OrderShippingMethodDTO;
    address: AddressDTO;
    details: OrderItemDTO[];

}

export interface OrderShippingMethodDTO {
    image: string
    name: string;

}

export enum OrderStatus {
    Pending = "pending",
    Processing = "processing",
    Shipped = "shipped",
    Delivered = "delivered",
    Canceled = "canceled",

}
