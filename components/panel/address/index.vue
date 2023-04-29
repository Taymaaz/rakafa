<template>
  <div>

    <div class="checkout-section shadow-around p-3 mt-4">
      <div class="section-title mb-2">
        آدرس های شما
      </div>

      <div class="checkout-section-content">

        <div class="row mx-0">
          <template v-if="initLoading">
            <div class="col-xl-4 col-lg-4 col-sm-6 mb-3" v-for="item in 3" :key="item">

              <loading-skeleton height="280"/>
            </div>
          </template>
          <template v-else>
            <div class="col-xl-4 col-lg-4 col-sm-6 mb-3" v-for="item in addresses" :key="item.id">
              <div class="custom-control custom-radio">
                <template v-if="!$route.path.includes('panel/addresses')">
                <input type="radio" :id="`user-address-${item.id}`" name="customRadio"
                       class="custom-control-input" :checked="item.id === selectedAddressId">
                </template>
                <label :class="['address-select',{'custom-control-label':!$route.path.includes('panel/addresses')}]">
                  <template v-if="!$route.path.includes('panel/addresses')">
                  <span class="head-address-select">به این آدرس ارسال شود</span>
                  </template>
                  <span class="height-70">{{ item.province }} {{ item.city }} {{ item.address }}</span>

                  <span>
            <Icon name="bx:user" size="15px" class="ml-1"/>
            {{ item.receiver_name }} {{ item.receiver_family }}
          </span>

                  <span>
           <Icon name="material-symbols:call" size="15px" class="ml-1"/>
            {{ item.receiver_phone }}
          </span>
                  <span>
           <Icon name="maki:post" size="15px" class="ml-1"/>
            {{ item.postal_code }}
          </span>


                  <span class="d-flex align-items-center justify-content-end bottom-0 position-absolute">

            <a type="button" class="address-btn btn btn-info py-1" @click="editAddress(item)">ویرایش</a>

            <a type="button" class="address-btn mx-2 btn btn-danger py-1" @click="removeAddress(item.id)">حذف</a>
<template v-if="!$route.path.includes('panel/addresses')">
  <a  type="button" class="address-btn btn btn-success py-1" v-if="item.id !== selectedAddressId"
                         @click="selectAddress(item.id)">انتخاب</a>
</template>



         </span>
                </label>
              </div>
            </div>

            <div class="col-xl-3 col-lg-4 col-sm-6 mb-3" v-if="canAddMore">
              <div class="custom-control custom-radio">
                <button class="add-address" @click="isOpenCreateAddressModal=true">
                  <i class="fa fa-plus"></i>
                </button>
              </div>
            </div>
          </template>

        </div>

      </div>
    </div>


    <base-modal v-model="isOpenCreateAddressModal" title="افزودن آدرس جدید" large v-if="canAddMore">
      <panel-address-add @close-modal="refreshData"/>
    </base-modal>
    <base-modal v-model="isOpenEditAddressModal" title="ویرایش آدرس" large v-if="canAddMore">
      <panel-address-edit @close-modal="refreshData" :address="selectedAddress"/>
    </base-modal>

  </div>
</template>

<script setup lang="ts">
import {AddressDTO} from "~/models/user/addressDTO";
import {GetAddressList, RemoveAddress, SetActiveAddress} from "~/services/user/userAddress.service";
import {useToast} from "vue-toastification";
import {Ref} from "vue";

const toast = useToast();
const loading = ref(false);
const initLoading = ref(false);

const isOpenCreateAddressModal = ref(false);
const isOpenEditAddressModal = ref(false);

const selectedAddress: Ref<AddressDTO | null> = ref(null);
const selectedAddressId = ref(0);

const emit = defineEmits(['selectedAddress', 'changes']);

const addresses: Ref<AddressDTO[]> = ref([]);


const canAddMore = computed(() => {
  return addresses.value.length < 3;
});

const editAddress = (address: AddressDTO) => {
  selectedAddress.value = address;
  isOpenEditAddressModal.value = true;

  emit('changes')

};

const getAddresses = async () => {
  initLoading.value = true;
  let result = await GetAddressList();
  if (result.isSuccess) addresses.value = result.data;
  else toast.error(result.metaData.message);
  initLoading.value = false;
  // if (result.data.length > 0){
  // emit('selectedAddress', addresses.value.find(f => f.is_main))
  //
  // }

};

const selectAddress = async (id: number) => {

  // addresses.value.map(f => {
  //   f.is_main = false
  // });
  // addresses.value.find(f => f.id == id)!.is_main = true;
  let address = addresses.value.find(f => f.id == id)
  if (address) {
    selectedAddress.value = address
    selectedAddressId.value = address.id
    emit('selectedAddress', address)
  }

};

const removeAddress = async (id: number) => {
  loading.value = true;
  let result = await RemoveAddress(id);
  if (result.isSuccess) {
    toast.info(result.metaData.message);
    addresses.value = addresses.value.filter(f => f.id != id);


  } else toast.error(result.metaData.message);
  loading.value = false;
  emit('changes')

};

const refreshData = async () => {
  isOpenCreateAddressModal.value = false;
  isOpenEditAddressModal.value = false;
  await getAddresses();
};

onMounted(async () => {
  await getAddresses();
});
</script>


<style scoped>
.address-btn {
  padding: 2px 10px;
}
</style>