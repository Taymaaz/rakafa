import {defineNuxtPlugin} from '#app'
import Toast, {PluginOptions, POSITION, useToast} from "vue-toastification";
import "vue-toastification/dist/index.css";

const options: PluginOptions = {
   rtl:true,
  position:POSITION.BOTTOM_LEFT,
  closeButton:false
};
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast,options)
  return {
    provide: {
      toast: useToast()
    }
  }
})