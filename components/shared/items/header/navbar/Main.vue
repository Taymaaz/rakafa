<template>
    <nav class="nav-wrapper" ref="navWrapper">

        <ul>
            <li class="category-list" ref="categoryList">
                <a type="button"><i class="fal fa-bars"></i>دسته بندی کالاها</a>
                <ul v-if="utilStore.categories !== null">
                    <li v-for="(item,index) in utilStore.categories" :key="index">
                        <nuxt-link :to="`/category/${item.slug}/`">{{ item.display_title }}</nuxt-link>
                        <ul class="row">
                            <li class="col-12">
                                <nuxt-link :to="`/category/${item.slug}/`" class="text-info">همه
                                    دسته‌بندی‌های {{ item.title_ir }}
                                </nuxt-link>
                            </li>
                            <li class="col-3" v-for="(child,index) in item.children" :key="index">
                                <nuxt-link :to="`/category/${item.slug}/${child.slug}/`">
                                    {{ child.display_title }}
                                </nuxt-link>
                                <ul>
                                    <li v-for="(product,index) in child.products" :key="index">
                                        <nuxt-link :to="`/product/${product.slug}/`">
                                            {{ product.title_ir }}
                                        </nuxt-link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>


            <li>
                <nuxt-link to="/"><i class="fal fa-home text-info"></i>صفحه اصلی</nuxt-link>
            </li>
            <li>
                <nuxt-link><i class="fal fa-check-circle text-success"></i> خرید عمده برنج ایرانی
                </nuxt-link>
            </li>
            <li>
                <nuxt-link><i class="fal fa-paper-plane text-danger"></i>وبلاگ</nuxt-link>
            </li>

            <li class="dropdown--list">
                <a type="button"> سایر ... <i class="fal fa-angle-down mr-1"></i></a>
                <ul>
                    <li>
                        <nuxt-link>سوالات متداول</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link>تماس با ما</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link>تماس با ما</nuxt-link>
                    </li>
                </ul>
            </li>

        </ul>

    </nav>
</template>

<script setup>
import {useUtilStore} from "~/stores/utilStore";

const utilStore = useUtilStore()

const emit=defineEmits(['toggleOverlay'])

const navWrapper = ref(null);
const categoryList = ref(null);

onMounted(() => {
    navWrapper.value.addEventListener('mouseenter', () => {
        navWrapper.value.classList.add('is-active');
    });

    navWrapper.value.addEventListener('mouseleave', () => {

        navWrapper.value.classList.remove('is-active');
    });

    categoryList.value.addEventListener('mouseenter', () => {
        categoryList.value.classList.add('is-active');
        emit('toggleOverlay',true)


    });

    categoryList.value.addEventListener('mouseleave', () => {
        categoryList.value.classList.remove('is-active');
        emit('toggleOverlay',false)


    });

    categoryList.value.querySelector('ul > li:first-child').classList.add('active');

    categoryList.value.querySelectorAll('ul > li').forEach((li) => {
        li.addEventListener('mouseenter', () => {
            li.classList.add('active');
            Array.from(li.parentNode.children).forEach((sibling) => {
                if (sibling !== li) {
                    sibling.classList.remove('active');
                }
            });
        });
    });
});
</script>

<style scoped>

</style>