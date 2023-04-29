<template>
  <BaseCarousel class="main__slider" :loop="true" effect="slide"
    :modules="[SwiperAutoplay, SwiperEffectFade, SwiperNavigation, SwiperPagination]" :items="filteredBanners"
    :autoplay="{
      delay: 3000,
      pauseOnMouseEnter: true
    }" :navigation="{
  enabled: true
}" :pagination="{
  enabled: true,
  clickable: true,
    dynamicBullets: true,
}" :itemsToShow="1">
    <template #item="{ item }">
      <a class="carousel__item" :href="item.link">
            <base-image :src="GetImageUrl(item.image)" :alt="item.title" />

      </a>
    </template>
  </BaseCarousel>
</template>

<script setup lang="ts">


import {BannerDTO, BannerPosition} from "~/models/banner/bannerDTO";
import {GetImageUrl} from "~/utils/imageURL";

const props = defineProps<{
  banners: BannerDTO[];
  position?: BannerPosition;

}>();
const filteredBanners = props.banners?.filter(f => f.position == props.position) || [];

</script>

<style>
.swiper{
  border-radius: 15px;

}
.main__slider .carousel__item img {
  height: auto;
  width: 100%;
}
.main__slider .swiper-button-prev::after,
.main__slider .swiper-button-next:after {
  color: #137ca9 !important;
  font-size: 20px !important;
  font-weight: bold !important;
}

.main__slider .swiper-button-prev,
.main__slider .swiper-button-next {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}
</style>