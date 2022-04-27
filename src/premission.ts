import router from "@/router";
import base from "@/base";
const whiteList = ["login", "notPage"]; // 白名单

router.beforeEach((to, form, next) => {
  const title: any = to.meta?.title || "xxx";
  document.getElementsByTagName("title")[0].innerHTML = title;
  const hasToken = !!sessionStorage.getItem(base.tokenKey);
  if (!whiteList.includes(to.name as string) && !hasToken) next({ name: "login" });
  else next();
});
