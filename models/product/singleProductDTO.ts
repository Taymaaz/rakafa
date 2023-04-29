import {UserDTO} from "@/models/user/userDTO";
import {CategoryDTO} from "~/models/category/categoryDTO";

export interface SingleProductDTO {
    id: number;
    url: string;
    title_ir: string;
    title_en: string;
    slug: string;
    description: string;
    sku: number;
    suggested: boolean;
    available_in_stock: boolean;
    variant_type: VariantType;
    category: CategoryDTO;
    brand: string;
    color: string;
    medias: Media[];
    variants: Variant[];
    image: string;
    visit_count: number;
    properties: Property[];

    breadcrumbs: ProductCategoryBreadcrumbs[];
}
export interface ProductCategoryBreadcrumbs{
    title:string,
    url:string,
}

export interface VariantType {
    id: number;
    title_ir: string;
    title_en: string;
    select_style: string;
    is_none: boolean;
}



export interface Media {
    id: number;
    type: string;
    title: string;
    file: string;
}

export interface Value {
    id: number;
    prefix: VariantValuePrefix
    value: string;
    color_code: string | null;
    type: number;
}

export interface VariantValuePrefix {
    id: number;
    name: string,

}

export interface Variant {
    id: number;
    type: VariantType;
    value: Value;
    price: number;
    special_price: number | null;
    stock: number;
    final_price: number;
    special_price_percent: number | null;
    is_special: boolean;
}

export interface Property {
    id: number;
    product: number;
    property: PropertyInfo
    value: string;
}

export interface PropertyInfo {
    id: number;
    name: string;

}

