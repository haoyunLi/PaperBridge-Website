<script setup lang="ts">
withDefaults(defineProps<{ compact?: boolean }>(), { compact: false })
</script>

<template>
  <a class="brand" href="#top" aria-label="PaperBridge home">
    <svg class="brand-symbol" viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="11" />
      <path d="M9 12.5h9.2c2.3 0 4.1.7 5.8 2.2 1.7-1.5 3.5-2.2 5.8-2.2H31v16.1h-1.2c-2.3 0-4.3.7-5.8 2.1-1.5-1.4-3.5-2.1-5.8-2.1H9V12.5Z" />
      <path d="M24 15v15M12.5 17h6M12.5 21h6M27.5 17h-1M27.5 21h-1" />
    </svg>
    <span v-if="!compact">PaperBridge</span>
  </a>
</template>
