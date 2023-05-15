<template>
  <div class="flex">
    <a-form
      style="width:500px"
      :model="h5UserDetail"
      name="basic"
      @submit="handleSubmit"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
    >
      <a-form-item label="用户头像" name="avatar">
        <a-space>
          <img class="circle width-40" :src="h5UserDetail.avatar" v-avatar alt />
          <a-upload
            accept="image/png, image/jpeg"
            :maxCount="1"
            :showUploadList="false"
            :withCredentials="true"
            :action="uploadAction"
            @change="handleAvatarChange"
          >
            <a-button>更换</a-button>
          </a-upload>
        </a-space>
      </a-form-item>
      <a-form-item label="用户名" name="username">
        <a-input v-model:value="h5UserDetail.username" />
      </a-form-item>
      <a-form-item label="真实姓名" name="realname">
        <a-input v-model:value="h5UserDetail.realname" />
      </a-form-item>
      <a-form-item label="证件号" name="ident">
        <a-input v-model:value="h5UserDetail.ident" />
      </a-form-item>
      <a-form-item label="密保问题" name="secret">
        <a-input v-model:value="h5UserDetail.secret" />
      </a-form-item>
      <a-form-item label="密保答案" name="secret_answer">
        <a-input v-model:value="h5UserDetail.secret_answer" />
      </a-form-item>
      <a-form-item label="手机号" name="mobile">
        <a-input v-model:value="h5UserDetail.mobile" />
      </a-form-item>
      <a-form-item label="密码" name="password">
        <a-input-password placeholder="请输入新密码" v-model:value="h5UserDetail.password" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" v-permission="['sys_user_modify']" html-type="submit">保存</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script  setup>
import { reactive, computed, ref, onMounted } from "vue";
import { roleList as getRoleList, userDetail, h5UserModify } from "@/api/user";
import config from "@/config";
import { useRoute, useRouter } from "vue-router";
import { message } from "ant-design-vue";

const route = useRoute();
const router = useRouter();

const h5UserDetail = reactive({
  id: "",
  avatar: "",
  mobile: "",
  username: "",
  secret: "",
  password: "",
  secret_answer: "",
  realname: "",
  ident: "",
});
const uploadAction = computed(() => {
  return config.baseUrl + "/admin/upload";
});

const roleList = ref([]);
getRoleList().then((res) => {
  roleList.value = res.rows || [];
});

onMounted(() => {
  if (route.query.id) {
    const cacheUser = localStorage.getItem(`user_id_${route.query.id}`);
    if (cacheUser) {
      let obj = JSON.parse(cacheUser);
      Object.keys(h5UserDetail).forEach((k) => {
        h5UserDetail[k] = obj[k];
      });
    }
  }
});

const handleAvatarChange = (e) => {
  let file = e.file;
  if (file.status == "done") {
    const res = file.response;
    if (res.code === 0) {
      h5UserDetail.avatar = res.data.url;
    }
  }
};

const handleSubmit = (e) => {
  h5UserModify(h5UserDetail).then((res) => {
    message.success(`保存成功`);
    router.back();
  });
};
</script>

