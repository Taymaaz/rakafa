<template>
  <Form @submit="SubmitForm" :validation-schema="schema" v-slot="{ meta }">

    <div class="row">

      <div class="col-lg-12 mb-3">
        <base-form-input label="کد ملی " v-model="model.national_code" name="national_code"/>
      </div>


      <div class="col-12 mb-3 d-flex justify-content-end">
        <base-button type="submit" :disabled="meta.valid===false||loading" :loading="loading">ویرایش</base-button>
      </div>
    </div>
  </Form>

</template>

<script setup lang="ts">
import * as Yup from "yup";
import {useToast} from "vue-toastification";
import {Form} from "vee-validate";
import {EditUser} from "~/services/user/user.service";
import {useAuthStore} from "~/stores/authStore";

const authStore = useAuthStore()
const loading = ref(false)
const toast = useToast()
const emit = defineEmits(['closeModal'])

const props = defineProps<{
  national_code: string,
}>();
const model = reactive({
  national_code: props.national_code,
})
const persianNationalCodeRegex = /^[0-9]{10}$/;

const schema = Yup.object().shape({
  national_code: Yup.string()
      .matches(persianNationalCodeRegex, 'کد ملی وارد شده نا معتبر است')
      .required()
});


const SubmitForm = async () => {
  let newUserData = new FormData()
  newUserData.append("national_code", model.national_code)
  loading.value = true
  let result = await EditUser(newUserData)
  if (result.isSuccess) {
    toast.success(result.metaData.message)
    emit('closeModal')
    await authStore.SetCurrentUserValue()
  } else {
    toast.error(result.metaData.message)
  }
  loading.value = false
}
</script>

<style scoped>

</style>