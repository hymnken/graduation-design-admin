<template>
  <div class="container-fluid">
    <navbar :city="city"></navbar>
    <input-search @show="show" @visible="visible"></input-search>
    <search-list v-show="!isShow" :list-city-ref="listCityRef"></search-list>
    <record :record-ref="recordRef" :position-rt="positionRt" v-show="isShow"></record>
    <top-city :top-city-ref="topCityRef" v-show="isShow"></top-city>
  </div>
</template>

<script>
import Navbar from './Navbar.vue'
import InputSearch from './InputSearch.vue'
import SearchList from './SearchList.vue'
import Record from './Record.vue'
import TopCity from './TopCity.vue'
import { useRoute } from 'vue-router'
import { onMounted, reactive, ref } from 'vue'
import { getCity, getRecord, getTopCity, getVaguaCity } from './location.js'

// topCity模块
const topCity = () => {
  const topCityRef = ref([])

  onMounted(async () => {
    const topCityObject = (await getTopCity()).topCityList

    topCityObject.map((item) => {
      // 城市名
      if (item.name !== item.adm2) {
        item.name = item.adm2 + '·' + item.name
      }
      // 经纬度
      item.location = item.lon + ',' + item.lat
    })

    topCityRef.value = topCityObject
  })

  return {
    topCityRef,
  }
}

// record模块
const record = () => {
  const recordRef = ref([])

  // 获取历史记录
  const recordObject = getRecord()

  let arr = []

  recordObject.map((item) => {
    arr.push({
      city: item.split('-')[0],
      location: item.split('-')[1],
    })
  })

  recordRef.value = arr

  return {
    recordRef,
  }
}

// position模块
const position = () => {
  const positionRt = reactive({})

  onMounted(async () => {
    const cityObject = (await getCity(1)).location[0]

    // 当前城市
    if (cityObject.name === cityObject.adm2) {
      positionRt.city = cityObject.name
    } else {
      positionRt.city = cityObject.adm2 + '·' + cityObject.name
    }

    positionRt.location = cityObject.lon + ',' + cityObject.lat
  })

  return {
    positionRt,
  }
}

// listCity模块
const listCity = () => {
  const listCityRef = ref([])

  // 显示开关
  const isShow = ref(true)

  // 显示方法
  const show = async (keyword) => {
    isShow.value = false

    const vaguaCityObject = (await getVaguaCity(keyword.value)).location

    vaguaCityObject.map((item) => {
      // 城市名
      if (item.name === item.adm2) {
        item.city = item.name
      } else {
        item.city = item.adm2 + '·' + item.name
      }
      // 经纬度
      item.location = item.lon + ',' + item.lat
    })

    listCityRef.value = vaguaCityObject
  }

  // 隐藏方法
  const visible = () => {
    isShow.value = true
  }

  return {
    listCityRef,
    isShow,
    show,
    visible,
  }
}

export default {
  name: 'Search',

  components: {
    Navbar,
    InputSearch,
    TopCity,
    Record,
    SearchList,
  },

  setup() {
    // 获取路由数据
    const route = useRoute()

    // topCity模块
    const { topCityRef } = topCity()

    // record模块
    const { recordRef } = record()

    // position模块
    const { positionRt } = position()

    // listCity模块
    const { listCityRef, isShow, show, visible } = listCity()

    return {
      city: route.params.city,
      topCityRef,
      recordRef,
      positionRt,
      listCityRef,
      isShow,
      show,
      visible,
    }
  },
}
</script>

<style scoped>
@import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
</style>
