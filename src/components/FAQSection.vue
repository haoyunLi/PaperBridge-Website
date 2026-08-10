<script setup lang="ts">
const questions = [
  {
    question: 'Do I need MinerU?',
    answer: 'No. MinerU is optional and gives stronger semantic reading order, formula recognition, tables, and figure extraction. PDFKit is built into macOS and remains available as an exact visual fallback.',
  },
  {
    question: 'Which Ollama model should I install?',
    answer: 'TranslateGemma 4B is the lightweight translation default for many Macs. PaperBridge detects installed Ollama models, so you can assign other compatible models to translation, summary, and explanation based on available memory.',
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
