<template>

  <div>
    <client-only>

      <template v-if="!loading">
        <Head>
          <Title>فروشگاه اینترنتی راکافا | {{data.transaction}}</Title>
        </Head>
        <div class="section-title mb-2">
          <span class="ml-2">جزئیات سفارش</span>
          <template v-if="data.status===OrderStatus.Pending">
          <span class="bg-gray p-1 px-2 b-radius-20 text-sm text-white">
              در انتظار تایید
          </span>
          </template>

          <template v-if="data.status===OrderStatus.Processing">
          <span class="bg-yellow  p-1 px-2 b-radius-20 text-sm text-white">

            در حال پردازش
          </span>

          </template>

          <template v-if="data.status===OrderStatus.Shipped">
          <span class="bg-info  p-1 px-2 b-radius-20 text-sm text-white">

            ارسال شده
          </span>

          </template>

          <template v-if="data.status===OrderStatus.Delivered">
          <span class="bg-success p-1 px-2 b-radius-20 text-sm text-white">

            تحویل داده شده
          </span>

          </template>
          <template v-if="data.status===OrderStatus.Canceled">
          <span class="bg-danger  p-1 px-2 b-radius-20 text-sm text-white">

            لغو شده
          </span>

          </template>
          <span class="text-muted mx-2">|</span>
          <span class="text-sm text-secondary">{{ getPersianDate(data.ordered_date, "y/M/dd") }} </span>
        </div>
        <div class="row mb-4">
          <div class="col-12">
            <section class="shadow-around p-3">
              <div class="row">
                <div class="col-12">
                  <div class="checkout-section shadow-around p-2">
                    <div class="checkout-section-content">
                      <div class="cart-items bg-white">

                        <div class="row my-3">
                          <div class="col-md-6">
                            <div class="mb-2 d-flex">
                              <p class="text-muted ml-2">کد پیگیری سفارش</p>
                              <p class="font-weight-bold">{{ data.transaction }}</p>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="mb-2 d-flex">
                              <p class="text-muted ml-2">تاریخ ثبت سفارش</p>
                              <p class="font-weight-bold">{{ getPersianDate(data.ordered_date, "y/M/dd") }}</p>
                            </div>
                          </div>
                        </div>
                        <hr>

                        <div class="row my-3">

                          <div class="col-md-6">
                            <div class="mb-2 d-flex">
                              <p class="text-muted ml-2">تحویل گیرنده</p>
                              <p class="font-weight-bold">{{ data.address.receiver_name }}
                                {{ data.address.receiver_family }}</p>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="mb-2 d-flex">
                              <p class="text-muted ml-2">شماره موبایل</p>
                              <p class="font-weight-bold">{{ data.address.receiver_phone }}</p>
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="mb-2 d-flex">
                              <p class="text-muted ml-2">
                                آدرس
                              </p>
                              <p class="font-weight-bold">{{ data.address.address }}</p>
                            </div>
                          </div>

                        </div>
                        <hr>

                        <div class="row my-3">

                          <div class="col-md-6">
                            <div class="mb-2 d-flex">
                              <p class="text-muted ml-2">مبلغ</p>
                              <p class="font-weight-bold">{{ splitNumber(data.total_price_before_discount) }} تومان</p>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="mb-2 d-flex">
                              <p class="text-muted ml-2">سود شما از خرید</p>
                              <p class="font-weight-bold">{{ splitNumber(data.total_profit) }} تومان</p>
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="mb-2 d-flex">
                              <p class="text-muted ml-2">
                                هزینه ارسال
                              </p>
                              <p class="font-weight-bold">
                                <template v-if="data.shipping_price">
                                  {{ splitNumber(data.shipping_price) }} تومان
                                </template>
                                <template v-else>
                                  رایگان
                                </template>
                              </p>

                            </div>
                          </div>

                        </div>
                        <hr>
                        <div class="row my-3">

                          <div class="col-md-6">
                            <div class="mb-2 d-flex">
                              <p class="text-muted ml-2">مبلغ مرسوله</p>
                              <p class="font-weight-bold">
                                <template v-if="data.total_price">
                                  {{ splitNumber(data.total_price) }} تومان
                                </template>
                                <template v-else>
                                  رایگان
                                </template>
                              </p>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="mb-2 d-flex" v-if="data.tracking_code">
                              <p class="text-muted ml-2">کد پیگیری مرسوله از {{ data.shipping_method.name }}</p>
                              <p class="font-weight-bold">{{ data.tracking_code }} </p>
                            </div>
                          </div>

                        </div>
                        <hr>

                        <div class="cart-item py-4 px-3" v-for="item in data.details" :key="item.id">
                          <div class="item-thumbnail">
                            <nuxt-link :to="item.product_url">
                              <img>
                              <base-image :src="GetImageUrl(item.product_image)" :alt="item.product_title_en"
                                          class="border-image-20" width="150px" height="140"/>
                            </nuxt-link>
                          </div>
                          <div class="item-info flex-grow-1">
                            <div class="item-title">
                              <h2>
                                <nuxt-link :to="item.product_url">
                                  {{ item.product_title_ir }}
                                </nuxt-link>
                              </h2>
                            </div>
                            <div class="item-detail">
                              <ul>

                                <li>
                                  <i class="text-success">
                                    <Icon name="mdi:weight-kilogram" size="20"/>
                                  </i>
                                  <span>{{ item.variant.value.value }}  {{ item.variant.value.prefix.name }}</span>
                                </li>

                                <li>
                                  <i class="text-primary">
                                    <Icon name="ic:baseline-check-circle-outline" size="20"/>
                                  </i>
                                  <span>موجود در انبار</span>
                                </li>
                                <li>
                                  <i class="text-info">
                                    <Icon name="mdi:basket-outline" size="20"/>
                                  </i>
                                  <span>{{ item.count }} عدد</span>
                                </li>

                              </ul>
                              <div class="item-quantity--item-price">
                                <div class="item-price">
                                  <del class="text-danger" v-if="item.final_price_before_discount">
                                    {{ splitNumber(item.final_price_before_discount) }}

                                  </del>
                                  {{ splitNumber(item.final_price) }}
                                  <span class="text-sm mr-1">تومان</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </template>
    </client-only>
  </div>

</template>

<script setup lang="ts">
import {GetOrderDetail} from "~/services/order/order.service";
import {OrderDetailDTO, OrderStatus} from "~/models/order/OrderDTO";
import {Ref} from "vue";

definePageMeta({
  layout: 'panel'
})
const router = useRouter()
const loading = ref(false)
const data: Ref<OrderDetailDTO | null> = ref(null)
onMounted(async () => {
  let transactionId = Number(router.currentRoute.value.params.slug.toString())
  loading.value = true
  let result = await GetOrderDetail(transactionId)

  loading.value = false
  if (result.isSuccess) {

    data.value = result.data
  } else {
    await router.push('/panel/orders/')
  }
})

</script>
<style scoped>

</style>