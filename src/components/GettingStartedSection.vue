<script setup lang="ts">
import { computed, ref } from 'vue'

const routes = [
  { id: 'read', label: 'Read & annotate', title: 'Begin with no model downloads.', detail: 'Open an existing PDF, inspect its original pages, and mark selectable text. Add AI later when you need it.' },
  { id: 'translate', label: 'Translate a paper', title: 'Add a translator. Keep everything local.', detail: 'Choose a translation model that fits your Mac. MinerU is a separate, recommended step for papers with complex layouts.' },
  { id: 'explain', label: 'Explain & summarize', title: 'Add an assistant for the difficult parts.', detail: 'An explanation model is optional. Use it to unpack a phrase or get a shorter overview, then check the original.' },
]
const routeID = ref('translate')
const route = computed(() => routes.find(item => item.id === routeID.value)!)
const steps = computed(() => [
  { title: 'Install PaperBridge', badge: 'Required', detail: 'Download the DMG, open it, and drag PaperBridge into Applications. Launch it from there.' },
  ...(routeID.value !== 'read' ? [
    { title: 'Start Ollama', badge: 'Required for AI', detail: 'The first-run guide can install or open Ollama. Leave it running while you translate or analyze.' },
    ...(routeID.value === 'translate' ? [{ title: 'Choose TranslateGemma', badge: 'Translation', detail: 'The guide offers 4B, 12B, and 27B. Start with the smaller model if memory is limited; larger models need more resources.' }] : []),
  ] : []),
  { title: 'Consider MinerU', badge: 'Recommended', detail: 'A separate setup page installs the local parser for better reading order, formulas, figures, tables, and Markdown. PDFKit works without it; scanned text needs OCR.' },
  ...(routeID.value === 'explain' ? [{ title: 'Add an explanation model', badge: 'Optional capability', detail: 'Choose a small Gemma or Qwen assistant from the guide, or use an installed model. Select its summary and explanation roles in Settings.' }] : []),
  { title: 'Open your first paper', badge: 'Ready to read', detail: routeID.value === 'read' ? 'Use Original for the exact PDF and Reader for selectable text. PaperBridge also includes a fictional practice paper and source reading map.' : 'Start with one passage to check the translation or explanation before processing a long paper. You can always return to Original.' },
])
</script>

<template>
  <section id="getting-started" class="setup-guide" aria-labelledby="setup-title">
    <div class="setup-intro">
      <h2 id="setup-title">Your first paper.<br /><em>Not a setup project.</em></h2>
      <p>The Mac download is a ready-to-open app. No Xcode, Homebrew, or PaperBridge account required.</p>
      <div class="setup-routes" aria-label="Choose your first task">
        <button v-for="item in routes" :key="item.id" type="button" :aria-pressed="routeID === item.id" aria-controls="setup-route" @click="routeID = item.id">{{ item.label }}</button>
      </div>
      <a class="button button-primary" href="https://github.com/haoyunLi/PaperBridge/releases/latest/download/PaperBridge.dmg">Download for macOS</a>
      <p class="setup-platform">macOS 14 or later. Windows is coming soon.</p>
      <details class="setup-hardware">
        <summary>Will it fit my Mac?</summary>
        <p>Model downloads take disk space; inference also uses memory. The setup guide helps you choose a model size. MinerU recommends at least 16 GB RAM. Reading with built-in PDFKit has no MinerU requirement. Speed varies by Mac and document; a download size is not a memory guarantee.</p>
      </details>
    </div>
    <div id="setup-route" class="setup-route" :data-route="routeID" aria-live="polite">
      <h3>{{ route.title }}</h3><p>{{ route.detail }}</p>
      <ol>
        <li v-for="step in steps" :key="step.title"><div><h4>{{ step.title }}</h4><span>{{ step.badge }}</span></div><p>{{ step.detail }}</p></li>
      </ol>
      <p class="setup-return">You can reopen the guide at <strong>PaperBridge → PaperBridge Getting Started</strong>, or from <strong>Settings → Local AI</strong>. Initial tool and model downloads need internet; document analysis uses local models.</p>
    </div>
  </section>
</template>

<style scoped>
.setup-guide { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; padding: 100px max(24px, calc((100vw - 1264px) / 2)); background: var(--paper-deep); border-top: 1px solid var(--line); }
.setup-intro h2 { margin: 0 0 24px; font-family: var(--serif); font-size: clamp(2.7rem, 4.5vw, 4.5rem); font-weight: 470; line-height: 1.03; letter-spacing: -0.03em; }
.setup-intro em { color: var(--blue); font-weight: inherit; }
.setup-intro > p, .setup-route > p { color: var(--ink-soft); line-height: 1.8; }
.setup-routes { display: flex; flex-direction: column; margin: 30px 0; }
.setup-routes button { text-align: left; padding: 16px; border: 0; border-bottom: 1px solid var(--line); background: transparent; cursor: pointer; font-size: 0.93rem; font-weight: 650; }
.setup-routes button[aria-pressed=true] { color: var(--paper-light); background: var(--blue); }
.setup-intro .setup-platform { font-size: 0.8rem; }
.setup-hardware { margin-top: 24px; border-top: 1px solid var(--line); padding-top: 18px; font-size: 0.85rem; line-height: 1.8; }
.setup-hardware summary { cursor: pointer; font-weight: 700; }
.setup-hardware p { color: var(--ink-soft); }
.setup-route { min-width: 0; }
.setup-route h3 { font-family: var(--serif); font-size: 2rem; font-weight: 470; line-height: 1.15; margin: 0 0 16px; }
.setup-route ol { padding: 0; margin: 30px 0; list-style: none; counter-reset: setup; }
.setup-route li { position: relative; counter-increment: setup; padding: 20px 0 20px 40px; border-top: 1px solid var(--line); }
.setup-route li::before { content: counter(setup, decimal-leading-zero); position: absolute; left: 0; top: 24px; font-size: 0.75rem; color: var(--blue); font-weight: 700; }
.setup-route li > div { display: flex; gap: 10px; flex-wrap: wrap; align-items: baseline; }
.setup-route h4 { margin: 0; font-size: 0.97rem; }
.setup-route li span { color: var(--blue); font-size: 0.72rem; font-weight: 700; }
.setup-route li p { margin: 10px 0 0; font-size: 0.87rem; line-height: 1.75; color: var(--ink-soft); }
.setup-route .setup-return { font-size: 0.8rem; border-top: 1px solid var(--line); padding-top: 20px; }
@media (max-width: 960px) { .setup-guide { grid-template-columns: 1fr; gap: 44px; padding-top: 70px; padding-bottom: 70px; } }
</style>
