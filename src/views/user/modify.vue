<template>
  <div class="flex">
    <a-form
      :model="formState"
      name="basic"
      @submit="handleSubmit"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
    >
      <a-form-item label="用户头像" name="avatar">
        <a-space>
          <img class="circle width-40" :src="userState.avatar" v-avatar alt />
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
      <a-form-item label="角色" name="role_id">
        <a-select v-model:value="userState.role_id">
          <a-select-option :value="role.id" v-for="role in roleList" :key="role.id">{{ role.name }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item name="remember" label :wrapper-col="{ offset: 8, span: 16 }">
        <a-checkbox v-model:checked="userState.enable">启用</a-checkbox>
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" v-permission="['sys_user_modify']" html-type="submit">保存</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script  setup>
import { reactive, computed, ref, onMounted } from "vue";
import { roleList as getRoleList, userDetail, userModify } from "@/api/user";
import config from "@/config";
import { useRoute, useRouter } from "vue-router";
import { message } from "ant-design-vue";

const route = useRoute();
const router = useRouter();

const uploadAction = computed(() => {
  return config.baseUrl + "/admin/upload";
});

const roleList = ref([]);
getRoleList().then((res) => {
  roleList.value = res.rows || [];
});

onMounted(() => {
  if (route.query.id) {
    userDetail({ id: route.query.id }).then((res) => {
      Object.keys(res).forEach((k) => {
        userState[k] = res[k];
      });
    });
  }
});
const userState = reactive({
  username: "",
  password: "",
  role_id: "",
  mobile: "",
  nickname: "",
  enable: true,
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
  userModify(userState).then((res) => {
    message.success(`保存成功`);
    router.back();
  });
};
</script>

