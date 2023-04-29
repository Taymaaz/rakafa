import { ChangePasswordDTO } from "~/models/user/changePasswordDTO";
import { ApiResponse } from "~/models/response/ApiResponse";
import { UserDTO } from "~/models/user/userDTO";
import { FetchApi } from "~/utils/CustomFechApi";

export const GetCurrentUser = (): Promise<ApiResponse<UserDTO>> => {
  return FetchApi<UserDTO>("/user/current/");
};

export const EditUser = (
  editModel: FormData
): Promise<ApiResponse<undefined>> => {
  return FetchApi("/user/current/", {
    method: "PUT",
    body: editModel,
  });
};

export const ChangePassword = (
  command: ChangePasswordDTO
): Promise<ApiResponse<undefined>> => {
  return FetchApi("/user/current/password/", {
    method: "PUT",
    body: command,
  });
};
