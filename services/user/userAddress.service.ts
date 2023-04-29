import {FetchApi} from "~/utils/CustomFechApi";
import {
    AddressDTO,
    CreateAddressDTO,
    EditAddressDTO,
} from "~/models/user/addressDTO";
import {ApiResponse} from "~/models/response/ApiResponse";

export const GetAddressList = (): Promise<ApiResponse<AddressDTO[]>> => {
    return FetchApi("/user/address/");
};
export const CreateAddress = (
    command: CreateAddressDTO
): Promise<ApiResponse<undefined>> => {
    return FetchApi("/user/address/", {
        method: "POST",
        body: command,
    });
};
export const EditAddress = (
    command: EditAddressDTO
): Promise<ApiResponse<undefined>> => {
    return FetchApi("/user/address/", {
        method: "PUT",
        body: command,
    });
};

export const RemoveAddress = (id: number): Promise<ApiResponse<undefined>> => {
    return FetchApi("/user/address/", {
        method: "DELETE",
        body: {
            id,
        }
    });
};
export const SetActiveAddress = (
    id: number
): Promise<ApiResponse<undefined>> => {
    return FetchApi(`/user/address/main/${id}/`, {
        method: "PUT",
    });
};
export const GetAddressById = (
    id: number
): Promise<ApiResponse<AddressDTO>> => {
    return FetchApi(`/user/address/get/${id}/`);
};
