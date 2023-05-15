<template>
  <div class="login-container">
    <div class="login-box">
      <h1 class="m-b-30">管理员登录</h1>
      <div class="label ft-13 text-gray m-b-8">用户名</div>
      <div class="input">
        <input type="text" v-model="userInfo.username" />
      </div>
      <div class="label ft-13 text-gray m-b-8 m-t-25">密码</div>
      <div class="input">
        <input type="password" v-model="userInfo.password" />
      </div>
      <div class="m-y-10 ft-12 text-gray">若 admin 无法登录，请过几分钟再试(每隔10分钟会重置一次密码)。</div>
      <div class="btn flex flex-center m-t-40" @click="handleLogin">登 录</div>
      <div class="flex flex-end m-t-20">
        <a-tooltip>
          <template #title>请联系网站管理员</template>
          <a-button type="link">忘记密码 ?</a-button>
        </a-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
const router = useRouter();
const store = useStore();
const userInfo = ref({
  username: "admin",
  password: "123123",
  ident: "user",
});

const handleLogin = () => {
  store
    .dispatch("user/login", userInfo.value)
    .then((res) => {
      message.success(`登录成功`), router.push("/");
    })
    .catch((err) => { });
};
</script>

<style lang="scss" scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  background-image: url(../assets/login.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  z-index: 15;
  position: relative;
  background: #ffffff;
  width: 600px;
  border-radius: 4px;
  box-shadow: 0 0 30px rgb(0 0 0 / 10%);
  box-sizing: border-box;
  overflow: hidden;
  // height: 100px;
  padding: 60px;
  box-sizing: border-box;
  margin-top: -20vh;

  h1 {
    color: $color-primary;
  }

  input {
    outline: none;
    display: block;
    background: rgba(0, 0, 0, 0.05);
    width: 100%;
    border: 0;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 12px 20px;
    color: rgba(0, 0, 0, 0.6);
    font-family: inherit;
    font-size: inherit;
    font-weight: 500;
    line-height: inherit;
    transition: 0.3s ease;

    &:focus {
      background: rgba(0, 0, 0, 0.04);
      box-shadow: 2px 2px 2px rgba($color-primary, 0.5);
    }
  }

  .btn {
    outline: none;
    background: $color-primary;
    width: 100%;
    border: 0;
    border-radius: 4px;
    padding: 12px 20px;
    color: #ffffff;
    font-family: inherit;
    font-size: inherit;
    font-weight: 500;
    line-height: inherit;
    text-transform: uppercase;
    cursor: pointer;
  }
}
</style>