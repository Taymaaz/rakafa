<template>
  <Form @submit="AddAddress" :validation-schema="schema" v-slot="{ meta }">

    <div class="row">

      <div class="col-lg-6 mb-3">
        <base-form-input label="نام گیرنده" v-model="model.receiver_name" name="receiver_name"/>
      </div>

      <div class="col-lg-6 mb-3">
        <base-form-input label="نام خانوادگی گیرنده" v-model="model.receiver_family" name="receiver_family"/>
      </div>

      <div class="col-lg-6 mb-3">
        <base-form-input label="شماره موبایل گیرنده" v-model="model.receiver_phone" name="receiver_phone"/>
      </div>

      <div class="col-lg-6 mb-3">
        <base-form-input label="کد ملی / شماره شناسنامه گیرنده" v-model="model.receiver_national_code"
                         name="receiver_national_code"/>
      </div>

      <div class="col-lg-12 mb-3">
        <base-form-input label="کد پستی" v-model="model.postal_code" name="postal_code"/>
      </div>

      <div class="col-lg-6 mb-3">
        <label class="label-element"> استان </label>
        <select class="form-select custom-select" v-model="model.province" @change="model.city=''">
          <option disabled selected value="">استان خود را انتخاب کنید</option>
          <option v-for="province in provinces" :key="province.key" :value="province.key">{{ province.name }}</option>
        </select>

      </div>

      <div class="col-lg-6 mb-3">
        <label class="label-element"> شهر </label>
        <select class="form-select custom-select" v-model="model.city">
          <option disabled selected value="">شهر خود را انتخاب کنید</option>
          <option v-for="city in cities[model.province]" :key="city.key" :value="city.key">{{ city.name }}</option>
        </select>
      </div>
      <div class="col-lg-12 mb-3">
        <base-form-input label="آدرس" v-model="model.address" name="address"/>
      </div>

      <div class="col-12 mb-3 d-flex justify-content-end">
        <base-button type="submit" :disabled="meta.valid===false||loading" :loading="loading">افزودن آدرس جدید
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
import {provinces} from "~/utils/persian/provinces";
import {cities} from "~/utils/persian/cities";

const loading = ref(false)
const toast = useToast()
const emit = defineEmits(['closeModal'])

const model = reactive<CreateAddressDTO>({
  province: "",
  city: "",
  postal_code: "",
  address: "",
  receiver_phone: "",
  receiver_name: "",
  receiver_family: "",
  receiver_national_code: "",
})
const phoneRegex = /^(\+98|0)?9\d{9}$/;
const persianPhoneNumber = Yup.string().matches(phoneRegex, 'شماره موبایل وارد شده نامعتبر است').required('وارد کردن شماره موبایل الزامی است');
const schema = Yup.object().shape({
  receiver_name: Yup.string().required().label('نام'),
  receiver_family: Yup.string().required().label('نام خانوادگی'),
  receiver_national_code: Yup.string()
      .min(10, 'کد ملی وارد شده نامعتبر است').max(10, 'کد ملی وارد شده نامعتبر است').required().label('کد ملی'),
  //@ts-ignore
  receiver_phone: persianPhoneNumber,
  address: Yup.string().max(100, 'آدرس باید کمتر از 100 کاراکتر باشد').min(10, 'آدرس باید بیشتر از 10 کاراکتر باشد').required().label('آدرس'),
  postal_code: Yup.string().max(20, 'کد پستی وارد شده نامعتبر است').required().label('کد پستی'),
});

const AddAddress = async () => {
    if (model.province===""){
    toast.error("لطفا استان خود را انتخاب کنید")
    return
  }
  if (model.city===""){
    toast.error("لطفا شهر خود را انتخاب کنید")
    return

  }
  loading.value = true
  let result = await CreateAddress(model)
  if (result.isSuccess) {
    toast.success(result.metaData.message)
    emit('closeModal')
  } else {
    toast.error(result.metaData.message)
  }
  loading.value = false

}
</script>

<style scoped>

</style>