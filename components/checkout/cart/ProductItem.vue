<template>
  <div class="cart-items p-3">
    <div class="cart-item py-4 px-3" v-for="item in basketStore.items" :key="item.id">
      <div class="item-thumbnail">
        <nuxt-link :to="item.product_url">
          <base-image :src="GetImageUrl(item.product_image)" :alt="item.product_title_ir" class="border-image-20"/>
        </nuxt-link>
      </div>
      <div class="item-info flex-grow-1">
        <div class="item-title">
          <h2>
            <nuxt-link :to="item.product_url">
              {{ item.product_title_ir }}
            </nuxt-link>
          </h2>
        </div>
        <div class="item-detail">
          <ul>

            <li>
              <i class="far fa-weight text-success"></i>
              <span>{{ item.variant.value.value }}  {{ item.variant.value.prefix.name }}</span>
            </li>
            <li>
              <i class="far fa-clipboard-check text-primary"></i>
              <span>موجود در انبار</span>
            </li>

          </ul>
          <div class="item-quantity--item-price">
            <div class="item-quantity d-flex align-items-center">
               <span class="d-block ml-2">
                                        تعداد
                                    </span>
              <div class="num-block">
                <div class="num-in">
                  <span class="plus" @click="basketStore.IncreaseCount(item.product_id,item.variant.id)"
                        v-show="!basketStore.loading"></span>
                  <input type="text" class="in-num no-cursor"
                         :value="item.count" readonly>
                  <span class="text-red minus" v-if="item.count >1"
                        @click="basketStore.DecreaseCount(item.product_id,item.variant.id)"
                        v-show="!basketStore.loading"></span>
                  <span class="text-red far fa-trash-alt" v-else
                        @click="basketStore.RemoveItem(item.product_id,item.variant.id)" v-show="!basketStore.loading"></span>
                </div>
              </div>
              <button class="item-remove-btn mr-3" @click="basketStore.RemoveItem(item.product_id,item.variant.id)"
                      :disabled="basketStore.loading">
                <i class="far fa-trash-alt"></i>
                حذف
              </button>
            </div>
            <div class="item-price">


              <span>{{ splitNumber(item.total_price) }}</span>
              <del class="text-red ml-1" v-if="item.variant.is_special">
                {{ splitNumber(item.variant.price * item.count) }}
              </del>

              <span class="text-sm mr-1">
                تومان
              </span>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {GetImageUrl} from "~/utils/imageURL";
import {useBasketStore} from "~/stores/BasketStore";
import {splitNumber} from "~/utils/numberUtils";

const basketStore = useBasketStore()


</script>

<style scoped>

.item-remove-btn {
  padding: 5px 10px;
}

.item-remove-btn:hover {
  color: red !important;
  border: 1px solid red !important;
  border-radius: 10px;

}
</style>