<template>
            <nuxt-img placeholder v-if="showDefaultPlaceHolder" loading="lazy" />
            <nuxt-img :placeholder="placeHolderImage" v-else loading="lazy" />

</template>

<script setup >
import placeHolderImage from"~/assets/images/default.jpg"

defineProps({
  // src:{
  //   required:true,
  //   type:String
  // },
  showDefaultPlaceHolder:{
    default:true,
    type:Boolean
  }
})
</script>

<style scoped>

</style>