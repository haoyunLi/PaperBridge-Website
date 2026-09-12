<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'

const props = defineProps<{ kind: string }>()
const sourceVisible = ref(false)
const reviewed = ref(false)
const translated = ref<string[]>([])
const translating = ref(false)
const queue = ref<string[]>([])
const working = ref('')
const queueMessage = ref('Choose a range. The document stays in its original order.')
const sectionNames = ['Abstract', 'Methods', 'Results', 'Conclusion']
let timer: ReturnType<typeof setTimeout> | undefined

function next() {
  const section = queue.value.shift()
  if (!section) { translating.value = false; working.value = ''; queueMessage.value = 'Range complete. Saved sections were not translated twice.'; return }
  working.value = section
  queueMessage.value = `Translating ${section}. ${queue.value.length} section(s) remain in this range.`
  timer = setTimeout(() => { translated.value.push(section); next() }, 550)
}
function run(names: string[]) {
  if (translating.value) return
  queue.value = names.filter(name => !translated.value.includes(name))
  translating.value = true
  next()
}
function cancel() {
  clearTimeout(timer)
  working.value = ''; queue.value = []; translating.value = false
  queueMessage.value = `Stopped. ${translated.value.length} completed section(s) retained.`
}
onBeforeUnmount(() => clearTimeout(timer))

const librarySearch = ref('')
const selectedPaper = ref('methods')
const papers = [
  { id: 'methods', title: 'A methods reading exercise', tag: 'methods', position: 'Paragraph 6', translated: '8 / 20 blocks', note: 'Check the comparison conditions.' },
  { id: 'baseline', title: 'A baseline comparison exercise', tag: 'comparison', position: 'Paragraph 14', translated: '3 / 18 blocks', note: 'Read the limitations before comparing.' },
]
const visiblePapers = computed(() => papers.filter(paper => `${paper.title} ${paper.tag}`.toLowerCase().includes(librarySearch.value.toLowerCase())))
const currentPaper = computed(() => papers.find(paper => paper.id === selectedPaper.value)!)
const term = ref('表征')
const savedTerm = ref('')
const evidenceVisible = ref(false)
const fontSize = ref(18)
const spacing = ref(1.65)
const focused = ref(false)
</script>

<template>
  <div :id="`practice-${props.kind}`" class="feature-practice">
    <p class="practice-description">Try it here. Fictional demonstration only; no paper or model is being processed.</p>

    <template v-if="kind === 'quality'">
      <p class="practice-paper">For the measurement, we out-</p>
      <p class="practice-warning">Possible cut-off word. Do not guess the continuation.</p>
      <div class="practice-actions">
        <button type="button" :aria-expanded="sourceVisible" @click="sourceVisible = !sourceVisible">{{ sourceVisible ? 'Hide original context' : 'Compare original context' }}</button>
        <button type="button" :disabled="!sourceVisible" @click="reviewed = !reviewed">{{ reviewed ? 'Reopen check' : 'Mark checked in demo' }}</button>
      </div>
      <blockquote v-if="sourceVisible">For the measurement, we outline the procedure before reporting any values.</blockquote>
      <p role="status">{{ reviewed ? 'Reviewed in this demo. The app lets you review and use its repair tools; it does not invent missing words.' : 'The source stays unchanged until you decide how to correct it.' }}</p>
    </template>

    <template v-else-if="kind === 'sections'">
      <div class="practice-actions">
        <button type="button" :disabled="translating" @click="run(['Abstract', 'Conclusion'])">Abstract &amp; Conclusion first</button>
        <button type="button" :disabled="translating" @click="run(sectionNames)">Resume remaining sections</button>
        <button v-if="translating" type="button" @click="cancel">Cancel</button>
      </div>
      <ol class="section-progress">
        <li v-for="name in sectionNames" :key="name" :class="{ 'is-done': translated.includes(name), 'is-working': working === name }">
          <span>{{ name }}</span><span>{{ translated.includes(name) ? 'Translated' : working === name ? 'Translating' : 'Not translated' }}</span>
        </li>
      </ol>
      <p role="status">{{ queueMessage }}</p>
    </template>

    <template v-else-if="kind === 'library'">
      <label class="practice-field">Search the sample library<input v-model="librarySearch" type="search" placeholder="Try methods or comparison" /></label>
      <div class="practice-actions">
        <button v-for="paper in visiblePapers" :key="paper.id" type="button" :aria-pressed="selectedPaper === paper.id" @click="selectedPaper = paper.id">{{ paper.title }}</button>
        <p v-if="!visiblePapers.length">No matching sample papers.</p>
      </div>
      <dl class="paper-record">
        <div><dt>Open paper</dt><dd>{{ currentPaper.title }}</dd></div>
        <div><dt>Saved position</dt><dd>{{ currentPaper.position }}</dd></div>
        <div><dt>Translation</dt><dd>{{ currentPaper.translated }}</dd></div>
        <div><dt>Your note</dt><dd>{{ currentPaper.note }}</dd></div>
      </dl>
    </template>

    <template v-else-if="kind === 'terms'">
      <p class="practice-paper">The encoder learns a useful <mark>representation</mark>.</p>
      <label class="practice-field">Preferred Simplified Chinese term<input v-model="term" maxlength="300" /></label>
      <button type="button" :disabled="!term.trim()" @click="savedTerm = term.trim()">Save term in demo</button>
      <p role="status">{{ savedTerm ? `representation → ${savedTerm}. Future English-to-Chinese requests receive this guidance.` : 'Review the wording before saving. Existing translations will not be overwritten.' }}</p>
    </template>

    <template v-else-if="kind === 'evidence'">
      <p class="practice-paper">Claim 1: The example describes training a shared encoder before a task-specific model.</p>
      <button type="button" :aria-expanded="evidenceVisible" @click="evidenceVisible = !evidenceVisible">{{ evidenceVisible ? 'Hide source passage' : 'Read source paragraph 6' }}</button>
      <blockquote v-if="evidenceVisible">A shared encoder learns representations before a smaller task-specific model is trained.</blockquote>
      <p class="practice-warning">Claim 2: The method is always better. No source link validated.</p>
      <p>A matching quote locates the source. It does not certify the model’s interpretation.</p>
    </template>

    <template v-else-if="kind === 'appearance'">
      <div class="practice-actions">
        <label class="practice-field">Text size: {{ fontSize }} px<input v-model.number="fontSize" type="range" min="14" max="24" /></label>
        <label class="practice-field">Line height: {{ spacing }}<input v-model.number="spacing" type="range" min="1.4" max="2" step="0.05" /></label>
        <button type="button" :aria-pressed="focused" @click="focused = !focused">{{ focused ? 'Exit focus' : 'Focus reading' }}</button>
      </div>
      <div class="comfort-preview" :class="{ 'is-focused': focused }">
        <aside v-if="!focused"><span>Document</span><span>Abstract</span><span>Methods</span><span>Results</span></aside>
        <p :style="{ fontSize: `${fontSize}px`, lineHeight: spacing }">Read at your own pace. Keep the original argument in view, translate only what you need, and return to the evidence when a claim needs checking.</p>
      </div>
    </template>
  </div>
</template>

<style scoped>
.feature-practice { margin-top: 24px; padding: 24px; background: var(--paper-light); scroll-margin-top: 110px; }
.practice-description { margin: 0 0 20px; font-size: 0.8rem; line-height: 1.75; color: var(--ink-soft); }
.feature-practice > p:not(.practice-paper) { font-size: 0.875rem; line-height: 1.75; }
.practice-paper, blockquote { font-family: var(--serif); font-size: 1.4rem; line-height: 1.55; }
blockquote { margin: 20px 0; padding: 16px 0; border-block: 1px solid var(--line); }
.practice-warning { color: var(--coral-dark); }
.practice-actions { display: flex; flex-wrap: wrap; align-items: end; gap: 12px; margin: 16px 0; }
button { min-height: 44px; padding: 10px 14px; border: 1px solid var(--blue); border-radius: 8px; background: transparent; color: var(--blue-dark); font-weight: 700; font-size: 0.8rem; cursor: pointer; text-align: left; }
button:hover:not(:disabled), button[aria-pressed='true'] { background: var(--blue); color: var(--paper-light); }
button:disabled { cursor: not-allowed; opacity: 0.5; }
button:focus-visible, input:focus-visible { outline: 3px solid var(--amber); outline-offset: 3px; }
.section-progress { list-style: none; padding: 0; margin: 20px 0; }
.section-progress li { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px; padding: 12px 0; border-bottom: 1px solid var(--line); font-size: 0.875rem; }
.section-progress li span:last-child { color: var(--ink-soft); }
.section-progress .is-done span:last-child { color: var(--blue-dark); font-weight: 700; }
.section-progress .is-working { background: var(--blue-pale); }
.practice-field { display: grid; gap: 8px; font-size: 0.8rem; font-weight: 700; min-width: 0; }
input { min-width: 0; max-width: 100%; width: 100%; accent-color: var(--blue); caret-color: var(--blue); }
input:not([type='range']) { min-height: 44px; border: 1px solid var(--line); border-radius: 8px; padding: 10px 12px; background: var(--paper); color: var(--ink); font: inherit; }
input::placeholder { color: var(--ink-soft); }
.paper-record { font-size: 0.875rem; line-height: 1.75; }
.paper-record > div { display: grid; grid-template-columns: 120px 1fr; gap: 16px; padding: 8px 0; }
.paper-record dt { font-weight: 700; }
.paper-record dd { margin: 0; }
mark { background: var(--amber); color: var(--ink); }
.comfort-preview { display: grid; grid-template-columns: 110px minmax(0, 1fr); border-top: 1px solid var(--line); }
.comfort-preview.is-focused { grid-template-columns: 1fr; }
.comfort-preview aside { padding: 20px 12px 0 0; font-size: 0.75rem; line-height: 2.2; color: var(--ink-soft); }
.comfort-preview aside span { display: block; }
.comfort-preview p { margin: 0; padding-top: 20px; font-family: var(--serif); }
@media (max-width: 540px) {
  .feature-practice { padding: 16px; }
  .paper-record > div { grid-template-columns: 1fr; gap: 2px; }
  .comfort-preview { grid-template-columns: 1fr; }
  .comfort-preview aside { display: flex; flex-wrap: wrap; gap: 4px 12px; padding-right: 0; }
  .practice-actions > button { max-width: 100%; }
}
</style>
