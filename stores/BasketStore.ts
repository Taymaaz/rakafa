import {defineStore} from "pinia";
import {Ref} from "vue";
import {process} from "unenv/runtime/node/process/_process";
import {useToast} from "vue-toastification";
import {
    AddItemToCurrentOrder,
    DecreaseOrderItemCount,
    GetCurrentOrder,
    IncreaseOrderItemCount,
    RemoveOrderItem
} from "~/services/order/order.service";
import {CurrentOrderItemDTO} from "~/models/order/CurrentOrderItemDTO";
import {OrderDTO} from "~/models/order/OrderDTO";
import {CurrentOrderDTO} from "~/models/order/CurrentOrderDTO";
import {useAuthStore} from "~/stores/authStore";


export const useBasketStore = defineStore("basket", () => {
    const toast = useToast()
    const items: Ref<CurrentOrderItemDTO[]> = ref([]);
    const currentOrder: Ref<CurrentOrderDTO | null> = ref(null)
    const getItemsCount = computed(() => items.value.length);

    const loading = ref(false)

    const AddItem = async (item: CurrentOrderItemDTO) => {
        loading.value = true

        if (IsLogin()) {
            let result = await AddItemToCurrentOrder(item.product_id, item.variant.id, item.count)
            item.id = result.data
            if (!result.isSuccess) {
                toast.error(result.metaData.message)
                loading.value = false
                return
            }
        } else {
            item.id = new Date().getTime()
        }

        let currentItem = items.value.find(f => f.variant.id == item.variant.id)
        if (currentItem) {
            if (item.variant.stock > currentItem.count) {
                currentItem.count += item.count
                currentItem.total_price = currentItem.variant.final_price * currentItem.count
                toast.success('به تعداد محصول در سبد خرید اضافه شد')
            } else {
                toast.error(`بیشتر از ${item.variant.stock} عدد موجود نمیباشد`)

            }
        } else {
            items.value.push(item)
            toast.success('محصول به سبد خرید اضافه شد')
        }

        SyncLocalBasket()
        loading.value = false

    }
    const RemoveItem = async (product_id: number, variant_id: number) => {

        let currentItem = items.value.find(f => f.product_id == product_id && f.variant.id == variant_id)
        if (currentItem) {
            loading.value = true
            if (IsLogin()) {
                let result = await RemoveOrderItem(currentItem.id)
                if (!result.isSuccess) {
                    toast.error(result.metaData.message)
                    loading.value = false
                    return
                }
            }

            items.value = items.value.filter(f => f.id != currentItem?.id)
            toast.info('محصول از سبد خرید حذف شد')
            SyncLocalBasket()
        }
        loading.value = false
    }
    const IncreaseCount = async (product_id: number, variant_id: number) => {
        let currentItem = items.value.find(f => f.product_id == product_id && f.variant.id == variant_id)
        loading.value = true

        if (currentItem && currentItem.variant.stock > currentItem.count && currentItem.count < 5) {
            if (IsLogin()) {
                let result = await IncreaseOrderItemCount(currentItem.variant.id, currentItem.id)
                if (!result.isSuccess) {
                    toast.error(result.metaData.message)
                    loading.value = false
                    return
                }
            }


            currentItem.count += 1
            currentItem.total_price = currentItem.variant.final_price * currentItem.count
        }
        loading.value = false

    }
    const DecreaseCount = async (product_id: number, variant_id: number) => {
        let currentItem = items.value.find(f => f.product_id == product_id && f.variant.id == variant_id)
        if (currentItem) {
            loading.value = true
            if (IsLogin()) {
                let result = await DecreaseOrderItemCount(currentItem.variant.id, currentItem.id)
                if (!result.isSuccess) {
                    toast.error(result.metaData.message)
                    loading.value = false
                    return
                }
            }

            currentItem.count -= 1
            currentItem.total_price = currentItem.variant.final_price * currentItem.count
        }
        loading.value = false

    }
    const InBasketCount = (productId: number, variantId: number): number => {
        let currentItem = items.value.find(f => f.variant.id === variantId && f.product_id === productId)
        if (currentItem) return currentItem.count
        return 0
    }
    const Init = async () => {
        if (process.server) return;
        if (IsLogin()) {
            let result = await GetCurrentOrder()
            items.value = result.data?.items ?? []
            currentOrder.value = result.data
        } else {
            let data = localStorage.getItem('basket-Items')
            if (!data) return
            items.value = JSON.parse(data) as CurrentOrderItemDTO[]
        }


    }
    const SyncRemoteBasket = async () => {

        if (!IsLogin()) return
        let data = localStorage.getItem('basket-Items')

        if (!data) return
        loading.value = true

        let localBasketItems = JSON.parse(data) as CurrentOrderItemDTO[]
        for (const e of localBasketItems) {
            await AddItemToCurrentOrder(e.product_id, e.variant.id, e.count)
        }
        loading.value = false
        localStorage.removeItem('basket-Items')

    }
    const SyncLocalBasket = () => {
        if (IsLogin()) return
        localStorage.removeItem('basket-Items')
        localStorage.setItem('basket-Items', JSON.stringify(items.value))
    }
    const getTotalPrice = () => {
        let sum = 0
        items.value.forEach(f => {
            sum += f.total_price
        })


        return sum
    }
    const getTotalPriceBeforeDiscount = () => {
        let sum = 0

        items.value.forEach(f => {
            sum += f.variant.price * f.count
        })
        return sum
    }
    const getTotalPriceAfterDiscount = () => {
        let sum = 0
        items.value.forEach(f => {
            sum += (f.variant.special_price || 0) * f.count
        })
        return sum
    }
    const getDiscountPercentage = () => {
        const totalPriceBeforeDiscount = getTotalPriceBeforeDiscount()
        const totalTotalPrice = getTotalPrice()
        const discountPercentage = ((totalPriceBeforeDiscount - totalTotalPrice) / totalPriceBeforeDiscount) * 100
        return discountPercentage.toFixed(0)
    }

    const IsLogin = (): boolean => {
        let authStore = useAuthStore()
        return authStore.isLogin
    }
    return {
        items,
        currentOrder,
        AddItem,
        RemoveItem,
        IncreaseCount,
        DecreaseCount,
        Init,
        SyncLocalBasket,
        getTotalPrice,
        getItemsCount,
        InBasketCount,
        getTotalPriceBeforeDiscount,
        getTotalPriceAfterDiscount,
        getDiscountPercentage,
        SyncRemoteBasket,
        loading
    };
});
