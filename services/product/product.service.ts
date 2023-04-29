import { ApiResponse } from "~/models/response/ApiResponse";
import { baseFilterResult } from "~/models/base/baseFilterResult";
import { ProductCardDTO } from "~/models/product/ProductCard";
import { SingleProductDTO } from "~/models/product/singleProductDTO";
import {
  ProductFilterParams, ProductFilterResult,
} from "~/models/product/productSearchResultDTO";
import { FetchApi } from "~/utils/CustomFechApi";
import { RemoveEmptyProps } from "~/utils/objectutils";

export const getProductByFilter = (
  filterParams: ProductFilterParams
): Promise<ApiResponse<ProductFilterResult>> => {
  RemoveEmptyProps(filterParams);
  return FetchApi(`/product/search/`, {
    method: "Get",
    params: filterParams,
  });
};

export const GetProductBySlug = (
  slug: string
): Promise<ApiResponse<SingleProductDTO>> => {
  return FetchApi("/product/" + slug);
};
