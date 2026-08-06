<script setup lang="ts">
withDefaults(defineProps<{ compact?: boolean }>(), { compact: false })
</script>

<template>
  <a class="brand" href="#top" aria-label="PaperBridge home">
    <img src="/images/paperbridge-icon.png" alt="" />
    <span v-if="!compact">PaperBridge</span>
  </a>
</template>
