<template>
  <div class="breadcrumb mb-2 pt-2">
    <nav>
      <nuxt-link to="/">صفحه اصلی</nuxt-link>

      <nuxt-link to="/search"
                 v-if="(selectedFilter.search !== '') || category !== null">
        جستجوی محصولات
      </nuxt-link>
      <nuxt-link v-else>
        جستجوی محصولات
      </nuxt-link>

      <nuxt-link v-if="selectedFilter.search!==''">
        {{ selectedFilter.search }}
      </nuxt-link>
      <template v-else-if="category">

        <nuxt-link :to="`/search/category-${category.slug}`" v-if="selectedFilter.search">
          {{ category.title }}
        </nuxt-link>
      </template>
    </nav>
  </div>

</template>

<script setup lang="ts">



import {CategoryDTO} from "~/models/category/categoryDTO";

const route = useRoute()
const search = useSearch()
const selectedFilter = ref(search.getFilterParams())
defineProps<{
  category: CategoryDTO
}>()
if (selectedFilter.value.search == undefined) {
  selectedFilter.value.search = ""
}
watch(() => route.query, () => {
  selectedFilter.value = search.getFilterParams()
  if (selectedFilter.value.search == undefined) {
    selectedFilter.value.search = ""
  }
})


</script>

<style scoped>

</style>