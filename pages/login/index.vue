<template>
  <div>
    <Head>
      <Title>فروشگاه اینترنتی راکافا</Title>
    </Head>
    <client-only>
        <div class="site-logo">
      <nuxt-link to="/">
        <img src="/images/rakafa.png" alt="logo" class="auth-logo">
      </nuxt-link>
    </div>

    <template v-if="loginData.section === 'phone'">
      <div class="auth-form-title right my-3">
        ورود | ثبت نام
      </div>
      <Form @submit="authUser" v-slot="{ meta }" :validation-schema="phoneSchema">
        <base-form-input
            name="phoneNumber"
            label="لطفا شماره موبایل خود را وارد کنید"
            class="mb-3"
            v-model="loginData.phoneNumber"
        />

        <div class="form-element-row text-left text-center">
          <base-button
              w-full
              :class="['btn-element btn-info-element',{'bg-gray':meta.valid===false|| loading}]"
              :disabled="meta.valid===false || loading"
              :loading="loading"
          >
            ورود
          </base-button>
        </div>

      </Form>
      <hr class="my-3">
      <div class="auth-form-footer  text-center">
        <small>ورود شما به معنای پذیرش
          <nuxt-link href="/" class="link--with-border-bottom">شرایط راکافا</nuxt-link>
          و قوانین
          <nuxt-link href="/" class="link--with-border-bottom">حریم ‌خصوصی</nuxt-link>
          است </small>
      </div>
    </template>

    <template v-if="loginData.section === 'loginByPassword'">
      <div class="auth-form-title right my-3">
        رمز عبور را وارد کنید

      </div>
      <Form @submit="loginUser" v-slot="{meta}" :validation-schema="passwordSchema">
        <base-form-input
            name="password"
            class="mb-3"
            v-model="loginData.password"
            type="password"
        />
        <base-button class="no-style-button d-flex align-items-center" type="button" @click="loginWithOTP"
                     :disabled="loading">
          ورود با رمز یک بار مصرف
          <i class="fad fa-chevron-left mr-2 "></i>
        </base-button>
        <base-button class="no-style-button d-flex align-items-center" type="button" @click="redirectToForgot"
                     :disabled="loading">
          فراموشی رمز عبور
          <i class="fad fa-chevron-left mr-2"></i>
        </base-button>
        <div class="form-element-row text-left text-center">
          <base-button
              w-full
              :class="['btn-element btn-info-element',{'bg-gray':meta.valid===false}]"
              :disabled="meta.valid===false || loading"
              :loading="loading"
          >
            ورود
          </base-button>
        </div>
      </Form>
    </template>
    <template v-if="loginData.section === 'loginByOTP'">
      <div class="auth-form-title right my-3">
        کد تایید را وارد کنید
      </div>
      <Form @submit="loginUser" v-slot="{meta}" :validation-schema="otpSchema">
        <base-form-input
            name="code"
            :label="`کد تایید برای شماره ${loginData.phoneNumber} پیامک شد`"
            class="mb-3"
            input-classes="otp-input"

            v-model="loginData.code"
            :max="5"
        />
        <base-button
            class="no-style-button d-flex"
            type="button"
            @click="loginWithOTP"
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
    </client-only>

  </div>
</template>

<script setup lang="ts">
import * as Yup from "yup"
import {Form} from 'vee-validate'
import {Login, Auth, SendOTP} from "~/services/user/auth.service";
import validatePhoneNumber from "~/utils/validators";
import {useToast} from "vue-toastification";
import {useAuthStore} from "~/stores/authStore";
import {useBasketStore} from "~/stores/BasketStore";


const authStore = useAuthStore()
const basketStore = useBasketStore()

definePageMeta({
  layout: "auth",
  middleware: "not-authenticated",
});

const router = useRouter();
const route = useRoute();
const toast = useToast();
const loading = ref(false);

const phoneRegex = /^(\+98|0)?9\d{9}$/;
const persianPhoneNumber = Yup.string().matches(phoneRegex, 'شماره موبایل وارد شده نامعتبر است').required('این فیلد اجباری میباشد');

const loginData = reactive({
  phoneNumber: "",
  password: "",
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

const passwordSchema = Yup.object().shape({
  password: Yup.string().required(),
});

const otpSchema = Yup.object().shape({
  code: Yup.string().required(),
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
const redirectToForgot = () => {
  localStorage.setItem('phoneNumber', loginData.phoneNumber)
  router.push({
    path: '/login/forgot/'
  })
}
const authUser = async (data: any, formEvent: any) => {
  loading.value = true;
  validatePhoneNumber(loginData.phoneNumber)
  if (!validatePhoneNumber(loginData.phoneNumber)) {
    formEvent.setFieldError("phoneNumber", "شماره موبایل وارد شده نامعتبر میباشد");
    loading.value = false;
    return;
  }
  const result = await Auth(loginData.phoneNumber);
  loading.value = false;

  if (result.isSuccess) {
    loginData.section = result.data.section;
    if (result.data.section === 'loginByOTP') {
      loginData.password = "";
      toast.success(result.metaData.message);
      startTimer();
    }
  } else {
    formEvent.setFieldError("phoneNumber", "شماره موبایل وارد شده نامعتبر میباشد");
  }
};
const loginWithOTP = async () => {
  loading.value = true
  validatePhoneNumber(loginData.phoneNumber)
  const result = await SendOTP(loginData.phoneNumber);
  loading.value = false
  if (result.isSuccess) {
    loginData.section = result.data.section;
    if (result.data.section === 'loginByOTP') {
      loginData.password = ""
      toast.success(result.metaData.message)
      startTimer()
    }
  }
};
const loginUser = async (data: any, formEvent: any) => {
  loading.value = true;
  try {
    const result = await Login(loginData.phoneNumber, loginData.password, loginData.code);
    if (result.isSuccess) {
      toast.success(result.metaData.message)
      localStorage.removeItem("auth-data");
      localStorage.setItem("auth-data", JSON.stringify(result.data));
      authStore.SetCurrentUserValue();
      basketStore.SyncRemoteBasket()

      const backUrl: any = route.query.backUrl || '/';
      await router.push(backUrl);

    } else {
      formEvent.setFieldError(
          "password",
          result.metaData.message
      );
      formEvent.setFieldError(
          "code",
          result.metaData.message
      );

    }
  } catch (error) {
    console.log(error)
  }
  loading.value = false;
};

onMounted(() => {
  const phoneNumber = localStorage.getItem('phoneNumber')
  if (phoneNumber) {
    loginData.phoneNumber = phoneNumber
    localStorage.removeItem('phoneNumber')
  }
})

</script>

<style scoped>
.text-gray {
  color: gray !important;
}

.no-cursor {
  cursor: auto !important;
}

.site-logo {
  display: flex;
  justify-content: center;
}
</style>
