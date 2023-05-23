<template>
  <div class="container-fluid">
    <General :city-rt="cityRt"></General>
    <Week :week-ref="weekRef"></Week>
    <Indices :indices-ref="indicesRef"></Indices>
  </div>
</template>
<script>
import General from './General.vue'
import Week from './Week.vue'
import Indices from './Indices.vue'
import { getCity, getLocation } from './location.js'
import { getGeneral, getAir, getWeek, getIndices } from './weather.js'
import { getImageUrl, getFormatWeek } from './untils'
import { onMounted, reactive, ref } from 'vue'

// general模块
const general = () => {
  // 创建一个用于显示rt
  const cityRt = reactive({})

  onMounted(async () => {
    const cityObject = (await getCity()).location[0]

    // 获取 “城市/地区” 这种格式
    if (cityObject.name === cityObject.adm2) {
      cityRt.name = cityObject.name
    } else {
      cityRt.name = cityObject.adm2 + '·' + cityObject.name
    }

    // 获取经纬度，用于查询天气概况
    cityRt.location = cityObject.lon + ',' + cityObject.lat

    // 天气对象
    const weatherObject = (await getGeneral(cityRt.location)).now

    // 当前时间
    cityRt.time = weatherObject.obsTime.substring(0, 10)
    // 当前温度
    cityRt.temp = weatherObject.temp
    // 天气描述
    cityRt.text = weatherObject.text
    // 天气概况
    cityRt.general = `今天${weatherObject.text}，${weatherObject.windDir}${weatherObject.windScale}级，现在温度为${weatherObject.temp}°，体感温度${weatherObject.feelsLike}°`

    // 天气图标
    cityRt.icon = getImageUrl(weatherObject.icon)

    // 获取空气质量指数
    const airObject = (await getAir(cityRt.location)).now

    // 设置pm2.5背景
    switch (airObject.level) {
      case '1':
        cityRt.bgcolor = 'background:limegreen'
        break
      case '2':
        cityRt.bgcolor = 'background:gold'
        break
      case '3':
        cityRt.bgcolor = 'background:orange'
        break
      case '4':
        cityRt.bgcolor = 'background:red'
        break
      default:
        cityRt.bgcolor = 'background:maroon'
    }

    cityRt.category = airObject.category
  })

  return {
    cityRt,
  }
}

// week模块
const week = () => {
  // 创建一个用于显示的
  const weekRef = ref([])

  onMounted(async () => {
    // 获取当前的经纬度
    const location = await getLocation()

    // 获取七天预报信息
    const weekObject = (await getWeek(location)).daily

    // 遍历
    weekObject.map((item, index) => {
      // 转换url
      item.iconD = getImageUrl(item.iconDay)
      item.iconN = getImageUrl(item.iconNight)

      // 转换周
      item.week = getFormatWeek(item.fxDate)

      // 首日
      if (index === 0) {
        item.week = '今天'
      }
    })

    weekRef.value = weekObject
  })

  return {
    weekRef,
  }
}

// indices模块
const indices = () => {
  // 创建一个用于显示的
  const indicesRef = ref([])

  onMounted(async () => {
    // 获取当前的经纬度
    const location = await getLocation()

    // 获取生活指数
    const indicesObject = (await getIndices(location, [1, 3, 5, 9])).daily
    // 遍历
    indicesObject.map((item) => {
      // 转换
      item.icon = getImageUrl(item.type)
    })

    indicesRef.value = indicesObject
  })

  return {
    indicesRef,
  }
}

export default {
  name: 'Home',

  components: {
    General,
    Week,
    Indices,
  },

  setup() {
    // general模块
    const { cityRt } = general()

    // week模块
    const { weekRef } = week()

    // indices模块
    const { indicesRef } = indices()

    return {
      cityRt,
      weekRef,
      indicesRef,
    }
  },
}
</script>
<style lang="scss">
@import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
</style>
