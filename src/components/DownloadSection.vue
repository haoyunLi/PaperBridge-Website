<script setup lang="ts">
import { ref } from 'vue'
import { useReveal } from '../composables/useReveal'

const section = ref<HTMLElement | null>(null)
useReveal(section)
</script>

<template>
  <section id="download" ref="section" class="download-section reveal-section" aria-labelledby="download-title">
    <div class="download-brand-shape" aria-hidden="true"><span></span><span></span><i></i></div>
    <div class="download-copy">
      <h2 id="download-title">Bring every<br />paper closer.</h2>
      <p>Read across languages. Keep the science intact.<br />Stay in control of your work.</p>
      <a class="button button-primary large" href="https://github.com/haoyunLi/PaperBridge/releases/latest">
        Download for macOS <span aria-hidden="true">→</span>
      </a>
      <a class="source-link" href="https://github.com/haoyunLi/PaperBridge" target="_blank" rel="noreferrer">View source on GitHub ↗</a>
      <small>macOS 14 or later · Apple Silicon and Intel · Local AI with Ollama</small>
    </div>
    <div class="windows-panel">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4.5 10.5 3v8.2H3V4.5Zm8.6-1.7L21 1.5v9.7h-9.4V2.8ZM3 12.3h7.5v8.2L3 19v-6.7Zm8.6 0H21v9.8l-9.4-1.4v-8.4Z" /></svg>
      <h3>PaperBridge for Windows</h3>
      <p>Coming soon</p>
      <button type="button" disabled>Windows download</button>
      <small>We are adapting the local toolchain and document renderer for Windows.</small>
    </div>
  </section>
</template>
