<template>
  <div class="card">
    <div class="card-body">
      <div class="card-title">
        <h5>热门城市</h5>
        <div class="row align-items-center justify-content-between text-center">
          <div class="col-4" v-for="(item, index) in topCityRef" :key="index">
            <span @click="setCity(item.location, item.name)" class="d-block">{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '../../../router/index'
import { setLocation, setRecord } from './location.js'
props: {
  topCityRef: {
    type: Array
  }
}
function setCity(location, cityName) {
  setLocation(location)
  setRecord(location, cityName)
  router.push('/')
}
</script>

<style scoped>
@import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
.card {
  background-color: #eff1f7;
  margin: 10px 0;
}
.row div {
  background-color: #cdd5e7;
  max-width: 30%;
  margin: 5px 0;
  padding: 5px 0;
  color: #333;
  border-radius: 10px;
}
</style>
