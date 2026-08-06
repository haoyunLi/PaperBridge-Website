<script setup lang="ts">
import { ref } from 'vue'
import { useReveal } from '../composables/useReveal'

const section = ref<HTMLElement | null>(null)
const active = ref(0)
useReveal(section)

const capabilities = [
  {
    title: 'Document fidelity',
    detail: 'Keep source material where it belongs.',
    items: ['Exact PDF page preview', 'MinerU structured Markdown', 'Figures and tables preserved', 'LaTeX formulas unchanged', 'Reference section skipped automatically'],
  },
  {
    title: 'Research tools',
    detail: 'Work directly with the passage you are reading.',
    items: ['Selected-word translation', 'Plain-language explanation', 'Highlights and notes', 'Paragraph bookmarks', 'Search and resume'],
  },
  {
    title: 'Reading outputs',
    detail: 'Move from close reading to the whole argument.',
    items: ['Aligned bilingual paragraphs', 'English whole-paper summary', 'Chinese whole-paper summary', 'Connected full translation', 'Markdown bundle with images'],
  },
  {
    title: 'Local engines',
    detail: 'Use the models that fit your Mac.',
    items: ['Automatic Ollama model detection', 'TranslateGemma defaults', 'In-app local tool setup', 'MinerU when available', 'PDFKit visual fallback'],
  },
]
</script>

<template>
  <section ref="section" class="capabilities-section reveal-section" aria-labelledby="capabilities-title">
    <div class="capabilities-intro"><p class="section-index">Everything in context</p><h2 id="capabilities-title">One paper.<br />Four ways deeper.</h2><p>The website demo mirrors the real app. Nothing here depends on uploading a paper to a cloud service.</p></div>
    <div class="capability-list">
      <button v-for="(capability, index) in capabilities" :key="capability.title" :class="{ active: active === index }" type="button" @click="active = index"><span>0{{ index + 1 }}</span><strong>{{ capability.title }}</strong><small>{{ capability.detail }}</small><i>↗</i></button>
    </div>
    <Transition name="paper-view" mode="out-in"><div :key="active" class="capability-detail"><p>{{ capabilities[active]!.title }}</p><ul><li v-for="item in capabilities[active]!.items" :key="item">{{ item }}</li></ul></div></Transition>
  </section>
</template>
