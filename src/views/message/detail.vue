<template>
  <div>
    <div class="list">
      <div class="row" :class="[item.admin_id ? 'sys' :'']" v-for="item in msgList" :key="item.id">
        <div class="head">
          <icon v-if="item.mobile" class="m-r-5" icon="UserOutlined"></icon>
          <icon v-else class="m-r-5" icon="AndroidOutlined"></icon>
          {{ item.admin_username ? item.admin_username : item.mobile}}
        </div>
        <div class="content">
          <div>{{item.content}}</div>
        </div>
        <div class="time">{{item.create_at}}</div>
      </div>
    </div>
    <div class="msg-box">
      <a-textarea
        v-model:value="msgContent"
        placeholder="输入内容"
        :auto-size="{ minRows: 2, maxRows: 5 }"
      />
    </div>
    <div class="flex flex-end p-x-20">
      <a-button type="primary" @click="handleReply" ghost>回复</a-button>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { detail, reply } from "@/api/message";
import { ref, reactive } from "vue";
import { message } from "ant-design-vue";
let msgList = ref([]);
const route = useRoute();
const parentId = route.params.id;
const msgContent = ref("");
const queryDetail = (_) => {
  detail({ parent_id: parentId }).then((res) => {
    msgList.value = res.rows || [];
  });
};
queryDetail();

const handleReply = (_) => {
  reply({ content: msgContent.value, parent_id: parentId }).then((res) => {
    message.success(`回复成功`);
    msgContent.value = "";
    queryDetail();
  });
};
</script>

<style lang="scss" scoped>
.row {
  margin: 20px;
  border-radius: 5px;
  overflow: hidden;
  padding: 20px;
  border-bottom: 1px solid #eee;
  &.sys {
    .head {
      text-align: right;
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      span {
        margin-left: 5px;
      }
    }
    .content {
      justify-content: flex-end;
      > div {
        text-align: right;
      }
    }
    .time {
      text-align: right;
    }
  }
}
.head {
  width: 100%;
  font-weight: bold;
}
.content {
  display: flex;
  margin-top: 10px;
  font-size: 14px;
  color: #555;
  > div {
    width: 60%;
  }
}
.time {
  margin-top: 10px;
  font-size: 12px;
  color: #666;
}
.msg-box {
  margin: 20px;
  margin-top: 40px;
}
.list {
  max-height: 60vh;
  overflow-y: scroll;
}
</style>