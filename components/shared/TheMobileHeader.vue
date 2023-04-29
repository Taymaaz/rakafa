<template>

    <div class="header-responsive fixed--header-top">
        <div class="header-top">
            <shared-items-header-navbar-mobile/>

            <div class="site-logo-mobile">
                <nuxt-link to="/">
                    <img src="/images/rakafa.png" alt="فروشگاه اینترنتی راکافا">
                </nuxt-link>
            </div>
            <div class="header-tools">
                <client-only>
                    <shared-items-header-basket-mobile/>
                </client-only>

            </div>
        </div>
        <div class="header-bottom">

            <shared-items-header-search/>

            <client-only>
                <div class="header-tools">

                    <template v-if="authStore.isLogin">
                        <nuxt-link to="/panel/dashboard/">
                            <Icon name="clarity:user-line" size="26px"/>
                        </nuxt-link>
                    </template>
                    <template v-else>
                        <nuxt-link to="/login/">
                            <Icon name="mdi-light:login" size="30px"/>
                        </nuxt-link>
                    </template>

                </div>

            </client-only>

        </div>
    </div>

</template>

<script setup lang="ts">
import {useUtilStore} from "~/stores/utilStore";
import {useAuthStore} from "~/stores/authStore";

const utilStore = useUtilStore()
const authStore = useAuthStore()

</script>

<style scoped>
.site-logo-mobile img {
    width: 200px;
}

@media only screen and (max-width: 400px) {
    .site-logo-mobile img {
        max-width: 150px !important;
    }
}

@media only screen and (max-width: 300px) {
    .site-logo-mobile img {
        display: none;
        margin: 10px 0;
    }
}

</style>