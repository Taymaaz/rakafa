<template>
    <div>
        <header class="page-header">
            <div class="container">
                <div class="bottom-page-header">
                    <div class="d-flex align-items-center">
                        <shared-items-header-logo-main/>

                        <shared-items-header-search @toggleOverlayFromSearch="toggleOverlay"/>
                    </div>

                    <client-only>
                        <div class="user-items d-flex">

                            <shared-items-header-profile-main/>

                            <span class="mx-3 break-line">|</span>
                            <shared-items-header-basket-main/>
                        </div>
                    </client-only>
                </div>

                <shared-items-header-navbar-main @toggleOverlay="toggleOverlay"/>
            </div>
        </header>
        <div :class="['page-header-overlay',{'active':headerOverlay}]"></div>
    </div>
</template>

<script setup>


const headerOverlay = ref(false)

const toggleOverlay = (status) => {
    headerOverlay.value = status
}

const pageHeaderHeight = ref(0)
const navWrapperHeight = ref(0)

onMounted(() => {
    pageHeaderHeight.value = document.querySelector('.page-header')?.offsetHeight
    navWrapperHeight.value = document.querySelector('.page-header .nav-wrapper')?.offsetHeight
    if (document.querySelector('.page-header')) {
        document.querySelector('.page-content').style.marginTop = `${pageHeaderHeight.value + navWrapperHeight.value + 15}px`
    }
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 55) {
            document.querySelector('.page-header, .header-responsive')?.classList.add('fixed')
            document.querySelector('.page-header .top-page-header')?.slideUp(200)

        } else {
            document.querySelector('.page-header, .header-responsive')?.classList.remove('fixed')
            document.querySelector('.page-header .top-page-header')?.slideDown(200)
        }
    })
    let lastScrollTop = 0
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        if (scrollTop > lastScrollTop && !document.querySelector('.nav-wrapper')?.classList.contains('is-active')) {

            let element = document.querySelector('.page-header .nav-wrapper')
            if (element) {
                element.classList.add('hidden--nav-wrapper')
            }
        } else {
            let element = document.querySelector('.page-header .nav-wrapper')
            if (element) {
                element.classList.remove('hidden--nav-wrapper')
            }
        }
        lastScrollTop = scrollTop
    })
})


</script>
<style scoped>
.break-line {
    background: #e0e0e6;
    color: transparent;
    width: 1px;
    height: 30px;
}

.page-header-overlay {
    opacity: 0;

    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.45);
    transition: opacity 0.2s ease-out; /* add a transition effect to opacity */
}

.page-header-overlay.active {
    opacity: 1 !important;
    display: block !important;
    z-index: 99;

}


</style>