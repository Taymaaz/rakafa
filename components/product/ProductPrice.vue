<template>
  <div class="box-info-product">
    <div class="d-block mb-3">
      <client-only>
      <div class="form-group">
        <label for="variant-select"> انتخاب {{type.title_ir}} </label>
        <select :class="['form-control ',{'text-danger':selectedVariant.is_special}]" id="variant-select" v-model="selectedVariant">
          <option v-for="(variant, index) in variants" :key="index" :value="variant" :class="[variant.is_special ? 'text-danger' : 'text-black']">
          {{ variant.value.value }}  {{ variant.value.prefix.name }} <span v-if="variant.is_special">( {{ variant.special_price_percent}}% )</span>
          </option>
        </select>
      </div>

      </client-only>

    </div>
    <div class="sticky-div">
      <div class="d-flex align-items-center justify-content-end mt-3">
        <div class="product-price">
          <div class="product-price-info" v-if="selectedVariant.is_special">
            <div class="product-price-off" >
              %{{ selectedVariant.special_price_percent }} <span>تخفیف</span>
            </div>
            <div class="product-price-prev">
              {{ splitNumber(selectedVariant.price) }}
            </div>
          </div>
          <div class="product-price-real">
            <div class="product-price-raw">{{ splitNumber(selectedVariant.final_price)  }}</div>
            تومان
          </div>
        </div>
      </div>
      <div>
        <div class="row">
          <div class="col-md-12">
            <base-button w-full @click="$emit('add-to-basket',selectedVariant)">افزودن به خرید</base-button>
          </div>
          <div class="col-md-12">
            <base-button w-full color="danger" class="mt-2">علاقه مندی ها</base-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Variant,VariantType} from "~/models/product/singleProductDTO";
import {splitNumber} from "~/utils/numberUtils";
const props = defineProps<{
  variants: Variant[],
  type: VariantType,
}>()
const selectedVariant = ref<Variant>(props.variants[0])

</script>
<style>


</style>
