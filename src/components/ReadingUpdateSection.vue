<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'

type Scenario = 'resume' | 'notes' | 'place' | 'map'
type BlockStatus = 'saved' | 'pending' | 'failed' | 'working' | 'done'
const scenarios: { id: Scenario; title: string; detail: string }[] = [
  { id: 'resume', title: 'Resume, not restart', detail: 'Keep completed translations. Pick up the unfinished blocks.' },
  { id: 'notes', title: 'Keep the thought', detail: 'Remove a highlight without removing the note attached to it.' },
  { id: 'place', title: 'Return to your place', detail: 'Visit Overview, then come back to the block you were reading.' },
  { id: 'map', title: 'Start from the source', detail: 'Find the method or limitations without downloading a model.' },
]
const active = ref<Scenario>('resume')
const blocks = ref<BlockStatus[]>(['saved', 'saved', 'saved', 'failed', 'pending', 'pending'])
const running = ref(false)
const completed = computed(() => blocks.value.filter(status => status === 'saved' || status === 'done').length)
const statusLabels: Record<BlockStatus, string> = {
  saved: 'Saved earlier', pending: 'Pending', failed: 'Needs retry', working: 'Translating', done: 'Translated now',
}
const translationStatus = ref('3 saved blocks. Only the unfinished blocks need work.')
let timer: ReturnType<typeof setTimeout> | undefined

function stop() {
  clearTimeout(timer)
  timer = undefined
  blocks.value = blocks.value.map(status => status === 'working' ? 'pending' : status)
  running.value = false
}

function runNext() {
  const index = blocks.value.findIndex(status => status === 'pending' || status === 'failed')
  if (index < 0) {
    running.value = false
    translationStatus.value = '6 of 6 complete. The 3 previously saved blocks were not translated again.'
    return
  }
  blocks.value[index] = 'working'
  translationStatus.value = `Translating block ${index + 1}. Earlier translations stay unchanged.`
  timer = setTimeout(() => {
    blocks.value[index] = 'done'
    runNext()
  }, 850)
}

function resume() {
  if (running.value || completed.value === blocks.value.length) return
  running.value = true
  runNext()
}

function cancel() {
  stop()
  translationStatus.value = `Stopped. ${completed.value} completed blocks kept. Resume when ready.`
}

function resetTranslation() {
  stop()
  blocks.value = ['saved', 'saved', 'saved', 'failed', 'pending', 'pending']
  translationStatus.value = '3 saved blocks. Only the unfinished blocks need work.'
}

const highlighted = ref(true)
const savedNote = ref('Check how well the method transfers to a smaller dataset.')
const noteDraft = ref(savedNote.value)
const noteHistory = ref<{ highlighted: boolean; note: string }[]>([])
const noteStatus = ref('A highlight and a note are attached to the selected passage.')

function rememberNote() {
  noteHistory.value.push({ highlighted: highlighted.value, note: savedNote.value })
  if (noteHistory.value.length > 20) noteHistory.value.shift()
}

function toggleHighlight() {
  rememberNote()
  highlighted.value = !highlighted.value
  noteStatus.value = highlighted.value ? 'Highlight restored. Your note is unchanged.' : 'Highlight removed. Your note is still saved.'
}

function saveNote() {
  rememberNote()
  savedNote.value = noteDraft.value.trim()
  noteStatus.value = savedNote.value ? 'Note saved in this demo. No data is sent anywhere.' : 'Note cleared. Highlight state is unchanged.'
}

function undoNote() {
  const previous = noteHistory.value.pop()
  if (!previous) return
  highlighted.value = previous.highlighted
  savedNote.value = previous.note
  noteDraft.value = previous.note
  noteStatus.value = 'Last annotation change undone.'
}

const passages = [
  { title: 'Research question', text: 'Can reusable representations help a model when only a small amount of labelled data is available?' },
  { title: 'Method', text: 'A shared encoder learns representations before a smaller task-specific model is trained. The two stages answer different parts of the question.' },
  { title: 'Evaluation', text: 'A useful comparison would report the same datasets, metrics, and training budget for each method. Read those details before comparing results.' },
  { title: 'Limitations', text: 'Performance on one dataset does not establish that the method will transfer to another domain. Look for a separate test of this assumption.' },
  { title: 'Discussion', text: 'The next reading step is to connect each claim to the experiment that supports it, rather than treating the summary as evidence.' },
]
const readerView = ref<'reader' | 'summary'>('reader')
const readerElement = ref<HTMLElement | null>(null)
const readingBlock = ref(0)
const savedBlock = ref(0)
const search = ref('')
const mapPassage = ref<number | null>(null)
const visiblePassages = computed(() => passages.map((passage, index) => ({ ...passage, index }))
  .filter(passage => `${passage.title} ${passage.text}`.toLowerCase().includes(search.value.trim().toLowerCase())))

function trackPosition() {
  if (!readerElement.value || search.value) return
  const top = readerElement.value.getBoundingClientRect().top
  const visible = Array.from(readerElement.value.querySelectorAll<HTMLElement>('[data-block]'))
    .find(element => element.getBoundingClientRect().bottom > top + 24)
  if (visible) readingBlock.value = Number(visible.dataset.block)
}

async function scrollToBlock(index: number) {
  await nextTick()
  const root = readerElement.value
  const target = root?.querySelector<HTMLElement>(`[data-block="${index}"]`)
  if (!root || !target) return
  root.scrollTop += target.getBoundingClientRect().top - root.getBoundingClientRect().top - 20
  readingBlock.value = index
}

async function changeReader(view: 'reader' | 'summary') {
  if (view === readerView.value) return
  if (view === 'summary') savedBlock.value = readingBlock.value
  readerView.value = view
  if (view === 'reader') {
    search.value = ''
    await scrollToBlock(savedBlock.value)
  }
}

async function jumpToMethod() {
  search.value = ''
  await scrollToBlock(1)
}

async function selectScenario(scenario: Scenario) {
  if (running.value) cancel()
  active.value = scenario
  if (scenario === 'place' && readerView.value === 'reader') await scrollToBlock(readingBlock.value)
}

onBeforeUnmount(stop)
</script>

<template>
  <section id="reading-update" class="reading-update" aria-labelledby="reading-update-title">
    <header class="update-heading">
      <h2 id="reading-update-title">Less retracing.<br /><em>More reading.</em></h2>
      <div>
        <p>PaperBridge 1.9 gives you a clearer place to begin, then protects the work around the paper: translations, notes, and the passage you left off.</p>
        <p class="update-availability"><strong>New in PaperBridge 1.9.</strong> Available in the latest signed Mac download. These examples run in your browser, without files or AI requests.</p>
      </div>
    </header>

    <div class="update-workbench">
      <div class="update-index" aria-label="Try a reliability improvement">
        <button v-for="scenario in scenarios" :key="scenario.id" type="button"
          :aria-pressed="active === scenario.id" aria-controls="update-demo-panel"
          @click="selectScenario(scenario.id)">
          <strong>{{ scenario.title }}</strong><span>{{ scenario.detail }}</span>
        </button>
        <a href="https://github.com/haoyunLi/PaperBridge#reading-reliability-in-19" target="_blank" rel="noreferrer">Read the release notes</a>
      </div>

      <div id="update-demo-panel" class="update-demo-panel">
        <div class="update-demo-title"><strong>PaperBridge</strong><span>Interactive example · not a live model</span></div>

        <div v-if="active === 'resume'" class="resume-example">
          <header><h3>Translation progress</h3><span>{{ completed }} / {{ blocks.length }} complete</span></header>
          <progress :value="completed" :max="blocks.length" aria-label="Example translation progress"></progress>
          <ol class="translation-blocks">
            <li v-for="(status, index) in blocks" :key="index" :data-status="status">
              <span>Paragraph {{ index + 1 }}</span><strong>{{ statusLabels[status] }}</strong>
            </li>
          </ol>
          <div class="update-actions">
            <button v-if="running" type="button" class="update-primary" @click="cancel">Stop translation</button>
            <button v-else type="button" class="update-primary" :disabled="completed === blocks.length" @click="resume">{{ completed === blocks.length ? 'Translation complete' : 'Resume translation' }}</button>
            <button type="button" @click="resetTranslation">Reset example</button>
          </div>
          <p class="update-feedback" role="status">{{ translationStatus }}</p>
          <small class="update-footnote">Illustrative progress, not a speed benchmark. In the app, completed work is checkpointed locally.</small>
        </div>

        <div v-else-if="active === 'notes'" class="notes-example">
          <h3>A color can change.<br />The thought should stay.</h3>
          <blockquote>The model learns <mark :class="{ highlighted }">reusable representations</mark> before adapting to a new task.</blockquote>
          <label for="preview-note">Note attached to this passage</label>
          <textarea id="preview-note" v-model="noteDraft" rows="2" maxlength="500"></textarea>
          <div class="update-actions">
            <button type="button" class="update-primary" @click="toggleHighlight">{{ highlighted ? 'Remove highlight' : 'Restore highlight' }}</button>
            <button type="button" :disabled="savedNote === noteDraft.trim()" @click="saveNote">Save note</button>
            <button type="button" :disabled="!noteHistory.length" @click="undoNote">Undo change</button>
          </div>
          <p class="saved-note"><strong>Saved note</strong>{{ savedNote || 'No saved note.' }}</p>
          <p class="update-feedback" role="status">{{ noteStatus }}</p>
          <small class="update-footnote">This demo resets on page reload. The app saves notes locally; its annotation undo history is session-only.</small>
        </div>

        <div v-else-if="active === 'place'" class="place-example">
          <div class="place-toolbar" aria-label="Example reading workspace">
            <button type="button" :aria-pressed="readerView === 'reader'" @click="changeReader('reader')">Reader</button>
            <button type="button" :aria-pressed="readerView === 'summary'" @click="changeReader('summary')">Overview</button>
            <span>Block {{ (readerView === 'reader' ? readingBlock : savedBlock) + 1 }} / {{ passages.length }}</span>
          </div>
          <template v-if="readerView === 'reader'">
            <div class="place-search">
              <label for="preview-search">Find in paper</label>
              <input id="preview-search" v-model="search" type="search" placeholder="Try “dataset”" @keydown.esc="search = ''" />
              <button type="button" @click="jumpToMethod">Go to Method</button>
            </div>
            <div ref="readerElement" class="place-scroll" tabindex="0" aria-label="Scrollable sample paper" @scroll.passive="trackPosition">
              <article v-for="passage in visiblePassages" :key="passage.index" :data-block="passage.index">
                <h3>{{ passage.title }}</h3><p>{{ passage.text }}</p>
              </article>
              <p v-if="!visiblePassages.length" role="status">No matching passages. Try another word or clear the search.</p>
            </div>
          </template>
          <div v-else class="place-summary">
            <h3>The reading question</h3>
            <p>How does a reusable representation help when labelled data is limited? Check the method, evaluation, and limitations together.</p>
            <p>Your place is saved at <strong>{{ passages[savedBlock]!.title }}</strong>.</p>
            <button type="button" class="update-primary" @click="changeReader('reader')">Return to saved passage</button>
          </div>
          <p class="update-feedback">Try “Go to Method”, open Overview, then return. The search controls stay above the scrolling paper.</p>
          <small class="update-footnote">Fictional sample text. App restoration is by Reader block, PDF page, or Markdown viewport, not exact word position.</small>
        </div>

        <div v-else class="map-example">
          <template v-if="mapPassage === null">
            <p class="map-label">OVERVIEW · SOURCE READING MAP</p>
            <h3>Find your way into the paper.</h3>
            <p>No model. No invented answers. These are exact excerpts from the fictional sample below.</p>
            <ol class="map-passages">
              <li v-for="(passage, index) in passages" :key="passage.title">
                <button type="button" @click="mapPassage = index"><strong>{{ passage.title }}</strong><span>Read passage {{ index + 1 }} <span aria-hidden="true">→</span></span></button>
                <p>{{ passage.text }}</p>
              </li>
            </ol>
          </template>
          <template v-else>
            <p class="map-label">READER · ORIGINAL PASSAGE {{ mapPassage + 1 }}</p>
            <h3>{{ passages[mapPassage]!.title }}</h3>
            <blockquote>{{ passages[mapPassage]!.text }}</blockquote>
            <p>You are reading the original excerpt, not an AI answer. In the app, this opens the corresponding paragraph with translation and annotation tools available.</p>
            <button class="update-primary" type="button" @click="mapPassage = null">Back to source map</button>
          </template>
          <small class="update-footnote">Try a Practice Paper is also available in the app’s welcome screen. Missing or unclear headings fall back to an opening passage rather than fabricated sections.</small>
        </div>
      </div>
    </div>

    <details class="update-more">
      <summary>Also included in PaperBridge 1.9</summary>
      <ul>
        <li>Restored summaries and translations survive unrelated parser or lookup setting changes.</li>
        <li>PDF annotations keep the actual selection, including repeated words and multiple pages. Unresolvable anchors are reported rather than guessed.</li>
        <li>Markdown highlights update without reloading the preview. Bookmarks show passage text, and narrow windows use a bottom inspector.</li>
        <li>Setup downloads can continue in the background, and local save failures are made visible.</li>
        <li>The new Overview combines an exact-source reading map with optional AI summaries. A practice paper and clearer setup actions help you start without model downloads.</li>
      </ul>
    </details>
    <p class="update-release-note">Already using PaperBridge? Use <strong>Check for Updates</strong> in the app after a release is published. <a href="https://github.com/haoyunLi/PaperBridge/releases/latest" target="_blank" rel="noreferrer">See what is currently released</a>.</p>
  </section>
</template>

<style scoped>
.map-example { padding: 28px; }
.map-label { color: var(--blue); font-size: 0.7rem; font-weight: 700; letter-spacing: 0.05em; }
.map-example h3 { margin: 16px 0; font-family: var(--serif); font-weight: 470; font-size: 2rem; line-height: 1.15; }
.map-example > p:not(.map-label) { font-size: 0.85rem; line-height: 1.8; color: var(--ink-soft); }
.map-passages { list-style: none; margin: 24px 0; padding: 0; }
.map-passages li { padding: 15px 0; border-top: 1px solid var(--line); }
.map-passages button { width: 100%; padding: 0; border: 0; text-align: left; background: transparent; cursor: pointer; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px; min-height: 32px; align-items: center; }
.map-passages button > span { font-size: 0.75rem; color: var(--blue); }
.map-passages li p { font-family: var(--serif); font-size: 1.1rem; line-height: 1.6; margin: 8px 0 0; }
.map-example blockquote { margin: 28px 0; border-left: 2px solid var(--blue); padding-left: 20px; font-family: var(--serif); font-size: 1.45rem; line-height: 1.6; }
.map-example .update-footnote { display: block; margin-top: 24px; }
.reading-update { padding: 100px max(24px, calc((100vw - 1264px) / 2)); border-top: 1px solid var(--line); }
.update-heading { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; margin-bottom: 44px; }
.update-heading h2 { margin: 0; font-family: var(--serif); font-size: clamp(2.7rem, 4.5vw, 4.5rem); font-weight: 470; line-height: 1.03; letter-spacing: -0.03em; }
.update-heading h2 em { color: var(--blue); font-weight: inherit; }
.update-heading p { margin: 0 0 16px; line-height: 1.75; color: var(--ink-soft); }
.update-heading .update-availability { font-size: 0.82rem; }
.update-availability strong { color: var(--coral-dark); }
.update-workbench { display: grid; grid-template-columns: 0.72fr 1.28fr; gap: 44px; }
.update-index { display: flex; flex-direction: column; align-items: stretch; }
.update-index button { padding: 24px 20px; text-align: left; border: 0; border-bottom: 1px solid var(--line); background: transparent; cursor: pointer; }
.update-index button[aria-pressed=true] { background: var(--blue); color: var(--paper-light); }
.update-index button strong { display: block; font-size: 1.06rem; margin-bottom: 8px; }
.update-index button span { display: block; font-size: 0.85rem; line-height: 1.65; }
.update-index a { margin: 24px 20px; font-size: 0.82rem; color: var(--blue-dark); }
.update-demo-panel { min-width: 0; border: 1px solid var(--line); border-radius: 12px; overflow: hidden; background: var(--paper-light); }
.update-demo-title { display: flex; justify-content: space-between; gap: 12px; padding: 16px 24px; background: var(--paper-deep); font-size: 0.78rem; }
.update-demo-title span { color: var(--ink-soft); text-align: right; }
.resume-example, .notes-example, .place-example { padding: 28px; min-height: 480px; }
.resume-example header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
.resume-example header span { font-size: 0.8rem; font-variant-numeric: tabular-nums; }
.update-demo-panel h3 { margin: 0; font-family: var(--serif); font-size: 1.7rem; font-weight: 500; line-height: 1.15; }
progress { display: block; width: 100%; height: 6px; margin: 20px 0 10px; border: 0; accent-color: var(--blue); background: var(--paper-deep); }
progress::-webkit-progress-bar { background: var(--paper-deep); }
progress::-webkit-progress-value { background: var(--blue); }
progress::-moz-progress-bar { background: var(--blue); }
.translation-blocks { margin: 0 0 24px; padding: 0; list-style: none; }
.translation-blocks li { display: flex; justify-content: space-between; padding: 11px 0; gap: 12px; border-bottom: 1px solid var(--line); font-size: 0.79rem; transition: color 180ms, background 180ms; }
.translation-blocks li strong { font-weight: 650; }
.translation-blocks [data-status=saved] strong { color: var(--ink-soft); }
.translation-blocks [data-status=failed] strong { color: var(--coral-dark); }
.translation-blocks [data-status=working] { background: var(--blue-pale); color: var(--blue-dark); }
.translation-blocks [data-status=done] strong { color: var(--blue); }
.update-actions { display: flex; flex-wrap: wrap; gap: 10px; }
.update-actions button, .place-example button { min-height: 40px; padding: 9px 12px; border: 1px solid var(--line); border-radius: 6px; background: transparent; font-size: 0.78rem; cursor: pointer; }
.update-actions .update-primary, .place-example .update-primary { background: var(--blue); border-color: var(--blue); color: var(--paper-light); }
.update-actions button:not(:disabled):hover, .place-example button:hover { border-color: var(--blue); }
.update-actions button:disabled { opacity: 0.55; cursor: default; }
.update-feedback { min-height: 40px; margin: 18px 0 8px; font-size: 0.8rem; line-height: 1.65; }
.update-footnote { display: block; font-size: 0.8rem; line-height: 1.6; color: var(--ink-soft); }
.notes-example blockquote { margin: 22px 0; font-family: var(--serif); font-size: 1.35rem; line-height: 1.65; }
.notes-example mark { background: transparent; color: inherit; text-decoration: underline; text-decoration-color: var(--blue); text-underline-offset: 4px; transition: background 180ms; }
.notes-example mark.highlighted { background: #ffe2a3; }
.notes-example label { display: block; margin-bottom: 8px; font-size: 0.76rem; font-weight: 700; }
.notes-example textarea { width: 100%; padding: 10px; margin-bottom: 12px; resize: vertical; border: 1px solid var(--line); border-radius: 6px; background: var(--paper); color: var(--ink); font: inherit; font-size: 0.85rem; line-height: 1.5; caret-color: var(--blue); }
.saved-note { display: grid; gap: 6px; font-size: 0.8rem; line-height: 1.6; overflow-wrap: anywhere; }
.saved-note strong { font-size: 0.72rem; color: var(--blue-dark); }
.place-toolbar { display: flex; align-items: center; gap: 8px; padding-bottom: 14px; border-bottom: 1px solid var(--line); }
.place-toolbar button[aria-pressed=true] { background: var(--blue-pale); border-color: var(--blue); color: var(--blue-dark); }
.place-toolbar span { margin-left: auto; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.place-search { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 8px; padding: 14px 0; }
.place-search label { grid-column: 1 / -1; font-size: 0.75rem; font-weight: 700; }
.place-search input { min-width: 0; width: 100%; padding: 8px 10px; border: 1px solid var(--line); border-radius: 6px; background: var(--paper-light); color: var(--ink); caret-color: var(--blue); font-size: 0.82rem; }
.place-search input::placeholder { color: var(--ink-soft); }
.place-scroll { height: 238px; overflow-y: auto; overscroll-behavior: contain; background: var(--paper); padding: 20px; }
.place-scroll article { margin-bottom: 28px; }
.place-scroll article:last-child { margin-bottom: 140px; }
.place-scroll h3 { font-size: 1.3rem; }
.place-scroll p, .place-summary p { font-family: var(--serif); font-size: 1.15rem; line-height: 1.6; margin: 10px 0 0; }
.place-summary { min-height: 329px; padding: 24px 0; }
.place-summary button { margin-top: 22px; }
.update-release-note { max-width: 80ch; margin: 26px 0 0; font-size: 0.82rem; line-height: 1.75; color: var(--ink-soft); }
.update-more { margin-top: 26px; padding-top: 22px; border-top: 1px solid var(--line); font-size: 0.85rem; line-height: 1.75; }
.update-more summary { cursor: pointer; font-weight: 700; }
.update-more ul { max-width: 90ch; padding-left: 20px; }
.update-more li { margin-bottom: 8px; }
textarea:focus-visible, input:focus-visible, .place-scroll:focus-visible { outline: 3px solid var(--amber); outline-offset: 3px; }
@media (max-width: 960px) {
  .update-heading { grid-template-columns: 1fr; gap: 22px; }
  .update-workbench { grid-template-columns: 1fr; gap: 24px; }
  .update-index { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .update-index button { padding: 16px; }
  .update-index button span { display: none; }
  .update-index a { grid-column: 1 / -1; margin: 18px 0 0; }
}
@media (max-width: 540px) {
  .reading-update { padding: 64px 18px; }
  .update-index button { padding: 12px 10px; }
  .update-index button strong { font-size: 0.82rem; line-height: 1.5; margin: 0; }
  .update-demo-title { padding: 14px 16px; flex-wrap: wrap; }
  .update-demo-title span { font-size: 0.7rem; }
  .resume-example, .notes-example, .place-example { padding: 20px 16px; }
  .update-actions { gap: 8px; }
  .place-search { grid-template-columns: 1fr; }
  .place-toolbar { gap: 6px; }
}
@media (prefers-reduced-motion: reduce) {
  *, progress::-webkit-progress-value { transition: none !important; }
}
</style>
