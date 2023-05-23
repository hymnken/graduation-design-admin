<template>
  <div class="card">
    <div class="card-body">
      <div class="card-title text-center">
        <h4>七天预报</h4>
        <table class="table table-striped">
          <thead>
            <tr>
              <td>时间</td>
              <td>湿度</td>
              <td>白天</td>
              <td>温度</td>
              <td>夜晚</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in weekRef" :key="index">
              <td>{{ item.week }}</td>
              <td>{{ item.humidity }}%</td>
              <td><img :src="item.iconD" alt="" /></td>
              <td>{{ item.tempMin }}° ~ {{ item.tempMax }}°</td>
              <td><img :src="item.iconN" alt="" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
props: {
  weekRef: {
    type: Array
  }
}
</script>

<style scoped>
@import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
.card {
  background-color: #eff1f7;
  margin: 0 0 10px 0;
}
.table img {
  max-width: 30px;
}
.table td {
  padding-top: 15px;
}
</style>
