<template>
  <div class="input-group flex-wrap position-relative">
    <input type="text" class="form-control" placeholder="请输入要查询的城市/地区" v-model="keyword" />
    <img src="@/assets/images/icon/close.png" alt="" class="close position-absolute" @click="clear" v-show="isClose" />
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
export default {
  name: 'InputSearch',
  emits: ['show', 'visible'],

  setup(props, context) {
    // 双向绑定
    const keyword = ref('')
    // 关闭状态
    const isClose = ref(false)

    // 监听
    watchEffect(() => {
      //console.log(keyword.value)
      if (keyword.value !== '') {
        isClose.value = true
        context.emit('show', keyword)
      } else {
        isClose.value = false
        context.emit('visible')
      }
    })

    // 清空
    const clear = () => {
      keyword.value = ''
      context.emit('visible')
    }

    return {
      keyword,
      clear,
      isClose,
    }
  },
}
</script>

<style scoped>
@import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
.close {
  width: 18px;
  top: 10px;
  right: 10px;
  z-index: 9999;
}
</style>
