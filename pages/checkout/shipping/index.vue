<template>
  <div>
    <client-only>
      <div class="row mb-4">
        <div class="col-xl-9 col-lg-8 col-md-8 mb-md-0 mb-3">
          <div class="checkout-section shadow-around">
            <div class="checkout-step">
              <ul>
                <li class="active">
                  <nuxt-link to="/checkout/cart/"><span>سبد خرید</span></nuxt-link>
                </li>
                <li class="active">
                  <span>نحوه ارسال و پرداخت</span>
                </li>
                <li>
                  <span>اتمام خرید و ارسال</span>
                </li>
              </ul>
            </div>
            <div class="checkout-section-content">
              <div class="row mx-0">
                <div class="col-md-6">
                  <div class="checkout-section-title">کد تخفیف</div>

                  <div class="d-flex align-items-center">

                    <template v-if="usedCoupon">

                      <div class="form-element-row flex-grow-1 ">

                        <base-form-input
                            name="coupon_form"
                            input-classes="border-success bg-transparent text-center"
                            :placeholder="`${couponForm} ( ${splitNumber(usedCoupon.discount_amount)} تومان ) `"
                            disabled
                            readonly
                        />

                      </div>

                      <div class="form-element-row mr-3">
                        <base-button class="py-1" color="danger" @click="removeCoupon">
                          حذف
                          <Icon name="teenyicons:discount-solid"/>
                        </base-button>
                      </div>
                    </template>
                    <template v-else>
                      <div class="form-element-row flex-grow-1">
                        <base-form-input
                            name="coupon_form"

                            v-model="couponForm"
                            placeholder="کد تخفیف را وارد کنید"/>
                      </div>
                      <div class="form-element-row mr-3">
                        <base-button class="py-1" color="primary" @click="useCoupon" :disabled="couponForm.length < 3">
                          ثبت
                          <Icon name="teenyicons:discount-solid"/>
                        </base-button>
                      </div>
                    </template>

                  </div>

                </div>
              </div>
              <hr>

              <div class="checkout-section-title">آدرس تحویل سفارش</div>

              <panel-address @selected-address="(add)=>selectedAddress=add" @changes="selectedShipping=0"/>
              <div>
                <div class="checkout-section-title">شیوه ارسال</div>
                <div class="payment-selection">
                  <div class="custom-control custom-radio custom-control-inline mb-3"
                       v-for="item in filteredShippingMethods"
                       :key="item.id">
                    <input type="radio"
                           v-model="selectedShipping"
                           :value="item.id"
                           :id="`methodSelection-${item.id}`"
                           name="methodSelection"
                           class="custom-control-input"
                    >
                    <label
                        class="custom-control-label payment-select"
                        :for="`methodSelection-${item.id}`"
                    >
                  <span class="d-flex align-items-center gap-4">
                   <base-image :src="GetImageUrl(item.shipping_method.image)" class="shipping-image"/>
                    <span>
                      <span class="title">{{ item.shipping_method.name }}</span>
                     <template
                         v-if="item.price === 0 || (item.free_shipping_threshold > 0 && item.free_shipping_threshold <= basketStore.getTotalPrice())">
                      <span class="subtitle">
هزینه حمل رایگان
                      </span>
                     </template>

                     <template v-else>
                        <span class="subtitle">{{ splitNumber(item.price) }} تومان</span>
                      <span class="subtitle" v-if="item.free_shipping_threshold >0">
هزینه حمل رایگان برای سفارش های بالای {{ splitNumber(item.free_shipping_threshold) }} تومان
                      </span>
                     </template>

                    </span>
                  </span>
                    </label>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div class="col-xl-3 col-lg-4 col-md-4">
          <div class="shadow-around pt-3">
            <div class="d-flex justify-content-between px-3 py-2">
              <span class="text-muted">قیمت کالاها ( {{ basketStore.getItemsCount }} )</span>
              <span class="text-muted">
                                    {{ splitNumber(basketStore.getTotalPriceBeforeDiscount()) }}
                                    <span class="text-sm">تومان</span>
                                </span>
            </div>

            <div class="d-flex justify-content-between px-3 py-2" v-if="basketStore.getTotalPriceAfterDiscount() > 0">
              <span class="text-muted">تخفیف کالاها</span>
              <span class="text-danger">
                                    ({{
                  basketStore.getDiscountPercentage()
                }}٪) {{ splitNumber(basketStore.getTotalPriceBeforeDiscount() - basketStore.getTotalPrice()) }}
                                    <span class="text-sm">تومان</span>
                                </span>
            </div>
            <div class="d-flex justify-content-between px-3 py-2" v-if="usedCoupon">
              <span class="text-muted">کد تخفیف</span>
              <span class="text-danger">
                                    {{ splitNumber(usedCoupon.discount_amount) }}
                                    <span class="text-sm">تومان</span>
                                </span>
            </div>
            <hr>
            <div class="d-flex justify-content-between px-3 py-2" v-if="selectedShipping">
              <span class="text-muted"> هزینه ارسال</span>

              <span v-if="!isFreeShipping">

                                  {{ splitNumber(getSelectedShipping.price) }}
                                    <span class="text-sm">تومان</span>
                                </span>
              <span v-else class="text-success">
              رایگان

                                </span>

            </div>
            <hr>

            <div class="d-flex justify-content-between px-3 py-2">
              <span class="font-weight-bold">مبلغ قابل پرداخت</span>
              <span class="font-weight-bold d-flex gap-1">

           <template v-if="!isFreeShipping">
  {{
               splitNumber((getSelectedShipping?.price ?? 0) + (usedCoupon ? (basketStore.getTotalPrice() - usedCoupon.discount_amount) : basketStore.getTotalPrice()))
             }}
</template>
<template v-else>
  {{splitNumber(usedCoupon ? (basketStore.getTotalPrice() - usedCoupon.discount_amount) : basketStore.getTotalPrice())}}
</template>

                                    <span class="text-sm">تومان</span>
                                </span>
            </div>
            <div class="d-flex px-3 py-4">
              <button @click="paymentRequest" class="btn btn-primary btn-block py-2">
                پرداخت و ثبت سفارش

              </button>
            </div>
          </div>

        </div>
      </div>

 <div class="g__loading" v-if="gatewayLoading">
            <div class="content">
                <p>{{ gatewayMessage }} ...</p>
            </div>
        </div>
    </client-only>


  </div>

</template>

<script setup lang="ts">
import {GetShippingMethods} from "~/services/order/orderShipping.service";
import {useBasketStore} from "~/stores/BasketStore";
import {ShippingPriceDTO} from "~/models/order/ShippingMethodDTO";
import {Ref} from "vue";
import {splitNumber} from "~/utils/numberUtils";
import {AddressDTO} from "~/models/user/addressDTO";
import {useToast} from "vue-toastification";
import {GetImageUrl} from "~/utils/imageURL";
import {DiscountDTO} from "~/models/order/DiscountDTO";
import {UseCoupon} from "~/services/coupon/coupon.service";
import {PaymentRequest} from "~/services/order/order.service";

const basketStore = useBasketStore()
const toast = useToast()
const loading = ref(false)
const gatewayLoading = ref(false)
const gatewayMessage = ref("")

const usedCoupon: Ref<DiscountDTO | null> = ref(null)
const couponForm = ref("")

const useCoupon = async () => {
  if (!couponForm.value) return toast.error('کد تخفیف را وارد کنید')
  let result = await UseCoupon(couponForm.value)
  if (result.isSuccess) {
    toast.success(result.metaData.message)
    usedCoupon.value = result.data


  } else {
    toast.error(result.metaData.message)
    couponForm.value = ""
  }
}
const removeCoupon = () => {
  usedCoupon.value = null
  couponForm.value = ""
  toast.info("کد تخفیف حذف شد")

}


const selectedAddress: Ref<AddressDTO | null> = ref(null)
const selectedShipping = ref(0)
const shippingMethods: Ref<ShippingPriceDTO[]> = ref([])
const filteredShippingMethods: Ref<ShippingPriceDTO[]> = ref([])

onMounted(async () => {
  let result = await GetShippingMethods()
  shippingMethods.value = result.data

})
const getSelectedShipping = computed(() => {
  return shippingMethods.value.find(f => f.id === selectedShipping.value)
})
const isFreeShipping = computed(() => {
  let shipping = shippingMethods.value.find(f => f.id === selectedShipping.value)
  let total_price = basketStore.getTotalPrice()
  if (shipping) {
    return shipping.price === 0 || (shipping.free_shipping_threshold > 0 && shipping.free_shipping_threshold <= total_price)
  } else {
    return false
  }

})
watch(selectedAddress, (newValue, oldValue) => {
  selectedShipping.value = 0
  console.log('here')
  console.log(newValue)

  if (newValue === null || newValue === undefined || !selectedAddress) return
  let check = shippingMethods.value.filter(f => f.area === newValue!.province)

  if (check.length > 0) {
    filteredShippingMethods.value = shippingMethods.value.filter(f => f.area === newValue!.province)
  } else {
    filteredShippingMethods.value = shippingMethods.value.filter(f => f.area === "همه")
  }
})
const paymentRequest = async () => {

  if (selectedAddress.value === null) {
    toast.error("آدرس سفارش را انتخاب کنید")
    return
  }
  if (selectedShipping.value === 0) {
    toast.error("شیوه ارسال را انتخاب کنید")
    return
  }
  gatewayLoading.value=true
  let command = {
    'coupon_code': couponForm.value,
    'shipping_id': selectedShipping.value,
    'address_id': selectedAddress.value?.id
  }
  let result = await PaymentRequest(command)
  if (result.isSuccess) {
    if (result.isSuccess) {
      if (result.data.free){
        gatewayMessage.value = result.metaData.message
        await window.location.replace(result.data.url)
      }else {
        gatewayMessage.value = result.metaData.message
        await window.location.replace(result.data.url)
      }
    } else {
      toast.error(result.metaData.message)
    }
  } else {
    toast.error(result.metaData.message)
  }
  gatewayLoading.value = false
}
</script>

<style scoped>
.shipping-image {
  max-height: 40px;
}

@media screen and (max-width: 768px) {
  .g__loading .content {
    width: 90% !important;
  }
}

.g__loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.418);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.g__loading .content {
  width: 30%;
  background: white;
  box-shadow: 0 0 5px 0 gray;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  font-size: 16px;
}
</style>