<template>

  <section class="product-carousel in-box">
    <div class="row">
      <div class="section-title text-right col-md-6">
        <i :class="['fad ',icon]"></i>
        {{ title }}
      </div>

      <div class="text-left  col-md-6" v-if="link">
        <nuxt-link :to="link">
          <base-button outline>مشاهده همه</base-button>

        </nuxt-link>
      </div>
    </div>
    <div class="swiper-container slider-lg pb-0">


      <base-carousel class="product-swiper-slider" :spaceBetween="0" effect="cards"
                     :modules="[SwiperNavigation, SwiperPagination]" :navigation="{
                        enabled: true,
                        navigationDisabledClass: '123'
                    }" :breakpoints="breakpoints" :items="products" slideClass="swiper-slide main-swiper-slide">
        <template #item="{ item }">
          <base-product-card :product="item" />



        </template>
      </base-carousel>
    </div>
  </section>

</template>

<script setup lang="ts">
import {ProductCardDTO} from "~/models/product/ProductCard";

defineProps<{
  products: ProductCardDTO[],
  title: string,
  icon: string,
  link?:string | ''
}>()

const breakpoints = {
  1400: {
    slidesPerView: 6,

  },

  1200: {
    slidesPerView: 5,
  },
  1000: {
    slidesPerView: 4,
  },
  700: {
    slidesPerView: 3,
  },

  500: {
    slidesPerView: 2,
  },

  0: {
    slidesPerView: 1,
  },

};
</script>

<style scoped>


</style>