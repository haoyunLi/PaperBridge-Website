<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

type Phase = 'import' | 'structure' | 'translate' | 'read'

const phases: { id: Phase; label: string; detail: string }[] = [
  { id: 'import', label: 'Open PDF', detail: 'Local file' },
  { id: 'structure', label: 'Reconstruct', detail: 'MinerU' },
  { id: 'translate', label: 'Translate', detail: 'Ollama' },
  { id: 'read', label: 'Read', detail: 'In context' },
]

const activePhase = ref<Phase>('structure')
const selectedTerm = ref(false)
const isPlaying = ref(true)
let timer: number | undefined

const activeIndex = computed(() => phases.findIndex((phase) => phase.id === activePhase.value))
const phaseStatus = computed(() => {
  if (activePhase.value === 'import') return 'PDF stays on this Mac'
  if (activePhase.value === 'structure') return 'Detecting sections, figures, tables, and formulas'
  if (activePhase.value === 'translate') return 'Translating paragraph 18 of 24'
  return 'Bilingual paper ready'
})

function choosePhase(phase: Phase) {
  activePhase.value = phase
  selectedTerm.value = false
  restartTimer()
}

function restartTimer() {
  window.clearInterval(timer)
  if (!isPlaying.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = window.setInterval(() => {
    const nextIndex = (activeIndex.value + 1) % phases.length
    activePhase.value = phases[nextIndex]!.id
    selectedTerm.value = false
  }, 4200)
}

function pauseTimer() {
  window.clearInterval(timer)
}

function resumeTimer() {
  if (isPlaying.value) restartTimer()
}

function togglePlayback() {
  isPlaying.value = !isPlaying.value
  if (isPlaying.value) restartTimer()
  else pauseTimer()
}

onMounted(restartTimer)
onBeforeUnmount(() => window.clearInterval(timer))
</script>

<template>
  <section id="top" class="hero" aria-labelledby="hero-title">
    <div class="hero-copy">
      <h1 id="hero-title">Read across languages.<br /><em>Keep the paper.</em></h1>
      <p class="hero-lede">
        Understand a paper in another language without leaving the original behind.
        Read bilingual paragraphs, explain a difficult phrase, and keep figures,
        formulas, and your own notes within reach. A native Mac app powered by local AI.
      </p>
      <div class="hero-actions">
        <a
          class="button button-primary"
          href="https://github.com/haoyunLi/PaperBridge/releases/latest/download/PaperBridge.dmg"
          target="_blank"
          rel="noreferrer"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M16.9 13.5c0-2.8 2.3-4.2 2.4-4.3a5.2 5.2 0 0 0-4.1-2.2c-1.7-.2-3.4 1-4.3 1s-2.3-1-3.8-1c-2 0-3.8 1.2-4.8 3-2.1 3.7-.5 9.1 1.5 12 .9 1.4 2.1 3 3.6 2.9 1.5-.1 2.1-1 3.9-1 1.8 0 2.3 1 3.9 1 1.6 0 2.6-1.4 3.5-2.8a13 13 0 0 0 1.6-3.3 5.1 5.1 0 0 1-3.4-5.3ZM14 5.2A5 5 0 0 0 15.2 1a5.1 5.1 0 0 0-3.4 1.7 4.7 4.7 0 0 0-1.3 3.5A4.3 4.3 0 0 0 14 5.2Z" />
          </svg>
          Download for macOS
        </a>
        <a class="button button-text" href="#reader">
          Explore the live reader
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 7 7-7 7" /></svg>
        </a>
      </div>
      <div class="hero-availability">
        <span><i></i> Latest release · Apple notarized</span>
        <span>Windows coming soon</span>
        <span>Open source</span>
      </div>
      <p class="hero-first-use">No Xcode or Homebrew needed. <a href="#getting-started">See what to install for your first paper.</a></p>
    </div>

    <div
      class="hero-workbench"
      aria-label="Animated PaperBridge workflow simulation"
      @mouseenter="pauseTimer"
      @mouseleave="resumeTimer"
      @focusin="pauseTimer"
      @focusout="resumeTimer"
    >
      <header class="workbench-titlebar">
        <div class="window-controls" aria-hidden="true"><i></i><i></i><i></i></div>
        <strong>PaperBridge</strong>
        <span><i></i> Local AI ready</span>
      </header>

      <div class="workbench-body">
        <aside class="workbench-sidebar">
          <button class="open-document" type="button" @click="choosePhase('import')">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
            Open paper
          </button>
          <div class="document-entry active">
            <span>PB</span>
            <p><b>transformer.pdf</b><small>12 pages · 24 blocks</small></p>
          </div>
          <nav aria-label="Simulated document outline">
            <small>OUTLINE</small>
            <span class="outline-row">Abstract <b>1</b></span>
            <span class="outline-row active">Introduction <b>2</b></span>
            <span class="outline-row">Method <b>4</b></span>
            <span class="outline-row">Results <b>7</b></span>
          </nav>
          <footer><i></i><span>MinerU ready<br /><small>PDFKit fallback</small></span></footer>
        </aside>

        <div class="workbench-main">
          <nav class="workbench-tabs" aria-label="Simulated PaperBridge views">
            <span class="view-label">Paper</span>
            <span class="view-label active">Reader</span>
            <span class="view-label">Overview</span>
            <span class="view-label">Full translation</span>
            <span>EN <i></i> 简中</span>
          </nav>

          <Transition name="stage-swap" mode="out-in">
            <div v-if="activePhase === 'import'" key="import" class="stage-panel import-stage">
              <div class="drop-target">
                <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M14 5h14l8 8v30H14V5Z" /><path d="M28 5v9h8M19 25h12M19 31h9" /></svg>
                <strong>Drop an academic PDF</strong>
                <p>The file opens directly from your Mac. Nothing is uploaded.</p>
                <button type="button" @click="choosePhase('structure')">Use sample paper</button>
              </div>
            </div>

            <div v-else-if="activePhase === 'structure'" key="structure" class="stage-panel structure-stage">
              <div class="source-paper">
                <span class="scan-line"></span>
                <small>3 MODEL ARCHITECTURE</small>
                <h3>Attention is all you need</h3>
                <p>The Transformer follows an encoder-decoder structure using stacked self-attention.</p>
                <div class="detected-block formula-block"><b>FORMULA</b> Attention(Q, K, V) = softmax(QKᵀ / √d<sub>k</sub>)V</div>
                <div class="detected-block figure-block">
                  <b>FIGURE</b>
                  <div><span>Input</span><i></i><span>Attention</span><i></i><span>Output</span></div>
                </div>
              </div>
              <div class="structure-log">
                <strong>Document structure</strong>
                <p class="complete"><i></i> Reading order</p>
                <p class="complete"><i></i> 9 figures</p>
                <p class="active"><i></i> 18 formulas</p>
                <p><i></i> 4 tables</p>
                <small>References are identified and skipped for translation.</small>
              </div>
            </div>

            <div v-else-if="activePhase === 'translate'" key="translate" class="stage-panel translate-stage">
              <article class="translation-sheet">
                <small>ORIGINAL · ENGLISH</small>
                <p>Self-attention connects each position in a sequence to every other position.</p>
                <hr />
                <small>TRANSLATION · SIMPLIFIED CHINESE</small>
                <p>自注意力机制将序列中的每个位置与其他所有位置连接起来。</p>
              </article>
              <aside class="translation-progress">
                <strong>Translating locally</strong>
                <div><span></span></div>
                <b>18 / 24</b>
                <p>TranslateGemma 4B<br />via Ollama</p>
                <small>Formula and figure blocks stay outside the model prompt.</small>
              </aside>
            </div>

            <div v-else key="read" class="stage-panel read-stage">
              <article>
                <small>ORIGINAL · ENGLISH</small>
                <p>
                  The model uses
                  <button type="button" :class="{ selected: selectedTerm }" @click="selectedTerm = !selectedTerm">self-attention</button>
                  to connect every position in the sequence.
                </p>
                <Transition name="term-pop">
                  <div v-if="selectedTerm" class="hero-term-result">
                    <b>self-attention</b><span>自注意力</span><small>Only the selected term was translated.</small>
                  </div>
                </Transition>
                <hr />
                <small>TRANSLATION · SIMPLIFIED CHINESE</small>
                <p>该模型使用自注意力机制连接序列中的每个位置。</p>
                <div class="preserved-formula"><small>FORMULA · PRESERVED</small><span>softmax(QKᵀ / √d<sub>k</sub>)V</span></div>
              </article>
            </div>
          </Transition>
        </div>
      </div>

      <footer class="workbench-phases">
        <button
          v-for="(phase, index) in phases"
          :key="phase.id"
          :class="{ active: activePhase === phase.id, complete: index < activeIndex }"
          type="button"
          @click="choosePhase(phase.id)"
        >
          <i><span></span></i>
          <b>{{ phase.label }}</b>
          <small>{{ phase.detail }}</small>
        </button>
        <div class="phase-playback">
          <p aria-live="polite">{{ phaseStatus }}</p>
          <button type="button" :aria-label="isPlaying ? 'Pause workflow animation' : 'Play workflow animation'" @click="togglePlayback">
            <svg v-if="isPlaying" viewBox="0 0 20 20" aria-hidden="true"><path d="M5 4h3v12H5zM12 4h3v12h-3z" /></svg>
            <svg v-else viewBox="0 0 20 20" aria-hidden="true"><path d="m6 4 10 6-10 6V4Z" /></svg>
            {{ isPlaying ? 'Pause' : 'Play' }}
          </button>
        </div>
      </footer>
    </div>
  </section>
</template>

<style scoped>
.hero-first-use { margin: 18px 0 0; font-size: 0.8rem; line-height: 1.7; color: var(--ink-soft); }
.hero-first-use a { color: var(--blue); text-underline-offset: 4px; }
</style>
