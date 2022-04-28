<script setup lang="ts">
import { useStore, Area } from "@/store/modules/app";
const store = useStore();
const props = defineProps<{ show: boolean }>();
watch(
  () => props.show,
  (n) => {
    n && store.GET_REGION();
  }
);
const emit = defineEmits(["close"]);
const onConfirm = (arr: Area[]) => {
  console.log(arr);
  emit("close");
};
</script>
<template>
  <van-popup v-model:show="props.show" position="bottom">
    <van-picker title="标题" :columns="store.region" :columns-field-names="{ text: 'title' }" @confirm="onConfirm" @cancel="emit('close')" />
  </van-popup>
</template>
<style lang="less" scoped></style>
