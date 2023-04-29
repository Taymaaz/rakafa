<template>
  <Form @submit="SubmitForm" :validation-schema="schema" v-slot="{ meta }">

    <div class="row">

      <div class="col-lg-6 mb-3">
        <base-form-input label="نام " v-model="model.first_name" name="first_name"/>
      </div>

      <div class="col-lg-6 mb-3">
        <base-form-input label="نام خانوادگی " v-model="model.last_name" name="last_name"/>
      </div>


      <div class="col-12 mb-3 d-flex justify-content-end">
        <base-button type="submit" :disabled="meta.valid===false||loading" :loading="loading">ویرایش</base-button>
      </div>
    </div>
  </Form>

</template>

<script setup lang="ts">
import * as Yup from "yup";
import {CreateAddressDTO} from "~/models/user/addressDTO";
import {CreateAddress} from "~/services/user/userAddress.service";
import {useToast} from "vue-toastification";
import {Form} from "vee-validate";
import {EditUser} from "~/services/user/user.service";
import {useAuthStore} from "~/stores/authStore";

const authStore = useAuthStore()
const loading = ref(false)
const toast = useToast()
const emit = defineEmits(['closeModal'])

const props = defineProps<{
  first_name: string,
  last_name: string,

}>();

const model = reactive({
  first_name: props.first_name,
  last_name: props.last_name,

})

const schema = Yup.object().shape({
  first_name: Yup.string().required(),
  last_name: Yup.string().required()
});

const SubmitForm = async () => {
  let newUserData = new FormData()
  newUserData.append("first_name", model.first_name)
  newUserData.append("last_name", model.last_name)
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