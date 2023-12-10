<template>
  <a-config-provider
      :theme="{
      algorithm: theme.darkAlgorithm,
    }"
  >
    <a-button />
  </a-config-provider>
</template>

<script setup>
import { theme } from 'ant-design-vue';
</script>