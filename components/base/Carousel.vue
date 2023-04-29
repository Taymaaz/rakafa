<template>
    <Swiper :space-between="spaceBetween" :navigation="navigation" :pagination="pagination" :wrapperClass="baseClass" :loop="loop"
        :autoplay="autoplay" dir="rtl" :effect="effect" :modules="modules" :slides-per-view="itemsToShow"
        :breakpoints="breakpoints">
        <SwiperSlide :class="slideClass" v-for="(item, index) in items" :key="index">
            <slot name="item" :item="item" :index="index" />
        </SwiperSlide>
    </Swiper>
</template>

<script setup lang="ts">

import { AutoplayOptions, NavigationOptions, PaginationOptions, SwiperModule } from "swiper/types";

const props = withDefaults(defineProps<{
    items: any[],
    modules: SwiperModule[]
    breakpoints?: any,
    itemsToShow?: number,
    slideClass?: string,
    baseClass?: string,
    loop?: boolean,
    effect: 'slide' | 'fade' | 'cube' | 'coverflow' | 'flip' | 'creative' | 'cards',
    autoplay?: AutoplayOptions,
    navigation?: NavigationOptions,
    pagination?: PaginationOptions,
    spaceBetween?: number
}>(), {
    baseClass: "",
    effect: "slide",
    slideClass: "",
    loop: false,
    itemsToShow: 1,
    spaceBetween: 0
});

</script>

<style >
.swiper-button-prev::after,
.swiper-button-next:after {
    color: black;
    font-size: 24px;
    font-weight: bold;
}
.swiper-button-prev,
.swiper-button-next {
    width: 55px;
    height: 55px;
    background-color: #fff;
    border: 1px solid #efefef;
    border-radius: 50%;
    -webkit-box-shadow: 0 0 30px rgb(0 0 0 / 8%);
    box-shadow: 0 0 30px rgb(0 0 0 / 8%);
}

</style>