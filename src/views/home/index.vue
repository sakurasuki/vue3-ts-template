<script setup lang="ts">
import Address from "comps/Address.vue";
const show = ref(false);
</script>
<template>
  <div>
    <van-button @click="show = true">显示</van-button>
    <Address :show="show" />
  </div>
</template>
<style lang="less" scoped></style>
