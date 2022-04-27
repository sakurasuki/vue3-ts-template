import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
/**
 * meta
 *@param keepAlive 是否开启缓存
 */
export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/home/index.vue"),
    meta: {
      title: "首页",
      keepAlive: true,
    },
  },
];
const files = import.meta.globEager("./modules/*.ts");
Object.values(files).forEach((key: any) => {
  if (key.default !== undefined && key.default instanceof Array) {
    key.default.forEach((item: RouteRecordRaw) => routes.push(item));
  } else routes.push(key.default);
});
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
