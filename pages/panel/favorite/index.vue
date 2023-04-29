<template>
  <div>


   <client-only>
        <div class="shadow-around">
    <div class="section-title p-3 d-flex align-items-center gap-4">
     <p> لیست علاقه مندی ها</p>
     <base-button color="danger" class="text-left py-1 mr-2" @click="clearFavorite" v-if="favoriteStore.items.length > 0">پاک کردن همه</base-button>
    </div>

      <div class="listing-items row m-3" v-if="favoriteStore.items.length > 0">
        <div class="col-lg-3 col-6 px-0" v-for="item in favoriteStore.items" :key="item.id" >
          <product-card :product="item"/>
        </div>
      </div>
           <div v-else>
          <base-util-empty message="محصولی برای نمایش وجود ندارد"/>
        </div>

    </div>
   </client-only>



  </div>
</template>

<script setup lang="ts">
import ProductCard from "~/components/base/product/productCard.vue";
import {useToast} from "vue-toastification";
import {useFavoriteStore} from "~/stores/FavoriteStore";

definePageMeta({
  layout: "panel"
})

const toast = useToast()
const favoriteStore = useFavoriteStore()
const clearFavorite =()=>{
  localStorage.removeItem('favorite-items');
  favoriteStore.items = []
  toast.info('تمامی علاقه مندی ها حذف شدند')
}
</script>

<style scoped>

</style>