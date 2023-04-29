<template>

  <Transition enter-active-class="animate__animated animate__fadeIn animate__faster"
              leave-active-class="animate__animated animate__fadeOut animate__faster">
    <div v-if="modelValue" :class="['modal fade ',{'show':modelValue===true}]" tabindex="-1"
         :style="{'display':modelValue?'block':null}"
         @mousedown.self="emit('update:modelValue',false)"
    >
      <div :class="['modal-dialog',{'modal-lg':large}] ">
        <div class="modal-content mt-10">
          <div class="modal-header">
            <h5 class="modal-title" >
              {{title}}
            </h5>

            <hr>
            <button type="button" class="close" @click="emit('update:modelValue',false)">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>

        </div>
      </div>

    </div>
  </Transition>

</template>

<script setup lang="ts">
defineProps({

  modelValue: {
    type: Boolean,
    default: false
  },

  large: {
    type: Boolean,
    default: false
  },

  title: {
    type: String,
    default: 'عنوان'
  },


})

const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
.modal {
  background: rgba(0, 0, 0, 0.55);
  tab-index: -1;
}
.mt-10{
  margin-top: 10%;
}
</style>