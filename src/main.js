import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { setupAntd, setupAntdIcon } from './lib/antdv.js'
import weather from 'vue-mini-weather'
dayjs.locale('zh-cn')

const app = createApp(App)
// 自定义指令
import * as directives from './directives'
Object.keys(directives).forEach((key) => {
  app.directive(key, directives[key])
})
app.use(store)
app.use(router)
app.use(weather)
setupAntd(app)
setupAntdIcon(app)
// console.log('%c [ setupAntdIcon ]-20', 'font-size:13px; background:pink; color:#bf2c9f;', setupAntdIcon)
app.mount('#app')
