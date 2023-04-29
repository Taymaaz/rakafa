import {Variant, VariantType} from '@/models/product/singleProductDTO'
import {CategoryDTO} from "~/models/category/categoryDTO";

export interface ProductCardDTO {
    id: number;
    url: string;
    image: string;
    title_ir: string;
    title_en: string;
    slug: string;
    price: number;
    special_price: number;
    special_price_percent: number;
    has_any_special_price: number;
    final_price: number;
    sku: number;
    suggested: boolean;
    available_in_stock: boolean;
    variant_type: VariantType;
    variants: Variant[];
    category: CategoryDTO;
    brand: string;
    color: string;
}
