<script setup lang="ts"></script>

<template>
  <div class="weather">
    <div><h3>天气预报1111111111</h3></div>
    <div class="container"></div>
  </div>
</template>

<style lang="scss" scoped>
.weather {
  margin-left: 100px;
  height: 300px;
  background-color: #7b7171;
  display: flex;
  .container {
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
}
</style>
