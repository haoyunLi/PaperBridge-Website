<script setup lang="ts">
import { computed, ref } from 'vue'
import { useReveal } from '../composables/useReveal'

const section = ref<HTMLElement | null>(null)
const stage = ref<HTMLElement | null>(null)
const activeIndex = ref(0)
useReveal(section)

const features = [
  {
    title: 'Structured bilingual reading',
    kicker: 'Read in context',
    description: 'MinerU reconstructs headings and reading order, then keeps each source passage beside its translation.',
    image: '/images/screenshots/bilingual-paper.jpg',
    alt: 'Structured bilingual paper in PaperBridge with section outline',
    points: ['Section outline navigation', 'Original and translation stay together', 'Reading position restores automatically'],
  },
  {
    title: 'Exact-source verification',
    kicker: 'Trust, then verify',
    description: 'Switch to the native PDFKit view whenever layout, typography, figures, or a scientific claim needs checking.',
    image: '/images/screenshots/original-pdf.jpg',
    alt: 'Exact original PDF displayed in PaperBridge with PDFKit',
    points: ['Byte-for-byte source PDF retained', 'Original, bilingual, and translation views', 'No OCR required for visual preservation'],
  },
  {
    title: 'Figures stay in place',
    kicker: 'Translate the caption, not the evidence',
    description: 'Original figures are preserved at their MinerU reading position while captions can be translated separately.',
    image: '/images/screenshots/figure-caption.jpg',
    alt: 'PaperBridge full translation preserving a scientific figure and translating its caption',
    points: ['Original image remains untouched', 'Caption translation stays adjacent', 'Referenced assets export with Markdown'],
  },
  {
    title: 'Tables and formulas are protected',
    kicker: 'Scientific structure first',
    description: 'Tables, standalone formulas, code, units, and image paths are excluded from ordinary paragraph translation.',
    image: '/images/screenshots/table-preserved.jpg',
    alt: 'A scientific table preserved in a PaperBridge translated paper',
    points: ['Tables retain rows and columns', 'LaTeX remains LaTeX', 'Only surrounding prose is translated'],
  },
  {
    title: 'Select, translate, explain',
    kicker: 'Research tools where you read',
    description: 'Select an exact word or passage for a focused translation or plain-language explanation, then highlight or annotate it.',
    image: '/images/screenshots/selection-tools.jpg',
    alt: 'PaperBridge selection inspector translating a highlighted academic term',
    points: ['Exact selection, not the whole paragraph', 'Translate or explain locally', 'Three-color highlights, notes, and bookmarks'],
  },
  {
    title: 'Connected full translation',
    kicker: 'A second reading mode',
    description: 'Create a continuous translated document for flow while retaining section structure and protected resources.',
    image: '/images/screenshots/connected-translation.jpg',
    alt: 'PaperBridge connected full-paper translation view',
    points: ['Whole-paper context across batches', 'Inline failure markers instead of crashes', 'Standalone translated Markdown output'],
  },
  {
    title: 'Local AI setup inside the app',
    kicker: 'No Terminal required',
    description: 'Install or connect Ollama, download TranslateGemma 4B, and add optional MinerU without leaving PaperBridge.',
    image: '/images/screenshots/local-ai-setup.jpg',
    alt: 'PaperBridge local setup page for Ollama, TranslateGemma 4B, and MinerU',
    points: ['Automatic status and model detection', 'Task-specific model selection', 'PDFKit fallback when MinerU is absent'],
  },
]

const active = computed(() => features[activeIndex.value]!)

function moveStage(event: MouseEvent) {
  if (!stage.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const bounds = stage.value.getBoundingClientRect()
  const x = (event.clientX - bounds.left) / bounds.width - 0.5
  const y = (event.clientY - bounds.top) / bounds.height - 0.5
  stage.value.style.setProperty('--tour-x', `${x * 8}px`)
  stage.value.style.setProperty('--tour-y', `${y * 8}px`)
}

function resetStage() {
  stage.value?.style.setProperty('--tour-x', '0px')
  stage.value?.style.setProperty('--tour-y', '0px')
}
</script>

<template>
  <section id="tour" ref="section" class="product-tour reveal-section" aria-labelledby="tour-title">
    <div class="tour-heading">
      <p class="section-index">Real app · real local workflow</p>
      <h2 id="tour-title">Seven ways to stay<br />inside the paper.</h2>
      <p>Every screen below comes from the running macOS app, not a marketing mockup.</p>
    </div>

    <div class="tour-layout">
      <nav class="tour-navigation" aria-label="PaperBridge product tour">
        <button
          v-for="(feature, index) in features"
          :key="feature.title"
          :class="{ active: activeIndex === index }"
          type="button"
          @click="activeIndex = index"
        >
          <span>0{{ index + 1 }}</span>
          <strong>{{ feature.title }}</strong>
          <i aria-hidden="true">↗</i>
        </button>
      </nav>

      <div class="tour-content">
        <div class="tour-copy" aria-live="polite">
          <p>{{ active.kicker }}</p>
          <h3>{{ active.title }}</h3>
          <p>{{ active.description }}</p>
          <ul><li v-for="point in active.points" :key="point">{{ point }}</li></ul>
        </div>

        <div ref="stage" class="tour-stage" @mousemove="moveStage" @mouseleave="resetStage">
          <Transition name="tour-shot" mode="out-in">
            <figure :key="active.image">
              <img :src="active.image" :alt="active.alt" width="1400" height="1400" loading="lazy" />
              <figcaption><span>Actual PaperBridge screen</span><b>0{{ activeIndex + 1 }} / 07</b></figcaption>
            </figure>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>
