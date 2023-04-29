<template>
  <div class="empty-box">
    <div class="icon">
      <i class="fal fa-times-circle"></i>
    </div>
    <div class="message">
      <p>{{ message }}</p>
      <slot/>
    </div>
  </div>
</template>


<script setup lang="ts">
defineProps({

  message: {
    default: false,
    type: String,
  },


})
</script>


<style scoped>

</style>