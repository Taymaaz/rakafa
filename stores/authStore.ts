import {defineStore} from "pinia";

import {AppStatusCode} from "~/models/response/ApiResponse";
import {LoginResultDTO} from "~/models/auth/loginResultDTO";
import {UserDTO} from "~/models/user/userDTO";
import {GetCurrentUser} from "~/services/user/user.service";
import {useToast} from "vue-toastification";
import {Logout, RefreshUserToken} from "~/services/user/auth.service";

export const useAuthStore = defineStore("auth", () => {
    const loginResult: Ref<LoginResultDTO | null> = ref(null);
    const currentUser: Ref<UserDTO | null> = ref(null);

    const loading = ref(false);
    const isLogin = computed(() => loginResult.value != null);
    const router = useRouter()
    const toast = useToast();


    const SetCurrentUserValue = async () => {
        const localStorageData = localStorage.getItem("auth-data");


        if (!localStorageData) {

            return;
        }


        loginResult.value = JSON.parse(localStorageData);

        loading.value = true;
        let result = await GetCurrentUser();
        if (result.isSuccess) {
            currentUser.value = result.data;
        } else if (result.metaData.appStatusCode == AppStatusCode.UnAuthorize) {
            loginResult.value = null;
            localStorage.removeItem("auth-data");
        }
        loading.value = false;
    };
    const logOut = async () => {
        const authData = loginResult.value;
        if (!authData) {
            return;
        }
        loading.value = true
        const response = await Logout(authData.refresh)

        if (response.isSuccess) {
            toast.success(response.metaData.message)
            // Clear the login data and user data from the store and local storage
            loginResult.value = null;
            currentUser.value = null;
            localStorage.removeItem("auth-data");
            // Redirect to the login page with the current URL as the backUrl parameter
            await router.push({path: '/login', query: {backUrl: router.currentRoute.value.fullPath || '/'}});
        } else {
            toast.error(response.metaData.message)

        }
        loading.value = false

    };
    const RefreshToken = async () => {
        const authData = loginResult.value;
        if (!authData) return;
        loading.value = true
        const refresh_token = authData.refresh;
        const response = await RefreshUserToken(refresh_token)
        const data = await response.json(); // extract JSON body
        if (response.ok && response.status == 200) {
            loading.value = false
            loginResult.value = {
                access: data.access,
                refresh: refresh_token
            };
            localStorage.removeItem("auth-data");
            localStorage.setItem("auth-data", JSON.stringify(loginResult.value));
            return true
        } else if (response.status == 401) {
            loading.value = false
            loginResult.value = null;
            currentUser.value = null;
            localStorage.removeItem("auth-data");
            await router.push({path: '/login', query: {backUrl: router.currentRoute.value.fullPath || '/'}});
            return false
        } else {
            toast.error("وبسایت در دسترس نمیباشد")
        }


    }

    return {loading, loginResult, currentUser, SetCurrentUserValue, isLogin, logOut, RefreshToken};
});
