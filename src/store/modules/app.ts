import { defineStore } from 'pinia'
import { get, toast } from '@/utils'
import api from '@/api'
interface State {
  region: any[]
}
export const useStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: 'app',
  state: (): State => ({
    region: [] //省市区
  }),
  actions: {
    async GET_REGION() {
      if (this.region.length) return
      get(
        { url: api.app.region },
        {},
        ({ data }) => {
          this.region = data
        },
        ({ message }) => toast(message || '加载失败')
      )
    }
  }
})
