<script setup lang="ts">
import { computed, ref } from 'vue'
import { useReveal } from '../composables/useReveal'

const section = ref<HTMLElement | null>(null)
const activeStep = ref(0)
useReveal(section)

const steps = [
  {
    number: '01',
    title: 'Parse',
    text: 'Rebuild the paper into structured Markdown with sections, figures, tables, formulas, and references.',
    visual: 'parse',
  },
  {
    number: '02',
    title: 'Translate',
    text: 'Translate natural paragraphs with local Ollama models while keeping scientific terms and layout intact.',
    visual: 'translate',
  },
  {
    number: '03',
    title: 'Read',
    text: 'Move between the original, bilingual reader, summary, and connected full translation without losing context.',
    visual: 'read',
  },
]

const active = computed(() => steps[activeStep.value]!)
</script>

<template>
  <section id="workflow" ref="section" class="workflow-section reveal-section" aria-labelledby="workflow-title">
    <div class="workflow-heading">
      <h2 id="workflow-title">From PDF to understanding.</h2>
      <p>PaperBridge reconstructs the document before it translates the words.</p>
    </div>

    <div class="workflow-rail" role="tablist" aria-label="Paper processing steps">
      <button
        v-for="(step, index) in steps"
        :key="step.number"
        :class="{ active: activeStep === index }"
        type="button"
        role="tab"
        :aria-selected="activeStep === index"
        @click="activeStep = index"
      >
        <span>{{ step.number }}</span><strong>{{ step.title }}</strong><small>{{ step.text }}</small>
      </button>
      <i class="rail-progress" :style="{ width: `${(activeStep + 1) * 33.333}%` }"></i>
    </div>

    <div class="workflow-stage">
      <div class="workflow-note">
        <span>{{ active.number }}</span>
        <h3>{{ active.title }} the paper.</h3>
        <p>{{ active.text }}</p>
        <div class="preserve-list">
          <span>Figures</span><span>Tables</span><span>LaTeX</span><span>References</span>
        </div>
      </div>
      <Transition name="image-swap" mode="out-in">
        <figure :key="active.visual" class="workflow-visual">
          <div v-if="active.visual === 'parse'" class="parse-visual">
            <header><span>attention-is-all-you-need.pdf</span><b>MinerU · Structured Markdown</b></header>
            <div class="source-page"><small>PAGE 4</small><h4>3 Model Architecture</h4><p>The Transformer follows an encoder-decoder architecture using stacked self-attention.</p><div class="detected formula-detected"><i>FORMULA</i> Attention(Q, K, V) = softmax(QKᵀ / √d<sub>k</sub>)V</div><div class="detected figure-detected"><i>FIGURE</i><span>Inputs → Encoder → Attention → Outputs</span></div><div class="detected table-detected"><i>TABLE</i><span>Layer</span><span>Dimension</span><span>Heads</span></div></div>
            <aside><strong>Detected structure</strong><span>12 sections</span><span>9 figures</span><span>4 tables</span><span>18 formulas</span><span>41 references excluded</span></aside>
          </div>
          <div v-else-if="active.visual === 'translate'" class="translate-visual">
            <header><span>Paper Reader</span><b>96 / 96 translated</b></header>
            <article><small>ORIGINAL · ENGLISH</small><p>The model uses self-attention to connect every position in the sequence.</p><hr /><small>TRANSLATION · SIMPLIFIED CHINESE</small><p>该模型使用自注意力机制连接序列中的每个位置。</p></article>
            <div class="resource-pair"><div><small>ƒ FORMULA · PRESERVED</small><p>softmax(QKᵀ / √d<sub>k</sub>)V</p></div><div><small>▧ FIGURE · PRESERVED</small><p>Caption → translated separately</p></div></div>
            <footer><i></i><span>Translation is local. Scientific resources never enter the translation prompt.</span></footer>
          </div>
          <div v-else class="read-visual">
            <header><span>Paper</span><span>Reader</span><span class="active">Summary</span><span>Full Translation</span></header>
            <div class="summary-sheet"><small>WHOLE-PAPER SUMMARY · ENGLISH</small><h4>Attention-based sequence modeling</h4><p>The paper replaces recurrence with multi-head attention, improving parallelism and translation quality.</p><div><small>简体中文摘要</small><p>本文使用多头注意力机制替代循环结构，从而提高并行计算能力与机器翻译质量。</p></div></div>
            <footer><span>Selected text tools</span><b>Translate</b><b>Explain</b><b>Highlight</b><b>Note</b><b>Bookmark</b></footer>
          </div>
          <figcaption>PaperBridge interface simulation · {{ active.title }} stage</figcaption>
        </figure>
      </Transition>
    </div>
  </section>
</template>
