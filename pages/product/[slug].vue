<template>

  <div>
    <Head>
      <Title>
        راکافا | {{result.data.title_ir}}
      </Title>
    </Head>
    <div class="row mb-1">
      <div class="col-12">
        <!-- breadcrumb -->
        <div class="breadcrumb mb-1">
          <nav>

            <nuxt-link to="/">صفحه اصلی</nuxt-link>
            <nuxt-link :to="item.url" v-for="item in result.data.breadcrumbs">
              {{item.title}}
            </nuxt-link>


            <span class="mx-1">{{ result.data.title_ir }}</span>

          </nav>
        </div>
        <!-- end breadcrumb -->
      </div>
    </div>
    <product-main-detail :product="result.data"/>

    <!-- end sellers -->
    <!-- product-tab-content -->
    <div class="row mb-5">
      <div class="col-12">
        <div class="product-tab-content">
          <ul class="nav nav-tabs" id="product-tab" role="tablist">
            <li class="nav-item " @click="infoTab=0">
              <a :class="['nav-link',{'active':infoTab===0}]">توضیحات</a>
            </li>

            <li class="nav-item" @click="infoTab=1">
              <a :class="['nav-link',{'active':infoTab===1}]">دیدگاه ها </a>
            </li>
          </ul>
          <div class="tab-content" id="product-tab">
            <div :class="['tab-pane fade',{'active show':infoTab===0}]" >
              <div class="product-desc">
                <div class="accordion accordion-product">
                  <div class="card">
                    <div >
                      <div class="card-body">
                        <p v-html="result.data.description"></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div :class="['tab-pane fade',{'active show':infoTab===1}]" >

              <product-comments :product_id="result.data.id"/>
            </div>

          </div>
        </div>
      </div>
    </div>
    <!-- end product-tab-content -->
    <base-product-slider  :products="result.data.related_products" title="پیشنهادهای مشابه"  icon="fa-clock"
                         v-if="result.data.related_products.length > 0 "/>

  </div>

</template>

<script setup lang="ts">
import {GetProductBySlug} from "~/services/product/product.service";
import ProductComments from "~/components/product/ProductComments.vue";
import {useToast} from "vue-toastification";


const infoTab = ref(0)
const route = useRoute()
const router = useRouter()
const toast = useToast()

const {data: result,pending} = await useAsyncData("single_product", () => GetProductBySlug(route.params.slug.toString()))

if (result.value?.data===null){
  toast.info('محصول مورد نظر یافت نشد')
  router.push('/')
}

</script>

<style scoped>
.nav-item{
  cursor: pointer;
}
</style>