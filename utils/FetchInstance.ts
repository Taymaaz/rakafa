// import jwtDecode from "jwt-decode";
// import dayjs from "dayjs";
// import {useAuthStore} from "~/stores/authStore";
// import {BASE_URL} from "~/utils/ApiConfig";
//
//
// let originalRequest = async (url: string, config = {}) => {
//     url = `${BASE_URL}${url}`
//     let response = await fetch(url, config)
//     let data = response.json()
//     return {response, data}
// }
// let refreshToken = async (refresh: string) => {
//     let result = await fetch(`${BASE_URL}/user/token/refresh/`, {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(
//             {
//                 'refresh': refresh
//             }
//         )
//     })
//     let data = await result.json()
//     localStorage.setItem("auth-data", JSON.stringify(data))
//     const authStore = useAuthStore()
//
//     // @ts-ignore
//     authStore.loginResult=JSON.stringify(data)
//     return data
// }
// let customFetch = async (url: string, config = {}) => {
//     const authStore = useAuthStore()
//
//     let authTokens = authStore.loginResult! ?? null
//
//     const decoded_access: any = jwtDecode(authTokens.access)
//     const isExpired = dayjs.unix(decoded_access.exp).diff(dayjs()) < 1;
//
//     if (isExpired) {
//         authStore.loginResult = await refreshToken(authTokens.refresh)
//     }
//     // request with out token
//     config['headers'] = {
//         Authorization: `Bearer ${authStore.loginResult?.access}`
//     }
//     let {response, data} =await originalRequest(url, config)
//     if (response.statusText === 'Unauthorized') {
//         authStore.loginResult = await refreshToken(authTokens.refresh)
//         config['headers'] = {
//             Authorization: `Bearer ${authStore.loginResult?.access}`
//         }
//         let newResponse = await originalRequest(url,config)
//         response= newResponse.response
//         data= newResponse.data
//     }
//     return {response, data}
// }
// export default customFetch