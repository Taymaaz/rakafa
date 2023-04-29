<template>
    <div>


       <client-only>
            <div class="shadow-around">
            <div class="section-title p-3 d-flex align-items-center gap-4">
                <p> لیست بازدید های اخیر</p>
                <base-button color="danger" class="text-left py-1 mr-2" @click="clearRecent"
                             v-if="recentProducts.length > 0">پاک کردن همه
                </base-button>
            </div>

            <div class="listing-items row m-3" v-if="recentProducts.length > 0">
                <div class="col-lg-3 col-6 px-0" v-for="item in recentProducts" :key="item.id">
                    <product-card :product="item"/>
                </div>
            </div>
            <div v-else>
                <base-util-empty message="محصولی برای نمایش وجود ندارد"/>
            </div>

        </div>
       </client-only>


    </div>
</template>

<script setup lang="ts">
import {ProductCardDTO} from "~/models/product/ProductCard";
import ProductCard from "~/components/base/product/productCard.vue";
import {useToast} from "vue-toastification";

definePageMeta({
    layout: "panel"
})

const toast = useToast()
const recentProducts = ref<ProductCardDTO[]>([]);
onMounted(() => {
    // Get recent products from local storage
    const recentProductsFromStorage = localStorage.getItem('recentProducts');
    if (recentProductsFromStorage) {
        recentProducts.value = JSON.parse(recentProductsFromStorage).slice(0, 10);
    }
})
const clearRecent = () => {
    localStorage.removeItem('recentProducts');
    recentProducts.value = []
    toast.info('تمامی محصولات بازدید شده حذف شدند')
}
</script>

<style scoped>

</style>