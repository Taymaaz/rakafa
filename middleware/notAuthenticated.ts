import {useAuthStore} from "~/stores/authStore";

export default defineNuxtRouteMiddleware(async () => {

    const authStore = await useAuthStore();
    if (authStore.isLogin) {
        return await navigateTo('/')
    }
})
