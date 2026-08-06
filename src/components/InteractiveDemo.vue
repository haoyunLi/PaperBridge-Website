<script setup lang="ts">
import { computed, ref } from 'vue'
import { useReveal } from '../composables/useReveal'
import SelectionAssistant from './SelectionAssistant.vue'

type DemoTab = 'paper' | 'reader' | 'summary' | 'full'

const section = ref<HTMLElement | null>(null)
const activeTab = ref<DemoTab>('reader')
const sourceLanguage = ref('English')
const targetLanguage = ref('简体中文')
const selectedContext = ref<DemoTab | null>('reader')
const explanationMode = ref<'translate' | 'explain'>('translate')
const demoState = ref<'ready' | 'processing' | 'complete'>('complete')
const progress = ref(100)
let progressTimer: number | undefined

useReveal(section)

const statusText = computed(() => {
  if (demoState.value === 'processing') return `Translating locally · ${progress.value}%`
  if (demoState.value === 'ready') return 'Sample paper ready'
  return 'Translation complete · figures preserved'
})

function runDemo() {
  window.clearInterval(progressTimer)
  demoState.value = 'processing'
  progress.value = 8
  activeTab.value = 'reader'
  selectedContext.value = null
  progressTimer = window.setInterval(() => {
    progress.value = Math.min(progress.value + 7, 100)
    if (progress.value >= 100) {
      window.clearInterval(progressTimer)
      demoState.value = 'complete'
    }
  }, 90)
}

function changeTab(tab: DemoTab) {
  const update = () => {
    activeTab.value = tab
    selectedContext.value = null
  }
  if ('startViewTransition' in document) {
    ;(document as Document & { startViewTransition: (callback: () => void) => void }).startViewTransition(update)
  } else {
    update()
  }
}

function toggleSelection(context: DemoTab) {
  selectedContext.value = selectedContext.value === context ? null : context
  explanationMode.value = 'translate'
}
</script>

<template>
  <section id="demo" ref="section" class="demo-section reveal-section" aria-labelledby="demo-title">
    <div class="section-heading">
      <p class="section-index">Interactive demo</p>
      <h2 id="demo-title">Try the reading flow.</h2>
      <p>Change the language, switch views, or select the highlighted term. The real app runs this workflow entirely on your Mac.</p>
    </div>

    <div class="demo-shell">
      <header class="demo-toolbar">
        <div class="demo-document">
          <img src="/images/paperbridge-icon.png" alt="" />
          <div><strong>attention-is-all-you-need.pdf</strong><small>English → Simplified Chinese · MinerU · 112 blocks</small></div>
        </div>
        <span class="demo-ready">● Ollama Ready</span>
        <div class="demo-actions">
          <button class="run-demo" type="button" :disabled="demoState === 'processing'" @click="runDemo">{{ demoState === 'processing' ? 'Working locally…' : 'Translate' }}</button>
          <a href="https://github.com/haoyunLi/PaperBridge/releases/latest">Export Markdown ↓</a>
        </div>
      </header>

      <div class="demo-progress" :class="demoState"><span :style="{ width: `${progress}%` }"></span><small>{{ statusText }}</small></div>

      <div class="demo-layout">
        <aside class="demo-outline" aria-label="PaperBridge sidebar">
          <section class="sidebar-demo-card"><small>SOURCE</small><button class="open-pdf" type="button">＋ Open PDF</button><button type="button">⌄ Paste Text</button></section>
          <section class="sidebar-demo-card document-stats"><small>DOCUMENT</small><strong>attention-is-all-you-need.pdf</strong><span>Paragraphs <b>96</b></span><span>Parser <b>MinerU</b></span><span>Translated <b>96</b></span><span>Skipped refs <b>41</b></span></section>
          <section class="sidebar-demo-card compact-outline"><small>OUTLINE</small><button class="selected" type="button"><span>Abstract</span><b>1</b></button><button type="button"><span>1 Introduction</span><b>2</b></button><button type="button"><span>3 Model Architecture</span><b>4</b></button></section>
          <section class="sidebar-demo-card language-sidebar"><small>LANGUAGE</small><label>From<select v-model="sourceLanguage"><option>English</option><option>French</option><option>German</option><option>Spanish</option></select></label><label>To<select v-model="targetLanguage"><option>简体中文</option><option>English</option><option>日本語</option><option>한국어</option></select></label></section>
          <div class="local-indicator"><i></i><span>Ollama ready<br /><small>MinerU ready · PDFKit fallback</small></span></div>
        </aside>

        <main class="demo-document-view">
          <nav class="reader-tabs" aria-label="Demo views">
            <button :class="{ active: activeTab === 'paper' }" type="button" @click="changeTab('paper')">Paper</button>
            <button :class="{ active: activeTab === 'reader' }" type="button" @click="changeTab('reader')">Reader</button>
            <button :class="{ active: activeTab === 'summary' }" type="button" @click="changeTab('summary')">Summary</button>
            <button :class="{ active: activeTab === 'full' }" type="button" @click="changeTab('full')">Full Translation</button>
          </nav>

          <Transition name="paper-view" mode="out-in">
            <article v-if="activeTab === 'paper'" key="paper" class="paper-preview-view">
              <header><div><strong>Full Document Preview</strong><small>Original PDF layout stays intact; translation is added without modifying source resources.</small></div><span>Bilingual</span><span>Original</span><span>Translation</span></header>
              <div class="paper-preview-page">
                <h3>3 Model Architecture</h3>
                <div class="selection-host paper-selection-host">
                  <p>Most competitive neural sequence transduction models have an <button class="selectable-term" :class="{ selected: selectedContext === 'paper' }" type="button" aria-haspopup="dialog" :aria-expanded="selectedContext === 'paper'" @click="toggleSelection('paper')">encoder-decoder structure</button>. Here, the encoder maps an input sequence of symbol representations to a sequence of continuous representations.</p>
                  <SelectionAssistant v-if="selectedContext === 'paper'" v-model="explanationMode" translation="编码器—解码器结构" explanation="One part reads the input; another part creates the output from what was understood." />
                </div>
                <div class="preview-translation"><small>SIMPLIFIED CHINESE TRANSLATION</small><p>多数具有竞争力的神经序列转换模型采用编码器—解码器结构。编码器将输入符号序列映射为连续表征序列。</p></div>
                <div class="equation compact">Attention(Q, K, V) = softmax(QKᵀ / √d<sub>k</sub>)V</div>
                <div class="paper-figure-resource"><div class="figure-flow"><span>Inputs</span><i>→</i><span>Multi-Head Attention</span><i>→</i><span>Outputs</span></div><p><b>Figure 1.</b> The Transformer model architecture.</p><p class="caption-translation"><b>图 1.</b> Transformer 模型架构。</p><small>ORIGINAL IMAGE PRESERVED · CAPTION TRANSLATED</small></div>
              </div>
            </article>

            <article v-else-if="activeTab === 'reader'" key="reader" class="reader-view">
              <div class="paragraph-block original-block">
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
                  have significantly improved performance across many scientific tasks. By learning reusable representations from large-scale data, models can generalize to new domains.
                </p>

                <SelectionAssistant v-if="selectedContext === 'reader'" v-model="explanationMode" translation="表征学习" explanation="A way for a model to learn useful patterns it can reuse on new tasks." />
              </div>

              <div class="paragraph-block translation-block" :class="{ concealed: demoState !== 'complete' }">
                <small>TRANSLATION · {{ targetLanguage }}</small>
                <p>近年来，表征学习的进展显著提升了许多科学任务的性能。通过从大规模数据中学习可复用的表征，模型能够更好地泛化到新的研究领域。</p>
              </div>

              <div class="preserved-content">
                <div class="equation" aria-label="Preserved equation">ℒ = − <span>1</span>⁄<span>N</span> Σ log <span class="fraction">exp(zᵀz⁺/τ)<i>Σ exp(zᵀzⱼ/τ)</i></span></div>
                <div class="scientific-figure">
                  <div class="figure-flow"><span>Input text</span><i>→</i><span>Encoder</span><i>→</i><span>Task head</span><i>→</i><span>Prediction</span></div>
                  <p><b>Figure 2.</b> Overview of the representation-learning framework.</p>
                  <p class="caption-translation"><b>图 2.</b> 表征学习框架概览。</p>
                  <small>✓ ORIGINAL IMAGE PRESERVED · CAPTION TRANSLATED</small>
                </div>
              </div>
            </article>

            <article v-else-if="activeTab === 'summary'" key="summary" class="summary-view">
              <small>WHOLE-PAPER SUMMARY · ENGLISH + SIMPLIFIED CHINESE</small>
              <h3>Attention-based sequence modeling without recurrence</h3>
              <div class="selection-host summary-selection-host">
                <p>This paper introduces the Transformer, a sequence model built entirely around <button class="selectable-term" :class="{ selected: selectedContext === 'summary' }" type="button" aria-haspopup="dialog" :aria-expanded="selectedContext === 'summary'" @click="toggleSelection('summary')">self-attention</button> rather than recurrent or convolutional layers.</p>
                <SelectionAssistant v-if="selectedContext === 'summary'" v-model="explanationMode" translation="自注意力" explanation="Each word looks at the other words and decides which ones matter for understanding the sentence." />
              </div>
              <ol>
                <li><b>Problem.</b> Recurrence limits parallel training and makes long-range dependencies harder to learn.</li>
                <li><b>Method.</b> Multi-head attention and positional encoding replace recurrence entirely.</li>
                <li><b>Result.</b> The architecture improves translation quality while training more efficiently.</li>
              </ol>
              <div class="summary-translation"><small>简体中文摘要</small><p>本文提出仅依赖注意力机制的 Transformer 架构，在不使用循环或卷积结构的情况下完成序列建模，并在机器翻译任务中取得优异结果。</p></div>
            </article>

            <article v-else key="full" class="full-view">
              <small>CONNECTED TRANSLATION · SOURCE STRUCTURE PRESERVED</small>
              <h3>2 方法</h3>
              <div class="selection-host full-selection-host">
                <p>Transformer 完全依赖<button class="selectable-term" :class="{ selected: selectedContext === 'full' }" type="button" aria-haspopup="dialog" :aria-expanded="selectedContext === 'full'" @click="toggleSelection('full')">注意力机制</button>来建立输入与输出之间的全局依赖关系，而不使用循环结构。</p>
                <SelectionAssistant v-if="selectedContext === 'full'" v-model="explanationMode" translation="attention mechanism" explanation="The model compares parts of the input and gives more weight to the parts that are most relevant." />
              </div>
              <div class="equation compact">ℒ = − 1/N Σ log p(yᵢ | xᵢ)</div>
              <div class="translated-figure">
                <div><span>Input text</span><i>→</i><span>Encoder</span><i>→</i><span>Attention</span><i>→</i><span>Output</span></div>
                <p><b>Figure 2.</b> The original figure remains unchanged.</p>
                <p class="caption-translation"><b>图 2.</b> 原图保持不变，仅翻译图注。</p>
                <small>ORIGINAL IMAGE PRESERVED · CAPTION TRANSLATED</small>
              </div>
              <h3>3 实验结果</h3>
              <p>实验显示，该方法在多个基准测试中取得稳定提升，并在标注数据有限时保持较好的泛化能力。</p>
            </article>
          </Transition>
        </main>
      </div>
    </div>
  </section>
</template>
