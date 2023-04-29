<template>
  <nuxt-link :to="`/login?backUrl=${router.currentRoute.value.fullPath}`">
    <slot/>
  </nuxt-link>
</template>

<script setup lang="ts">
const router = useRouter()

</script>

<style scoped>

</style>