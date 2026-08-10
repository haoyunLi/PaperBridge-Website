<script setup lang="ts">
import { computed, ref } from 'vue'

type StepId = 'reconstruct' | 'protect' | 'translate' | 'package'

const steps: { id: StepId; title: string; detail: string }[] = [
  { id: 'reconstruct', title: 'Reconstruct the document', detail: 'MinerU identifies reading order and semantic blocks.' },
  { id: 'protect', title: 'Protect scientific resources', detail: 'Figures, tables, formulas, and references get explicit roles.' },
  { id: 'translate', title: 'Translate natural language', detail: 'Only translatable text goes to your local Ollama models.' },
  { id: 'package', title: 'Build a portable paper', detail: 'Markdown exports keep structure and referenced assets together.' },
]

const activeStep = ref<StepId>('reconstruct')
const active = computed(() => steps.find((step) => step.id === activeStep.value)!)
</script>

<template>
  <section id="workflow" class="workflow-section" aria-labelledby="workflow-title">
    <header class="workflow-copy">
      <h2 id="workflow-title">Translation begins with<br /><em>document structure.</em></h2>
      <p>
        PaperBridge does not flatten a paper into one long text stream. It first decides what
        each block is, where it belongs, and whether it should be translated at all.
      </p>
    </header>

    <div class="workflow-console">
      <div class="workflow-steps" role="tablist" aria-label="PaperBridge processing stages">
        <button
          v-for="step in steps"
          :key="step.id"
          :class="{ active: activeStep === step.id }"
          type="button"
          role="tab"
          :aria-selected="activeStep === step.id"
          @click="activeStep = step.id"
        >
          <i></i><span><b>{{ step.title }}</b><small>{{ step.detail }}</small></span>
        </button>
      </div>

      <div class="workflow-output">
        <header><span>transformer.pdf</span><b>{{ active.title }}</b></header>
        <Transition name="console-swap" mode="out-in">
          <div v-if="activeStep === 'reconstruct'" key="reconstruct" class="console-panel reconstruct-panel">
            <div class="mini-paper">
              <small>PAGE 3</small><h3>2 Model architecture</h3>
              <p><span></span><span></span><span></span></p>
              <div class="mini-figure"><i></i><i></i><i></i></div>
              <p><span></span><span></span></p>
            </div>
            <div class="block-map">
              <p><b>H1</b><span>Model architecture</span><small>heading</small></p>
              <p><b>P</b><span>Natural language block</span><small>paragraph</small></p>
              <p><b>FIG</b><span>figure_02.png</span><small>asset</small></p>
              <p><b>CAP</b><span>Figure 2. Model overview</span><small>caption</small></p>
              <footer><i></i> Semantic reading order established</footer>
            </div>
          </div>

          <div v-else-if="activeStep === 'protect'" key="protect" class="console-panel protect-panel">
            <div class="resource-ledger">
              <div><b>Paragraph</b><span class="translate-status">Translate</span><p>Natural language with scientific terms preserved</p></div>
              <div><b>Formula</b><span class="preserve-status">Preserve</span><p>$$ Attention(Q,K,V) = softmax(...) $$</p></div>
              <div><b>Figure</b><span class="preserve-status">Preserve</span><p>assets/figure_02.png</p></div>
              <div><b>Caption</b><span class="translate-status">Translate</span><p>Figure 2. Architecture of the model.</p></div>
              <div><b>References</b><span class="skip-status">Skip</span><p>Reference section remains in the document.</p></div>
            </div>
          </div>

          <div v-else-if="activeStep === 'translate'" key="translate" class="console-panel model-panel">
            <div class="model-request">
              <small>LOCAL REQUEST</small>
              <p><b>Source</b> English</p><p><b>Target</b> Simplified Chinese</p>
              <div>Preserve scientific meaning, named entities, gene symbols, protein names, units, and references. Return only the translated paragraph.</div>
            </div>
            <div class="local-model-flow">
              <span>PaperBridge</span><i></i><strong>Ollama</strong><i></i><span>TranslateGemma</span>
              <small>No cloud endpoint · model can be changed</small>
            </div>
          </div>

          <div v-else key="package" class="console-panel package-panel">
            <div class="file-tree">
              <p><b>paper-bilingual/</b></p>
              <p><span></span><b>paper_bilingual.md</b><small>English + translation</small></p>
              <p><span></span><b>paper_translated.md</b><small>Connected full translation</small></p>
              <p><span></span><b>summary.md</b><small>English + Chinese</small></p>
              <p><span></span><b>assets/</b><small>original figures and tables</small></p>
              <p><span></span><span></span><b>figure_02.png</b></p>
              <p><span></span><span></span><b>table_01.html</b></p>
            </div>
            <div class="export-preview">
              <small>MARKDOWN PREVIEW</small>
              <h3>## 2 模型架构</h3>
              <p>该模型采用编码器—解码器架构……</p>
              <code>![Figure 2](assets/figure_02.png)</code>
              <p><b>图 2.</b> 模型整体架构。</p>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <div class="parser-note">
      <strong>MinerU is optional, not a lock-in.</strong>
      <p>When installed, it provides stronger layout reconstruction and formula recognition. Without it, macOS PDFKit keeps exact original pages available as a visual fallback.</p>
      <a href="https://github.com/haoyunLi/PaperBridge#local-dependencies" target="_blank" rel="noreferrer">Read the local setup guide</a>
    </div>
  </section>
</template>
