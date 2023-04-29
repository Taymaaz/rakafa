<template>
  <div>
    <div class="row mb-4">
      <div class="col-12">

        <section class="shadow-around">
          <div>

            <div class="row">

              <div class="col-lg-6  shadow-around-personal py-4">
                <div class="px-3">
                  <div class="text-sm text-muted mb-3">نام و نام خانوادگی</div>
                  <div class="text-dark font-weight-bold ">


                    <div class="mb-sm-">

                      <p class="float-right">

                        <span v-if="userData.first_name">{{ userData.first_name }} {{ userData.last_name }}</span>
                        <span v-else>-</span>
                      </p>

                      <p class="float-left" @click="isOpenEditFullNameModal=true">
                        <Icon name="heroicons:pencil" size="1.4rem" class="text-primary cursor" v-if="userData.first_name "/>
                        <base-button color="success py-1 my-0" class="float-left" v-if="!userData.first_name">
                          ثبت
                        </base-button>

                      </p>

                    </div>

                  </div>
                </div>
              </div>
              <div class="col-lg-6  shadow-around-personal py-4">
                   <div class="px-3">
                <div class="text-sm text-muted mb-3">کد ملی</div>
                <div class="text-dark font-weight-bold ">


                  <div class="mb-sm-">

                    <p class="float-right">
                      <span v-if="userData.national_code">{{ userData.national_code }}</span>
                      <span v-else>-</span>

                    </p>

                    <p class="float-left " @click="isOpenEditNationalCodeModal=true">
                      <Icon name="heroicons:pencil" size="1.4rem" class="text-primary cursor"
                            v-if="userData.national_code"/>
                      <base-button color="success py-1 my-0" class="float-left" v-if="!userData.national_code">
                        ثبت
                      </base-button>
                    </p>

                  </div>

                </div>
                                </div>
              </div>
              <div class="col-lg-6  shadow-around-personal py-4">
                   <div class="px-3">
                <div class="text-sm text-muted mb-3">شماره موبایل</div>
                <div class="text-dark font-weight-bold ">


                  <div class="mb-sm-">

                    <p class="float-right">
                      <span v-if="userData.phone">{{ userData.phone }}</span>
                      <span v-else>-</span>

                    </p>

                    <p class="float-left" @click="isOpenEditPhoneModal= true">
                      <Icon name="heroicons:pencil" size="1.4rem" class="text-primary cursor" v-if="userData.phone"/>
                      <base-button color="success py-1 my-0" class="float-left" v-if="!userData.phone">
                        ثبت
                      </base-button>
                    </p>

                  </div>

                </div>
                                </div>
              </div>
              <div class="col-lg-6  shadow-around-personal py-4">

                    <div class="px-3">
                <div class="text-sm text-muted mb-3">ایمیل</div>
                <div class="text-dark font-weight-bold ">


                  <div class="mb-sm-">

                    <p class="float-right">
                      <span v-if="userData.email">{{ userData.email }}</span>
                      <span v-else>-</span>

                    </p>

                    <p class="float-left" @click="isOpenEditEmailModal= true">
                      <Icon name="heroicons:pencil" size="1.4rem" class="text-primary cursor" v-if="userData.email"/>
                      <base-button color="success py-1 my-0" class="float-left" v-if="!userData.email">
                        ثبت
                      </base-button>
                    </p>

                  </div>

                </div>
                                </div>
              </div>
              <div class="col-lg-6  shadow-around-personal py-4">
                   <div class="px-3">
                <div class="text-sm text-muted mb-3">رمز عبور</div>
                <div class="text-dark font-weight-bold ">


                  <div class="mb-sm-">

                    <p class="float-right">
                      <span v-if="userData.has_password">•••••••••</span>
                      <span v-else>ثبت نشده</span>
                    </p>

                    <p class="float-left" @click="isOpenEditPasswordModal=true">
                      <Icon name="heroicons:pencil" size="1.4rem" class="text-primary cursor" v-if="userData.has_password"/>
                      <base-button color="success py-1" class="float-left" v-if="!userData.has_password">ثبت رمز عبور
                      </base-button>

                    </p>

                  </div>

                </div>
                                </div>
              </div>
              <div class="col-lg-6  shadow-around-personal py-4">
                   <div class="px-3">
                <div class="text-sm text-muted mb-3">روش بازگرداندن پول من</div>
                <div class="text-dark font-weight-bold ">
                  <div class="mb-sm-">
                    <p class="float-right">
                      <span>•••••••••</span>
                    </p>
                    <p class="float-left">
                      <Icon name="heroicons:pencil" size="1.4rem" class="text-primary cursor"/>
                    </p>
                  </div>
                </div>
                                </div>

              </div>

            </div>

          </div>
        </section>
      </div>
    </div>

    <base-modal v-model="isOpenEditFullNameModal" title="ثبت اطلاعات شناسایی" >
      <panel-personal-fullname-edit @close-modal="refreshData;isOpenEditFullNameModal=false" :first_name="userData.first_name" :last_name="userData.last_name"/>
    </base-modal>

    <base-modal v-model="isOpenEditNationalCodeModal" title="ثبت اطلاعات شناسایی" >
      <panel-personal-nationalcode-edit @close-modal="refreshData;isOpenEditNationalCodeModal=false" :national_code="userData.national_code"/>
    </base-modal>

    <base-modal v-model="isOpenEditPasswordModal" title="تغییر رمز عبور" >
      <panel-personal-password-edit @close-modal="refreshData;isOpenEditPasswordModal=false" :has_password="userData.has_password"/>
    </base-modal>

    <base-modal v-model="isOpenEditEmailModal" title="ویرایش ایمیل" >
      <panel-personal-email-edit @close-modal="refreshData;isOpenEditEmailModal=false" :email="userData.email"/>
    </base-modal>
    <base-modal v-model="isOpenEditPhoneModal" title="ویرایش شماره موبایل" >
      <panel-personal-phone-edit @close-modal="refreshData;isOpenEditPhoneModal=false" :phone="userData.phone"/>
    </base-modal>


  </div>
</template>

<script setup lang="ts">
import {useAuthStore} from "~/stores/authStore";
import {EditUser} from "~/services/user/user.service";
import {useToast} from "vue-toastification";

const isOpenEditFullNameModal = ref(false)
const isOpenEditNationalCodeModal = ref(false)
const isOpenEditPasswordModal = ref(false)
const isOpenEditEmailModal = ref(false)
const isOpenEditPhoneModal = ref(false)
const loading = ref(false)
const toast = useToast()
const router = useRouter()
const authStore = useAuthStore()
definePageMeta({
  layout: 'panel'
})
const userData = reactive({
  first_name: "",
  last_name: "",
  national_code: "",
  phone: "",
  email: "",
  has_password: true,
})
onMounted(() => {
  const user = authStore.currentUser
  userData.first_name = user?.first_name ?? ''
  userData.last_name = user?.last_name ?? ''
  userData.national_code = user?.national_code ?? ''
  userData.phone = user?.phone ?? ''
  userData.email = user?.email ?? ''
  userData.has_password = user?.has_password ?? true
})
watch(() => authStore.currentUser, (user) => {
  userData.first_name = user?.first_name ?? ''
  userData.last_name = user?.last_name ?? ''
  userData.national_code = user?.national_code ?? ''
  userData.phone = user?.phone ?? ''
  userData.email = user?.email ?? ''
  userData.has_password = user?.has_password ?? true
})

const editProfile = async (data: any, e: any) => {
  let newUserData = new FormData()
  newUserData.append("first_name", userData.first_name)
  newUserData.append("last_name", userData.last_name)
  newUserData.append("national_code", userData.national_code)
  loading.value = true
  let result = await EditUser(newUserData)
  loading.value = false
  if (result.isSuccess) {
    toast.success(result.metaData.message)
    router.push('/panel/dashboard/')
    await authStore.SetCurrentUserValue()
  }
}
const refreshData = async () => {
  loading.value = true
  await authStore.SetCurrentUserValue()
  loading.value = false

}
</script>


<style scoped>
.shadow-around-personal {
  border-left: 1px solid #ededed;
  border-bottom: 1px solid #ededed;
  border-radius: 2px;
}

</style>