<template>
  <div class="card-skeleton" v-if="loading">
    <div class="placeholder"></div>
    <div class="loading-animation">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  loading:{
    type:Boolean,
    default:false
  }
})
</script>

<style scoped>
.card-skeleton {
  position: relative;
  width: 99%;
  height: 375px;
  margin-bottom: 5px;


}

.placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(225, 221, 221, 0.3);
  border-radius: 5px;


}

.loading-animation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  animation: blink 0.5s infinite;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-animation div {
  display: inline-block;
  margin: 0 8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #fff;


}

@keyframes card-skeleton-blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.loading-animation {
  animation-name: card-skeleton-blink;
}
</style>
