<template>
  <div>
    <div class="row mb-4">
      <div class="col-xl-12 col-lg-12 col-md-12 mb-md-0 mb-3">
        <div class="checkout-section shadow-around">
          <div class="checkout-message">
            <div class="checkout-message-success mb-3">
              <div class="icon-message success-icon">
                <i class="fas fa-check"></i>
              </div>
              سفارش <span class="order-code">DKC-355127574</span> با موفقیت پرداخت و ثبت گردید.
            </div>
            <div class="text-center text-muted">
              <p class="mb-4">
                پرداخت با موفقیت انجام شد. سفارش شما با موفقیت ثبت شد و در
                زمان تعیین‌شده برای شما ارسال خواهد شد. از اینکه ما را برای خرید انتخاب کردید از
                شما سپاسگزاریم.
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

