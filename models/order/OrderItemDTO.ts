import {Variant} from "~/models/product/singleProductDTO";

export interface OrderItemDTO {
  id: number;
  product_id: number;
  product_url: string;
  product_title_ir: string;
  product_title_en: string;
  product_image: string;
  variant:Variant
  count: number;
  refund_status:RefundStatusDTO;
  final_price : number;
  final_price_before_discount : number;
}
export enum RefundStatusDTO {
  NotRequested="notrequested",
  Requested="requested",
  Accepted="accepted",
  NotAccepted="notaccepted",
}
