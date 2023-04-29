import { ApiResponse } from "~/models/response/ApiResponse";
import { CategoryDTO } from "~/models/category/categoryDTO";
import { FetchApi } from "~/utils/CustomFechApi";

export const GetAllCategory = (): Promise<ApiResponse<CategoryDTO[]>> => {
  return FetchApi("/category/list/");
};
