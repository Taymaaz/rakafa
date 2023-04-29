<template>
  <div class="col-12 px-0" v-if="paginationData.pageCount>1">
    <div class="pagination">

      <a
          v-if="paginationData.has_previous"
          @click="changePage(paginationData.currentPage-1)"
          class="prev pointer"

      >

        <i class="far fa-arrow-right"></i>
      </a>

      <a
          href="#"
          :class="{'current':item===paginationData.currentPage}"
          v-for="item in RangeNumber(paginationData.startPage,paginationData.endPage)" :key="item"
          @click="changePage(item)"
      >
        {{ item }}
      </a>

      <a
          v-if="paginationData.has_next"
          @click="changePage(paginationData.currentPage+1)"
          class="next pointer">
        <i class="far fa-arrow-left"></i></a>
    </div>
  </div>

</template>

<script setup lang="ts">
import {baseFilterResult} from "~/models/base/baseFilterResult";
import {RangeNumber} from "~/utils/objectutils";


const search = useSearch()
defineProps<{
  paginationData: baseFilterResult<any>
}>()

const changePage = async (pageId: number) => {

  await search.changePageId(pageId)
}
</script>

<style scoped>
/*<div class="pagination">

  <a
      v-if="paginationData.currentPage>1"
      @click="changePage(paginationData.currentPage-1)"
      class="prev pointer" href="#"

  >
    <i class="far fa-arrow-right"></i>
  </a>

  <!-- Show first 3 pages -->
  <template v-for="item in RangeNumber(paginationData.startPage, Math.min(paginationData.endPage, 3))" :key="item">
    <a
        href="#"
        :class="{'current':item===paginationData.currentPage}"
        @click="changePage(item)"
    >
      {{ item }}
    </a>
  </template>

  <!-- Show ... if pageCount > 6 and currentPage is not within the first 3 pages -->
  <template v-if="paginationData.pageCount > 6 && paginationData.currentPage > 3">
    <span>...</span>
  </template>

  <!-- Show last 3 pages if pageCount > 3 and currentPage is not within the last 3 pages -->
  <template v-if="paginationData.pageCount > 3 && paginationData.currentPage < paginationData.pageCount - 2">
    <template v-for="item in RangeNumber(Math.max(paginationData.pageCount - 2, 4), paginationData.pageCount)" :key="item">
      <a
          href="#"
          :class="{'current':item===paginationData.currentPage}"
          @click="changePage(item)"
      >
        {{ item }}
      </a>
    </template>

    <!-- Show ... if pageCount > 6 and currentPage is not within the last 3 pages -->
    <template v-if="paginationData.pageCount > 6 && paginationData.currentPage < paginationData.pageCount - 3">
      <span>...</span>
    </template>
  </template>

  <!-- Show last 3 pages if pageCount <= 6 and currentPage is not within the last 3 pages -->
  <template v-if="paginationData.pageCount <= 6 && paginationData.currentPage < paginationData.pageCount - 2">
    <template v-for="item in RangeNumber(4, paginationData.pageCount)" :key="item">
      <a
          href="#"
          :class="{'current':item===paginationData.currentPage}"
          @click="changePage(item)"
      >
        {{ item }}
      </a>
    </template>
  </template>

  <a
      v-if="paginationData.currentPage< paginationData.pageCount"
      @click="changePage(paginationData.currentPage+1)"
      class="next pointer" href="#"
  >
    <i class="far fa-arrow-left"></i>
  </a>
</div>*/

</style>