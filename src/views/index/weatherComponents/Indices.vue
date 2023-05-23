<template>
  <div class="d-flex flex-wrap">
    <div class="card col-6 text-center" v-for="(item, index) in indicesRef" :key="index">
      <img :src="item.icon" class="card-img img-fluid m-auto mt-2" alt="" />
      <div class="card-body">
        <h5 class="card-title">{{ item.category }}</h5>
        <h5 class="text-secondary">{{ item.name }}</h5>
      </div>
    </div>
  </div>
</template>
<script setup>
props: {
  indicesRef: {
    type: Array
  }
}
</script>

<style scoped>
@import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
.card {
  border: 5px solid white;
  background-color: #eff1f7;
}
.card-img {
  max-width: 70px;
}
</style>
