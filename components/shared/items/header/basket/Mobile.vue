<template>
  <div class="cart-side">
    <a type="button" class="btn-toggle-cart-side ml-0" @click="toggleCart=true">

      <Icon name="ph:shopping-cart-thin" size="25px"/>
      <span class="bag-items-number">{{ basketStore.getItemsCount }}</span>
    </a>
    <div :class="['cart-side-content ',{'toggle':toggleCart}]">
      <ul>
        <li class="cart-items">
          <div v-if="basketStore.getItemsCount > 0">

            <ul>
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
                  <Icon name="material-symbols:delete" class="text-danger" size="30px"/>
                </button>
              </li>
            </ul>
          </div>
          <div v-else>
            <base-util-empty message="سبد خرید خالی میباشد"/>
          </div>
        </li>

        <template v-if="basketStore.getItemsCount > 0">
          <li class="cart-footer position-absolute">
                                    <span class="d-flex flex-column text-center mb-2">
                                        <span>مبلغ کل:</span>
                                        <span class="total">{{ splitNumber(basketStore.getTotalPrice()) }} تومان</span>
                                    </span>
            <span class="d-block text-center px-2">
                                          <nuxt-link to="/checkout/cart/" class="btn-cart">
                                             مشاهده سبد خرید
                                        </nuxt-link>
                                    </span>
          </li>
        </template>
        <template v-else>
          <li class="cart-footer position-absolute">

          <span class="d-block text-center px-2">
                                          <nuxt-link to="/category/" class="btn-cart">
                                             خرید
                                        </nuxt-link>
                                    </span>
          </li>
        </template>

      </ul>
    </div>
    <div :class="['overlay-cart-side',{'d-block':toggleCart}]" @click="toggleCart=false"></div>
  </div>

</template>

<script setup lang="ts">
import {useBasketStore} from "~/stores/BasketStore";
import {splitNumber} from "~/utils/numberUtils";
import {GetImageUrl} from "~/utils/imageURL";

const toggleCart = ref(false)
const basketStore = useBasketStore()
const route = useRoute()
watch(() => route.query, () => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 300);
  toggleCart.value = false
})
</script>


<style scoped>

</style>