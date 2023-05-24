<script>
export default {
  created() {
    window.WIDGET = {
      CONFIG: {
        layout: '2',
        width: '300',
        height: '400',
        background: '3',
        dataColor: 'FFFFFF',
        language: 'zh',
        borderRadius: '5',
        city: 'CN101030100',
        key: 'a5088b5afade48c69d482ff42487f7be',
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
