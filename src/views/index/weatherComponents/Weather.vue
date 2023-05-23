<template>
  <div class="card">
    <div class="card-header">
      <div class="card-title">
        <span class="float-end text-secondary">{{ weatherRt.time }}</span>
      </div>
      <div class="card-body text-center">
        <img :src="weatherRt.icon" alt="" class="img-fluid" />
        <div class="fs-4 mb-4">{{ weatherRt.temp }}° / {{ weatherRt.text }}</div>
        <table class="table table-striped">
          <tbody>
            <tr>
              <td>
                <img src="@/assets/images/icon/d-1.png" alt="" />
                <div class="text-secondary fs-6">南风 8级</div>
              </td>
              <td>
                <img src="@/assets/images/icon/d-2.png" alt="" />
                <div class="text-secondary fs-6">紫外线 中等</div>
              </td>
            </tr>
            <tr>
              <td>
                <img src="@/assets/images/icon/d-3.png" alt="" />
                <div class="text-secondary fs-6">相对湿度 88%</div>
              </td>
              <td>
                <img src="@/assets/images/icon/d-4.png" alt="" />
                <div class="text-secondary fs-6">大气压 996hPa</div>
              </td>
            </tr>
            <tr>
              <td>
                <img src="@/assets/images/icon/d-5.png" alt="" />
                <div class="text-secondary fs-6">降水量 564mm</div>
              </td>
              <td>
                <img src="@/assets/images/icon/d-6.png" alt="" />
                <div class="text-secondary fs-6">能见度 25KM</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
props: {
  weatherRt: {
    type: Object
  }
}
</script>

<style scoped>
@import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
.card {
  background-color: #eff1f7;
  margin: 0 0 10px 0;
}
.card-header {
  border: none;
  background: none;
}
.img-fluid {
  max-width: 90px;
  max-height: 90px;
}
.table {
  margin-bottom: 30px;
}
.table td {
  padding: 3% 0;
}
.table img {
  max-width: 45px;
}
</style>
