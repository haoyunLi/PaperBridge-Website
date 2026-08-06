<script setup lang="ts">
import { ref } from 'vue'
import { useReveal } from '../composables/useReveal'

const section = ref<HTMLElement | null>(null)
useReveal(section)

const questions = [
  {
    question: 'Does PaperBridge upload my papers?',
    answer: 'No. PDF parsing, translation, summary, explanation, caching, and export run on your Mac. Model requests go only to the local Ollama API you control.',
  },
  {
    question: 'Do I need MinerU?',
    answer: 'No. MinerU is optional and adds semantic reading order, headings, tables, figures, and reconstructed LaTeX. PDFKit fallback is built into macOS and always preserves an exact visual copy without OCR models.',
  },
  {
    question: 'Which local model should I use?',
    answer: 'TranslateGemma 4B is the lightweight default for translation and works well on many Macs. PaperBridge automatically detects your Ollama library, so summary, explanation, and quick lookup can use other installed models such as Gemma.',
  },
  {
    question: 'What can I export?',
    answer: 'Export original, translated, bilingual, full-translation, and analysis Markdown. Structured exports include referenced images and other local assets so the document remains portable.',
  },
  {
    question: 'What happens when one paragraph fails?',
    answer: 'PaperBridge marks that block inline and continues the rest of the paper. You can retry failed paragraphs or edit, split, merge, and reflow blocks manually.',
  },
  {
    question: 'Is there a Windows version?',
    answer: 'The native macOS app is available first. A Windows version is planned and currently marked as coming soon.',
  },
]
</script>

<template>
  <section ref="section" class="faq-section reveal-section" aria-labelledby="faq-title">
    <div class="faq-heading">
      <p class="section-index">Before you download</p>
      <h2 id="faq-title">Local means<br />you stay in control.</h2>
      <p>Clear answers about parsing, models, files, and platform support.</p>
    </div>
    <div class="faq-list">
      <details v-for="(item, index) in questions" :key="item.question" :open="index === 0">
        <summary><span>0{{ index + 1 }}</span><strong>{{ item.question }}</strong><i aria-hidden="true">＋</i></summary>
        <p>{{ item.answer }}</p>
      </details>
    </div>
  </section>
</template>
