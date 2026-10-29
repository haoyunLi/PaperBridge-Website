<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

type Provider = 'ollama' | 'openai'
type Task = 'translation' | 'summary' | 'explanation' | 'lookup'

const tasks: { id: Task; label: string }[] = [
  { id: 'translation', label: 'Translation' },
  { id: 'summary', label: 'Summary' },
  { id: 'explanation', label: 'Paragraph explanation' },
  { id: 'lookup', label: 'Quick lookup' },
]
const provider = ref<Provider>('ollama')
const scope = ref<'selection' | 'paper'>('selection')
const consent = ref(false)
const models = reactive<Record<Provider, Record<Task, string>>>({
  ollama: { translation: 'translategemma:4b', summary: 'qwen3:4b-instruct', explanation: 'qwen3:4b-instruct', lookup: 'qwen3:4b-instruct' },
  openai: { translation: '', summary: '', explanation: '', lookup: '' },
})
const options = computed(() => provider.value === 'ollama'
  ? [{ id: 'translategemma:4b', label: 'TranslateGemma 4B' }, { id: 'qwen3:4b-instruct', label: 'Qwen 3 4B' }]
  : [{ id: 'example-text-model-a', label: 'Example text model A' }, { id: 'example-text-model-b', label: 'Example text model B' }])
const status = computed(() => {
  if (provider.value === 'ollama') return 'Local Ollama: text requests stay on your Mac.'
  if (!consent.value) return 'OpenAI paused: the app needs your consent for this session.'
  if (tasks.some(task => !models.openai[task.id])) return 'Consent illustrated. Empty task models still need your choice in the app.'
  return 'Models and consent illustrated. In the app, you start each task explicitly.'
})

function chooseProvider(next: Provider) {
  if (provider.value === next) return
  provider.value = next
  consent.value = false
}

function copyTranslationModel() {
  const model = models[provider.value].translation
  if (!model) return
  for (const task of tasks) models[provider.value][task.id] = model
}

function resetDemo() {
  provider.value = 'ollama'
  scope.value = 'selection'
  consent.value = false
  Object.assign(models.ollama, { translation: 'translategemma:4b', summary: 'qwen3:4b-instruct', explanation: 'qwen3:4b-instruct', lookup: 'qwen3:4b-instruct' })
  for (const task of tasks) models.openai[task.id] = ''
}
</script>

<template>
  <section id="ai-providers" class="provider-section" aria-labelledby="provider-title">
    <div class="provider-copy">
      <h2 id="provider-title">Local by default.<br /><em>Online by choice.</em></h2>
      <p>PaperBridge 1.10.0 keeps Ollama as the default and adds optional OpenAI text processing. The paper stays in the same reader. You choose where the AI work happens.</p>
      <p>Open <strong>Settings &gt; Models</strong> to choose a provider and a model for each task. OpenAI starts with no model selected and never becomes an automatic fallback.</p>
      <p>Use your own API key in the Mac app, not this website. <strong>OpenAI API usage is paid separately from ChatGPT.</strong></p>
      <a href="#getting-started">Choose your setup route</a>
      <details class="provider-details">
        <summary>Before you enable OpenAI</summary>
        <ul>
          <li>The key goes in the local macOS Keychain with iCloud synchronization disabled, never in settings or exports. Normal Mac backup or migration can include the Keychain.</li>
          <li>Choose a text model your API project can access. Model discovery uses <code>GET /v1/models</code>, not inference; its list does not establish capability or price. The app also accepts manual model IDs.</li>
          <li>Consent lasts for the app session. Revoke it in Settings, even during a task; already sent text cannot be recalled.</li>
          <li>Text generation uses the Responses API with <code>store: false</code>. This does not mean zero retention; OpenAI's data policies still apply.</li>
          <li>Optional translation style instructions, up to 2,000 characters, are also sent to the selected provider. Do not include secrets.</li>
        </ul>
        <p><a href="https://developers.openai.com/api/docs/guides/your-data" target="_blank" rel="noreferrer">OpenAI data controls</a> · <a href="https://platform.openai.com/usage" target="_blank" rel="noreferrer">API usage and costs</a></p>
      </details>
    </div>

    <div class="provider-demo" aria-label="Illustrative AI provider settings">
      <header class="provider-demo-header"><strong>Settings &gt; Models</strong><span>Interactive illustration</span></header>
      <div class="provider-demo-body">
        <p id="provider-demo-note" class="provider-demo-note">No key entry, uploads, or model calls. Every control below only changes this example.</p>
        <div class="provider-switch" role="group" aria-label="Illustrative AI provider" aria-describedby="provider-demo-note">
          <button type="button" :aria-pressed="provider === 'ollama'" @click="chooseProvider('ollama')">Ollama <span>Local · default</span></button>
          <button type="button" :aria-pressed="provider === 'openai'" @click="chooseProvider('openai')">OpenAI <span>Online · optional</span></button>
        </div>

        <div class="provider-models">
          <div v-for="task in tasks" :key="task.id" class="provider-model-row">
            <label :for="`provider-model-${task.id}`">{{ task.label }}</label>
            <select :id="`provider-model-${task.id}`" v-model="models[provider][task.id]" aria-describedby="provider-model-note">
              <option value="">Choose a model</option>
              <option v-for="option in options" :key="option.id" :value="option.id">{{ option.label }}</option>
            </select>
          </div>
        </div>
        <div class="provider-actions">
          <button class="provider-action" type="button" :disabled="!models[provider].translation" @click="copyTranslationModel">Use translation model for all tasks</button>
          <button class="provider-reset" type="button" @click="resetDemo">Reset demo</button>
        </div>
        <p id="provider-model-note" class="provider-help">{{ provider === 'openai' ? 'Example models A and B are fictional, not recommendations or available API model IDs. The app has no OpenAI model default.' : 'These local choices illustrate installed models. Your Mac lists the models you have downloaded.' }}</p>

        <label v-if="provider === 'openai'" class="provider-consent">
          <input v-model="consent" type="checkbox" />
          <span>Illustrate consent for this session<small>In the app, consent permits the text sharing described below. This demo sends nothing.</small></span>
        </label>
        <p class="provider-status" role="status">{{ status }}</p>

        <div class="provider-boundary">
          <h3>{{ provider === 'openai' ? 'What would go to OpenAI?' : 'What stays with Ollama?' }}</h3>
          <div class="provider-scope" role="group" aria-label="Illustrative request scope">
            <button type="button" :aria-pressed="scope === 'selection'" @click="scope = 'selection'">Selected-text help</button>
            <button type="button" :aria-pressed="scope === 'paper'" @click="scope = 'paper'">Whole-paper tasks</button>
          </div>
          <div aria-live="polite" class="provider-scope-copy">
            <template v-if="scope === 'selection'">
              <p><strong>Selected text, nearby context, paper title, and matching saved terminology.</strong> Context helps interpret the selection; the translation should not expand into an explanation.</p>
              <p class="provider-selection-example"><q>may reduce inflammation</q><span>可能减轻炎症</span><small>Illustrative translation: the uncertainty in “may” stays.</small></p>
            </template>
            <p v-else><strong>Full extracted paper text, sent in batches</strong> for full translation and summary, not just the visible selection. Whole-paper tasks can make multiple paid requests when OpenAI is selected.</p>
          </div>
          <p class="provider-resource-note">{{ provider === 'openai' ? 'PDF files and images are not uploaded to OpenAI.' : 'PDF parsing and Ollama inference remain on your Mac.' }} Original formulas and images stay protected; natural-language captions can be translated.</p>
        </div>
      </div>
      <footer class="provider-demo-footer"><strong>Changing providers does not discard your work.</strong> In the app, output variants are retained locally by provider, model, and language across restarts. Cloud consent is not restored; Local Data can clear the variants. This website example resets on page reload.</footer>
    </div>
  </section>
</template>
