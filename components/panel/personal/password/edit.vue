<template>
  <Form @submit="SubmitForm" :validation-schema="schema" v-slot="{ meta }">

    <div class="row">

      <div class="col-lg-12 mb-3" v-if="has_password">
        <base-form-input type="password" label="رمز عبور فعلی" v-model="model.current_password"
                         name="current_password"/>
        <base-button class="no-style-button d-flex align-items-center" type="button"
                     :disabled="loading">
          فراموشی رمز عبور
          <i class="fad fa-chevron-left mr-2"></i>
        </base-button>
      </div>
      <div class="col-lg-12 mb-3">
        <base-form-input type="password" label="رمز عبور جدید" v-model="model.password" name="password"/>
        <div v-if="meta.valid===false">
          <p
              :class="{ 'text-success': isPasswordLengthValid, 'text-danger': !isPasswordLengthValid }">
            حداقل 6 و حداکثر 18 حرف باشد
          </p>

          <p class="my-1" :class="{ 'text-success': hasLowerCase, 'text-danger': !hasLowerCase }">
            حداقل یک حرف کوچک داشته باشد
          </p>


          <p :class="{ 'text-success': hasUpperCase, 'text-danger': !hasUpperCase }">
            حداقل یک حرف بزرگ داشته باشد
          </p>
        </div>
      </div>
      <div class="col-lg-12 mb-3">
        <base-form-input type="password" label="تکرار رمز عبور جدید" v-model="model.confirm_password"
                         name="confirm_password"/>
      </div>
      <div class="col-12 mb-3 d-flex justify-content-end">
        <base-button type="submit" :disabled="meta.valid===false||loading" :loading="loading">
          <template v-if="has_password">تغییر رمز عبور</template>
          <template v-else>ثبت رمز عبور</template>
        </base-button>
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
import {ChangePassword, EditUser} from "~/services/user/user.service";
import {useAuthStore} from "~/stores/authStore";
import {ChangePasswordDTO} from "~/models/user/changePasswordDTO";

const authStore = useAuthStore()
const loading = ref(false)
const toast = useToast()
const emit = defineEmits(['closeModal'])

defineProps({
  has_password: Boolean
})

const model = reactive<ChangePasswordDTO>({
  current_password: "",
  password: "",
  confirm_password: "",
  refresh: "",
})
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,18}$/;

const schema = Yup.object().shape({

  password: Yup.string()
      .matches(passwordRegex, ` `)
      .required(),
  confirm_password: Yup.string().oneOf(
      [Yup.ref("password")],
      "کلمه های عبور یکسان نیستند"
  ),

});

const isPasswordLengthValid = computed(() => {
  return model.password.length >= 6 && model.password.length <= 18;
})

const hasLowerCase = computed(() => {
  return /[a-z]/.test(model.password);

})

const hasUpperCase = computed(() => {
  return /[A-Z]/.test(model.password);
})

const SubmitForm = async (data: any, formEvent: any) => {
  loading.value = true
  model.refresh=JSON.stringify(authStore.loginResult!.refresh)
  let result = await ChangePassword(model)
  if (result.isSuccess) {
    toast.success(result.metaData.message)
    emit('closeModal')
    // localStorage.removeItem("auth-data");
    // localStorage.setItem("auth-data", JSON.stringify(result.data));
    await authStore.SetCurrentUserValue()
  } else {
    formEvent.setFieldError(result.data, result.metaData.message);
  }
  loading.value = false
}
</script>

<style scoped>

</style>