<template>
    <div class="site-logo">
        <nuxt-link to="/">
            <img src="/images/rakafa.png" alt="فروشگاه اینترنتی راکافا">
        </nuxt-link>
    </div>
</template>

<style scoped>

.site-logo img {
    max-width: 150px !important;
}

@media only screen and (max-width: 1200px) {
    .site-logo img {
        max-width: 130px !important;
    }
}

@media only screen and (max-width: 1000px) {
    .site-logo img {
        max-width: 120px !important;
    }
}

</style>