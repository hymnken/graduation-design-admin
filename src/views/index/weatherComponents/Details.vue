<template>
  <div class="container-fluid">
    <navbar :city="city"></navbar>
    <weather :weather-rt="weatherRt"></weather>
  </div>
</template>

<script>
import Navbar from './Navbar.vue'
import Weather from './Weather.vue'
import { useRoute } from 'vue-router'
import { onMounted, reactive } from 'vue'
import { getLocation } from './location.js'
import { getGeneral } from './weather.js'
import { getImageUrl } from './untils.js'

export default {
  name: 'Details',

  components: {
    Navbar,
    Weather,
  },

  setup() {
    // 获取路由数据
    const route = useRoute()

    // 创建一个用于显示的
    const weatherRt = reactive({})

    onMounted(async () => {
      // 获取当前的经纬度
      const location = await getLocation()

      // 天气对象
      const weatherObject = (await getGeneral(location)).now

      // 获取所需数据
      weatherRt.time = weatherObject.obsTime.substring(0, 10)
      weatherRt.temp = weatherObject.temp
      weatherRt.text = weatherObject.text
      weatherRt.icon = getImageUrl(weatherObject.icon)
    })

    return {
      city: route.params.city,
      weatherRt,
    }
  },
}
</script>

<style scoped>
@import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
</style>
