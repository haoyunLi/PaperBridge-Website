<script setup lang="ts">
import { windowsVersion } from '../data/downloads'
const questions = [
  {
    question: 'Do I have to use OpenAI?',
    answer: 'No. Ollama remains the default local provider, including for existing settings. OpenAI is optional in Settings > Models. Choose accessible task models yourself and confirm consent for the app session. There is no automatic cloud fallback, and no OpenAI model is selected by default.',
  },
  {
    question: 'What leaves my Mac if I choose OpenAI?',
    answer: 'Selected-text help sends the selection, nearby context, paper title, and matching saved terminology. Full translation and summary send the full extracted paper text in batches; optional translation style instructions can also be included. PDF files and images are not uploaded. The Responses API uses store: false, which does not guarantee zero retention. Review the OpenAI data controls linked above before sending sensitive work. Revoke consent in Settings to stop further requests; already sent text cannot be recalled.',
  },
  {
    question: 'Does ChatGPT cover the API cost, and where is the key stored?',
    answer: 'OpenAI API usage is paid separately from ChatGPT and depends on the model and text processed. Save your own API key only in the Mac app. It is stored in the local macOS Keychain with iCloud synchronization disabled, never in settings or exports. Normal Mac backup or migration can include the Keychain. This website never asks for a key or calls a model.',
  },
  {
    question: 'Will switching providers lose my translations?',
    answer: 'No. The app retains output variants locally by provider, model, and language, including across app restarts. Returning to matching settings can restore saved results without a new request. Cloud consent is never restored across launches. Settings > Local Data clears these variants too; local recovery is not an independent backup.',
  },
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
    answer: 'Not to use the signed macOS download. Follow the local setup guide for Ollama and models, or choose optional OpenAI under Settings > Models with your own API key. MinerU is a separate recommended parser for either route. Xcode is only needed to build from source.',
  },
  {
    question: 'Are the new reading features available in the download?',
    answer: 'PaperBridge 1.10.0 adds optional OpenAI, per-task model choices, and locally retained provider variants alongside the earlier reading tools. PDF imports show the selected file, elapsed time, and recognized parser stages; canceling or a failed import returns to the previous paper. Stage counts are not an overall completion percentage. Use the latest signed Mac download or Check for Updates. Extraction and AI output still need review.',
  },
  {
    question: 'What happens if one paragraph fails?',
    answer: 'Recoverable paragraph failures can be retried while completed work is kept. In OpenAI mode, setup, authentication, access/model, and rate/quota errors stop the run rather than repeat the same failure for every paragraph. Fix the issue before explicitly resuming; PaperBridge does not silently switch models or providers.',
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
    answer: `Yes. Windows ${windowsVersion} is available as an x64 development preview. Download for Windows starts the Setup .exe download directly; a Portable .exe is also available in Downloads. The preview builds are unsigned, so Windows SmartScreen may show a warning. Windows is a separate implementation, not a guaranteed feature-identical replacement for macOS. See the Windows setup guide and release notes linked in Downloads.`,
  },
]
</script>

<template>
  <section class="faq-section" aria-labelledby="faq-title">
    <header>
      <h2 id="faq-title">Before you open<br />the first paper.</h2>
      <p>What each provider needs, what stays on your Mac, and what you control.</p>
    </header>
    <div class="faq-list">
      <details v-for="(item, index) in questions" :key="item.question" :open="index === 0">
        <summary><strong>{{ item.question }}</strong><span aria-hidden="true"></span></summary>
        <p>{{ item.answer }}</p>
      </details>
    </div>
  </section>
</template>
