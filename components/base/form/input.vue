<template>
  <div class="form-element-row">
    <label :for="name" class="label-element">{{ label }}</label>
    <input
        :class="['input-element',{'error-input':errorMessage},inputClasses]"
        :type="type"
        :value="inputValue"

        :name="name"
        :placeholder="placeholder"
        @input="handleInputChange"
        :max="max"
        :min="min"
        :disabled="disabled"
        :readonly="readonly"
    >
    <span v-if="errorMessage && ignoreErrorMessage === false" class="text-danger">{{ errorMessage }}</span>
  </div>
</template>

<script setup lang="ts">


import {useField} from "vee-validate";

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  modelValue: {
    default: "",
  },

  label: {
    type: String,
    default: ""
  },

  placeholder: {
    type: String,
    default: ""
  },

  type: {
    type: String,
    default: "text"
  },

  ignoreErrorMessage: {
    type: Boolean,
    default: false
  },

  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },

  inputClasses: {
    type: String,
    default: ""
  },

  max: {
    type: Number,
    default: null
  },
  min: {
    type: Number,
    default: null
  },


})

const {errorMessage, value: inputValue, handleChange, setValue} = useField(props.name, undefined, {
  initialValue: props.modelValue
})
const emit = defineEmits(["update:modelValue"])
watch(() => props.modelValue,
    (val) => {
      setValue(val)
    })
const handleInputChange = (e: any) => {
  emit("update:modelValue", e.target.value)
  handleChange(e)
}
</script>

<style scoped>
  .otp-input {
    text-align: center !important;
    letter-spacing: 10px !important;
    direction: rtl !important;
  }

</style>