<script setup lang="ts">
import { ref } from 'vue'

const visual = ref<HTMLElement | null>(null)

function tilt(event: MouseEvent) {
  if (!visual.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const bounds = visual.value.getBoundingClientRect()
  const x = (event.clientX - bounds.left) / bounds.width - 0.5
  const y = (event.clientY - bounds.top) / bounds.height - 0.5
  visual.value.style.setProperty('--tilt-x', `${y * -1.8}deg`)
  visual.value.style.setProperty('--tilt-y', `${x * 2.6}deg`)
}

function resetTilt() {
  visual.value?.style.setProperty('--tilt-x', '0deg')
  visual.value?.style.setProperty('--tilt-y', '0deg')
}
</script>

<template>
  <section id="top" class="hero" aria-labelledby="hero-title">
    <div class="hero-copy">
      <h1 id="hero-title">Read the paper.<br />Keep the meaning.</h1>
      <p>
        Translate, summarize, and explain academic papers with local AI, without losing figures,
        formulas, tables, or context.
      </p>
      <div class="hero-actions">
        <a class="button button-primary" href="https://github.com/haoyunLi/PaperBridge/releases/latest">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M16.9 13.5c0-2.8 2.3-4.2 2.4-4.3a5.2 5.2 0 0 0-4.1-2.2c-1.7-.2-3.4 1-4.3 1s-2.3-1-3.8-1c-2 0-3.8 1.2-4.8 3-2.1 3.7-.5 9.1 1.5 12 .9 1.4 2.1 3 3.6 2.9 1.5-.1 2.1-1 3.9-1 1.8 0 2.3 1 3.9 1 1.6 0 2.6-1.4 3.5-2.8a13 13 0 0 0 1.6-3.3 5.1 5.1 0 0 1-3.4-5.3ZM14 5.2A5 5 0 0 0 15.2 1a5.1 5.1 0 0 0-3.4 1.7 4.7 4.7 0 0 0-1.3 3.5A4.3 4.3 0 0 0 14 5.2Z" />
          </svg>
          Download for macOS
        </a>
        <a class="button button-ghost" href="https://github.com/haoyunLi/PaperBridge" target="_blank" rel="noreferrer">
          View on GitHub <span aria-hidden="true">↗</span>
        </a>
      </div>
      <p class="availability"><span></span> Windows version coming soon</p>
    </div>

    <div
      ref="visual"
      class="hero-visual"
      aria-label="PaperBridge bilingual reader preview"
      @mousemove="tilt"
      @mouseleave="resetTilt"
    >
      <div class="window-chrome"><i></i><i></i><i></i><span>attention-is-all-you-need.pdf</span></div>
      <aside class="mock-sidebar">
        <div class="mini-brand">
          <img src="/images/paperbridge-icon.png" alt="" />
          <div><strong>PaperBridge</strong><small>LOCAL-ONLY / OLLAMA</small></div>
        </div>
        <button type="button">＋ Open PDF</button>
        <div class="mock-meta"><small>DOCUMENT</small><strong>attention-is-all-you-need.pdf</strong><span>Paragraphs <b>96</b></span><span>Parser <b>MinerU</b></span><span>Translated <b>96</b></span><span>Skipped refs <b>41</b></span></div>
        <div class="mock-outline"><small>OUTLINE</small><span>Abstract</span><span class="active">1 Introduction</span><span>2 Method</span><span>3 Experiments</span></div>
      </aside>
      <div class="mock-paper">
        <div class="mock-toolbar">
          <div><strong>attention-is-all-you-need.pdf</strong><small>English → Simplified Chinese · MinerU · 112 blocks</small></div>
          <span class="ready">● Ollama Ready</span>
        </div>
        <div class="mock-tabs"><span>Paper</span><span class="active">Reader</span><span>Summary</span><span>Full Translation</span></div>
        <div class="mock-reader-list">
          <article class="mock-paragraph-card">
            <small>13 · ORIGINAL · ENGLISH</small>
            <p>Recent advances in <mark>representation learning</mark> have changed how models understand scientific language.</p>
            <hr />
            <small>TRANSLATION · SIMPLIFIED CHINESE</small>
            <p class="type-line">近年来，<mark>表征学习</mark>的进展改变了模型理解科学语言的方式。</p>
          </article>
          <article class="mock-resource-card mock-formula-card">
            <header><b>ƒ Formula</b><small>PRESERVED FROM SOURCE</small></header>
            <p>Attention(Q, K, V) = softmax(QKᵀ / √d<sub>k</sub>)V</p>
          </article>
          <article class="mock-resource-card mock-figure-card">
            <header><b>▧ Figure</b><small>IMAGE PRESERVED · CAPTION TRANSLATED</small></header>
            <div class="mini-figure" aria-label="Preserved scientific diagram"><i>Input</i><i>Encoder</i><i>Attention</i><i>Output</i></div>
            <p><b>Figure 2.</b> The Transformer model architecture.</p>
            <p class="caption-translation"><b>图 2.</b> Transformer 模型架构。</p>
          </article>
        </div>
        <div class="selection-popover">
          <div><b>Translate</b><span>Explain</span></div>
          <strong>representation learning</strong>
          <p>表征学习</p>
        </div>
      </div>
    </div>
    <a class="scroll-cue" href="#demo">Explore the reader <span>↓</span></a>
  </section>
</template>
