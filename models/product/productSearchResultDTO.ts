
import {ProductCardDTO} from "~/models/product/ProductCard";
import {baseFilterResult} from "~/models/base/baseFilterResult";
import {CategoryDTO} from "~/models/category/categoryDTO";
import {baseFilterParams} from "~/models/base/baseFilterParams";


export interface ProductFilterResult extends baseFilterResult<ProductCardDTO> {

}

export interface ProductFilterParams extends baseFilterParams {
  categorySlug: string | undefined;
  subCategorySlug: string | undefined;
  search: string | undefined;
  onlyAvailable: boolean;
  HasDiscount: boolean;
  OrderBy: ProductSearchOrderBy | null;
  minPrice: string;
  maxPrice: string;
}

export enum ProductSearchOrderBy {
  Latest = 0,
  Expensive = 1,
  Cheapest = 2,
  Mostsale = 3,
}
