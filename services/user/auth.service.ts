import { ApiResponse } from "~/models/response/ApiResponse";
import {AuthResultDTO, LoginResultDTO, ResetResultDTO} from "~/models/auth/loginResultDTO";
import { FetchApi } from "~/utils/CustomFechApi";
import {BASE_URL} from "~/utils/ApiConfig";




export function Login(
  phoneNumber: string,
  password?: string ,
  code?:string
): Promise<ApiResponse<LoginResultDTO>> {
  return FetchApi("/auth/login/", {
    method: "Post",
    body: {
      phone_number: phoneNumber,
      password: password,
      code: code,
    },
  })
}

export function Logout(
  refresh: string ,
): Promise<ApiResponse<null>> {
  return FetchApi("/auth/logout/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refresh
      }),
  })
}
export function RefreshUserToken(
  refresh: string ,
): Promise<Response> {
  return fetch(`${BASE_URL}/user/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refresh
      }),
  })
}


export function Auth(
  phoneNumber: string,
): Promise<ApiResponse<AuthResultDTO>> {

  return FetchApi("/auth/", {
    method: "Post",
    body: {
      phone_number: phoneNumber,
    },
  });
}

export function SendOTP(
  phoneNumber: string,
): Promise<ApiResponse<AuthResultDTO>> {

  return FetchApi("http://127.0.0.1:8000/api/v1/auth/send-otp/", {
    method: "Post",
    body: {
      phone_number: phoneNumber,
    },
  });
}
export function ResetPassword(
  phoneNumber: string,
  section: string ,
  code?:string,
  password?: string ,
  confirmPassword?: string ,
): Promise<ApiResponse<ResetResultDTO>> {
  return FetchApi("http://127.0.0.1:8000/api/v1/auth/reset/", {
    method: "Post",
    body: {
      phone_number: phoneNumber,
      section: section,
      code: code,
      password: password,
      confirm_password: confirmPassword,
    },
  })
}