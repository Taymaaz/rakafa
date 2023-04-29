import {Variant} from "~/models/product/singleProductDTO";


export interface CurrentOrderItemDTO {
  id: number;
  order_id: number;
  product_id: number;
  product_url: string;
  product_title_ir: string;
  product_title_en: string;
  product_slug: string;
  product_image: string;
  variant:Variant;
  count: number;
  total_price:number;
}