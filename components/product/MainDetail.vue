<template>
  <div class="product-detail shadow-around mb-5 py-5">
    <div class="row mb-3 mx-0">
      <div class="col-xl-4 col-lg-4 col-md-6 mb-md-0 mb-3">
        <div class="product-gallery product-image">


          <base-image
              :alt="product.title_ir"
              :data-large="product.image"
              :src="GetImageUrl(product.image)"
              class="border-image-20"
          />

          <ul class="product--actions">
            <li>

              <a href="#" class="is-action add-to-favorite"><i class="fas fa-heart"></i></a>
              <span class="tooltip--action">افزودن به علاقمندی</span>
            </li>
            <li>
              <a href="#" data-toggle="modal" data-target="#shareLinkModal"><i
                  class="fas fa-share-alt"></i></a>
              <span class="tooltip--action">اشتراک گذاری</span>
            </li>
            <li>
              <a href="#" class="is-action add-to-compare"><i class="fas fa-adjust"></i></a>
              <span class="tooltip--action">افزودن به لیست مقایسه</span>
            </li>
            <li>
              <a href="#" data-toggle="modal" data-target="#chartModal"><i
                  class="fas fa-chart-area"></i></a>
              <span class="tooltip--action">نمودار قیمت</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-6">
        <div class="product-title mb-3">
          <h1>
            {{ product.title_ir }}
          </h1>
          <h1 class="product-title-en">
            {{ product.title_en }}
          </h1>
        </div>
        <div class="d-block mb-2">
          <span class="font-weight-bold">برند :</span>
          <nuxt-link class=" mr-1">{{ product.brand }}</nuxt-link>
        </div>
        <div class="product-params-special">
          <ul data-title="جزئیات محصول">

            <li v-for="(item,index) in product.properties" :key="index"
                v-if="product.properties.length ?? 0 > 0">
              <span>{{ item.property.name }} :</span>
              <span>{{ item.value }}</span>
            </li>

          </ul>
        </div>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-6 mx-lg-0 mx-auto parent-div">
        <product-price :variants="product.variants" :type="product.variant_type" @add-to-basket="addToBasket"/>
      </div>
    </div>
    <div class="py-3">
      <div class="row mx-0">
        <div class="col-12">
          <hr>
        </div>
      </div>
    </div>
    <div class="services pt-3 row mx-0">
      <div class="col-md-3 col-sm-6 mb-md-0 mb-4">
        <div class="service-item">
          <div class="icon-element">
            <i class="fal fa-truck"></i>

          </div>

          <div class="service-item-body mt-2">

            <h6> امکان تحویل اکسپرس در تهران
            </h6>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm-6 mb-md-0 mb-4">
        <div class="service-item">
          <div class="icon-element">
            <i class="fal fa-user-headset"></i>

          </div>

          <div class="service-item-body mt-2">

            <h6> پشتیبانی ۲۴/۷
            </h6>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm-6 mb-md-0 mb-4">
        <div class="service-item">
          <div class="icon-element">
            <i class="fas fa-undo"></i>

          </div>

          <div class="service-item-body mt-2">

            <h6> ضمانت مرجوع تا 10 رو
            </h6>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm-6 mb-md-0 mb-4">
        <div class="service-item">
          <div class="icon-element">
            <i class="fal fa-badge-check"></i>
          </div>

          <div class="service-item-body mt-2">

            <h6> 100% خالص و دستچین
            </h6>
          </div>
        </div>
      </div>
    </div>


  </div>

</template>

<script setup lang="ts">

import {SingleProductDTO, Variant} from "~/models/product/singleProductDTO";
import {ProductLocalStorageService} from "~/services/product/productLocalStorage.service";
import {convertToProductCardDTO} from "~/utils/Convertors";
import {GetImageUrl} from "~/utils/imageURL";
import {useBasketStore} from "~/stores/BasketStore";
import {CurrentOrderItemDTO} from "~/models/order/CurrentOrderItemDTO";

const basketStore =useBasketStore()
const props = defineProps<{
  product: SingleProductDTO
}>()

onMounted(() => {
  const productLocalStorageService = new ProductLocalStorageService()

  // const CovertProduct = Object.assign({}, props.product);

  // Convert the product to product card DTO
  const productCard = convertToProductCardDTO(props.product)

  // Add the product to the recent products list
  productLocalStorageService.addRecentProduct(productCard)
})



const addToBasket = (selectedVariant: Variant) => {
  const orderDetail = {
    id: 1,
    order_id: 1,
    product_id: props.product.id,
    product_url: props.product.url,
    product_title_ir: props.product.title_ir,
    product_title_en: props.product.title_en,
    product_slug: props.product.slug,
    product_image: props.product.image,
    variant: selectedVariant,
    count: 1,
    total_price: selectedVariant.final_price,
  }  as CurrentOrderItemDTO
  basketStore.AddItem(orderDetail)

}


</script>


<style scoped>

.product-image {
  display: flex;
  justify-content: center;
}


.icon-element i {
  font-size: 2.5rem;
  margin-left: 1rem;
  color: #2db566 !important;
  font-weight: 300;
}


</style>