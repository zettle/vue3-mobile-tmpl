<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
defineProps({
  msg: { type: String, default: '' }
});
</script>
