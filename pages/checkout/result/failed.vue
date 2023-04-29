<template>
  <div>
    <div class="row mb-4">
                    <div class="col-xl-12 col-lg-12 col-md-12 mb-md-0 mb-3">
                        <div class="checkout-section shadow-around">
                            <div class="checkout-message">
                                <div class="checkout-message-failed mb-3">
                                    <div class="icon-message failed-icon">
                                        <i class="fas fa-times"></i>
                                    </div>
                                    سفارش <span class="order-code">DKC-355127574</span> ثبت شد اما پرداخت ناموفق بود.
                                </div>
                                <div class="text-center text-muted">
                                    <p class="mb-1">
                                        برای جلوگیری از لغو سیستمی سفارش، تا ۱ ساعت آینده پرداخت را انجام دهید.
                                    </p>
                                    <p class="text-sm">
                                        چنانچه طی این فرایند مبلغی از حساب شما کسر شده است، طی ۷۲ ساعت آینده به حساب شما
                                        باز خواهد گشت.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
       <lazy-base-product-slider :products="recentProducts" title="بازدید های اخیر شما" icon="fa-clock"
                              v-if="recentProducts.length > 0 "/>
  </div>
</template>

<script setup lang="ts">
import {ProductCardDTO} from "~/models/product/ProductCard";

const recentProducts = ref<ProductCardDTO[]>([]);
onMounted(async () => {
    const recentProductsFromStorage = localStorage.getItem('recentProducts');
  if (recentProductsFromStorage) {
    recentProducts.value = JSON.parse(recentProductsFromStorage).slice(0, 10);
  }
})
</script>

<style scoped>

</style>

