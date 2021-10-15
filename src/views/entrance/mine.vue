<template>
  <app-layout>
    mine index
    <hello-world></hello-world>
  </app-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import helloWorld from '@/components/hello-world.vue';
export default defineComponent({
  components: {
    helloWorld
  }
});
</script>
