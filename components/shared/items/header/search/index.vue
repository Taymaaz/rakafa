<template>
    <div class="search-box" ref="searchBox">

        <form @submit.prevent="submitSearch">
            <input type="text"
                   placeholder="نام محصول یا برند را جستجو کنید..."
                   v-model="searchValue"
                   @keypress.enter="submitSearch"
            >
            <i class="far fa-search" @keypress.enter="submitSearch"></i>
        </form>

        <client-only>
            <div class="search-result" ref="searchDropdown">
                <ul class="search-result-list" ref="searchResult">
                    <template v-if="categories.length> 0">

                        <li>
                            <h6>دسته بندی ها</h6>
                        </li>

                        <ul class="search-result-most-view d-flex flex-wrap">

                            <div class="d-contents ">
                                <li v-for="category in categories" :key="category.id" class="mb-2">
                                    <nuxt-link :to="category.url">{{ category.title_ir }}</nuxt-link>
                                </li>
                            </div>
                        </ul>

                    </template>
                    <template v-if="categories.length> 0&&products.length> 0">
                        <hr class="my-4"/>
                    </template>
                    <template v-if="products.length> 0">


                        <li>
                            <h6>محصولات</h6>
                        </li>
                        <li v-for="product in products" :key="product.id">
                            <nuxt-link :to="product.url" class="d-flex align-items-center gap-2">
                                <base-image :src="GetImageUrl(product.image)"
                                            class="search-result-product-image border-image-20 "/>

                                <p>{{ product.title_ir }}</p>
                            </nuxt-link>
                        </li>
                    </template>

                    <template v-if="categories.length=== 0&&products.length=== 0 && !loading">
                        <p>محصولی یافت نشد</p>
                    </template>
                    <template v-if="loading">
                        <div class="d-flex">
                            <Icon name="svg-spinners:3-dots-move" size="20" v-for="i in 20"/>
                        </div>
                    </template>

                </ul>

            </div>
        </client-only>
    </div>

</template>

<script setup lang="ts">
import {useSearchResult} from "~/services/search/searchResult.service";
import {CategorySearchResultDTO, ProductSearchResultDTO} from "~/models/search/SearchResultDTO";
import {Ref} from "vue";

const router = useRouter()
const searchValue = ref("")
const emit = defineEmits(['toggleOverlayFromSearch'])
const route = useRoute()
const searchBox = ref(null);

const searchDropdown = ref(null);

const searchResult = ref(null);

const loading = ref(false);

const products: Ref<ProductSearchResultDTO[]> = ref([]);
const categories: Ref<CategorySearchResultDTO[]> = ref([]);
const submitSearch = async () => {

    await router.push({
        path: '/category/',
        query: {q: searchValue.value}
    })
    searchBox.value.querySelector('input').removeEventListener('keyup', showDropdown);
}
watch(() => route.query, () => {
    searchBox.value.querySelector('input').addEventListener('keyup', showDropdown);


    hideDropdown()
})


// define the minimum length for searchValue
const minLength = 3;

// define the delay time after user stops typing
const delay = 500; // in milliseconds

// use computed property to check if searchValue has minimum length
const hasMinLength = computed(() => searchValue.value.length >= minLength);

let timerId: ReturnType<typeof setTimeout> | null = null;

// define a function to perform the search
const search = async () => {
    loading.value = true
    const response = await useSearchResult(searchValue.value);
    loading.value = false

    if (response.isSuccess) {
        categories.value = response.data.categories;
        products.value = response.data.products;
    }
};

// use watch effect to perform the search when searchValue has minimum length and user stops typing
watch(
    searchValue,
    () => {
        // clear the timer if there's any
        if (timerId) {
            clearTimeout(timerId);
        }

        // set a new timer to perform the search after delay time
        timerId = setTimeout(() => {
            if (hasMinLength.value) {
                search();
            }
        }, delay);
    },
    {flush: 'sync'}
);


function showDropdown() {
    searchBox.value.classList.add('show-result');
    emit('toggleOverlayFromSearch', true)

    searchDropdown.value.style.display = 'block';
    if (searchValue.value.length > 3) {

        searchResult.value.style.display = 'block';

        // Handle page-header-overlay functionality
    } else {
        searchResult.value.style.display = 'none';

    }
}

function hideDropdown() {
    emit('toggleOverlayFromSearch', false)

    searchBox.value.classList.remove('show-result');
    searchDropdown.value.style.display = 'none';
    searchResult.value.style.display = 'none';

    // Handle page-header-overlay functionality
}

onMounted(() => {
    const input = searchBox.value.querySelector('input');
    if (input) {
        input.addEventListener('click', showDropdown);
        input.addEventListener('keyup', showDropdown);
    }

    document.addEventListener('click', (e) => {
        if (searchBox.value && !searchBox.value.contains(e.target)) {
            hideDropdown();
        }
    });
});

</script>
<style scoped>
.search-result-product-image {
    width: 50px;
}

</style>