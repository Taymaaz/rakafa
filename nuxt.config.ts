export default defineNuxtConfig({
    modules: ['@nuxt/devtools', "@pinia/nuxt", "@nuxt/image-edge", "nuxt-swiper", "@nuxtjs/html-validator", "nuxt-icon", "nuxt-purgecss"],


    build: {

        transpile: ['nuxt-swiper', 'vue-toastification'],
    },

    app: {
        head: {
            title: "فروشگاه اینترنتی راکافا"
        },
        pageTransition: {
            name: "page",
            mode: "out-in",
        },
        layoutTransition: {
            name: "layout",
            mode: "in-out",
        },
    },

    css: [
        "@/assets/bootstrap/css/bootstrap.min.css",
        "@/assets/css/font-awesome.min.css",
        "@/assets/css/theme.css",
        "@/assets/css/custom.css",
    ],

    routeRules: {
        "/profile": {ssr: false},
        "/profile/**": {ssr: false},
        "/profile/**/**": {ssr: false},
        "/login/": {ssr: false},
    },
    image: {
        domains: ['localhost', 'localhost:8000', 'localhost:8000/editor-files'],
        alias: {
            rakafa: "http://localhost:8000/medias",
            post: "http://localhost:8000/editor-files"
        }
    },


})
