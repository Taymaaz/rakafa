<template>
    <div>

        <div class="row mb-4">

            <client-only>
                <div class="col-lg-12 mb-lg-0 ">
                <section class="shadow-around p-3">
                    <div class="section-title mb-2">
                        سفارش‌های من

                    </div>

                    <div class="row">

                        <div class="col-lg-4 mb-4">
                            <div class="d-flex align-items-center">
                               <span>
                                   <Icon name="mdi:truck-fast-outline" class="text-info" size="60"/>
                               </span>
                                <span><strong>0</strong> سفارش جاری</span>
                            </div>
                        </div>

                        <div class="col-lg-4 mb-4">
                            <div class="d-flex align-items-center">
                               <span>
                                   <Icon name="mdi:cart-check" class="text-success" size="60"/>
                               </span>
                                <span><strong>0</strong> سفارش تحویل داده شده</span>
                            </div>
                        </div>

                        <div class="col-lg-4 mb-4">
                            <div class="d-flex align-items-center">
                               <span>
                                   <Icon name="mdi:credit-card-refund-outline" class="text-yellow" size="60"/>
                               </span>
                                <span><strong>0</strong> سفارش مرجوع شده</span>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
            <div class="col-lg-12 mb-lg-0  mt-3">
                <section class="shadow-around p-3">
                    <div class="section-title mb-2">
                        اطلاعات شخصی

                    </div>

                    <div class="row" v-if="authStore.currentUser !==null">
                        <div class="col-lg-6 mb-4">
                            <div class="text-sm text-muted">نام و نام خانوادگی</div>
                            <div class="text-dark font-weight-bold">
                                {{ authStore.currentUser.first_name ?? "-" }} {{
                                authStore.currentUser.last_name ?? "-"
                                }}

                            </div>
                        </div>
                        <div class="col-lg-6 mb-4">
                            <div class="text-sm text-muted">کد ملی</div>
                            <div class="text-dark font-weight-bold"> {{
                                authStore.currentUser.national_code ?? "-"
                                }}
                            </div>
                        </div>
                        <div class="col-lg-6 mb-4">
                            <div class="text-sm text-muted">شماره موبایل</div>
                            <div class="text-dark font-weight-bold">
                                {{ authStore.currentUser.phone ?? "-" }}
                            </div>
                        </div>
                        <div class="col-lg-6 mb-4">
                            <div class="text-sm text-muted">ایمیل</div>
                            <div class="text-dark font-weight-bold">
                                {{ authStore.currentUser.email ?? "-" }}
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="text-right">
                                <nuxt-link to="/panel/profile/">
                                    <base-button>
                                        ویرایش اطلاعات شخصی
                                    </base-button>
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div class="col-lg-12 mb-lg-0 mt-3" v-if="favoriteStore.items.length > 0">

                <section class="shadow-around p-3">
                    <div class="section-title mb-2">
                        لیست آخرین علاقه‌مندی‌ها
                    </div>
                    <div class="row">
                        <div class="col-12 mb-4" v-for="item in favoriteStore.items" :key="item.id">
                            <div class="product-list-section">
                                <div class="product-thumbnail">
                                    <nuxt-link :to="item.url">
                                        <base-image :src="GetImageUrl(item.image)" :alt="item.title_ir"/>
                                    </nuxt-link>
                                </div>
                                <div class="product-info">
                                    <div class="product-title">
                                        <nuxt-link :to="item.url">
                                            {{ item.title_ir }}

                                        </nuxt-link>
                                    </div>
                                    <div class="text-success">
                                        {{ splitNumber(item.final_price) }}
                                        <span class="text-sm">تومان</span>
                                    </div>
                                    <button class="remove-item" @click="favoriteStore.RemoveItem(item.id)">
                                        <Icon name="material-symbols:delete" class="text-danger" size="20px"/>

                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="col-12">
                            <div class="text-right">
                                <nuxt-link to="/panel/favorite/">

                                    <base-button>مشاهده همه</base-button>
                                </nuxt-link>
                            </div>
                        </div>

                    </div>
                </section>

            </div>
            </client-only>


        </div>

    </div>

</template>

<script setup lang="ts">
import {useAuthStore} from "~/stores/authStore";
import {useFavoriteStore} from "~/stores/FavoriteStore";

definePageMeta({
    layout: 'panel'
})

const authStore = useAuthStore()
const favoriteStore = useFavoriteStore()

</script>

<style scoped>

</style>