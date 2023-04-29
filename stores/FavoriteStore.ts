import {defineStore} from "pinia";
import {Ref} from "vue";
import {process} from "unenv/runtime/node/process/_process";
import {useToast} from "vue-toastification";
import {useAuthStore} from "~/stores/authStore";
import {ProductCardDTO} from "~/models/product/ProductCard";
import {
    AddProductToFavorite,
    GetCurrentFavorite,
    RemoveProductFromFavorite
} from "~/services/user/userFavorite.service";


export const useFavoriteStore = defineStore("favorite", () => {
    const toast = useToast()
    const items: Ref<ProductCardDTO[]> = ref([]);
    const getItemsCount = computed(() => items.value.length);

    const loading = ref(false)

    const AddItem = async (item: ProductCardDTO) => {
        loading.value = true

        if (IsLogin()) {

            let result = await AddProductToFavorite(item.id)
            if (!result.isSuccess) {
                toast.error(result.metaData.message)
                loading.value = false
                return
            }
        }
        let currentItem = items.value.find(f => f.id == item.id)
        if (currentItem) {
            items.value = items.value.filter(f=>f.id !== currentItem?.id)
            toast.info('محصول از علاقه مندی ها حذف شد')


        } else {
            items.value.push(item)
            toast.success('محصول به علاقه مندی ها اضافه شد')
        }



        SyncLocalFavorite()
        loading.value = false

    }
    const RemoveItem = async (product_id: number) => {

        let currentItem = items.value.find(f => f.id == product_id)
        if (currentItem) {
            loading.value = true
            if (IsLogin()) {
                let result = await RemoveProductFromFavorite(currentItem.id)
                if (!result.isSuccess) {
                    toast.error(result.metaData.message)
                    loading.value = false
                    return
                }
            }

            items.value = items.value.filter(f => f.id != currentItem?.id)
            toast.info('محصول از علاقه مندی ها حذف شد')
            SyncLocalFavorite()
        }
        loading.value = false
    }
    const Init = async () => {
        if (process.server) return;
        if (IsLogin()) {
            let result = await GetCurrentFavorite()

            items.value = result.data?? []
        } else {
            let data = localStorage.getItem('favorite-items')
            if (!data) return
            items.value = JSON.parse(data) as ProductCardDTO[]
        }


    }
    const SyncRemoteFavorite = async () => {

        if (!IsLogin()) return
        let data = localStorage.getItem('favorite-items')

        if (!data) return
        loading.value = true

        let localFavoriteItems = JSON.parse(data) as ProductCardDTO[]
        for (const e of localFavoriteItems) {
            await AddProductToFavorite(e.id)
        }
        loading.value = false
        localStorage.removeItem('favorite-items')

    }
    const SyncLocalFavorite = () => {
        if (IsLogin()) return
        localStorage.removeItem('favorite-items')
        localStorage.setItem('favorite-items', JSON.stringify(items.value))
    }
    const IsLogin = (): boolean => {
        let authStore = useAuthStore()
        return authStore.isLogin
    }
    const IsExist = (productId: number): boolean => {
        let currentItem = items.value.find(f => f.id === productId)
        return !!currentItem;

    }
    return {
        items,
        getItemsCount,
        loading,
        AddItem,
        RemoveItem,
        Init,
        SyncLocalFavorite,
        SyncRemoteFavorite,
        IsExist
    };
});
