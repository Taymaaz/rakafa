<template>
  <div class="page-wrapper">
    <TheMainHeader/>

    <TheMobileHeader/>
    <main class="page-content main-margin" >
      <div class="container">
        <slot/>
      </div>
    </main>
    <TheFooter/>
  </div>


</template>

<script lang="ts" setup>
import TheFooter from "~/components/shared/TheFooter.vue";
import TheMainHeader from "~/components/shared/TheMainHeader.vue";
import TheMobileHeader from "~/components/shared/TheMobileHeader.vue";


</script>

<style scoped>
.main-margin{
    margin-top: 154px;
}
</style>