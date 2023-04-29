<template>
  <div>

    <nuxt-layout>
      <NuxtLoadingIndicator color="#00c853" :height="3"/>

      <nuxt-page></nuxt-page>
    </nuxt-layout>

  </div>
</template>
<script setup lang="ts">

import {useUtilStore} from "~/stores/utilStore";
import {useBasketStore} from "~/stores/BasketStore";
import {useFavoriteStore} from "~/stores/FavoriteStore";
import {useNuxt} from "@nuxt/kit";

const utilStore = useUtilStore()
const basketStore = useBasketStore()
const favoriteStore = useFavoriteStore()
basketStore.Init()
favoriteStore.Init()
useAsyncData("categories",()=>utilStore.setCategories())


</script>