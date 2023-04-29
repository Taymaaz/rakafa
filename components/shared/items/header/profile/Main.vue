<template>
    <div>
        <template v-if="authStore.loading===false">
            <div class="user-item account" @click="showDropdown=true" @mouseleave="showDropdown=false">
                <template v-if="authStore.isLogin">
                    <a type="button">

                  <span class="header-profile-dropdown-user-img">
                    <Icon name="clarity:user-line" size="26px"/>
                  <i class="fal fa-chevron-down text-sm mr-1"></i>

                  </span>
                    </a>
                    <ul :class="['dropdown--wrapper',{'active':showDropdown}]">
                        <li class="header-profile-dropdown-account-container d-block pr-0">
                            <nuxt-link to="/panel/dashboard/"
                                       class="account-container-header account-container-items full-width pb-2 account-container-items-border">
                                                      <span class="header-profile-dropdown-user pointer">
                                                        <base-image
                                                                :src="GetImageUrl(authStore.currentUser?.profile_name)"/>

                                                          <span class="header-profile-dropdown-user-info">
                                                              <p class="header-profile-dropdown-user-name text-dark mb-0">
                                                                  {{ authStore.currentUser?.username }}
                                                              </p>

                                                          </span>
                                                      </span>
                            </nuxt-link>
                        </li>

                        <nuxt-link to="/panel/orders/"
                                   class="account-container-items py-2 pr-4 d-flex text-dark account-container-items-border">
                            <li>
                      <span class="pointer">
                       <Icon name="ph:shopping-cart-thin" size="20px"/>


                        سفارش ها
                      </span>
                            </li>
                        </nuxt-link>
                        <nuxt-link to="/panel/favorite/"
                                   class="account-container-items py-2 pr-4 d-flex text-dark account-container-items-border">
                            <li>
                      <span class="pointer">
                                        <Icon name="ph:heart-light" size="20px"/>


                        علاقه مندی ها
                      </span>
                            </li>
                        </nuxt-link>


                        <li class="account-container-items py-2 pr-4 d-flex text-danger"
                            @click="authStore.logOut()">

                    <span class="pointer">
                                                         <Icon name="humbleicons:logout" size="20px"/>


                        خروج از حساب کاربری
                      </span>
                        </li>


                    </ul>
                </template>
                <template v-else>
                    <base-util-redirect-login class="btn-auth">
                        <i class="fal fa-user-circle"></i>
                        ورود و عضویت
                    </base-util-redirect-login>
                </template>
            </div>
        </template>
    </div>
</template>

<script setup>

import {GetImageUrl} from "~/utils/imageURL";
import {useAuthStore} from "~/stores/authStore";

const authStore = useAuthStore();
const showDropdown = ref(false)
</script>

<style scoped>

header.page-header .bottom-page-header .user-items .user-item.account ul.active {
    display: block;
}


header.page-header .bottom-page-header .user-items .user-item.account:hover > a i {
    transform: unset;
}

header.page-header .bottom-page-header .user-items .user-item {
    margin-right: 0;
    position: relative;
}

.header-profile-dropdown-user img {
    width: 50px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 5px

}


.account-container-items {
    font-size: 15px;
    border-radius: 10px !important;
    padding: 10px 25px 10px 0 !important;
    cursor: pointer !important;
}

.account-container-items-border {
    border-bottom: 1px solid #eee !important;
}

.account-container-items:hover {
    background: #f1f2f4;
    border-radius: 10px;

}

.account-container-header {
    padding-right: 0 !important;
}

header.page-header .bottom-page-header .user-items .user-item.account ul li.header-profile-dropdown-account-container {
    display: flex !important;
    cursor: unset;
}

.full-width {

    width: 100%;
}

.pointer {
    cursor: pointer !important;

}

header.page-header .bottom-page-header .user-items .user-item.account ul li.header-profile-dropdown-account-container a .header-profile-dropdown-user .header-profile-dropdown-user-info .header-profile-dropdown-user-name {
    font-size: 16px !important;
}

.header-profile-dropdown-user img {
    cursor: pointer;
}
</style>