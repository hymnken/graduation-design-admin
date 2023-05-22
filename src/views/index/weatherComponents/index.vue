<template>
  <div class="container-fluid">
    <General :city="city"></General>
  </div>
</template>

<script setup>
import General from './General.vue'
import { getCity } from './location.js'
import { ref, onMounted } from 'vue'
const city = ref('北京')
onMounted(async () => {
  const cityList = await getCity()
  console.log(cityList)
})
</script>
<style lang="scss">
@import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
</style>
