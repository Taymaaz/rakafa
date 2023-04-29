<template>
  <div class="page-wrapper">
    <TheMainHeader/>
    <TheMobileHeader/>
    <main class="page-content main-margin">
      <div class="container">
        <div class="row mb-5">
          <div class="col-lg-3 col-md-4 mb-md-0 mb-3 sticky-sidebar">
            <the-side-bar/>
          </div>
          <div class="col-lg-9 col-md-8">
            <slot/>

          </div>

        </div>
      <base-recent-products-section v-if="!$route.path.includes('panel/recents/')"/>


      </div>
    </main>
    <TheFooter/>
  </div>


</template>

<script lang="ts" setup>
import TheFooter from "~/components/shared/TheFooter.vue";
import TheMainHeader from "~/components/shared/TheMainHeader.vue";
import TheMobileHeader from "~/components/shared/TheMobileHeader.vue";
import TheSideBar from "~/components/panel/TheSideBar.vue";



</script>


<style scoped>
.main-margin{
    margin-top: 154px;
}
</style>

