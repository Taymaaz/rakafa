<template>
  <div>
    <div class="product-review-form mb-3">

        <div class="row col-6" v-if="isLogin">
          <div class="col-12">
            <div class="form-group">
              <label for="suggest-select"> خرید این محصول را </label>
              <select class="form-control p-2" id="suggest-select" v-model="commentForm.suggest">

                <option :value="UserSuggest.Suggest">
                  پیشنهاد میکنم
                </option>
                <option :value="UserSuggest.NotSuggest">
                  پیشنهاد نمیکنم
                </option>

              </select>
            </div>

          </div>
          <div class="col-12">
            <div class="form-group">
              <label for="score-select"> امتیاز شما </label>
              <select class="form-control p-2" id="score-select" v-model="commentForm.score">

                <option :value="1">1</option>
                <option :value="2">2</option>
                <option :value="3">3</option>
                <option :value="4">4</option>
                <option :value="5">5</option>

              </select>
            </div>

          </div>
          <div class="col-12">
            <div class="form-element-row">
              <label for="phone-number" class="label-element">نظر شما</label>
              <textarea name="comment" id="comment" cols="30" rows="10"
                        class="input-element" v-model="commentForm.comment"></textarea>
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <base-button class="btn btn-primary px-3" @click="addComment" :loading="loading">ارسال نظر <i
                  class="fad fa-comment-alt-edit"></i></base-button>
            </div>
          </div>
        </div>
        <div class="text-center alert alert-info align-items-center justify-content-center d-flex" v-else>
          <p>برای ثبت نظر ابتدا وارد حساب کاربری خود شوید</p>
          <div class="col-md-1 ">
            <base-util-redirect-login>
              <base-button outline w-full>ورود</base-button>
            </base-util-redirect-login>
          </div>
        </div>


      <div class="section-title mb-1 mt-4">
        دیدگاه کاربران ( {{ comments?.length }} )
      </div>

      <hr>
    </div>
    <div class="comments-list do-nice-scroll" @scroll="handleScroll" ref="commentsList">
      <div class="row" v-for="item in comments" :key="item.id">
        <div class="col-md-3 aside">
          <ul class="comments-user-shopping">
            <li>
              <div class="cell cell-name">
                کاربر
              </div>
              <div class="comments-buyer-badge">خریدار</div>
            </li>
            <li>
              <div class="form-group">
                <label>امتیاز کاربر</label>
                <div class="add-rating no-cursor-radio">
                  <input type="radio"
                         :checked="item.score>='5'"
                         disabled>
                  <label></label>
                  <input type="radio"
                         :checked="item.score>='4'"

                         disabled>
                  <label></label>
                  <input type="radio"
                         :checked="item.score>='3'"

                         disabled>
                  <label></label>
                  <input type="radio"
                         :checked="item.score>='2'"

                         disabled>
                  <label></label>
                  <input type="radio"
                         :checked="item.score>='1'"

                         disabled>
                  <label></label>
                </div>
              </div>

            </li>
            <li>
              <div class="cell">
                در تاریخ {{ item.create_date }}
              </div>
            </li>
          </ul>


        </div>
        <div class="col-md-3 article">
          <div class="header">
            <div v-if="item.suggest === UserSuggest.Suggest">
              <p class="alert alert-success"> خرید این محصول را پیشنهاد میکنم</p>
            </div>
            <div v-if="item.suggest === UserSuggest.NotSuggest">
              <p class="alert alert-danger"> خرید این محصول را پیشنهاد نمیکنم</p>

            </div>
          </div>
          <p v-html="item.comment"></p>

        </div>
      </div>
    </div>
    <div v-if="loading" class="text-center py-2">
      درحال دریافت ...
    </div>
  </div>

</template>

<script setup lang="ts">
import { useToast } from "vue-toastification";
import { AddProductCommentDTO, CommentDTO, UserSuggest } from "~/models/comment/CommentDTO";
import { AddProductComment, GetProductComments } from "~/services/util/comment.service";
import { useAuthStore } from "~/stores/authStore";
import { useRouter } from "vue-router";

const router = useRouter();
const isLogin = ref(false);
const toast = useToast();
const props = defineProps<{ product_id: number }>();
const comments = ref<CommentDTO[]>([]);
const commentsCount = ref(0);
const endPage = ref(0);
const page = ref(1);
const take = ref(4);
const loading = ref(false);
const reachedEnd = ref(false);
const commentsList = ref<HTMLElement>();

onMounted(() => {
  const authStore = useAuthStore();
  isLogin.value = authStore.isLogin;
  loadComments();
});

function loadComments() {
  try {
    loading.value = true;
    GetProductComments(props.product_id, page.value, take.value).then((result) => {
      comments.value = result.data.data;
      commentsCount.value = result.data.entityCount;
      endPage.value = result.data.endPage;
      reachedEnd.value = result.data.data.length === 0;
    }).finally(() => {
      loading.value = false;
    });
  } catch (error) {
    loading.value = false;
    toast.error('خطای هنگام دریافت نظرات ');
  }
}

async function handleScroll() {
  const element = commentsList.value as HTMLElement;
  if (element.scrollTop + element.clientHeight >= element.scrollHeight && !loading.value && !reachedEnd.value &&page.value < endPage.value) {
    loading.value = true;
    page.value++;
    const response = await GetProductComments(props.product_id, page.value, take.value);
    if (response.data.data.length === 0 ) {
      loading.value = false;
      return;
    }
    comments.value.push(...response.data.data);
    loading.value = false;
  }
}

const commentForm = reactive({
  comment: "",
  suggest: UserSuggest.Suggest,
  score: 1,
});

async function addComment() {
  if (commentForm.comment.length < 10) {
    toast.error("متن نظر باید بیشتر از 10 کاراکتر باشد");
    return;
  }
  const authStore = useAuthStore();
  const command = {
    comment: commentForm.comment,
    user: authStore.currentUser?.id,
    product: props.product_id,
    suggest: commentForm.suggest,
    score: commentForm.score,
  } as unknown as AddProductCommentDTO;
  loading.value = true;
  var res = await AddProductComment(command);
  loading.value = false;

  if (res.isSuccess) {
    commentForm.comment = "";
    commentForm.suggest = UserSuggest.Suggest;
    commentForm.score = 0;
    toast.success(res.metaData.message);
  } else {
    toast.error(res.metaData.message);
  }
}
</script>


<style scoped>
.no-cursor-radio {
  cursor: default;
}

.do-nice-scroll::-webkit-scrollbar {
  width: 4px;
}

.do-nice-scroll::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

.do-nice-scroll::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
}

.do-nice-scroll::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

/* CSS for scrolling behavior */
.do-nice-scroll {
  overflow-y: scroll;
  height: 800px !important; /* adjust height as per your requirements */
   padding: 20px;
}
</style>