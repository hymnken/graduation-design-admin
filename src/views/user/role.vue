<template>
  <div class="flex flex-end m-b-20">
    <a-button
      type="primary"
      v-permission="['sys_role_create']"
      @click="showCreateRoleModal = true"
    >添加角色</a-button>
  </div>

  <a-table :data-source="tableData" :pagination="false">
    <a-table-column key="id" title="ID" data-index="id" />
    <a-table-column key="name" title="角色名" data-index="name" />
    <a-table-column key="intro" title="角色描述" data-index="intro" />
    <a-table-column key="create_at" title="创建时间" data-index="create_at" />
    <a-table-column key="action" title="操作">
      <template #default="{ record }">
        <a-space v-show="!record.root">
          <a-button
            type="link"
            v-permission="['sys_role_modify']"
            @click="handleEditClick(record.id)"
          >编辑</a-button>
          <a-popconfirm
            title="确认要删除该角色?这可能会导致相关用户权限失效"
            ok-text="确认"
            cancel-text="再想想"
            @confirm="handleDelete(record.id)"
          >
            <a-button v-permission="['sys_role_delete']" type="link">删除</a-button>
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
  <!-- 新增角色 弹窗 -->
  <a-modal v-model:visible="showCreateRoleModal" title="新增角色" @ok="handleCreateSubmit">
    <a-form
      :model="roleState"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
    >
      <a-form-item label="角色名" name="name">
        <a-input v-model:value="roleState.name" />
      </a-form-item>
      <a-form-item label="角色描述" name="intro">
        <a-input v-model:value="roleState.intro" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { roleList, roleDelete, roleCreate } from "@/api/user";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
const router = useRouter();
const tableData = ref([]);
const tableCount = ref(0);
const pageIndex = ref(1);
const showCreateRoleModal = ref(false);
const roleState = reactive({
  name: "",
  intro: "",
});
const queryList = () => {
  roleList({ page: pageIndex.value }).then((res) => {
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

const handleCreateSubmit = () => {
  roleCreate(roleState).then((res) => {
    pageIndex.value = 1;
    queryList();
    message.success("创建成功");
    roleState.name = "";
    roleState.intro = "";
    showCreateRoleModal.value = false;
  });
};

const handleEditClick = (id) => {
  router.push({
    name: "permission",
    query: { id },
  });
};

const handleDelete = (id) => {
  roleDelete({ id }).then((res) => {
    message.success(`删除成功`);
    queryList();
  });
};
</script>

<style>
</style>