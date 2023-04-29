import { ApiResponse } from "~~/models/response/ApiResponse";

import { getProductByFilter } from "~/services/product/product.service";
import {ProductFilterParams, ProductFilterResult} from "~/models/product/productSearchResultDTO";

export const useSearch = () => {
  const route = useRoute();
  const router = useRouter();

  const getFilterParams = (): ProductFilterParams => {
    const params = route.path.split("/");

    const res = {
      categorySlug: params[2],
      subCategorySlug: params[3],
      pageId: Number(route.query.pageId?.toString() ?? "1"),
      search: route.query.q?.toString(),
      take: Number(route.query.take?.toString() ?? "12"),
      HasDiscount: getBoolean(route.query.HasDiscount?.toString()),
      onlyAvailable: getBoolean(
          route.query.onlyAvailable?.toString()
      ),

      OrderBy:
      //@ts-ignore
          (route.query.OrderBy as ProductSearchOrderBy) ?? null,

      minPrice: (route.query.minPrice?.toString() ?? ''),
      maxPrice: (route.query.maxPrice?.toString() ?? ''),
    } as ProductFilterParams;

    return res;
  };
  const changePageId = async (pageId: number) => {
    var currentPath = route.path;
    var queryParams = route.query;
    await router.push({
      path: currentPath,
      query: { ...queryParams, pageId },
    });
  };

  const getProducts = (): Promise<ApiResponse<ProductFilterResult>> => {
    const params = getFilterParams();
    return getProductByFilter(params);
  };

  return { getFilterParams, getProducts, changePageId };
};

// @ts-ignore
function getBoolean(value): boolean {
  switch (value) {
    case true:
    case "true":
    case 1:
    case "1":
      return true;
    default:
      return false;
  }
}
