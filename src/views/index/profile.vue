<template>
  <div class="flex">
    <a-form :model="formState" name="basic" @submit="handleSubmit" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
      autocomplete="off">
      <a-form-item label="用户头像" name="avatar">
        <a-space>
          <img class="circle width-40" :src="userState.avatar" v-avatar alt />
          <a-upload accept="image/png, image/jpeg" :maxCount="1" :showUploadList="false" :withCredentials="true"
            :action="uploadAction" @change="handleAvatarChange">
            <a-button>更换</a-button>
          </a-upload>
        </a-space>
      </a-form-item>
      <a-form-item label="用户名" name="username">
        <a-input v-model:value="userState.username" />
      </a-form-item>
      <a-form-item label="用户昵称" name="nickname">
        <a-input v-model:value="userState.nickname" />
      </a-form-item>
      <a-form-item label="手机号" name="mobile">
        <a-input v-model:value="userState.mobile" />
      </a-form-item>
      <a-form-item label="密码" name="password">
        <a-input-password placeholder="请输入新密码" v-model:value="userState.password" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">保存</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script  setup>
import { reactive, computed, ref, onMounted, inject } from "vue";
import { userProfile, userProfileModify } from "@/api/user";
import config from "@/config";
import { message } from "ant-design-vue";
import { useStore } from "vuex";
const store = useStore();

const uploadAction = computed(() => {
  return config.baseUrl + "/admin/upload";
});

const getProfileInfo = () => {
  userProfile().then((res) => {
    store.commit("user/UPDATE_USERINFO", res);
    Object.keys(res).forEach((k) => {
      userState[k] = res[k];
    });
  });
};
const userState = reactive({
  username: "",
  password: "",
  mobile: "",
  nickname: "",
  avatar: "",
});

const handleAvatarChange = (e) => {
  let file = e.file;
  if (file.status == "done") {
    const res = file.response;
    if (res.code === 0) {
      userState.avatar = res.data.url;
    }
  }
};

const handleSubmit = (e) => {
  userProfileModify(userState).then((res) => {
    getProfileInfo();
    message.success(`保存成功`);
  });
};

getProfileInfo();
</script>

