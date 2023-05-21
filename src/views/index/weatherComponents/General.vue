<script setup lang="ts"></script>

<template>
  <div class="weather">
    <div><h3>天气预报11111111111222221111</h3></div>
    <div class="container">
      <a-card title="Default size card" style="width: 300px">
        <template #extra><a href="#">more</a></template>
        <p>card content</p>
        <p>card content</p>
        <p>card content</p>
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
