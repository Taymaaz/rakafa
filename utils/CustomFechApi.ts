import {BASE_URL} from "./ApiConfig";
import {FetchError, FetchOptions} from "ofetch";
import {ApiResponse, AppStatusCode} from "~/models/response/ApiResponse";
import {useAuthStore} from "~/stores/authStore";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";

export async function FetchApi<T>(
    url: string,
    config: FetchOptions = {}
): Promise<ApiResponse<T>> {
    config = {
        baseURL: BASE_URL,
        ...config,

    };
    if (!config.headers) {
        config.headers = {};
    }
    const authStore = useAuthStore();
    if (authStore && authStore.isLogin) {

        const loginData = authStore.loginResult;
        if (loginData) {

            const decoded_access: any = jwtDecode(loginData.access)
            const isExpired = dayjs.unix(decoded_access.exp).diff(dayjs()) < 1;


            if (isExpired) {
                const isSuccess = await authStore.RefreshToken()
                if (isSuccess) {
                const loginData = authStore.loginResult;

                    //@ts-ignore
                    config.headers["Authorization"] = `Bearer ${loginData.access}`;
                }
            } else {
                //@ts-ignore
                config.headers["Authorization"] = `Bearer ${loginData.access}`;
            }
        }
    }
    //@ts-ignore
    return $fetch<ApiResponse<T>>(url, config)
        .then((res) => {
            return res;
        })
        .catch((e: FetchError) => {
            return {
                data: null,
                isSuccess: false,
                metaData: {
                    appStatusCode:
                        e.response?._data?.MetaData?.MetaData ?? AppStatusCode.ServerError,
                    message:
                        e.response?._data?.MetaData?.Message ?? "مشکلی در عملیات رخ داده",
                },
            };
        });
}

const parseJwt = (token: string) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};