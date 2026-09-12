<script setup lang="ts">
const questions = [
  {
    question: 'Do I need MinerU?',
    answer: 'MinerU is optional but strongly recommended for the best reading experience: semantic reading order, formula recognition, tables, and figures. It has its own page in the setup guide, after the translation model. PDFKit is built into macOS and preserves the exact visual source when MinerU is unavailable. Neither parser guarantees perfect paragraph boundaries for every PDF.',
  },
  {
    question: 'Which Ollama model should I install?',
    answer: 'The setup guide offers TranslateGemma 4B, 12B, and 27B. Choose a size that fits your Mac’s memory; larger models need more memory and may be slower. Separate summary and explanation models are optional. PaperBridge detects installed Ollama models and lets you change each role in settings.',
  },
  {
    question: 'Do I need Xcode, Homebrew, or Terminal?',
    answer: 'Not to use the signed macOS download. Open the app and follow the setup guide for Ollama, a translation model, recommended MinerU, and optional explanation models. Reopen the guide from PaperBridge > PaperBridge Getting Started. Xcode is only needed to build from source.',
  },
  {
    question: 'Are the new reading features available in the download?',
    answer: 'Yes. PaperBridge 1.9 includes the paper library, section translation, saved terminology, source-linked summaries, reading controls, and safer paragraph repairs. Download the latest signed Mac app, or choose Check for Updates inside PaperBridge. Original layout recovery and AI accuracy still depend on the paper and your local models.',
  },
  {
    question: 'What happens if one paragraph fails?',
    answer: 'That paragraph is marked inline while the rest of the paper continues. You can retry failed blocks instead of restarting the whole translation.',
  },
  {
    question: 'Are formulas and figures translated?',
    answer: 'The original formula or image stays unchanged. Natural-language captions can be translated and remain next to the resource so the scientific content keeps its intended context.',
  },
  {
    question: 'What does Markdown export include?',
    answer: 'You can export bilingual text, a connected full translation, summaries, and analysis. Structured outputs reference the paper’s original figure and table assets when the parser provides them.',
  },
  {
    question: 'Is Windows supported?',
    answer: 'PaperBridge is currently a native macOS app. A Windows version is planned but is not available yet.',
  },
]
</script>

<template>
  <section class="faq-section" aria-labelledby="faq-title">
    <header>
      <h2 id="faq-title">Before you open<br />the first paper.</h2>
      <p>What the local toolchain requires, preserves, and exports.</p>
    </header>
    <div class="faq-list">
      <details v-for="(item, index) in questions" :key="item.question" :open="index === 0">
        <summary><strong>{{ item.question }}</strong><span aria-hidden="true"></span></summary>
        <p>{{ item.answer }}</p>
      </details>
    </div>
  </section>
</template>
