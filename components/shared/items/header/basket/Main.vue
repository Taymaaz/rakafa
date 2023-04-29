<template>
  <div class="user-item cart-list"  @click="showDropdown = true" @mouseleave="showDropdown = false">
    <a type="button" >

      <!--      <i class="fal fa-shopping-cart"></i>-->
      <Icon name="ph:shopping-cart-thin" size="30px"/>
      <span class="bag-items-number">{{ basketStore.getItemsCount }}</span>
    </a>
    <ul v-if="!basketStore.loading" :class="{'active': showDropdown }">
      <li class="cart-items">

        <div v-if="basketStore.getItemsCount > 0">
          <ul class="do-nice-scroll">
            <li class="cart-item" v-for="item in basketStore.items" :key="item.id">
                                            <span class="d-flex align-items-center mb-2">
                                                <nuxt-link :to="item.product_url">
                                                    <img :src="GetImageUrl(item.product_image)"
                                                         :alt="item.product_title_ir">
                                                </nuxt-link>
                                                <span>
                                                    <nuxt-link :to="item.product_url">
                                                        <span class="title-item">
                                                          {{ item.product_title_ir }}
                                                        </span>
                                                    </nuxt-link>

                                                    <span class="d-flex align-items-center"
                                                          v-if="!item.variant.type.is_none">
                                                        <span>تعداد : {{ item.count }} </span>
                                                    </span>
                                                    <span class="d-flex align-items-center"
                                                          v-if="!item.variant.type.is_none">
                                                        <span>
                                                          {{ item.variant.type.title_ir }}
                                                          :
                                                          {{ item.variant.value.value }}
                                                          {{ item.variant.value.prefix.name }}</span>
                                                    </span>

                                                </span>
                                            </span>
              <div class="d-flex">
                <del class="price text-red" v-if="item.variant.is_special">
                  {{ splitNumber(item.variant.price * item.count) }}
                </del>
                <span class="price mx-1">{{ splitNumber(item.total_price) }} تومان</span>
              </div>
              <button class="remove-item" @click="basketStore.RemoveItem(item.product_id,item.variant.id)">
                <i class="far fa-trash-alt"></i>
              </button>
            </li>
          </ul>
        </div>
        <div v-else>
          <base-util-empty message="سبد خرید خالی میباشد"/>

        </div>

      </li>
      <li class="cart-footer d-flex align-items-center justify-content-between" v-if="basketStore.getItemsCount > 0">
                                    <span class="d-flex flex-column">
                                        <span>مبلغ کل:</span>
                                        <span class="total">{{ splitNumber(basketStore.getTotalPrice()) }} تومان</span>
                                    </span>
        <span class="d-block text-center px-2">
                                        <nuxt-link to="/checkout/cart/" class="btn-cart">
                                             مشاهده سبد خرید
                                        </nuxt-link>
                                    </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {useBasketStore} from "~/stores/BasketStore";
import {splitNumber} from "~/utils/numberUtils";
import {GetImageUrl} from "~/utils/imageURL";

const basketStore = useBasketStore()
const showDropdown = ref(false)

</script>

<style scoped>
  .user-item.cart-list ul.active {
    visibility: visible !important;
    opacity: 1 !important;
    top: 100% !important;
  }






.do-nice-scroll::-webkit-scrollbar {
  width: 4px;
}

.do-nice-scroll::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

.do-nice-scroll::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
}

.do-nice-scroll::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

/* CSS for scrolling behavior */
.do-nice-scroll {
  overflow-y: scroll;
  height: 250px !important; /* adjust height as per your requirements */
}
</style>