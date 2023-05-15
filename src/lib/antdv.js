import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import { createVNode } from "vue";
import * as Icons from "@ant-design/icons-vue";
console.log('%c [ Icons ]-5', 'font-size:13px; background:pink; color:#bf2c9f;', Icons)

const Icon = (props) => {
    const { icon } = props
    return createVNode(Icons[icon])
}

export const setupAntdIcon = app => {
    app.component('Icon', Icon)
}

export const setupAntd = app => {
    app.use(Antd)
}