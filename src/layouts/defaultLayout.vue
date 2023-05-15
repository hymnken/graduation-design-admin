<template>
  <a-layout style="min-height: 100vh" class="lay-container">
    <a-layout-sider v-model:collapsed="collapsed" theme="dark" collapsible>
      <div class="logo" :class="{ fold: collapsed }">{{ config.siteName }}</div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <template v-for="item in menuTree">
          <a-sub-menu :key="item.name || item.path" v-if="item">
            <template #title v-if="item">
              <icon class="m-r-5" v-if="item.meta && item.meta.icon" :icon="item.meta.icon"></icon>
              <span v-show="!collapsed">{{ item.meta.title || '' }}</span>
            </template>
            <template v-if="item.children">
              <template v-for="subItem in item.children">
                <a-menu-item
                  v-if="subItem"
                  :key="subItem.name || subItem.path"
                  @click="goto(subItem)"
                >
                  {{
                  subItem.meta.title || ''
                  }}
                </a-menu-item>
              </template>
            </template>
          </a-sub-menu>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout class="layout-content">
      <a-layout-header class="flex flex-end" style="background: #fff; padding: 0">
        <div class="flex flex-end m-r-20 z-10">
          <img :src="userInfo.avatar" v-avatar class="width-40 circle" alt />
          <a-button
            class="m-l-8"
            type="link"
            @click="goto({ name: 'profile' })"
          >{{ userInfo.nickname || '管理员' }}</a-button>
          <a href="###" @click="handleLogout" class="m-l-20 ft-12">退出登录</a>
        </div>
      </a-layout-header>
      <a-layout-content style="padding: 0 16px">
        <a-breadcrumb style="margin: 16px 0" :routes="breadcrumbRoutes">
          <template #itemRender="{ route, paths }">
            <icon v-if="route.meta.icon" :icon="route.meta.icon" class="m-r-2" />
            <span>{{ route.meta.title }}</span>
          </template>
        </a-breadcrumb>
        <div class="layout-main scroll">
          <router-view />
        </div>
      </a-layout-content>
      <!-- <a-layout-footer style="text-align: center">Ant Design ©2018 Created by Ant UED</a-layout-footer> -->
    </a-layout>
  </a-layout>
</template>
<script setup>
import { ref, computed, watch, provide } from "vue";
import { useRouter, useRoute } from "vue-router";
import { UserOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { isOverlap } from "@/utils";
import config from "../config";
const store = useStore();
const oldFold = localStorage.getItem("menu_collapsed");
const collapsed = ref(oldFold == 1 ? true : false);
const selectedKeys = ref(["1"]);
const router = useRouter();
const route = useRoute();
const appRoutes = computed(() => {
  return router.getRoutes().find((el) => el.name === "root");
});
const userInfo = computed(() => {
  return store.getters["user/userInfo"];
});

provide("userInfo", userInfo);
const breadcrumbRoutes = computed(() => {
  const list = route.matched.filter((v) => {
    if (v.name !== "root" && !v.meta.hideInNav) {
      v.children = null;
      return v;
    }
  });
  return list;
});
const permissions = computed(() => {
  return store.getters["user/permissions"];
});
const menuTree = computed(() => {
  const router = [...appRoutes.value.children];
  let userPermissions = permissions.value;
  router.sort((a, b) => {
    return (a.meta.order || 0) - b.meta.order;
  });
  function travel(_routes, layer) {
    if (!_routes) return null;
    const collector = _routes.map((ele) => {
      // TODO: 权限验证
      let routeAuth = ele.meta.auth || ["*"];
      if (userPermissions.includes("*") || routeAuth.includes("*")) {
      } else {
        if (!isOverlap(routeAuth, userPermissions)) {
          return null;
        }
      }
      // if (!PermissionStatus.accessRouter(ele)) {
      //   return null
      // }
      if (!ele.children) {
        return ele;
      }
      ele.children = ele.children.filter((v) =>
        !v ? false : !v.meta || !v.meta.hideInMenu
      );
      const subItem = travel(ele.children, layer);
      if (subItem.length) {
        ele.children = subItem;
        return ele;
      }
      if (layer > 1) {
        ele.children = subItem;
        return ele;
      }
      if (!ele.meta || !ele.meta.hideInMenu) {
        return ele;
      }
      return null;
    });
    return collector;
  }
  return travel(router, 0);
});

const goto = (route) => {
  router.push({
    name: route.name,
  });
};
watch(collapsed, (val) => {
  localStorage.setItem("menu_collapsed", val ? 1 : 0);
});
watch(
  () => route,
  (newRoute) => {
    const key = newRoute.matched[2] ? newRoute.matched[2]["name"] : "";
    selectedKeys.value = [key];
  },
  {
    immediate: true,
    deep: true,
  }
);

const handleLogout = (_) => {
  store.dispatch("user/logout").then((res) => {
    router.replace({ name: "login" });
  });
};
</script>
<style lang="scss" >
.lay-container {
  position: relative;

  &::before {
    content: "";
    display: block;
    position: absolute;
    height: 66px;
    min-width: 100%;
    top: -2px;
    left: -2px;
    right: -2px;
    // background: linear-gradient(
    //   180deg,
    //   rgba($color-primary, 0.72),
    //   rgba($color-primary, 0)
    // );
    z-index: 9;
  }
}

.z-10 {
  position: relative;
  z-index: 10;
}

.logo {
  height: 34px;
  margin: 16px;
  line-height: 32px;
  text-align: center;
  // color: $color-primary;
  color: #fff;
  font-size: 22px;
  font-weight: bold;
  /* background: rgba(0, 0, 0, 0.5); */
  background-color: transparent;
  // box-shadow: 2px 2px 2px rgba(#000, 0.1);

  &.fold {
    font-size: 14px;
    height: 40px;
    line-height: 14px;
    padding: 5px 10px;
  }
}

.site-layout .site-layout-background {
  background: #2b2f3a;
  // background: #fff;
}

.layout-content {
  /* flex: 1 !important; */
  flex-grow: 1 !important;
  overflow: hidden;
}

.layout-main {
  width: 100%;
  padding: 0;
  background-color: #fff;
  min-height: 500px;
  height: calc(100vh - 22px - 32px - 64px);
  overflow: auto;
  overflow: overlay;
  padding: 20px;
}
.ant-menu {
  background: #2b2f3a;
}
</style>