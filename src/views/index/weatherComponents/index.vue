<template>
  <div class="container-fluid">
    <General :city="city"></General>
  </div>
</template>

<script setup>
import General from './General.vue'
import { getPosition } from './location.js'
import jsonp from 'jsonp'
import { ref, onMounted } from 'vue'
const city = ref('北京')
const cityList = ref({})
const location = await getPosition()
const key = '4a2f95a41e3741c8aba587d6d113cfb9'
const cityUrl = 'https://geoapi.qweather.com/v2/city'
// const url = `${cityUrl}/lookup?location=${location}&key=${key}`
const url = `/api/v2/city/lookup?location=${location}&key=${key}`
console.log(url)

// const j = jsonp(url, (err, data) => {
//   if (err) {
//     console.error(err)
//   } else {
//     console.log(data)
//     cityList.value = data
//     console.log(cityList)
//   }
// })

const j = fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    cityList.value = data
    console.log(cityList)
  })
  .catch((error) => {
    console.error(error)
  })
j()
</script>
<style lang="scss">
@import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
</style>
