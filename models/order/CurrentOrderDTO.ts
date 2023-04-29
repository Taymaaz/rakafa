import {CurrentOrderItemDTO} from "~/models/order/CurrentOrderItemDTO";

export interface CurrentOrderDTO {
  id: number;
  items: CurrentOrderItemDTO[];
  totalPrice: number;

}