<script setup lang="ts">
props: {
  city: {
    type: String
  }
}
</script>

<template>
  <div class="weather">
    <div><h3>天气预报11111111111222221111</h3></div>
    <div class="container">
      <a-card title="Default size card" style="width: 300px">
        <span class="float-end text-secondary">2022-10-10</span>
        <h3>浦东</h3>
      </a-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin-left: 10px;
  user-select: none;
  padding-top: 10px;
  a {
    text-decoration: none;
    color: #444;
  }
  a:link,
  a:active,
  a:hover {
    color: #444;
  }
}
</style>
