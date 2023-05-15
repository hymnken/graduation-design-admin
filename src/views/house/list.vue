<template>
  <div>
    <div class="flex flex-end m-b-20">
      <a-button type="primary" v-permission="['sys_house']" @click="handleCreateHouse">新增民宿</a-button>
    </div>
    <div class="m-b-20"></div>
    <a-table :data-source="tableData" :pagination="false">
      <a-table-column key="id" title="民宿ID" data-index="id" />
      <a-table-column key="fullname" title="民宿全称" data-index="fullname" />
      <a-table-column key="house_type" title="民宿标签" data-index="house_type" width="120px" />
      <a-table-column key="street" title="地址" data-index="street" />
      <a-table-column key="mobile" title="联系方式" data-index="mobile" />
      <a-table-column key="rooms" title="房间总数" data-index="rooms" />
      <a-table-column key="surplus_rooms" title="今日剩余" data-index="surplus_rooms" />
      <a-table-column key="status" title="状态">
        <template #default="{ record }">
          <a-tag v-if="record.enable!=1" color="#ccc">已下架</a-tag>
          <a-tag v-else color="success">上架中</a-tag>
        </template>
      </a-table-column>
      <a-table-column key="action" title="操作">
        <template #default="{ record }">
          <a-button
            type="link"
            v-permission="['sys_house']"
            @click="handleHouseOff(record)"
          >{{ record.enable== 1 ? '下架' :'上架' }}</a-button>
          <a-button type="link" v-permission="['sys_house']" @click="handleShowLogDetail(record)">编辑</a-button>
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
    <a-modal
      @ok="handleSave"
      v-model:visible="showDetailModal"
      width="800px"
      :title="houseData.id ? '编辑民宿':'新增民宿'"
    >
      <a-form
        :model="houseData"
        name="basic"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="民宿全称"
          name="fullname"
          :rules="[{ required: true, message: '请输入民宿名称!' }]"
        >
          <a-input :maxlength="50" show-count v-model:value="houseData.fullname" />
        </a-form-item>
        <a-form-item label="民宿标签" name="house_type">
          <a-select ref="select" v-model:value="houseData.house_type">
            <a-select-option value="新房特惠">新房特惠</a-select-option>
            <a-select-option value="品牌民宿">品牌民宿</a-select-option>
            <a-select-option value="整套出租">整套出租</a-select-option>
            <a-select-option value="做饭方便">做饭方便</a-select-option>
            <a-select-option value="LOFT">LOFT</a-select-option>
            <a-select-option value="客栈">客栈</a-select-option>
            <a-select-option value="别墅">别墅</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="联系方式"
          name="mobile"
          :rules="[{ required: true, message: '请输入11位电话号码' }]"
        >
          <a-input :maxlength="11" show-count v-model:value="houseData.mobile" />
        </a-form-item>
        <a-form-item label="街道地址" name="street" :rules="[{ required: true, message: '请输入详细地址' }]">
          <a-input :maxlength="150" show-count v-model:value="houseData.street" />
        </a-form-item>
        <a-form-item label="房间总数" name="rooms" :rules="[{ required: true, message: '请输入大于0的整数' }]">
          <a-input :maxlength="2" show-count v-model:value="houseData.rooms" />
        </a-form-item>
        <a-form-item label="房间单价" name="price" :rules="[{ required: true, message: '请输入房间单价' }]">
          <a-input :maxlength="11" show-count v-model:value="houseData.price" />
        </a-form-item>
        <a-form-item label="封面主图" name="cover">
          <a-upload
            class="image-uploader"
            accept="image/png, image/jpeg"
            :maxCount="1"
            :showUploadList="false"
            :withCredentials="true"
            :action="uploadAction"
            @change="handleCoverChange"
          >
            <img v-if="houseData.cover" :src="houseData.cover" alt="avatar" />
            <div v-else>
              <icon icon="PlusOutlined" />
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item label="详细图片" name="cover">
          <div class="flex">
            <div
              v-for="item in houseImages"
              :key="item"
              class="img-item"
              @click="removeImageItem(item)"
            >
              <img :src="item" />
            </div>
            <a-upload
              class="image-uploader"
              accept="image/png, image/jpeg"
              :maxCount="1"
              :showUploadList="false"
              :withCredentials="true"
              :action="imageUploadAction"
              @change="handleImageChange"
            >
              <div>
                <icon icon="PlusOutlined" />
              </div>
            </a-upload>
          </div>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, computed } from "vue";
import { list, houseModify, imageList, houseOff } from "@/api/house";
import { message } from "ant-design-vue";
import config from "@/config";
import { useRouter } from "vue-router";
let houseImages = ref([]);
const uploadAction = config.baseUrl + "/admin/house/cover/upload";
const imageUploadAction = config.baseUrl + "/admin/house/images/upload";
const showDetailModal = ref(false);
const logDetail = ref("");
const router = useRouter();
const tableData = ref([]);
const tableCount = ref(0);
const pageIndex = ref(1);
const houseData = reactive({
  id: "",
  fullname: "",
  mobile: "",
  street: "",
  cover: "",
  price: "",
  rooms: "",
  enable: 1,
  house_type: "",
});
const handleCreateHouse = () => {
  const obj = {
    id: "",
    fullname: "",
    mobile: "",
    street: "",
    cover: "",
    price: "",
    rooms: "",
    enable: 1,
    house_type: "",
  };
  Object.keys(obj).forEach((k) => {
    houseData[k] = obj[k];
  });
  houseImages.value = [];
  showDetailModal.value = true;
};
const handleHouseOff = (row) => {
  console.log(
    "%c [ row ]-165",
    "font-size:13px; background:pink; color:#bf2c9f;",
    row
  );
  houseOff({
    id: row.id,
    enable: row.enable == 1 ? 0 : 1,
  }).then((res) => {
    message.success(`修改成功`);
    queryList();
  });
};
const handleSave = () => {
  houseModify({
    images: houseImages.value,
    house: houseData,
  }).then((res) => {
    showDetailModal.value = false;
    message.success(`保存成功`);
    queryList();
  });
};
const handleCoverChange = (e) => {
  let file = e.file;
  if (file.status == "done") {
    const res = file.response;
    if (res.code === 0) {
      houseData.cover = res.data.remote;
    }
  }
};
const removeImageItem = (item) => {
  const list = houseImages.value.filter((v) => v != item);
  houseImages.value = [].concat(list);
};
const handleImageChange = (e) => {
  let file = e.file;
  if (file.status == "done") {
    const res = file.response;
    if (res.code === 0) {
      // houseData.cover = res.data.remote;
      const src = res.data.remote;
      houseImages.value.push(src);
    }
  }
};
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
  Object.keys(row).forEach((k) => {
    houseData[k] = row[k];
  });
  imageList({ house_id: row.id }).then((res) => {
    let list = res || [];
    houseImages.value = list.map((v) => v.src);
  });
  showDetailModal.value = true;
};
</script>

<style lang="scss" >
.img-item {
  width: 88px;
  height: 88px;
  border-radius: 5px;
  margin-right: 5px;
  position: relative;
  cursor: pointer;
  > img {
    width: 88px;
    height: 88px;
    border-radius: 5px;
  }
  &::before {
    display: none;
    width: 88px;
    height: 88px;
    content: "删除";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: rgba($color: #000, $alpha: 0.5);
    color: #fff;
    line-height: 88px;
    text-align: center;
  }
  &:hover {
    &::before {
      display: block;
    }
  }
}
.image-uploader {
  .ant-upload {
    width: 88px;
    height: 88px;
    background-color: #eee;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    img {
      width: 88px;
      height: 88px;
      border-radius: 5px;
    }
  }
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
}
</style>