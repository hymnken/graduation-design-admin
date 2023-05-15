<template>
  <div>
    <div class="m-b-10"></div>
    <div>
      <a-tabs v-model:activeKey="activeKey" @change="queryData">
        <a-tab-pane :key="1" tab="近一周"></a-tab-pane>
        <a-tab-pane :key="2" tab="近一月"></a-tab-pane>
        <a-tab-pane :key="3" tab="近半年"></a-tab-pane>
        <a-tab-pane :key="4" tab="近一年"></a-tab-pane>
      </a-tabs>
    </div>
    <div style="margin-top:80px">
      <div id="chart1" v-show="activeKey==1"></div>
      <div id="chart2" v-show="activeKey==2"></div>
      <div id="chart3" v-show="activeKey==3"></div>
      <div id="chart4" v-show="activeKey==4"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from "vue";
import { orderAnalysis } from "@/api/order";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { Line } from "@antv/g2plot";
const cache = {
  1: false,
  2: false,
  3: false,
  4: false,
};
const router = useRouter();
const activeKey = ref(1);
const queryData = () => {
  orderAnalysis({ type: activeKey.value }).then((res) => {
    if (cache[activeKey.value]) return;
    if (activeKey.value <= 2) {
      renderWeek(res || []);
    } else {
      renderMonth(res || []);
    }
    cache[activeKey.value] = true;
  });
};
let chart = null;
queryData();

onMounted(async () => {});
const renderWeek = async (data) => {
  await nextTick();
  let dayObj = {};
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    let k = item.create_at.split(" ")[0];
    if (!dayObj[k]) {
      dayObj[k] = parseFloat((item.total_money / 100).toFixed(2));
    } else {
      dayObj[k] += parseFloat((item.total_money / 100).toFixed(2));
    }
  }
  let dataArr = [];
  Object.keys(dayObj).forEach((k) => {
    dataArr.push({
      day: k,
      value: dayObj[k],
    });
  });
  console.log(
    '%c [ "chart" + activeKey.value ]-62',
    "font-size:13px; background:pink; color:#bf2c9f;",
    "chart" + activeKey.value
  );
  const line = new Line("chart" + activeKey.value, {
    data: dataArr,
    xField: "day",
    yField: "value",
    height: 300,
    point: {
      size: 2,
      shape: "diamond",
      style: {
        stroke: "#FE740C",
        lineWidth: 1,
        fillOpacity: 0.6,
      },
    },
    annotations: [
      {
        type: "text",
        position: ["95%", "100%"],
        content: "日期",
        style: {
          fill: "red",
        },
        top: true,
      },
      {
        type: "text",
        position: ["0%", "0%"],
        content: "元",
        style: {
          y: 9,
          fill: "red",
        },
        top: true,
      },
    ],
    tooltip: {
      formatter: (datum) => {
        return { name: datum.day, value: datum.value + "元" };
      },
    },
  });
  line.render();
};

const renderMonth = async (data) => {
  await nextTick();
  let dayObj = {};
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    let day = item.create_at.split(" ")[0];
    let dayarr = day.split("-");
    let k = [dayarr[0], dayarr[1]].join("-");
    if (!dayObj[k]) {
      dayObj[k] = parseFloat((item.total_money / 100).toFixed(2));
    } else {
      dayObj[k] += parseFloat((item.total_money / 100).toFixed(2));
    }
  }
  let dataArr = [];
  Object.keys(dayObj).forEach((k) => {
    dataArr.push({
      day: k,
      value: dayObj[k],
    });
  });
  console.log(
    '%c [ "chart" + activeKey.value ]-126',
    "font-size:13px; background:pink; color:#bf2c9f;",
    "chart" + activeKey.value
  );
  const line = new Line("chart" + activeKey.value, {
    data: dataArr,
    xField: "day",
    yField: "value",
    height: 400,
    point: {
      size: 2,
      shape: "diamond",
      style: {
        stroke: "#FE740C",
        lineWidth: 1,
        fillOpacity: 0.6,
      },
    },
    annotations: [
      {
        type: "text",
        position: ["95%", "100%"],
        content: "月",
        style: {
          fill: "red",
        },
        top: true,
      },
      {
        type: "text",
        position: ["0%", "0%"],
        content: "元",
        style: {
          y:9,
          fill: "red",
        },
        top: true,
      },
    ],
    tooltip: {
      formatter: (datum) => {
        return { name: datum.day, value: datum.value + "元" };
      },
    },
  });
  line.render();
};
</script>

<style>
</style>