import {ApiResponse} from "~/models/response/ApiResponse";
import {FetchApi} from "~/utils/CustomFechApi";
import {SearchResultDTO} from "~/models/search/SearchResultDTO";


export const useSearchResult = (
    q: string
): Promise<ApiResponse<SearchResultDTO>> => {
    return FetchApi(`/search/`, {
        method: "GET",
        params: {
            q
        }
    });
};
