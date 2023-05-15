<template>
  <div>
    <div class="flex flex-end m-b-20"></div>
    <div class="m-b-20">
      <a-alert message="禁用后用户不可登录" type="warning" show-icon />
    </div>
    <a-table :data-source="tableData" :pagination="false">
      <a-table-column key="id" title="日志编号" data-index="id" />
      <a-table-column key="module_name" title="模块">
        <template #default="{ record }">
          <a-tag v-if="record.module_name== 'USER'" color="green">
            <template #icon>
              <UserOutlined />
            </template>
            {{record.module_name}}
          </a-tag>
          <a-tag v-else-if="record.module_name== 'ADMIN'" color="purple">
            <template #icon>
              <RobotOutlined />
            </template>
            {{record.module_name}}
          </a-tag>
          <a-tag v-else-if="record.module_name== 'SYSTEM'" color="pink">
            <template #icon>
              <BugOutlined />
            </template>
            {{record.module_name}}
          </a-tag>
          <a-tag v-else color="orange">
            <template #icon>
              <ApiOutlined />
            </template>
            {{record.module_name}}
          </a-tag>
        </template>
      </a-table-column>
      <a-table-column key="request_method" title="访问方式" data-index="request_method" />
      <a-table-column key="request_host" title="来源IP" data-index="request_host" />
      <a-table-column key="request_api" title="PATH" data-index="request_api" />
      <a-table-column key="status_code" title="状态码">
        <template #default="{ record }">
          <a-tag v-if="record.status_code== '500'" color="error">{{record.status_code}}</a-tag>
          <a-tag v-else color="pink">{{record.status_code}}</a-tag>
        </template>
      </a-table-column>
      <a-table-column key="message" title="描述" data-index="message" />
      <a-table-column key="handler" title="操作者" data-index="handler" />
      <a-table-column key="handler_id" title="操作者ID" data-index="handler_id" />
      <a-table-column key="create_at" title="时间" data-index="create_at" />
      <a-table-column key="action" title="操作">
        <template #default="{ record }">
          <a-button
            type="link"
            v-permission="['sys_user_modify']"
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
import { list } from "@/api/log";
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
  logDetail.value = row.err_detail;
  showDetailModal.value = true;
};
</script>

<style>
</style>