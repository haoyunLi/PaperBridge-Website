<script setup lang="ts">
import { computed, ref } from 'vue'
import { useReveal } from '../composables/useReveal'

const section = ref<HTMLElement | null>(null)
const activeMode = ref(0)
useReveal(section)

const modes = [
  {
    name: 'MinerU structure',
    tag: 'Optional · best reading order',
    image: '/images/screenshots/parsing-settings.jpg',
    alt: 'PaperBridge document parsing settings with MinerU and PDFKit fallback',
    text: 'MinerU runs locally to recognize sections, multi-column reading order, figures, tables, code, and formulas, then produces semantic Markdown and referenced assets.',
    details: ['Headings and outline', 'Images at reading position', 'Tables and reconstructed LaTeX', 'Reference-section detection'],
  },
  {
    name: 'PDFKit fallback',
    tag: 'Built in · no OCR model',
    image: '/images/screenshots/original-pdf.jpg',
    alt: 'PaperBridge exact original PDF displayed with PDFKit',
    text: 'Without MinerU, PaperBridge still keeps an exact native PDF view and page facsimiles. Existing selectable text can be translated without installing Python or OCR models.',
    details: ['Exact original pages', 'No parser download', 'Selectable embedded text', 'Visual formulas and figures preserved'],
  },
  {
    name: 'Local Ollama models',
    tag: 'Private · model-flexible',
    image: '/images/screenshots/model-settings.jpg',
    alt: 'PaperBridge model settings showing automatically detected local Ollama models',
    text: 'PaperBridge detects installed Ollama models and lets each task use a different one. TranslateGemma 4B is the lightweight default; larger models remain your choice.',
    details: ['Translation model', 'Summary model', 'Explanation model', 'Fast selected-text lookup'],
  },
]

const active = computed(() => modes[activeMode.value]!)
</script>

<template>
  <section id="local-pipeline" ref="section" class="pipeline-section reveal-section" aria-labelledby="pipeline-title">
    <div class="pipeline-heading">
      <p class="section-index">The local document pipeline</p>
      <h2 id="pipeline-title">Parse what matters.<br />Protect what must not change.</h2>
      <p>PaperBridge separates document structure from translatable language before any prompt reaches a model.</p>
    </div>

    <div class="pipeline-flow" aria-label="PaperBridge processing flow">
      <div><span>01</span><strong>Source PDF</strong><small>Always retained</small></div>
      <i aria-hidden="true"></i>
      <div><span>02</span><strong>MinerU or PDFKit</strong><small>Local parsing</small></div>
      <i aria-hidden="true"></i>
      <div><span>03</span><strong>Protected resources</strong><small>Images · tables · formulas</small></div>
      <i aria-hidden="true"></i>
      <div><span>04</span><strong>Ollama</strong><small>Text-only inference</small></div>
      <i aria-hidden="true"></i>
      <div><span>05</span><strong>Reader + Markdown</strong><small>Context restored</small></div>
    </div>

    <div class="pipeline-workbench">
      <div class="pipeline-modes" role="tablist" aria-label="Local pipeline modes">
        <button
          v-for="(mode, index) in modes"
          :key="mode.name"
          :class="{ active: activeMode === index }"
          type="button"
          role="tab"
          :aria-selected="activeMode === index"
          @click="activeMode = index"
        >
          <span>0{{ index + 1 }}</span><strong>{{ mode.name }}</strong><small>{{ mode.tag }}</small>
        </button>
      </div>

      <Transition name="paper-view" mode="out-in">
        <article :key="active.name" class="pipeline-detail">
          <div>
            <p>{{ active.tag }}</p>
            <h3>{{ active.name }}</h3>
            <p>{{ active.text }}</p>
            <ul><li v-for="detail in active.details" :key="detail">{{ detail }}</li></ul>
          </div>
          <figure>
            <img :src="active.image" :alt="active.alt" width="1400" height="1400" loading="lazy" />
            <figcaption>Configured inside PaperBridge · no cloud document upload</figcaption>
          </figure>
        </article>
      </Transition>
    </div>
  </section>
</template>
