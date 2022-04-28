<script setup lang="ts">
import Address from "comps/Address.vue";
const show = ref(false);
</script>
<template>
  <div>
    <van-button @click="show = true">span</van-button>
    <Address :show="show" @close="show = false" />
  </div>
</template>
<style lang="less" scoped></style>
