<template>
  <div class="flex flex-end m-b-20">
    <a-button v-permission="['sys_user_modify']" type="primary" @click="nav2Add">添加管理员</a-button>
  </div>
  <div class="m-b-20">
    <a-alert message="禁用后用户不可登录" type="warning" show-icon />
  </div>
  <a-table :data-source="tableData" :pagination="false">
    <a-table-column key="id" title="ID" data-index="id" />
    <a-table-column key="username" title="用户名" data-index="username" />
    <a-table-column key="nickname" title="昵称" data-index="nickname" />
    <a-table-column key="mobile" title="手机号" data-index="mobile" />
    <a-table-column key="role_id" title="角色">
      <template #default="{ record }">
        <span v-if="record.role">{{record.role ? record.role.name : ''}}</span>
      </template>
    </a-table-column>
    <a-table-column key="create_at" title="注册时间" data-index="create_at" />
    <a-table-column key="action" title="操作">
      <template #default="{ record }">
        <a-space v-show="!record.root">
          <a-button
            type="link"
            v-permission="['sys_user_modify']"
            @click="handleEdit(record)"
          >{{ record.enable ? '禁用' : '启用' }}</a-button>
          <a-button
            type="link"
            v-permission="['sys_user_modify']"
            @click="handleEditClick(record.id)"
          >编辑</a-button>
          <a-popconfirm
            title="确认要删除该用户?"
            ok-text="确认"
            cancel-text="再想想"
            @confirm="handleDelete(record.id)"
          >
            <a-button v-permission="['sys_user_delete']" type="link">删除</a-button>
          </a-popconfirm>
        </a-space>
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
</template>

<script setup>
import { onMounted, ref } from "vue";
import { list, userModify, userDelete } from "@/api/user";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
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

const nav2Add = () => {
  router.push({ name: "userModify" });
};

const handlePageChange = (e) => {
  pageIndex.value = e;
  queryList();
};

const handleEdit = (row) => {
  userModify({
    id: row.id,
    enable: !row.enable,
    username: row.username,
    nickname: row.nickname,
  }).then((res) => {
    message.success(`操作成功`);
    queryList();
  });
};

const handleEditClick = (id) => {
  router.push({
    name: "userModify",
    query: { id },
  });
};

const handleDelete = (id) => {
  userDelete({ id }).then((res) => {
    message.success(`删除成功`);
    queryList();
  });
};
</script>

<style>
</style>