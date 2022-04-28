import { defineStore } from "pinia";
import { get, toast } from "@/utils";
import api from "@/api";
export interface Area {
  title: string;
  parentCode: string;
  id: string;
  children: Array<Area>;
  [key: string | number]: any;
}
export const useStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: "app",
  state: (): { region: Array<Area> } => ({
    region: [], //省市区
  }),
  actions: {
    async GET_REGION() {
      if (this.region.length) return;
      try {
        const { data, msg, code } = await get<Area[]>(api.app.region, {}, true);
        if (code === 200) this.region = data;
        else toast(msg || "加载失败");
      } catch (error) {
        console.log(error);
      }
    },
  },
});
