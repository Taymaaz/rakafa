<template>

            <div class="side-navigation-wrapper">
                <button class="btn-toggle-side-navigation" @click="toggleMenu=true">

                    <Icon name="ion:menu" size="30"/>
                </button>
                <div :class="['side-navigation',{'toggle':toggleMenu}]">
                    <div class="site-logo-mobile d-flex justify-content-center my-3">
                        <nuxt-link to="/" class="align-items-center">
                            <img src="/images/rakafa.png" alt="فروشگاه اینترنتی راکافا">
                        </nuxt-link>
                    </div>
                    <div class="divider"></div>
                    <ul class="not-list-children">

                        <div class="row d-flex justify-content-center gap-5">

                            <client-only>
                                <template v-if="authStore.isLogin">
                                    <nuxt-link to="/panel/dashboard/">
                                        <base-button color="info" class="py-1 d-flex align-items-center gap-2">
                                            پنل کاربری
                                            <Icon name="ic:round-manage-accounts" size="20"/>

                                        </base-button>
                                    </nuxt-link>

                                    <base-button color="danger" class="py-1 d-flex align-items-center gap-2"
                                                 @click="authStore.logOut()">
                                        خروج
                                        <Icon name="majesticons:door-exit" size="20"/>
                                    </base-button>

                                </template>
                                <template v-else>
                                    <redirect-login>
                                        <base-button color="success">ورود به حساب کاربری</base-button>
                                    </redirect-login>

                                </template>
                            </client-only>

                        </div>

                    </ul>
                    <div class="divider"></div>
                    <ul class="category-list">
                        <li class="has-children py-2" v-for="(item,index) in utilStore.categories" :key="index">
                            <nuxt-link ::to="`/category/${item.slug}/`">{{ item.display_title }}</nuxt-link>
                            <ul>
                                <nuxt-link :to="`/category/${item.slug}/`" class="text-info py-2">همه دسته‌بندی‌های
                                    {{ item.title_ir }}
                                </nuxt-link>
                                <li class="py-1" :class="{'has-children':child.products.length>0}"
                                    v-if="item.children.length > 0"
                                    v-for="(child,index) in item.children" :key="index" >
                                    <nuxt-link :to="`/category/${item.slug}/${child.slug}/`">{{
                                        child.display_title
                                        }}
                                    </nuxt-link>
                                    <ul>
                                        <nuxt-link :to="`/category/${item.slug}/${child.slug}/`" class="text-info py-2">
                                            همه دسته‌بندی‌های
                                            {{ child.title_ir }}
                                        </nuxt-link>

                                        <li v-for="(product,index) in child.products " :key="index" class="py-2">
                                            <nuxt-link :to="`/product/${product.slug}`">
                                                {{ product.title_ir }}
                                            </nuxt-link>

                                        </li>
                                    </ul>
                                </li>


                            </ul>
                        </li>
                    </ul>
                    <div class="divider"></div>
                    <ul class="not-list-children">
                        <li><a href="#"><i class="fal fa-apple-crate"></i> سوپرمارکت</a></li>
                        <li><a href="#"><i class="fal fa-badge-percent"></i> پیشنهادها و تخفیف ها</a></li>
                        <li><a href="#"><i class="fal fa-plus-square"></i> فروشنده شوید</a></li>
                        <li><a href="#"><i class="fal fa-question"></i> سوالی دارید؟</a></li>
                    </ul>
                    <div class="divider"></div>
                </div>
                <div :class="['overlay-side-navigation',{'d-block':toggleMenu},{'d-none':!toggleMenu}]"
                     @click.self="toggleMenu=false"></div>
            </div>

</template>

<script setup>
import RedirectLogin from "~/components/base/util/RedirectLogin.vue";
import {useUtilStore} from "~/stores/utilStore";
import {useAuthStore} from "~/stores/authStore";

const utilStore = useUtilStore()
const authStore = useAuthStore()
const route = useRoute();
const toggleMenu = ref(false)
watch(() => route.query, () => {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 300);
    toggleMenu.value = false
})




onMounted(() => {
  const menuLinks = document.querySelectorAll('.header-responsive .side-navigation ul li.has-children > a');

  menuLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      link.classList.toggle('active');
      link.nextElementSibling.classList.toggle('active');
    });
  });
});


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
.side-navigation {
  position: fixed;
  top: 0;
  right: -290px;

    max-width: 300px;

  height: 100vh;
  background-color: #fff;
  box-shadow: -2px 0 6px rgba(0, 0, 0, 0.1);
  overflow-y: scroll;
  transition: all 0.2s ease;
  z-index: 100;
    padding: 15px;
}
</style>