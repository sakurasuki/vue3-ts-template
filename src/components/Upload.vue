<script setup lang="ts">
import { formData, toast } from "@/utils";
import type { UploaderInstance } from "vant";
import type { PropType } from "vue";
import api from "@/api";
const {
  limit = 1,
  maxSize = Infinity,
  deletable = true,
  disabled = false,
  readonly = false,
} = defineProps<{
  limit?: number; //限制上传数量
  maxSize?: number | string; //限制文件大小
  disabled?: boolean; //禁用上传
  readonly?: boolean; //只读
  deletable?: boolean; //显示删除按钮
}>();

const uploaderRef = ref<UploaderInstance>();
const emit = defineEmits(["success", "remove"]);
const fileList = ref([]);
const afterRead = async (file: any) => {
  console.log(file);
  const { code, data, msg } = await formData(api.app.upload, { file: file.file });
  if (code == 200) emit("success", data);
  else toast(msg || "上传失败");
};
const remove = (file: File) => {
  console.log(file);
};
</script>
<template>
  <div>
    <van-uploader ref="uploaderRef" :after-read="afterRead" @delete="remove" :deletable="deletable" :disabled="disabled" :readonly="readonly" :max-count="limit" v-model="fileList" :max-size="maxSize">
    </van-uploader>
  </div>
</template>
<style lang="less" scoped></style>
