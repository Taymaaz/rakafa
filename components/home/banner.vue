<template>
  <template v-if="position===BannerPosition.mainBanner">
    <div class="col-lg-12 col-sm-6 col-12 hide-on-mb" v-for="item in filteredBanners.slice(0,2)">
      <div class="banner mb-3">
        <a :href="item.link">
          <base-image :src="GetImageUrl(item.image)" :alt="item.title"/>
        </a>
      </div>
    </div>
  </template>
  <template v-if="position===BannerPosition.adsBanner">
    <div class="col-lg-6 col-sm-6 col-12" v-for="item in filteredBanners.slice(0,2)">
      <div class="banner mb-4">
        <a :href="item.link">
          <base-image :src="GetImageUrl(item.image)" :alt="item.title"/>

        </a>
      </div>
    </div>
  </template>
  <template v-if="position===BannerPosition.blogBanner">
    <div class="col-md-3 col-6 mb-lg-0 mb-3" v-for="(item,index) in filteredBanners.slice(0,4)" :key="index">
      <div class="banner">
        <a :href="item.link">
                   <base-image :src="GetImageUrl(item.image)" :alt="item.title"/>

        </a>
      </div>
    </div>

  </template>

</template>
<script setup lang="ts">

import {BannerDTO, BannerPosition} from "~/models/banner/bannerDTO";
import {GetImageUrl} from "~/utils/imageURL";


const props = defineProps<{
  banners: BannerDTO[],
  position: BannerPosition
}>()

const filteredBanners = props.banners.filter(f => f.position == props.position)

</script>

<style scoped>
@media  screen and  (max-width: 575px){
.hide-on-mb{
  display: none;
}}
</style>