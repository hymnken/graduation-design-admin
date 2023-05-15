<template>
  <div class="flex">
    <a-form
      :model="roleState"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      @submit="handleSubmit"
      autocomplete="off"
    >
      <a-form-item label="角色名" name="name">
        <a-input v-model:value="roleState.name" />
      </a-form-item>
      <a-form-item label="角色描述" name="intro">
        <a-input v-model:value="roleState.intro" />
      </a-form-item>
      <a-form-item label="权限">
        <div class="m-t-34">
          <div class v-for="group in permissions">
            <a-checkbox
              v-model:checked="group.checkAll"
              :indeterminate="group.indeterminate"
              @change="onCheckAllChange(group)"
            >{{group.label}}</a-checkbox>
            <div class="p-l-40 m-t-10">
              <a-checkbox-group
                v-model:value="group.checked"
                @change="handleOptionChange(group)"
                :options="group.children"
              />
            </div>
            <a-divider />
          </div>
        </div>
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">保存</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { permissionList, roleDetail, roleModify } from "@/api/user";
import { useRoute, useRouter } from "vue-router";
import { message } from "ant-design-vue";
const route = useRoute();
const router = useRouter();
const roleState = reactive({
  id: "",
  name: "",
  intro: "",
  permissions: [],
});
const permissions = ref([]);
const checked = ref([]);
onMounted(() => {
  if (route.query.id) {
    roleDetail({ id: route.query.id }).then((res) => {
      for (let k of ["id", "name", "intro", "permissions"]) {
        roleState[k] = res[k];
      }
      permissionList().then((res) => {
        if (res && res.length) {
          let obj = {};
          res.map((v) => {
            const module = v.module;
            if (!obj[module])
              obj[module] = {
                label: module,
                checkAll: false,
                children: [],
                checked: [],
                indeterminate: false,
              };
            obj[module]["children"].push({
              label: v.name,
              value: v.id,
            });
            if (roleState.permissions.includes(v.id)) {
              obj[module]["checked"].push(v.id);
            }
            if (
              obj[module]["checked"].length == obj[module]["children"].length
            ) {
              obj[module]["checkAll"] = true;
            } else {
              obj[module]["checkAll"] = false;
            }
          });
          permissions.value = Object.values(obj);
        }
      });
    });
  }
});

const onCheckAllChange = (e) => {
  e.indeterminate = false;
  if (e.checkAll) {
    let checked = e.children.map((v) => v.value);
    e.checked = checked;
  } else {
    e.checked = [];
  }
};

const handleOptionChange = (e) => {
  if (e.checked.length == e.children.length) {
    e.indeterminate = false;
    e.checkAll = true;
  } else {
    e.checkAll = false;
    if (e.checked.length > 0) {
      e.indeterminate = true;
    }
  }
};

const handleSubmit = (e) => {
  const items = permissions.value;
  const ids = items.map((v) => {
    return [...v.checked];
  });
  roleState.permissions = ids.flat();
  roleModify(roleState).then((res) => {
    message.success(`保存成功`);
  });
};
</script>

<style>
</style>