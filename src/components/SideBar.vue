<template>
  <NButton @click="fs.test">123</NButton>
</template>
<script lang="ts" setup>
import { NButton } from 'naive-ui';
import * as fs from '../utils/useFs';
</script>
