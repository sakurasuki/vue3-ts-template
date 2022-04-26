import { defineStore } from "pinia";
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
interface State {
  searchPhone: string;
  changePhone: Boolean;
}
export const useStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: "store",
  state: (): State => ({
    searchPhone: sessionStorage.getItem("phone") || "18565338418" || "",
    changePhone: false,
  }),
  actions: {
    SET_SEARCH_PHONE(val: string) {
      this.searchPhone = val;
    },
  },
});
