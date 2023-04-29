<template>
  <div>
    <Head>
      <Title>فروشگاه اینترنتی راکافا</Title>
    </Head>
    <div class="site-logo">
      <nuxt-link to="/">
        <img src="/images/rakafa.png" alt="logo" class="auth-logo">
      </nuxt-link>
    </div>

    <template v-if="resetData.section === 'phone'">
      <div class="auth-form-title right my-3">
        تغییر رمز عبور
      </div>
      <Form @submit="resetPassword" v-slot="{ meta }" :validation-schema="phoneSchema">
        <base-form-input
            name="phoneNumber"
            label="برای تغییر رمز عبور، شماره موبایل خود را وارد کنید"
            class="mb-3"
            v-model="resetData.phoneNumber"
        />

        <div class="form-element-row text-left text-center">
          <base-button
              w-full
              :class="['btn-element btn-info-element',{'bg-gray':meta.valid===false|| loading}]"
              :disabled="meta.valid===false || loading"
              :loading="loading"
          >
            تایید
          </base-button>
        </div>

      </Form>

    </template>
    <template v-if="resetData.section === 'confirmResetOTP'">
      <div class="auth-form-title right my-3">
        کد تایید را وارد کنید
      </div>
      <Form @submit="resetPassword" v-slot="{meta}" :validation-schema="otpSchema">
        <base-form-input
            name="code"
            :label="`کد تایید برای شماره ${resetData.phoneNumber} پیامک شد`"
            class="mb-3"
            input-classes="otp-input"

            v-model="resetData.code"
            :max="5"
        />
        <base-button
            class="no-style-button d-flex"
            type="button"
            @click="sendResetOTP"
            :disabled="timer.timerRunning"
            :class="{'text-gray': timer.timerRunning, 'no-cursor': timer.timerRunning}"
        >
          <template v-if="timer.timerRunning">
            ارسال مجدد کد تایید پس از : {{ formattedTime }}
          </template>
          <template v-else>
            ارسال مجدد کد تایید
          </template>
        </base-button>

        <div class="form-element-row text-left text-center">
          <base-button
              w-full
              :class="['btn-element btn-info-element',{'bg-gray':meta.valid===false}]"
              :disabled="meta.valid===false || loading"
              :loading="loading"
          >
            تایید
          </base-button>
        </div>
      </Form>
    </template>

    <template v-if="resetData.section === 'resetPassword'">

      <div class="auth-form-title right my-3">
        تغییر رمز عبور
      </div>

      <div class=" right my-3">
        رمز عبور باید حداقل ۸ حرفی باشد
      </div>

      <Form @submit="resetPassword" v-slot="{meta}" :validation-schema="passwordSchema">

        <base-form-input
            label="رمز عبور جدید"
            name="password"
            class="mb-3" v-model="resetData.password"
            type="password"
        />
        <base-form-input
            label="تکرار رمز عبور جدید"
            name="confirmPassword"
            class="mb-3" v-model="resetData.confirmPassword"
            type="password"
        />

        <div class="form-element-row text-left text-center">
          <base-button
              w-full
              :class="['btn-element btn-info-element',{'bg-gray':meta.valid===false}]"
              :disabled="meta.valid===false || loading"
              :loading="loading"
          >
            تغییر رمز
          </base-button>
        </div>
      </Form>
    </template>


  </div>
</template>

<script setup lang="ts">
import * as Yup from "yup"
import {Form} from 'vee-validate'
import {Auth, ResetPassword} from "~/services/user/auth.service";
import validatePhoneNumber from "~/utils/validators";
import {useToast} from "vue-toastification";
import {useAuthStore} from "~/stores/authStore";

const authStore = useAuthStore()
definePageMeta({
  layout: "auth",

});

const route = useRoute();
const router = useRouter();


const toast = useToast();
const loading = ref(false);

const phoneRegex = /^(\+98|0)?9\d{9}$/;
const persianPhoneNumber = Yup.string().matches(phoneRegex, 'شماره موبایل وارد شده نامعتبر است').required('وارد کردن شماره موبایل الزامی است');

const resetData = reactive({
  phoneNumber: null as string | any,
  password: "",
  confirmPassword: "",
  code: "",
  section: "phone",
});

const timerSetting = reactive({
  minutes: 3,
  seconds: 0,
});

const timer = reactive({
  timerRunning: false,
  minutes: timerSetting.minutes,
  seconds: timerSetting.seconds,
  timerId: null as number | null | any,
});

const phoneSchema = Yup.object().shape({
  phoneNumber: persianPhoneNumber,
});
const otpSchema = Yup.object().shape({
  code: Yup.string().required(),
});
const passwordSchema = Yup.object().shape({
  password: Yup.string().required().min(6,'رمز عبور باید حداقل 6 حرفی باشد').max(18,'رمز عبور باید حداکثر 18 حرفی باشد'),
  confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "کلمه های عبور یکسان نیستند"
  ),
});
const formattedTime = computed(() => {
  const min = String(timer.minutes).padStart(2, '0');
  const sec = String(timer.seconds).padStart(2, '0');
  return `${min}:${sec}`;
});
const resetTimer = () => {
  timer.minutes = timerSetting.minutes
  timer.seconds = timerSetting.seconds
};
const startTimer = () => {
  if (!timer.timerRunning) {
    resetTimer()
    timer.timerRunning = true;
    timer.timerId = setInterval(() => {
      if (timer.minutes === 0 && timer.seconds === 0) {
        stopTimer();
        return;
      }
      if (timer.seconds === 0) {
        timer.minutes--;
        timer.seconds = 59;
      } else {
        timer.seconds--;
      }
    }, 1000);
  }
};
const stopTimer = () => {
  timer.timerRunning = false;
  clearInterval(timer.timerId);
};
onMounted(() => {
  const phoneNumber = localStorage.getItem('phoneNumber')
  if (phoneNumber) {
    resetData.phoneNumber = phoneNumber
    localStorage.removeItem('phoneNumber')
  }
})
const resetPassword = async (data: any, formEvent: any) => {
  loading.value = true;
  validatePhoneNumber(resetData.phoneNumber)
  if (!validatePhoneNumber(resetData.phoneNumber)) {
    formEvent.setFieldError("phoneNumber", "شماره موبایل وارد شده نامعتبر میباشد");
    loading.value = false;
    return;
  }
  const result = await ResetPassword(resetData.phoneNumber, resetData.section, resetData.code, resetData.password, resetData.confirmPassword,);
  loading.value = false;
  console.log(result)
  console.log(result.data)
  console.log(result.data.done)
  if (result.isSuccess) {
    if (result.data.done) {
      toast.success(result.metaData.message);
      localStorage.setItem('phoneNumber', resetData.phoneNumber)
      router.push({
        path: '/login/'
      })
    }
    resetData.section = result.data.section;
    if (result.data.section === 'confirmResetOTP') {
      toast.success(result.metaData.message);
      startTimer();
    }
  } else {
    formEvent.setFieldError("phoneNumber",
        result.metaData.message);

    formEvent.setFieldError(
        "code",
        result.metaData.message
    );
    formEvent.setFieldError(
        "confirmPassword",
        result.metaData.message
    );
  }
};

</script>

<style scoped>
.text-gray {
  color: gray !important;
}

.no-cursor {
  cursor: auto !important;
}
</style>
