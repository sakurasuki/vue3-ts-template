<script setup lang="ts">
import Address from "comps/Address.vue";
import Upload from "comps/Upload.vue";
const show = ref(false);
const list = ref([]);
</script>
<template>
  <div>
    <van-button @click="show = true">span</van-button>
    <Upload :limit="2" :fileList="list" />
    <Address :show="show" @close="show = false" />
  </div>
</template>
<style lang="less" scoped></style>
