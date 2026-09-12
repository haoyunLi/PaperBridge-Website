<script setup lang="ts">
import { computed, ref } from 'vue'
import SelectionAssistant from './SelectionAssistant.vue'

type ReaderView = 'reader' | 'summary' | 'full'

const activeView = ref<ReaderView>('reader')
const selectedContext = ref<ReaderView | null>(null)
const assistantMode = ref<'translate' | 'explain'>('translate')
const sourceLanguage = ref('English')
const targetLanguage = ref('简体中文')
const noteSaved = ref(false)
const exportReady = ref(false)

const activeLabel = computed(() => {
  if (activeView.value === 'reader') return 'Bilingual reader'
  if (activeView.value === 'summary') return 'Whole-paper summary'
  return 'Full translation'
})

function changeView(view: ReaderView) {
  activeView.value = view
  selectedContext.value = null
  assistantMode.value = 'translate'
}

function toggleSelection(view: ReaderView) {
  selectedContext.value = selectedContext.value === view ? null : view
  assistantMode.value = 'translate'
}
</script>

<template>
  <section id="reader" class="reader-section" aria-labelledby="reader-title">
    <div class="reader-intro">
      <h2 id="reader-title">Not a translated text file.<br /><em>A bilingual paper.</em></h2>
      <p>
        Read the argument in sequence, inspect the original beside every translation, and
        act on the exact phrase that needs attention. This simulation is built from interface
        elements, not screenshots. It uses fixed English / Simplified Chinese sample content;
        the language controls illustrate settings, not live translation.
      </p>
      <div class="reader-proof">
        <span>Choose a view</span>
        <i></i>
        <span>Select “representation learning”</span>
        <i></i>
        <span>Switch Translate / Explain</span>
      </div>
    </div>

    <div class="reader-product" aria-label="Interactive PaperBridge reader simulation">
      <header class="reader-product-bar">
        <div class="reader-file">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 2h9l5 5v15H5V2Z" /><path d="M14 2v6h5" /></svg>
          <p><b>representation-learning.pdf</b><small>MinerU · 36 structured blocks · saved locally</small></p>
        </div>
        <div class="reader-local"><i></i> Ollama ready</div>
        <button class="reader-export" type="button" @click="exportReady = true">{{ exportReady ? 'Export ready' : 'Export Markdown' }}</button>
      </header>

      <div class="reader-product-layout">
        <aside class="reader-rail">
          <div class="language-pair">
            <label>From<select v-model="sourceLanguage"><option>English</option><option>French</option><option>German</option><option>Spanish</option></select></label>
            <span aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 8h14M15 4l4 4-4 4M19 16H5M9 12l-4 4 4 4" /></svg></span>
            <label>To<select v-model="targetLanguage"><option>简体中文</option><option>English</option><option>日本語</option><option>한국어</option></select></label>
          </div>
          <nav aria-label="Simulated paper outline">
            <small>DOCUMENT OUTLINE</small>
            <span class="outline-row">Abstract <b>1</b></span>
            <span class="outline-row active">Introduction <b>2</b></span>
            <span class="outline-row">Method <b>5</b></span>
            <span class="outline-row">Experiments <b>8</b></span>
            <span class="outline-row">Conclusion <b>11</b></span>
          </nav>
          <div class="rail-model">
            <small>LOCAL MODELS</small>
            <p><i></i><span>TranslateGemma 4B<b>Translation</b></span></p>
            <p><i></i><span>Gemma 3 4B<b>Explain · summary</b></span></p>
          </div>
        </aside>

        <main class="reader-canvas">
          <div class="reader-viewbar">
            <div role="tablist" aria-label="Reading views">
              <button :class="{ active: activeView === 'reader' }" type="button" role="tab" :aria-selected="activeView === 'reader'" @click="changeView('reader')">Reader</button>
              <button :class="{ active: activeView === 'summary' }" type="button" role="tab" :aria-selected="activeView === 'summary'" @click="changeView('summary')">Summary</button>
              <button :class="{ active: activeView === 'full' }" type="button" role="tab" :aria-selected="activeView === 'full'" @click="changeView('full')">Full translation</button>
            </div>
            <span>{{ activeLabel }}</span>
          </div>

          <Transition name="reader-page" mode="out-in">
            <article v-if="activeView === 'reader'" key="reader" class="reader-page bilingual-page">
              <header><small>INTRODUCTION</small><h3>Learning representations that travel</h3><span>2 / 36</span></header>
              <section class="source-passage">
                <small>ORIGINAL · {{ sourceLanguage.toUpperCase() }}</small>
                <p>
                  Recent advances in
                  <button
                    class="selectable-term"
                    :class="{ selected: selectedContext === 'reader' }"
                    type="button"
                    aria-haspopup="dialog"
                    :aria-expanded="selectedContext === 'reader'"
                    @click="toggleSelection('reader')"
                  >representation learning</button>
                  have improved performance across scientific tasks. By learning reusable
                  features from large-scale data, models can generalize to new domains.
                </p>
                <SelectionAssistant
                  v-if="selectedContext === 'reader'"
                  v-model="assistantMode"
                  translation="表征学习"
                  explanation="A method that teaches a model useful patterns it can reuse for new tasks."
                />
              </section>
              <section class="translated-passage">
                <small>TRANSLATION · {{ targetLanguage }}</small>
                <p>近年来，表征学习的进展提升了多项科学任务的性能。通过从大规模数据中学习可复用的特征，模型能够泛化到新的研究领域。</p>
              </section>
              <section class="research-resource formula-resource">
                <div><small>FORMULA · ORIGINAL RESOURCE</small><p>ℒ = − 1/N Σ log p(yᵢ | xᵢ)</p></div>
                <span>Preserved exactly<br /><small>Not sent for translation</small></span>
              </section>
              <section class="research-resource figure-resource">
                <div class="model-diagram" aria-label="Model architecture diagram">
                  <span>Input</span><i></i><span>Encoder</span><i></i><span>Task head</span><i></i><span>Prediction</span>
                </div>
                <p><b>Figure 2.</b> Overview of the representation-learning framework.</p>
                <p class="caption-translation"><b>图 2.</b> 表征学习框架概览。</p>
                <small>Original figure preserved · caption translated</small>
              </section>
            </article>

            <article v-else-if="activeView === 'summary'" key="summary" class="reader-page summary-page">
              <header><small>WHOLE-PAPER SUMMARY</small><h3>The argument, without losing the evidence</h3><span>EN + 简中</span></header>
              <p class="summary-lead">
                This paper studies how reusable representations improve scientific models
                when labelled data is limited.
              </p>
              <div class="summary-points">
                <section><small>QUESTION</small><p>Can one model learn features that transfer across related tasks?</p></section>
                <section><small>METHOD</small><p>Pre-train an encoder, then adapt it with small task-specific heads.</p></section>
                <section><small>RESULT</small><p>Transfer improves accuracy and data efficiency across the evaluated domains.</p></section>
              </div>
              <section class="summary-chinese">
                <small>简体中文摘要</small>
                <p>本文研究在标注数据有限时，可复用表征如何提升科学模型。作者先预训练编码器，再针对具体任务进行适配，从而改善准确率与数据效率。</p>
              </section>
              <p class="summary-note">Generated locally from the reconstructed paper, including headings and captions.</p>
            </article>

            <article v-else key="full" class="reader-page full-page">
              <header><small>STRUCTURE-PRESERVING TRANSLATION</small><h3>3 方法</h3><span>Structure preserved</span></header>
              <p>
                我们训练一个共享编码器，使其从多个数据来源中学习可迁移的表征。
                与仅针对单一任务训练的模型相比，该方法在标注样本有限时更加稳定。
              </p>
              <div class="full-formula"><small>原始公式</small><p>z = f<sub>θ</sub>(x), &nbsp; y = g<sub>φ</sub>(z)</p></div>
              <section class="research-resource figure-resource compact">
                <div class="model-diagram"><span>Input</span><i></i><span>Encoder</span><i></i><span>Task head</span><i></i><span>Prediction</span></div>
                <p><b>图 3.</b> 原图保持不变，仅图注被翻译。</p>
                <small>Image asset retained in exported Markdown</small>
              </section>
              <h4>3.1 训练策略</h4>
              <p>训练过程交替采样不同任务，并使用统一的归一化目标。</p>
                <p class="summary-note">MinerU documents reuse the translated blocks in their original structural order. The full view is not a second contextual rewrite. Formula and image resources remain unchanged.</p>
            </article>
          </Transition>
        </main>
      </div>

      <footer class="reader-statusbar">
        <span><i></i> {{ activeLabel }}</span>
        <button type="button" @click="noteSaved = !noteSaved">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14v17l-7-4-7 4V4Z" /></svg>
          {{ noteSaved ? 'Bookmark saved' : 'Bookmark this view' }}
        </button>
        <span>Browser simulation · no model requests</span>
      </footer>
    </div>
  </section>
</template>
