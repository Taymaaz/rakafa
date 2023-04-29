<template>
      <div>
        <base-product-slider :products="recentProducts" title="بازدید های اخیر شما" icon="fa-clock"
                                v-if="recentProducts.length > 0 "/>
      </div>
</template>

<script setup lang="ts">
import {ProductCardDTO} from "~/models/product/ProductCard";

const recentProducts = ref<ProductCardDTO[]>([]);
onMounted(() => {
  // Get recent products from local storage
  const recentProductsFromStorage = localStorage.getItem('recentProducts');
  if (recentProductsFromStorage) {
    recentProducts.value = JSON.parse(recentProductsFromStorage).slice(0, 10);
  }
})
</script>

<style scoped>

</style>