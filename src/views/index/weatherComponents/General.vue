<script setup>
props: {
  cityRt: {
    type: Object
  }
}
</script>

<template>
  <div class="card">
    <div class="card-header">
      <span class="float-end text-secondary">{{ cityRt?.time }}</span>
      <h3>
        <!-- <router-link :to="{ name: 'Search', params: { city: cityRt?.name } }"> {{ cityRt?.name }}+ </router-link> -->
        <router-link :to="'/search/' + cityRt?.name"> {{ cityRt?.name }}+ </router-link>
      </h3>
    </div>
    <div class="card-body position-relative">
      <div class="d-flex justify-content-center align-items-center">
        <!-- <router-link :to="{ name: 'Details', params: { city: cityRt?.name } }"> -->
        <router-link :to="'/details/' + cityRt?.name">
          <img :src="cityRt?.icon" alt="" class="img-fluid" />
          <span class="fs-2">{{ cityRt?.temp }}°/{{ cityRt?.text }}</span>
          <span class="card-aqi position-absolute top-0" :style="cityRt?.bgcolor"> AQI {{ cityRt?.category }} </span>
        </router-link>
      </div>
      <div class="card-text text-center weather-explain">{{ cityRt?.general }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
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
