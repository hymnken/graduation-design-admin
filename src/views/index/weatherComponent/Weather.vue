<script>
export default {
  created() {
    window.WIDGET = {
      CONFIG: {
        layout: '1',
        width: '450',
        height: '310',
        background: '1',
        dataColor: 'FFFFFF',
        language: 'zh',
        borderRadius: '10',
        key: 'b94f015fa6104d0db063e7379208fbd4',
      },
    }
  },
}
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = 'https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0'
document.getElementsByTagName('head')[0].appendChild(script)
</script>

<template>
  <div class="-page">
    <div id="he-plugin-standard"></div>
  </div>
</template>

<style lang="scss" scoped></style>
