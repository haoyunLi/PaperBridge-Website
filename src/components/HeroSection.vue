<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const visual = ref<HTMLElement | null>(null)
const activeShot = ref(0)
let shotTimer: number | undefined

const shots = [
  {
    label: 'Bilingual paper',
    eyebrow: 'MinerU reading view',
    image: '/images/screenshots/bilingual-paper.jpg',
    alt: 'PaperBridge showing a structured bilingual academic paper with its outline',
  },
  {
    label: 'Select & understand',
    eyebrow: 'Translation · explanation · notes',
    image: '/images/screenshots/selection-tools.jpg',
    alt: 'PaperBridge translating a selected term and showing research annotation tools',
  },
  {
    label: 'Set up locally',
    eyebrow: 'Ollama · TranslateGemma · MinerU',
    image: '/images/screenshots/local-ai-setup.jpg',
    alt: 'PaperBridge local AI setup for Ollama, TranslateGemma and MinerU',
  },
]

function selectShot(index: number) {
  activeShot.value = index
  startRotation()
}

function startRotation() {
  window.clearInterval(shotTimer)
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  shotTimer = window.setInterval(() => {
    activeShot.value = (activeShot.value + 1) % shots.length
  }, 5200)
}

function pauseRotation() {
  window.clearInterval(shotTimer)
}

function tilt(event: MouseEvent) {
  if (!visual.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const bounds = visual.value.getBoundingClientRect()
  const x = (event.clientX - bounds.left) / bounds.width - 0.5
  const y = (event.clientY - bounds.top) / bounds.height - 0.5
  visual.value.style.setProperty('--tilt-x', `${y * -1.2}deg`)
  visual.value.style.setProperty('--tilt-y', `${x * 1.8}deg`)
}

function resetTilt() {
  visual.value?.style.setProperty('--tilt-x', '0deg')
  visual.value?.style.setProperty('--tilt-y', '0deg')
  startRotation()
}

onMounted(startRotation)
onBeforeUnmount(() => window.clearInterval(shotTimer))
</script>

<template>
  <section id="top" class="hero" aria-labelledby="hero-title">
    <div class="hero-copy">
      <p class="hero-kicker"><span></span> Native macOS · local-first</p>
      <h1 id="hero-title">Read the paper.<br />Keep the meaning.</h1>
      <p>
        Translate, summarize, and explain academic papers with local AI, while figures,
        formulas, tables, and the exact source PDF stay intact.
      </p>
      <div class="hero-actions">
        <a class="button button-primary" href="https://github.com/haoyunLi/PaperBridge/releases/latest">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M16.9 13.5c0-2.8 2.3-4.2 2.4-4.3a5.2 5.2 0 0 0-4.1-2.2c-1.7-.2-3.4 1-4.3 1s-2.3-1-3.8-1c-2 0-3.8 1.2-4.8 3-2.1 3.7-.5 9.1 1.5 12 .9 1.4 2.1 3 3.6 2.9 1.5-.1 2.1-1 3.9-1 1.8 0 2.3 1 3.9 1 1.6 0 2.6-1.4 3.5-2.8a13 13 0 0 0 1.6-3.3 5.1 5.1 0 0 1-3.4-5.3ZM14 5.2A5 5 0 0 0 15.2 1a5.1 5.1 0 0 0-3.4 1.7 4.7 4.7 0 0 0-1.3 3.5A4.3 4.3 0 0 0 14 5.2Z" />
          </svg>
          Download for macOS
        </a>
        <a class="button button-ghost" href="#tour">See the real app <span aria-hidden="true">↓</span></a>
      </div>
      <p class="availability"><span></span> Windows version coming soon</p>
    </div>

    <div class="hero-product">
      <div
        ref="visual"
        class="hero-visual hero-screenshot-stage"
        aria-live="polite"
        @mousemove="tilt"
        @mouseenter="pauseRotation"
        @mouseleave="resetTilt"
      >
        <Transition name="hero-shot" mode="out-in">
          <img
            :key="shots[activeShot]!.image"
            :src="shots[activeShot]!.image"
            :alt="shots[activeShot]!.alt"
            width="1400"
            height="1400"
          />
        </Transition>
        <div class="hero-visual-proof">
          <i></i>
          <span><small>{{ shots[activeShot]!.eyebrow }}</small><strong>{{ shots[activeShot]!.label }}</strong></span>
        </div>
        <div class="hero-local-stamp"><b>100%</b><span>local processing</span></div>
      </div>
      <div class="hero-shot-controls" role="tablist" aria-label="PaperBridge app previews">
        <button
          v-for="(shot, index) in shots"
          :key="shot.label"
          :class="{ active: activeShot === index }"
          type="button"
          role="tab"
          :aria-selected="activeShot === index"
          @click="selectShot(index)"
        >
          <span>0{{ index + 1 }}</span>{{ shot.label }}
        </button>
      </div>
    </div>

    <div class="hero-stack" aria-label="PaperBridge local technology stack">
      <div><span>PDFKit</span><i></i><span>MinerU</span><i></i><span>Ollama</span><i></i><span>TranslateGemma</span><i></i><span>Markdown + assets</span><i></i></div>
      <div aria-hidden="true"><span>PDFKit</span><i></i><span>MinerU</span><i></i><span>Ollama</span><i></i><span>TranslateGemma</span><i></i><span>Markdown + assets</span><i></i></div>
    </div>
    <a class="scroll-cue" href="#tour">Explore PaperBridge <span>↓</span></a>
  </section>
</template>
