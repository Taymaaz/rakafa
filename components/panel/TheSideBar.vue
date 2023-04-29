<template>
            <div>
                <client-only>
                    <div class="sidebar-widget" v-if="authStore.currentUser">
              <div class="profile-sidebar shadow-around">
                <div class="profile-sidebar-header">
                  <div class="d-flex align-items-center">
                    <div class="profile-avatar">
                      <base-image :src="GetImageUrl(authStore.currentUser?.profile_name)" alt="user profile"/>
                    </div>
                    <div class="profile-info">
                      <div class="d-block">
                        <h6><strong>
                          {{ authStore.currentUser?.first_name }} {{ authStore.currentUser?.last_name}}
                        </strong></h6>
                      </div>
                                <div class="d-block">
                        <strong class="text-muted"> {{ authStore.currentUser?.username}}</strong>
                      </div>
                    </div>
                  </div>

                </div>
                <hr class="my-2">
                <div class="user-menu">
                  <ul>
                    <li>
                      <nuxt-link to="/panel/dashboard/" active-class="active">
                        <i class="far fa-home"></i>
                        داشبورد من
                      </nuxt-link>
                    </li>
                    <li>
                      <nuxt-link to="/panel/orders/" active-class="active">
                        <i class="far fa-clipboard-list-check"></i>
                        سفارش های من
                      </nuxt-link>
                    </li>

                    <li>
                      <nuxt-link to="/panel/addresses/" active-class="active">
                        <i class="far fa-map-marked"></i>
                        دفترچه آدرس
                      </nuxt-link>
                    </li>
                                 <li>
                      <nuxt-link to="/panel/profile/" active-class="active">
                        <i class="far fa-user-cog"></i>
                        اطلاعات حساب
                      </nuxt-link>
                    </li>
                    <li>
                      <nuxt-link to="/panel/recents/" active-class="active">
                        <i class="far fa-clock"></i>
                        بازدیدهای اخیر
                      </nuxt-link>
                    </li>
                                   <li>
                      <nuxt-link to="/panel/favorite/" active-class="active">
                        <i class="far fa-heart"></i>
                        لیست علاقمندی
                      </nuxt-link>
                    </li>

                    <li>
                      <a href="#">
                        <i class="far fa-sign-in-alt"></i>
                        خروج
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
                </client-only>
            </div>

</template>

<script setup lang="ts">
import {useAuthStore} from "~/stores/authStore";
import {GetImageUrl} from "~/utils/imageURL";

const authStore = useAuthStore()
</script>

<style scoped>
.profile-sidebar .profile-avatar:after {
  background-color: unset;
}

</style>