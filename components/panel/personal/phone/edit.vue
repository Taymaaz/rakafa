<template>
  <div>
    <template v-if="model.step='phone_number'">
      <Form @submit="SubmitForm" :validation-schema="schema" v-slot="{ meta }">

        <div class="row">

          <div class="col-lg-12 mb-3">
            <base-form-input label="شماره موبایل" v-model="model.email" name="phone_number"/>
          </div>


          <div class="col-12 mb-3 d-flex justify-content-end">
            <base-button type="submit" :disabled="meta.valid===false||loading" :loading="loading">ویرایش</base-button>
          </div>
        </div>
      </Form>
    </template>
  </div>

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
  phone: string,

}>();

const model = reactive({
  phone: props.phone,
  otp: "",
  new_phone: "",
  step:"phone_number"
})

const phoneRegex = /^(\+98|0)?9\d{9}$/;
const persianPhoneNumber = Yup.string().matches(phoneRegex, 'شماره موبایل وارد شده نامعتبر است').required();

const schema = Yup.object().shape({
  phone_number: persianPhoneNumber,
});


const SubmitForm = async () => {
  let newUserData = new FormData()
  newUserData.append("email", model.phone)
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
