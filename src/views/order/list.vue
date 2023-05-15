<template>
  <div class="flex flex-end m-b-20"></div>
  <a-table :data-source="tableData" :pagination="false">
    <a-table-column key="id" title="订单ID" data-index="id" />
    <a-table-column key="house" title="房屋信息" data-index="house">
      <template #default="{ record }">
        <div class="flex">
          <img style="height:40px" :src="record.house.cover" alt />
          <span style="margin-left:20px">{{record.house.fullname}}</span>
        </div>
      </template>
    </a-table-column>
    <a-table-column key="days" title="预定天数" data-index="days" />
    <a-table-column key="earnest_money" title="定金" data-index="earnest_money">
      <template #default="{ record }">{{ (record.earnest_money / 100).toFixed(2)}}</template>
    </a-table-column>
    <a-table-column key="earnest_money" title="尾款" data-index="earnest_money">
      <template #default="{ record }">{{ (record.surplus_money / 100).toFixed(2)}}</template>
    </a-table-column>
    <a-table-column key="earnest_money" title="总金额" data-index="earnest_money">
      <template #default="{ record }">{{ (record.total_money / 100).toFixed(2)}}</template>
    </a-table-column>

    <a-table-column key="consumer_name" title="入住人" data-index="consumer_name" />
    <a-table-column key="consumer_mobile" title="联系电话" data-index="consumer_mobile" />
    <a-table-column key="create_at" title="下单时间" data-index="create_at" />
    <a-table-column key="status" title="状态">
      <template #default="{ record }">
        <span v-if="record.status == 0">已过期</span>
        <span v-if="record.status == 1">未支付</span>
        <span v-if="record.status == 2">待付尾款</span>
        <span v-if="record.status == 3">待入住</span>
        <span v-if="record.status == 4">已入住</span>
        <span v-if="record.status == 5">已完成</span>
      </template>
    </a-table-column>
    <a-table-column key="action" title="操作">
      <template #default="{ record }">
        <a-space>
          <a-button
            v-if="record.status==3"
            type="link"
            v-permission="['sys_order']"
            @click="handleComeIn(record)"
          >办理入住</a-button>
          <a-button
            v-if="record.status==4"
            type="link"
            v-permission="['sys_order']"
            @click="handleRenew(record)"
          >续住</a-button>
          <a-button
            v-if="record.status==4"
            type="link"
            v-permission="['sys_order']"
            @click="handleComplete(record)"
          >完成订单</a-button>
          <a-popconfirm
            v-if="record.status <= 1"
            title="确认要删除该订单?"
            ok-text="确认"
            cancel-text="再想想"
            @confirm="handleDelete(record)"
          >
            <a-button v-permission="['sys_order']" type="link">删除</a-button>
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
  <a-modal v-model:visible="visible" title="续住" @ok="handleOk">
    续住天数：
    <a-input style="width:100px" v-model:value="reDays" />
  </a-modal>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { userModify, userDelete } from "@/api/user";
import {
  list,
  orderDelete,
  renew,
  orderComplete,
  orderCome,
} from "@/api/order";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
const router = useRouter();
const tableData = ref([]);
const tableCount = ref(0);
const pageIndex = ref(1);
const visible = ref(false);
const reDays = ref(1);
const activeRow = ref("");
const queryList = () => {
  console.log(`ddd`);
  list({ page: pageIndex.value }).then((res) => {
    tableData.value = [].concat(res.rows);
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

const handleComeIn = (row) => {
  orderCome({ id: row.id }).then((res) => {
    message.success(`操作成功`);
    window.location.reload();
  });
};

const handleEditClick = (id) => {
  router.push({
    name: "userModify",
    query: { id },
  });
};

const handleDelete = (row) => {
  orderDelete({ id: row.id }).then((res) => {
    message.success(`删除成功`);
    queryList();
  });
};
const handleComplete = (row) => {
  orderComplete({ id: row.id }).then((res) => {
    message.success(`操作成功`);
    window.location.reload();
  });
};
const handleRenew = (row) => {
  activeRow.value = row;
  visible.value = true;
};
const handleOk = (_) => {
  if (!activeRow.value) return;
  renew({
    id: activeRow.value.id,
    days: reDays.value,
    price: activeRow.value.house.price,
  }).then((res) => {
    visible.value = false;
    message.success(`操作成功`);
    window.location.reload();
  });
};
</script>

<style>
</style>