<template>
  <div v-if="(filterResult == null)"></div>

  <div class="row mb-5" v-else>
    <Head>

      <Title v-if="searchUtil.getFilterParams().search">جستجو | {{ searchUtil.getFilterParams().search }}</Title>
      <Title v-else>جستجوی محصولات</Title>

    </Head>
    <div :class="['col-lg-3 col-md-4 sticky-sidebar filter-options-sidebar',{'toggled':mobileSearch}]">
      <search-sidebar @close="mobileSearch=false"/>
    </div>
    <div class="col-lg-9 col-md-8">
      <div class="d-md-none">
        <base-button color="info" @click="mobileSearch=true">
          جستجوی پیشرفته
          <Icon name="bi:sliders"/>
        </base-button>
      </div>

      <div class="row">
        <div class="col-12">
          <!-- breadcrumb -->
          <!--          <search-breadcrumb :navbar="filterResult.data.categoryDto"/>-->
          <!-- end breadcrumb -->
        </div>
      </div>

      <div class="row justify-content-end">
        <div class="col-4 ">

          <search-order-by-tab v-if="filterResult.data.data.length>0"/>

        </div>
      </div>

      <div></div>
      <template v-if="pending">
        <div class="listing-items row">

          <div class="col-lg-3 col-md-4 col-sm-6 px-0" v-for="_ in 8">

            <loading-skeleton height="375px" width="99%" class="mb-1"/>
          </div>
        </div>
      </template>

      <template v-else>

        <div class="listing-items row" v-if="filterResult.data.data.length>0">

          <div class="col-lg-3 col-md-4 col-sm-6 col-6 px-0" v-for="(item,index) in filterResult.data.data" :key="index" >
            <product-card :product="item"/>
          </div>
          <search-pagination :pagination-data="filterResult.data"/>
        </div>
        <div v-else>
           <base-util-empty message="محصولی برای نمایش وجود نداره!"/>
          </div>
      </template>
    </div>
  </div>

</template>

<script setup lang="ts">

import {useSearch} from "~/composables/useSearch";
import ProductCard from "~/components/base/product/productCard.vue";

const searchUtil = useSearch()
const search = useSearch()
const {data: filterResult, refresh, pending} = await useAsyncData("search", () => search.getProducts())

const route = useRoute();

const mobileSearch = ref(false)

watch(() => route.query, () => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 300);
  refresh()
})
</script>

<style>
@keyframes blink {
  0% {
    opacity: 0;
  }
  25% {
    opacity: 0.25;
  }
  50% {
    opacity: 0.5;
  }
  75% {
    opacity: 0.75;
  }
  100% {
    opacity: 0;
  }
}
</style>