<template>
  <div class="card">
    <div class="card-body">
      <div class="card-title">
        <h5>历史记录</h5>
        <div class="row align-items-center justify-content-between text-center">
          <div class="col-4">
            <span class="d-block" @click="setCity(positionRt.location, positionRt.city)">
              <img src="@/assets/images/icon/location.png" class="location" alt="" />
              {{ positionRt.city }}
            </span>
          </div>
          <div class="col-4" v-for="(item, index) in recordRef" :key="index">
            <span class="d-block" @click="setCity(item.location, item.city)">{{ item.city }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { setLocation, setRecord } from './location.js'
import router from '../../../router/index.js'
props: {
  recordRef: {
    type: Array
  }
  positionRt: {
    type: Object
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
div:after {
  content: '';
  width: 30%;
}
.location {
  max-width: 18px;
  position: relative;
  top: -1px;
}
</style>
