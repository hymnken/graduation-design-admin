<template>
  <div class="card">
    <div class="card-body">
      <ul class="list-group list-group-flush">
        <li
          class="list-group-item list-group-item-action"
          v-for="(item, index) in listCityRef"
          :key="index"
          @click="setCity(item.location, item.city)"
        >
          {{ item.city }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { setLocation, setRecord } from './location.js'
import router from '@/router'

props: {
  listCityRef: {
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
  margin: 10px 0;
}
</style>
