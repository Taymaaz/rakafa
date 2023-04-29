<template>
  <button
      :class="
      ['btn',
      {'btn-block':wFull},
      outline?`btn-outline-${color}`:`btn-${color}`]"
      :disabled="loading"
      v-if="!loading"
  >
    <slot/>
<Icon name="svg-spinners:3-dots-scale" size="20px" v-if="loading"/>
  </button>
</template>

<script setup lang="ts">
defineProps({

  wFull: {
    default: false,
    type: Boolean,
  },
  outline: {
    default: false,
    type: Boolean,
  },
  color: {
    default: "primary",
    type: String,
  },
  loading:{
    type:Boolean,
    default:false
  }


})
</script>

<style scoped>

</style>