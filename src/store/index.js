import { createStore } from "vuex";

const files = import.meta.globEager('./modules/**/*.js');
const modules = {};

Object.keys(files).forEach((key) => {
  modules[key.replace('modules/', '').replace('modules\\', '').replace(/(\.\/|\.js)/g, "")] = files[key].default;
});
Object.keys(modules).forEach((key) => {
  modules[key]["namespaced"] = true;
});
const store = createStore({
  modules
})
export default store;