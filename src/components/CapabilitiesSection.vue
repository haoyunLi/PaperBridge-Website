<script setup lang="ts">
import { ref } from 'vue'

const active = ref(0)

const capabilities = [
  {
    title: 'Read without losing context',
    summary: 'Original and translated paragraphs stay in one continuous scholarly reading flow.',
    detail: 'Switch among exact PDF pages, a bilingual reader, whole-paper summaries, and a connected full translation. Headings, captions, equations, and figures remain part of the argument.',
    tags: ['Bilingual sequence', 'PDF preview', 'Full translation', 'Resume reading'],
  },
  {
    title: 'Ask the exact phrase',
    summary: 'Select a word or passage and get an answer scoped to that selection.',
    detail: 'Translate only the highlighted phrase, request a plain-language explanation, add a note, save a highlight, or bookmark the paragraph. The same tools work in Reader, Summary, Paper, and Full Translation.',
    tags: ['Selection translation', 'Explain simply', 'Highlights', 'Notes'],
  },
  {
    title: 'Choose models for your Mac',
    summary: 'PaperBridge discovers local Ollama models instead of forcing a single configuration.',
    detail: 'Use TranslateGemma 4B on lighter machines, a larger translation model when memory permits, and separate models for summary and explanation. Model choices remain local and editable.',
    tags: ['Auto-detection', 'TranslateGemma', 'Separate roles', 'Retry failures'],
  },
  {
    title: 'Export a real document',
    summary: 'Take the paper out of the app with its structure and resources intact.',
    detail: 'Export bilingual Markdown, connected full translation, summaries, and analysis. Structured exports keep references to original figures, tables, and other local assets.',
    tags: ['Markdown bundle', 'Image assets', 'Translated captions', 'Portable output'],
  },
]
</script>

<template>
  <section id="capabilities" class="capabilities-section" aria-labelledby="capabilities-title">
    <header>
      <h2 id="capabilities-title">Built for the moments<br />where reading <em>slows down.</em></h2>
      <p>PaperBridge connects close reading, local models, and faithful document output instead of treating them as separate tools.</p>
    </header>

    <div class="capabilities-layout">
      <div class="capability-index" role="tablist" aria-label="PaperBridge capability areas">
        <button
          v-for="(capability, index) in capabilities"
          :key="capability.title"
          :class="{ active: active === index }"
          type="button"
          role="tab"
          :aria-selected="active === index"
          @click="active = index"
        >
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <p><b>{{ capability.title }}</b><small>{{ capability.summary }}</small></p>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 7 7-7 7" /></svg>
        </button>
      </div>

      <Transition name="capability-swap" mode="out-in">
        <article :key="active" class="capability-focus">
          <span>{{ String(active + 1).padStart(2, '0') }}</span>
          <h3>{{ capabilities[active]!.title }}</h3>
          <p>{{ capabilities[active]!.detail }}</p>
          <div><small v-for="tag in capabilities[active]!.tags" :key="tag">{{ tag }}</small></div>
        </article>
      </Transition>
    </div>
  </section>
</template>
