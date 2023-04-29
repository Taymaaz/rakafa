<template>

  <div>
    <client-only>
      <div class="row mb-4" v-if="basketStore.getItemsCount>0">
        <div class="col-xl-9 col-lg-8 col-md-8 mb-md-0 mb-3">
          <div class="checkout-section shadow-around">
            <div class="checkout-step">
              <ul>
                <li class="active"><span>سبد خرید</span></li>
                <li>
                  <span>نحوه ارسال و پرداخت</span>
                </li>
                <li>
                  <span>اتمام خرید و ارسال</span>
                </li>
              </ul>
            </div>
            <div class="checkout-section-content">
              <checkout-cart-product-item/>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-lg-4 col-md-4">
          <div class="shadow-around pt-3">
            <div class="d-flex justify-content-between px-3 py-2">
              <span class="text-muted">قیمت کالاها ( {{ basketStore.getItemsCount }} )</span>
              <span class="text-muted">
                                    {{ splitNumber(basketStore.getTotalPriceBeforeDiscount()) }}
                                    <span class="text-sm">تومان</span>
                                </span>
            </div>

            <div class="d-flex justify-content-between px-3 py-2" v-if="basketStore.getTotalPriceAfterDiscount() > 0">
              <span class="text-muted">تخفیف کالاها</span>
              <span class="text-danger">
                                    ({{
                  basketStore.getDiscountPercentage()
                }}٪) {{ splitNumber(basketStore.getTotalPriceBeforeDiscount() - basketStore.getTotalPrice()) }}
                                    <span class="text-sm">تومان</span>
                                </span>
            </div>
            <hr>

            <div class="d-flex justify-content-between px-3 py-2">
              <span class="font-weight-bold">مبلغ قابل پرداخت</span>
              <span class="font-weight-bold">
                                    {{ splitNumber(basketStore.getTotalPrice()) }}
                                    <span class="text-sm">تومان</span>
                                </span>
            </div>
            <div class="d-flex px-3 py-4">
              <nuxt-link to="/checkout/shipping/" class="btn btn-primary btn-block py-2">ادامه فرایند خرید</nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-3 " v-else>
        <div class="checkout-section shadow-around mb-3 mx-0 pl-0">
          <base-util-empty message="سبد خرید شما خالی است!">
            <nuxt-link to="/">
              <base-button color="info" class="my-4">برگشت به صفحه اصلی</base-button>
            </nuxt-link>
          </base-util-empty>

        </div>
      </div>
      <base-recent-products-section/>

    </client-only>


  </div>
</template>
<script setup lang="ts">
import {useBasketStore} from "~/stores/BasketStore";
import {splitNumber} from "~/utils/numberUtils";
import {ProductCardDTO} from "~/models/product/ProductCard";

const basketStore = useBasketStore()


</script>

<style scoped>

</style>