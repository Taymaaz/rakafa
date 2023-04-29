import { defineStore } from "pinia";
import { Ref } from "vue";
import { CategoryDTO } from "~~/models/category/categoryDTO";
import { GetAllCategory } from "~/services/server/category.service";

export const useUtilStore = defineStore("util", () => {
  const categories: Ref<CategoryDTO[]> = ref([]);

  const setCategories = async () => {
    if (categories.value.length == 0) {
      var res = await GetAllCategory();
      categories.value = res.data;
    }
  };

  return { categories, setCategories };
});
