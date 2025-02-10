<template>
  <div>
    {{ msg }}
  </div>
</template>

<script setup>
import { ref } from 'vue';

const msg = ref('这是msg');
</script>

<style scoped></style>
