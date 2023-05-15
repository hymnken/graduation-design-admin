<template>
  <div>
    <div class="flex flex-end m-b-20"></div>
    <div class="m-b-20">
      <a-alert message="禁用后用户不可登录" type="warning" show-icon />
    </div>
    <a-table :data-source="tableData" :pagination="false">
      <a-table-column key="id" title="留言编号" data-index="id" />
      <a-table-column key="user_id" title="用户ID" data-index="user_id" />
      <a-table-column key="mobile" title="联系方式" data-index="mobile" />
      <a-table-column key="content" title="内容" data-index="content" />
      <a-table-column key="status" title="状态">
        <template #default="{ record }">
          <a-tag v-if="record.status==1" color="warning">待回复</a-tag>
          <a-tag v-else color="success">已回复</a-tag>
        </template>
      </a-table-column>
      <a-table-column key="action" title="操作">
        <template #default="{ record }">
          <a-button
            type="link"
            v-permission="['sys_message']"
            @click="handleShowLogDetail(record)"
          >详情</a-button>
        </template>
      </a-table-column>
    </a-table>
    <div class="flex flex-center m-t-20">
      <a-pagination
        @change="handlePageChange"
        v-model:current="pageIndex"
        :total="tableCount"
        show-less-items
      />
    </div>
    <a-modal :footer="null" v-model:visible="showDetailModal" width="800px" title="日志详情">
      <pre>
        {{ logDetail }}
      </pre>
    </a-modal>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { list } from "@/api/message";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import {
  ApiOutlined,
  BugOutlined,
  RobotOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
const showDetailModal = ref(false);
const logDetail = ref("");
const router = useRouter();
const tableData = ref([]);
const tableCount = ref(0);
const pageIndex = ref(1);
const queryList = () => {
  list({ page: pageIndex.value }).then((res) => {
    tableData.value = res.rows;
    tableCount.value = res.count;
  });
};

onMounted(() => {
  queryList();
});

const handlePageChange = (e) => {
  pageIndex.value = e;
  queryList();
};
const handleShowLogDetail = (row) => {
  router.push({
    path: "/message/" + row.id,
  });
};
</script>

<style>
</style>