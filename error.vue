<template>
<nuxt-layout>

    <div class="empty-box empty-box--404">
                    <div class="message mb-5">
                        <p class="text-muted mb-5">
                            صفحه‌ای که دنبال آن بودید پیدا نشد!

                        </p>
                        <div class="form-element-row">
                            <nuxt-link to="/" class="btn-element btn-info-element py-3">
                                <i class="fad fa-undo"></i>
                                بازگشت به صفحه اصلی
                            </nuxt-link>
                        </div>
                    </div>
                    <div class="pic">

                    </div>
                </div>
</nuxt-layout>
</template>

<script setup lang="ts">
import {definePageMeta} from "#imports";

definePageMeta({
    layout:'default'
})

</script>

<style scoped>

</style>