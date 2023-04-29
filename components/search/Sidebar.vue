<template>
  <div>
    <div class="d-md-none">
      <div class="header-filter-options">
        <span>جستجوی پیشرفته </span>
          <base-button color="danger"  @click="$emit('close')">بستن پنجره</base-button>
      </div>
    </div>
    <div class="sidebar-widget">
      <div class="widget shadow-around">
        <div class="widget-content">
          <div class="custom-control custom-switch">
            <input type="checkbox" class="custom-control-input" id="customSwitch1" v-model="onlyAvailable">
            <label class="custom-control-label" for="customSwitch1">فقط کالاهای موجود در
              انبار</label>
          </div>
        </div>
      </div>
      <div class="widget shadow-around">
        <div class="widget-content">
          <div class="custom-control custom-switch">
            <input type="checkbox" class="custom-control-input" id="customSwitch2" v-model="HasDiscount">
            <label class="custom-control-label" for="customSwitch2">فقط محصولات ویژه</label>
          </div>
        </div>
      </div>
      <div class="widget shadow-around">
        <div class="widget-title">محدوده قیمت</div>
        <div class="widget-content">
          <form action="#" class="filter-price">
            <div class="mt-2 mb-2">
              <base-range-slider :max="10000000" v-model="filterPrice" @value-changed="priceChanged"/>
              <ul class="filter-range">
                <li data-label="از" data-currency=" تومان">
                  <input type="text" :value="splitNumber(filterPrice[0])"
                         class="js-slider-range-from disabled example-val" id="skip-value-lower" disabled>
                </li>
                <li data-label="تا" data-currency="تومان">
                  <input type="text" :value="splitNumber(filterPrice[1])"
                         class="js-slider-range-to disabled example-val" id="skip-value-upper" disabled>
                </li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {splitNumber} from "~/utils/numberUtils";

const searchUtil = useSearch();
const selectedFilter = searchUtil.getFilterParams();
const router = useRouter()
const route = useRoute()

const onlyAvailable = ref(false)
const HasDiscount = ref(false)
const filterPrice = ref(['0', '10000000']);
onMounted(() => {

  onlyAvailable.value = selectedFilter.onlyAvailable
  HasDiscount.value = selectedFilter.HasDiscount
  if (selectedFilter.minPrice !== '' && selectedFilter.maxPrice !== '')
    filterPrice.value = [selectedFilter.minPrice, selectedFilter.maxPrice]
})

watch(HasDiscount, (val) => {
  var currentPath = router.currentRoute.value.path;
  var queryParams = router.currentRoute.value.query;
  router.push({
    path: currentPath,
    query: {...queryParams, HasDiscount: val.toString(), pageId: 1}
  })
})
watch(onlyAvailable, (val) => {
  var currentPath = router.currentRoute.value.path;
  var queryParams = router.currentRoute.value.query;
  router.push({
    path: currentPath,
    query: {...queryParams, onlyAvailable: val.toString(), pageId: 1}
  })
})
const priceChanged = () => {
  var currentPath = router.currentRoute.value.path;
  var queryParams = router.currentRoute.value.query;
  router.push({
    path: currentPath,
    query: {...queryParams, minPrice: filterPrice.value[0], maxPrice: filterPrice.value[1], pageId: 1}
  });
}
</script>

<style >
@media only screen and (max-width: 768px) {

  .filter-options-sidebar {

    width: 80% !important;

  }
}
</style>