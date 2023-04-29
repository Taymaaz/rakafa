<template>


    <div :class="['product-box']" @mouseleave="showVariantSelect=false">
        <div :class="['product-box--thumbnail-container',{'low-opacity':showVariantSelect}]">

            <div class="special-sell-height">
                <span class="product-box--specialSell" v-if="product.has_any_special_price"></span>

            </div>

            <base-image :src="GetImageUrl(product.image)" class="product-box--thumbnail"
                        :alt="product.title_ir"/>

            <nuxt-link :to="product.url" class="product-box--link"></nuxt-link>
        </div>
        <div :class="['product-box--detail',{'low-opacity':showVariantSelect}]">
            <h3 class="product-box--title height-35">
                <nuxt-link :to="product.url">

                    {{ product.title_ir }}

                </nuxt-link>
            </h3>
            <div class="product-box--price-container height-42">
                <div class="product-box--price-discount" v-if="product.has_any_special_price">
                    {{ product.special_price_percent }}%
                </div>
                <div class="product-box--price-discount" v-else></div>
                <div class="product-box--price">
             <span class="product-box--price-now">
                        <div class="product-box--price-value ">{{ splitNumber(product.final_price) }}</div>
                          <div class="product-box--price-currency ">تومان</div>
                       </span>
                    <del class="product-box--price-old" v-if="product.has_any_special_price">
                        {{ splitNumber(product.price) }}
                    </del>
                    <del class="product-box--price-old" v-else></del>
                </div>
            </div>
            <div class="product-box--action">
                <base-button
                        class="product-box--action-btn product-box--action-wishlist"
                        @click="addToFavorite"
                >
                    <i>

                        <template v-if="favoriteStore.IsExist(product.id)">

                        <Icon name="ri:heart-fill" size="20" class="text-danger"/>
                        </template>
                        <template v-else>
                        <Icon name="ri:heart-3-line" size="20" class="text-success"/>
                        </template>

                    </i>
                </base-button>


                <template v-if="product.variant_type.is_none">
                    <base-button class="product-box--action-btn product-box--action-cart" @click="addToBasket">
                        افزودن به سبد خرید
                    </base-button>
                </template>

                <template v-else>
                    <base-button class="product-box--action-btn product-box--action-cart"
                                 @click="showVariantSelect=!showVariantSelect">
                        انتخاب گزینه
                    </base-button>
                </template>


            </div>
        </div>
        <template v-if="showVariantSelect">
            <div class="variant-select ">
                <div class="form-group ">
                    <label for="variant-select" class="variant-select-input-label"> انتخاب {{
                        product.variant_type.title_ir
                        }} </label>
                    <select :class="['form-control variant-select-input',{'text-danger':selectedVariant.is_special}]"
                            id="variant-select"
                            v-model="selectedVariant">
                        <option v-for="(variant, index) in product.variants" :key="index" :value="variant"
                                :class="[variant.is_special ? 'text-danger' : 'text-black']">
                            {{ variant.value.value }} {{ variant.value.prefix.name }} <span
                                v-if="variant.is_special">( {{ variant.special_price_percent }}% )</span>
                        </option>
                    </select>
                    <div class="sticky-div">
                        <div class="d-flex align-items-center justify-content-end mt-3 product-detail">
                            <div class="product-price">
                                <div class="product-price-info" v-if="selectedVariant.is_special">
                                    <div class="product-price-off">
                                        %{{ selectedVariant.special_price_percent }} <span>تخفیف</span>
                                    </div>
                                    <div class="product-price-prev">
                                        {{ splitNumber(selectedVariant.price) }}
                                    </div>
                                </div>
                                <div class="product-price-real">
                                    <div class="product-price-raw">{{ splitNumber(selectedVariant.final_price) }}</div>
                                    تومان
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="row">
                                <template v-if="basketStore.InBasketCount(product.id,selectedVariant.id) === 0">
                                    <div class="col-md-12">
                                        <base-button w-full @click="addToBasket">افزودن به سبد خرید</base-button>
                                    </div>
                                </template>

                                <template v-else>
                                    <div class="col-md-12">
                    <span class="d-block">
                                        تعداد:
                                    </span>
                                        <div class="num-block">
                                            <div class="num-in">

                        <span class="plus"
                              @click="basketStore.IncreaseCount(product.id,selectedVariant.id)"
                              v-show="!basketStore.loading"
                        ></span>
                                                <input
                                                        type="text"
                                                        class="in-num no-cursor"
                                                        :value="basketStore.InBasketCount(product.id,selectedVariant.id)"
                                                        readonly>


                                                <span v-if="basketStore.InBasketCount(product.id,selectedVariant.id) >1"
                                                      class="text-red minus"
                                                      @click="basketStore.DecreaseCount(product.id,selectedVariant.id)"
                                                      v-show="!basketStore.loading"></span>

                                                <span v-else class="text-red far fa-trash-alt"
                                                      @click="basketStore.RemoveItem(product.id,selectedVariant.id)"
                                                      v-show="!basketStore.loading"></span>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </template>
    </div>


</template>

<script setup lang="ts">
import {ProductCardDTO} from "~/models/product/ProductCard";
import {splitNumber} from "~/utils/numberUtils";
import {GetImageUrl} from "~/utils/imageURL";
import {Variant} from "~/models/product/singleProductDTO";
import {useBasketStore} from "~/stores/BasketStore";
import {CurrentOrderItemDTO} from "~/models/order/CurrentOrderItemDTO";
import {useFavoriteStore} from "~/stores/FavoriteStore";


const favoriteStore = useFavoriteStore()
const basketStore = useBasketStore()
const props = defineProps<{
    product: ProductCardDTO,
}>()
const selectedVariant = ref<Variant>(props.product.variants[0])
const showVariantSelect = ref(false)

const addToBasket = () => {
    const orderDetail = {
        id: 1,
        order_id: 1,
        product_id: props.product.id,
        product_url: props.product.url,
        product_title_ir: props.product.title_ir,
        product_title_en: props.product.title_en,
        product_slug: props.product.slug,
        product_image: props.product.image,
        variant: selectedVariant.value,
        count: 1,
        total_price: selectedVariant.value.final_price,
    } as CurrentOrderItemDTO
    basketStore.AddItem(orderDetail)

}
const addToFavorite = () => {
    const productDetail = {
        id: props.product.id,
        url: props.product.url,
        image: props.product.image,
        title_ir: props.product.title_ir,
        title_en: props.product.title_en,
        slug: props.product.slug,
        price: props.product.price,
        special_price: props.product.special_price,
        special_price_percent: props.product.special_price_percent,
        has_any_special_price: props.product.has_any_special_price,
        final_price: props.product.final_price,
        sku: props.product.sku,
        suggested: props.product.suggested,
        available_in_stock: props.product.available_in_stock,
        variant_type: props.product.variant_type,
        variants: props.product.variants,
        category: props.product.category,
        brand: props.product.brand,
    } as ProductCardDTO
    favoriteStore.AddItem(productDetail)
}

</script>

<style scoped>

.variant-select {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 1);

    border-radius: 10px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fadeIn 0.5s;

}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.variant-select-input {
    position: absolute;
    left: 0;
    top: 20%;
    width: 100%;
    box-sizing: border-box !important;
}

.variant-select-input-label {
    position: absolute;
    left: 0;
    top: 10%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box !important;
}


.sticky-div {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
}


.special-sell-height {
    height: 30px;
}

.product-box--action-cart {
    font-size: 14px;

}

.product-box--action-wishlist {
    background: transparent;
    font-size: 18px;
}

.product-box--action-wishlist:hover {
    background: #007BFF !important;
    border-color: transparent !important;
    font-size: 18px;
}


.product-box--action-wishlist:hover i {
    color: #fff3cd !important;
}


</style>