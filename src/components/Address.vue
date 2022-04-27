<script setup lang="ts">
import { get } from "@/utils";
import api from "@/api";
defineProps<{ show: boolean }>();
interface Area {
  name: string;
  parentCode: string;
  provinceCode: string;
  provinceName: string;
  code: string;
  children: Array<Area>;
  [key: string | number]: any;
}
const columns = ref<Area[]>([]);
const customFieldName = {
  text: "title",
  children: "children",
};
(async () => {
  try {
    const { data, msg, code } = await get<Area[]>(api.region);
    if (code === 200) columns.value = data;
    return Promise.resolve();
  } catch (error) {
    console.log(error);
  }
})();

const onConfirm = (e: any) => {
  console.log(e);
};
const onChange = (e: any) => {
  console.log(e);
};
</script>
<template>
  <van-popup v-model:show="show" position="bottom">
    <van-picker title="标题" :columns="columns" :columns-field-names="customFieldName" @confirm="onConfirm" @change="onChange" />
  </van-popup>
</template>
<style lang="less" scoped></style>
