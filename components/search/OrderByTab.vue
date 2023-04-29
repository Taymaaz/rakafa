<template>
  <div class="mb-2 ">

    <div class="box-select-sort d-flex align-items-center justify-content-end mb-4">
      <select class="form-select custom-select " v-model="selectedTab">

        <option :value="ProductSearchOrderBy.Latest"> جدید ترین</option>
        <option :value="ProductSearchOrderBy.Mostsale">  پرفروش ترین</option>
        <option :value="ProductSearchOrderBy.Expensive">براساس قیمت : زیاد به کم</option>
        <option :value="ProductSearchOrderBy.Cheapest">براساس قیمت : کم به زیاد</option>
      </select>


    </div>
  </div>

</template>

<script setup lang="ts">

import {Ref} from "vue";
import {ProductSearchOrderBy} from "~/models/product/productSearchResultDTO";

const router = useRouter()
const selectedTab: Ref<ProductSearchOrderBy> = ref(ProductSearchOrderBy.Latest)

const changeTab = (orderBy:ProductSearchOrderBy)=>{

}

watch(selectedTab, (newVal:ProductSearchOrderBy, oldVal) => {
  selectedTab.value = newVal
  var currentPath = router.currentRoute.value.path;
  var queryParams = router.currentRoute.value.query;
  router.push({
    path:currentPath,
    query:{...queryParams,OrderBy:newVal}
  })
})


</script>

<style scoped>

</style>