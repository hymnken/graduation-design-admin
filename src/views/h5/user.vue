<template>
  <div class="flex flex-end m-b-20">
    <a-input-search
      v-model:value="keyword"
      placeholder="输入真实姓名查找"
      enter-button
      @search="onSearch"
      style="width:200px;margin-right:20px"
    />
    <a-button v-permission="['sys_h5_user']" type="primary" @click="nav2Add">添加用户</a-button>
  </div>
  <a-table :data-source="tableData" :pagination="false">
    <a-table-column key="id" title="ID" data-index="id" />
    <a-table-column key="username" title="用户名" data-index="username" />
    <a-table-column key="realname" title="真实姓名" data-index="realname" />
    <a-table-column key="mobile" title="手机号" data-index="mobile" />
    <a-table-column key="ident" title="证件号" data-index="ident" />

    <a-table-column key="create_at" title="注册时间" data-index="create_at" />
    <a-table-column key="action" title="操作">
      <template #default="{ record }">
        <a-space v-show="!record.root">
          <a-button type="link" v-permission="['sys_h5_user']" @click="handleEditClick(record)">编辑</a-button>
          <a-popconfirm
            title="确认要删除该用户?"
            ok-text="确认"
            cancel-text="再想想"
            @confirm="handleDelete(record.id)"
          >
            <a-button v-permission="['sys_h5_user']" type="link">删除</a-button>
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
import { h5UserList, userModify, h5UserDelete } from "@/api/user";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
const router = useRouter();
const tableData = ref([]);
const tableCount = ref(0);
const pageIndex = ref(1);
const keyword = ref("");
const queryList = () => {
  h5UserList({ page: pageIndex.value, keyword: keyword.value }).then((res) => {
    tableData.value = res.rows;
    tableCount.value = res.count;
  });
};

onMounted(() => {
  queryList();
});

const nav2Add = () => {
  router.push({ name: "h5UserEdit" });
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

const handleEditClick = (row) => {
  localStorage.setItem(`user_id_${row.id}`, JSON.stringify(row));
  router.push({
    name: "h5UserEdit",
    query: { id: row.id },
  });
};

const handleDelete = (id) => {
  h5UserDelete({ id }).then((res) => {
    message.success(`删除成功`);
    queryList();
  });
};

const onSearch = (_) => {
  queryList();
};
</script>

<style>
</style>