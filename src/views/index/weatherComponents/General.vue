<script setup></script>

<template>
  <!-- <div class="weather">
    <div><h3>天气预报11111111111222221111</h3></div>
    <div class="container">
      <a-card title="Default size card" style="width: 300px">
        <span class="float-end text-secondary">2022-10-10</span>
        <h3>浦东</h3>
      </a-card>
    </div>
  </div> -->
  <a-card class="card">
    <div class="card-header">
      <span class="float-end text-secondary">2023-05-22</span>
      <h3>上海 浦东+</h3>
    </div>
    <div class="card-body position-relative">
      <div class="d-flex justify-content-center align-items-center">
        <router-link to="/">
          <img src="@/assets/images/101.png" alt="" class="img-fluid" />
          <span class="fs-2">31°/多云</span>
          <span class="card-aqi position-absolute top-0" style="background-color: limegreen"> AQI 优 </span>
        </router-link>
      </div>
      <div class="card-text text-center weather-explain">明天雷阵雨，比今天热很多（32°），有风, 空气不错。</div>
    </div>
  </a-card>
</template>

<style lang="scss" scoped>
@import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// .container {
//   margin-left: 10px;
//   user-select: none;
//   padding-top: 10px;
//   a {
//     text-decoration: none;
//     color: #444;
//   }
//   a:link,
//   a:active,
//   a:hover {
//     color: #444;
//   }
// }
.card {
  background: #b6c2d1 url('@/assets/images/bg_general.png') no-repeat center top;
  background-size: 100%;
  padding: 10px 0;
  margin: 0 0 10px 0;
}
.card-header {
  border: none;
  background: none;
}
.card-aqi {
  padding: 2px 8px;
  border-radius: 10px;
  color: #fff;
}
.weather-explain {
  margin: 0 20%;
}
.img-fluid {
  max-width: 100px;
  max-height: 100px;
}
</style>
