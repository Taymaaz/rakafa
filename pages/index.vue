<template>


  <div>
    <Head>
      <Title>
        فرووشگاه اینترنتی راکافا
      </Title>
    </Head>
    <div v-if="(pending || data == null)"></div>
    <div v-else>

      <div class="row mb-4">
        <div class="col-lg-8 ml-lg-0 mb-3">


          <base-banner-slider :banners="data.data.banners??[]" :position="BannerPosition.mainSlider"/>


        </div>
        <div class="col-lg-4">
          <div class="row">
            <home-banner :banners="data.data.banners??[]" :position="BannerPosition.mainBanner"/>
          </div>
        </div>
      </div>

      <base-product-slider :products="data.data.mostSaleProducts" title=" پرفروش ترینها" icon="fa-check"/>
      <base-product-slider :products="data.data.latestProduct" title="جدیدترین محصولات" link="/category/?OrderBy=0"
                           icon="fa-fire"/>
      <base-recent-products-section/>


      <div class="row justify-content-center">

        <div class="col-lg-12">
          <div class="shadow-around p-3 mb-5">

            <div class="row">
              <div class="col-12 mb-3">
                <h1 class="text-muted text-section-main-big mb-2 text-center ">

                  چرا راکافا
                </h1>
              </div>
              <div class="col-12 mb-3 text-muted">
                <p class="text-muted text-sm mb-2"></p>
                <div class="row">
                  <div class="col-md-6 col-lg-6 ">
                    <h2>خرید برنج ایرانی</h2>
                    <div class="mb-3"></div>

                    <p>
                      <a href="">فروشگاه راکافا</a> به عنوان یکی از
                      بزرگترین فروشگاه
                      های
                      فروش برنج ایرانی به شمار میرود.
                      رسالت ما در راکافا این است که برنج ایرانی با کیفیت و درجه یک را در
                      اختیار مشتریان
                      عزیز
                      قرار دهیم.
                    </p>

                    <h3 class="h3-size mt-5">مزایای خرید برنج ایرانی از راکافا</h3>
                    <div class="mb-3"></div>

                    <p>
                      ما در راکافا برنج باکیفیت ایرانی را در اختیار شما قرار می دهیم که از
                      استفاده و پخت
                      ان
                      لذت میبرید. در راکافا شما میتوانید انواع برنج ها را ثبت سفارش نمایید
                      برای مثال شما

                      میتوانید اقدام به خرید


                      <a href="">
                        برنج

                      </a>,


                      و ... نمایید.
                    </p>
                    <p>هدف ما این است که خرید برنج ایرانی را برای شما ساده و در دسترس کنیم تا
                      دغده ای از
                      بابت
                      خرید برنج درجه یک نداشته باشید.</p>
                  </div>


                  <div class="col-md-6 col-lg-6">
                    <img src="/images/final-footer-min.png"
                         alt="" style="width: 80%"/>
                  </div>

                </div>

                <div class="mb-6"></div>
                <div class="col-md-12 col-lg-12 h4-size">
                  <h4 class="h4-size mt-5">10 روز ضمانت مرجوعی</h4>
                  <div class="mb-3"></div>

                  <p>یکی از خدماتی که ما در راکافا برای مشتریان عزیزمون در نظر گرفتیم، ضمانت
                    مرجوعی انواع برنج
                    بعد
                    از خرید و مصرف آن می باشد. به این صورت را می توانید تا ۱۰ روز پس از خرید
                    محصول
                    موردنظرتون ،
                    درخواست مرجوعی کنید و با احترام از شما در صورت عدم رضایت از محصول خریداری
                    شده، وجه شما
                    برگشت
                    داده میشود.
                  </p>
                  <div class="mb-3"></div>

                  <h4>انواع برنج ایرانی
                  </h4>
                  <div class="mb-3"></div>

                  <p>ما در راکافا انواع برنج ایرانی با کیفیت و تازه را در اختیار شما قرار می دهد
                    تا بر اساس
                    نیاز و
                    ذائقه خود اقدام به خرید نمایید. در فروشگاه راکافا تنوع بسیار بالایی از انواع
                    ایرانی و
                    محلی
                    درجه یک وجود دارد که شما میتوانید به راحتی ثبت سفارش نمایید.</p>
                  <p>برخی از برنج ها عطر بهتر و بعضی طعم بهتری داردند. بعضی از مشتریان هم به قد
                    کشیدن برنج
                    اهمیت
                    زیادی میدهند که بر اساس نیاز خودتون، میتوانید به راحتی بهترین انتخاب را
                    داشته باشید.</p>
                  <div class="mb-3"></div>

                  <h4>پشتیبانی 24 ساعته
                  </h4>
                  <div class="mb-3"></div>

                  <p>همکاران ما در راکافا به صورت ۲۴ ساعته در ۷ روز هفته در خدمت شما هستند که
                    بهترین تجربه ی
                    خرید
                    را در فروشگاه اینترنتی راکافا داشته باشید. شما میتوانید به از روش های مختلف
                    مثل تماس تلفنی ,
                    <a href="/">فرم تماس</a> و
                    یا واتس آپ با ما در ارتباط باشید. شما فقط کافیه از یکی روش های گفته شده با
                    ما ارتباط
                    برقرار
                    کنید.</p>

                  <div class="mb-3"></div>

                  <h4>خرید برنج عمده

                  </h4>
                  <div class="mb-3"></div>

                  <p>یکی از خدمات ما <a href="">فروش برنج به صورت
                    عمده</a> می باشد
                    که
                    نیاز شما در موارد گوناگون را میتوانیم برطرف
                    نماییم. برای سفارش برنج به صورت عمده کافیه تا <a
                        href="">فرم
                      خرید
                      برنج عمده</a> را تکمیل نمایید تا همکاران
                    ما با شما ارتباط برقرار کنند و یا از یکی روش ها گفته شده با پشتیبانی ارتباط
                    برقرارکنید.
                  </p>
                </div>

              </div>

            </div>


          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
import {HomeDataDTO} from "~/models/home/homeDataDTO";
import {BannerPosition} from "~/models/banner/bannerDTO";
import {FetchApi} from "~/utils/CustomFechApi";

const {data, pending} = useAsyncData("main-page", () => FetchApi<HomeDataDTO>("/home-page-data/"))


</script>

<style scoped>

</style>