<template>
  <div :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }">
    <a-calendar v-model:value="value" :fullscreen="false" @panelChange="onPanelChange" />
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const value = ref()
    const onPanelChange = (value, mode) => {
      console.log(value, mode)
    }
    return {
      value,
      onPanelChange,
    }
  },
})
</script>
