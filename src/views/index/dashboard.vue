<template>
  <div class>
    <canvas ref="canvas" id="canvas" width="500" height="500"></canvas>
    <h1>
      Hi,
      <span class="text-primary">{{userInfo.nickname || ''}}</span>
      ，{{greetText}}！
    </h1>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject, computed } from "vue";
const canvas = ref(null);
const userInfo = inject("userInfo");

let aniId;
onMounted(() => {
  (function loop() {
    drawTimer();
    aniId = requestAnimationFrame(loop);
  })();
});

onUnmounted(() => {
  aniId && cancelAnimationFrame(aniId);
});

const greetText = computed(() => {
  const hour = new Date().getHours();
  if (hour < 5) return "深夜好";
  if (hour < 7) return "凌晨好";
  if (hour < 9) return "早上好";
  if (hour < 13) return "中午好";
  if (hour < 17) return "下午好";
  if (hour < 19) return "傍晚好";
  if (hour < 22) return "晚上好";
  return "深夜好";
});

const drawTimer = () => {
  let ctx = canvas.value.getContext("2d");
  let r = 200;

  // 绘制表盘
  ctx.beginPath();
  ctx.arc(250, 250, r, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.strokeStyle = "steelblue";
  ctx.lineWidth = 20;
  ctx.stroke();

  // 2  绘制刻度
  // 2-1时针刻度
  for (var i = 0; i < 12; i++) {
    getLine((Math.PI / 180) * i * 30, -190, -170, "black", 5);
  }
  // 2-2分针刻度
  for (var i = 0; i < 60; i++) {
    getLine((Math.PI / 180) * i * 6, -190, -180, "black", 3);
  }

  //  3 绘制文字
  //     顺时针公式：
  //     Y = Math.sin(弧度)*r;
  //     X =Math.cos(弧度)*r
  let text = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
  for (var i = 0; i < 12; i++) {
    // 计算文字的坐标
    let x = Math.cos((Math.PI / 180) * i * 30) * r * 0.7 + 250;
    let y = Math.sin((Math.PI / 180) * i * 30) * r * 0.7 + 250;

    ctx.font = "20px 楷体";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text[i], x, y);
  }

  // 4 绘制中心空心圆
  ctx.beginPath();
  ctx.arc(250, 250, 15, 0, Math.PI * 2);
  ctx.closePath();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  ctx.stroke();

  // 5 绘制指针
  let time = new Date();
  let h = time.getHours();
  let m = time.getMinutes();
  let s = time.getSeconds();

  // 改成十二小时制
  h = h > 12 ? h - 12 + m / 60 : h + m / 60;

  getLine((Math.PI / 180) * h * 30, -120, 30, "steelblue", 10);
  getLine((Math.PI / 180) * m * 6, -130, 20, "orange", 5);
  getLine((Math.PI / 180) * s * 6, -155, 10, "red", 3);

  // 6 绘制中心实心圆
  ctx.beginPath();
  ctx.arc(250, 250, 5, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = "black";
  ctx.fill();

  // 定义生成刻度方法
  function getLine(rotate, moveTo, lineTo, color, width) {
    ctx.save();
    ctx.translate(250, 250);
    ctx.rotate(rotate);
    ctx.beginPath();
    ctx.moveTo(0, moveTo);
    ctx.lineTo(0, lineTo);
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.restore();
  }
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 24px;
  margin-top: -100px;
}
#canvas {
  transform: scale(0.5);
  margin-left: -125px;
  margin-top: -125px;
}
</style>