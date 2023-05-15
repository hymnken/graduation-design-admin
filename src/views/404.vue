<template>
  <div class="container">
    <div>
      <span>
        <i>404 NOT FOUND !</i>
      </span>
      <p class="text-gray ft-22 m-y-20">Looks like you got lost</p>
      <p class="text-gray ft-22 m-b-40">看来你迷路了</p>
    </div>
    <router-link to="/">
      <el-button type="success" plain class="p-y-10 ft-24">返回首页</el-button>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.container {
  padding: 100px;
  span {
    font-weight: bold;
    color: #999;
    i {
      font-size: 76px;
    }
  }
}
</style>