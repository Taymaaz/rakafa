import {useAuthStore} from "~/stores/authStore";

export default  defineNuxtRouteMiddleware( (to, from) => {
    const authStore =  useAuthStore();
     if (!authStore.isLogin) {
        return navigateTo(`/login?backUrl=${to.fullPath}`)
    }
})

