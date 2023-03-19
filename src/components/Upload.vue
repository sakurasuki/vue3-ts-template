<script setup lang="ts">
import { post, toast } from '@/utils'
import type { UploaderInstance } from 'vant'
import api from '@/api'
interface Props {
  limit?: number //限制上传数量
  maxSize?: number | string //限制文件大小
  disabled?: boolean //禁用上传
  readonly?: boolean //只读
  deletable?: boolean //显示删除按钮
}
const props = withDefaults(defineProps<Props>(), {
  limit: 1,
  maxSize: Infinity,
  deletable: true,
  disabled: false,
  readonly: false
})
const uploaderRef = ref<UploaderInstance>()
const emit = defineEmits(['success', 'remove'])
const fileList = ref([])
const afterRead = async (file: any) => {
  console.log(file)
  post(
    { url: api.app.file },
    {},
    ({ data }) => emit('success', data),
    ({ message }) => toast(message || '上传失败')
  )
}
const remove = (file: File) => {
  console.log(file)
}
</script>
<template>
  <div>
    <van-uploader ref="uploaderRef" :after-read="afterRead" @delete="remove" :deletable="deletable" :disabled="disabled" :readonly="readonly" :max-count="limit" v-model="fileList" :max-size="maxSize"> </van-uploader>
  </div>
</template>
<style lang="less" scoped></style>
