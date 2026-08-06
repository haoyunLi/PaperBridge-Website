<script setup lang="ts">
import { ref } from 'vue'
import { useReveal } from '../composables/useReveal'

const section = ref<HTMLElement | null>(null)
useReveal(section)
</script>

<template>
  <section id="privacy" ref="section" class="privacy-section reveal-section" aria-labelledby="privacy-title">
    <div class="privacy-mark" aria-hidden="true"><span></span><span></span><i></i></div>
    <div class="privacy-copy">
      <p class="section-index">Local by design</p>
      <h2 id="privacy-title">Your paper never leaves your Mac.</h2>
      <p>PDFs, translations, summaries, highlights, and model conversations stay on your device. PaperBridge talks only to tools you run locally.</p>
    </div>
    <div class="privacy-points">
      <div><b>100% local</b><span>Ollama runs the language models on your machine.</span></div>
      <div><b>Private by default</b><span>No account, paper upload, analytics, or tracking.</span></div>
      <div><b>Open and inspectable</b><span>The app source is available on GitHub.</span></div>
    </div>
  </section>
</template>
