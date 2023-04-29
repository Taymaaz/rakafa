<template>
  <div class="row mb-4">

    <div class="col-12">
      <div class="section-title mb-2">
        لیست سفارشات
      </div>
      <section class="shadow-around p-3">
        <section class="table--order shadow-around mt-4">
          <client-only>
            <template v-if="orders.length > 0">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                  <tr>
                    <th>شماره سفارش</th>
                    <th>تاریخ ثبت سفارش</th>
                    <th>مبلغ کل</th>
                    <th>عملیات پرداخت</th>
                    <th>عملیات پرداخت</th>
                  </tr>
                  </thead>
                  <tbody>


                  <tr v-for="item in orders" :key="item.id">
                    <td class="order-code">{{ item.transaction }}</td>
                    <td>{{ getPersianDate(item.ordered_date, "y/M/dd") }}</td>

                    <td>{{ splitNumber(item.total_price) }} تومان</td>

                    <td>

                      <template v-if="item.status===OrderStatus.Pending">
                        در انتظار تایید
                      </template>

                      <template v-if="item.status===OrderStatus.Processing">
                        در حال پردازش
                      </template>

                      <template v-if="item.status===OrderStatus.Shipped">
                        ارسال شده
                      </template>

                      <template v-if="item.status===OrderStatus.Delivered">
                        تحویل داده شده
                      </template>
                      <template v-if="item.status===OrderStatus.Canceled">
                        لغو شده
                      </template>

                    </td>

                    <td class="order-detail-link">
                      <nuxt-link :to="`/panel/orders/${item.transaction}`">
                        <base-button class="py-1">
                          جزئیات
                        </base-button>
                      </nuxt-link>
                    </td>
                  </tr>


                  </tbody>
                </table>
              </div>
            </template>
            <template v-else>
              <base-util-empty message="سفارشی برای نمایش وجود ندارد!"/>
            </template>
          </client-only>
        </section>

      </section>
    </div>

  </div>


</template>

<script setup lang="ts">
import {GetOrders} from "~/services/order/order.service";
import {OrderDTO, OrderStatus} from "~/models/order/OrderDTO";
import {Ref} from "vue";

definePageMeta({
  layout: 'panel'
})
const loading = ref(false)
const orders: Ref<OrderDTO[]> = ref([])
onMounted(async () => {
  loading.value = true
  let result = await GetOrders(1, 20)

  loading.value = false
  if (result.isSuccess) {
    orders.value = result.data.data
  }
})

</script>

