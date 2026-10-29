<script setup lang="ts">
import { computed, ref } from 'vue'
import { features } from '../data/features'
import FeaturePractice from './FeaturePractice.vue'

const expandedIDs = ref(new Set(['bilingual']))
const allExpanded = computed(() => expandedIDs.value.size === features.length)

function toggleFeature(id: string) {
  const next = new Set(expandedIDs.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  expandedIDs.value = next
}

function toggleAll() {
  expandedIDs.value = allExpanded.value ? new Set() : new Set(features.map(feature => feature.id))
}
</script>

<template>
  <section id="capabilities" class="feature-guide" aria-labelledby="features-title">
    <header class="feature-heading">
      <h2 id="features-title">Every tool has<br /><em>a reading job.</em></h2>
      <p>From the first unfamiliar term to the notes you take away. Choose a task to see what it does, how to use it, and what to expect.</p>
      <button class="feature-expand-all" type="button" aria-controls="feature-chapters" @click="toggleAll">
        {{ allExpanded ? 'Collapse all features' : 'Expand all features' }}
      </button>
    </header>
    <div id="feature-chapters" class="feature-chapters">
      <article v-for="feature in features" :key="feature.id" class="feature-chapter"
        :class="{ 'is-expanded': expandedIDs.has(feature.id) }" :data-feature="feature.id">
        <h3>
          <button :id="`feature-trigger-${feature.id}`" class="feature-trigger" type="button"
            :aria-expanded="expandedIDs.has(feature.id)" :aria-controls="`feature-body-${feature.id}`"
            @click="toggleFeature(feature.id)">
            <span class="feature-title-group">
              <span class="feature-name">{{ feature.name }}</span>
              <span class="feature-question">{{ feature.question }}</span>
              <strong v-if="feature.newIn110" class="feature-availability">New in 1.10.0</strong>
              <strong v-else-if="feature.newIn19" class="feature-availability">New in 1.9</strong>
            </span>
            <svg class="feature-toggle-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14" /><path class="feature-toggle-stem" d="M12 5v14" />
            </svg>
          </button>
        </h3>
        <Transition name="chapter-reveal">
          <div v-show="expandedIDs.has(feature.id)" :id="`feature-body-${feature.id}`" class="feature-panel"
            :inert="!expandedIDs.has(feature.id)" :aria-labelledby="`feature-trigger-${feature.id}`" role="region">
            <div class="feature-clip">
              <div class="feature-detail">
                <p class="feature-benefit">{{ feature.benefit }}</p>
                <div class="feature-instructions">
                  <h4>In the app</h4>
                  <ol><li v-for="step in feature.steps" :key="step">{{ step }}</li></ol>
                </div>
                <dl>
                  <div><dt>What you need</dt><dd>{{ feature.needs }}</dd></div>
                  <div><dt>What stays intact</dt><dd>{{ feature.preserves }}</dd></div>
                  <div><dt>Good to know</dt><dd>{{ feature.limitation }}</dd></div>
                </dl>
                <p class="feature-example">{{ feature.example }}</p>
                <a :href="feature.demo">{{ feature.demo === '#getting-started' ? 'Choose your setup route' : 'Try an interactive example' }}
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>
                </a>
                <FeaturePractice v-if="feature.demo.startsWith('#practice-')" :kind="feature.id" />
              </div>
            </div>
          </div>
        </Transition>
      </article>
    </div>
    <p class="feature-boundary">PaperBridge 1.10.0 adds optional OpenAI alongside the reading tools introduced in 1.9 and 1.9.1. Download links serve the latest signed release. Website examples are illustrative, not live AI output.</p>
  </section>
</template>

<style scoped>
.feature-guide { display: grid; grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.9fr); column-gap: 80px; align-items: start; padding: 100px max(24px, calc((100vw - 1264px) / 2)); border-top: 1px solid var(--line); }
.feature-heading { position: sticky; top: 112px; }
.feature-heading h2 { margin: 0 0 28px; font-family: var(--serif); font-size: clamp(2.7rem, 4.2vw, 4rem); font-weight: 470; line-height: 1.03; letter-spacing: -0.03em; }
.feature-heading em { color: var(--blue); font-weight: inherit; }
.feature-heading > p { max-width: 36ch; margin: 0; color: var(--ink-soft); line-height: 1.8; font-size: 0.95rem; }
.feature-expand-all { min-height: 44px; margin-top: 24px; padding: 8px 0; border: 0; background: transparent; color: var(--blue); font-size: 0.88rem; font-weight: 700; text-decoration: underline; text-underline-offset: 5px; cursor: pointer; }
.feature-chapters { min-width: 0; border-bottom: 1px solid var(--line); }
.feature-chapter { border-top: 1px solid var(--line); scroll-margin-top: 96px; }
.feature-chapter h3 { margin: 0; }
.feature-trigger { display: flex; width: 100%; align-items: flex-start; justify-content: space-between; gap: 24px; padding: 28px 0; border: 0; background: transparent; text-align: left; cursor: pointer; }
.feature-title-group { display: grid; gap: 10px; min-width: 0; }
.feature-name { font-family: var(--serif); font-size: clamp(1.7rem, 2.5vw, 2.2rem); font-weight: 470; line-height: 1.1; letter-spacing: -0.02em; transition: color 180ms ease; }
.feature-question { color: var(--ink-soft); font-size: 0.88rem; line-height: 1.6; font-weight: 400; }
.feature-availability { font-family: var(--sans); font-size: 0.75rem; color: var(--coral-dark); }
.feature-toggle-icon { flex: 0 0 24px; width: 24px; height: 24px; margin-top: 4px; color: var(--blue); }
.feature-toggle-icon path, .feature-detail a path { fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
.feature-toggle-stem { transform-origin: center; transition: transform 420ms var(--ease); }
.is-expanded .feature-toggle-stem { transform: rotate(90deg); }
.is-expanded .feature-name { color: var(--blue); }
@media (hover: hover) { .feature-trigger:hover .feature-name { color: var(--blue); } }
.feature-panel { display: grid; grid-template-rows: 1fr; }
.feature-clip { overflow: hidden; min-height: 0; }
.feature-detail { padding: 4px 8px 36px; }
.feature-benefit { max-width: 70ch; color: var(--ink); line-height: 1.8; margin: 0 0 28px; font-size: 1rem; }
.feature-instructions { padding: 24px; background: var(--paper-light); margin-bottom: 28px; }
.feature-detail h4 { margin: 0 0 12px; font-size: 0.875rem; }
.feature-detail ol { padding-left: 22px; margin: 0; }
.feature-detail li { padding-left: 6px; margin: 10px 0; line-height: 1.75; font-size: 0.9rem; }
.feature-detail li:last-child { margin-bottom: 0; }
.feature-detail li::marker { color: var(--blue); font-weight: 700; }
.feature-detail dl { margin: 0; }
.feature-detail dl > div { display: grid; grid-template-columns: 136px minmax(0, 1fr); gap: 24px; padding: 18px 0; border-bottom: 1px solid var(--line); font-size: 0.875rem; line-height: 1.75; }
.feature-detail dt { font-weight: 700; color: var(--ink); }
.feature-detail dd { margin: 0; color: var(--ink-soft); }
.feature-example { margin: 28px 0 16px; max-width: 60ch; font-family: var(--serif); font-size: 1.35rem; line-height: 1.5; }
.feature-detail a { display: inline-flex; align-items: center; gap: 8px; min-height: 44px; color: var(--blue); font-size: 0.88rem; font-weight: 700; text-underline-offset: 5px; }
.feature-detail a svg { flex: 0 0 20px; width: 20px; height: 20px; }
.feature-boundary { grid-column: 2; color: var(--ink-soft); font-size: 0.8rem; line-height: 1.8; margin: 28px 0 0; }
.chapter-reveal-enter-active, .chapter-reveal-leave-active { transition: grid-template-rows 420ms var(--ease); }
.chapter-reveal-enter-from, .chapter-reveal-leave-to { grid-template-rows: 0fr; }
.chapter-reveal-enter-active .feature-detail, .chapter-reveal-leave-active .feature-detail { transition: opacity 240ms ease, transform 420ms var(--ease); }
.chapter-reveal-enter-from .feature-detail, .chapter-reveal-leave-to .feature-detail { opacity: 0; transform: translateY(-8px); }
@media (max-width: 960px) {
  .feature-guide { grid-template-columns: 1fr; padding-top: 70px; padding-bottom: 70px; }
  .feature-heading { position: static; margin-bottom: 32px; }
  .feature-heading > p { max-width: 65ch; }
  .feature-boundary { grid-column: 1; }
  .feature-expand-all { margin-top: 12px; }
}
@media (max-width: 540px) {
  .feature-trigger { gap: 16px; padding: 24px 0; }
  .feature-detail dl > div { grid-template-columns: 1fr; gap: 5px; }
  .feature-instructions { padding: 20px; }
  .feature-example { font-size: 1.25rem; }
}
@media (min-width: 961px) and (max-height: 700px) { .feature-heading { position: static; } }
@media (prefers-reduced-motion: reduce) {
  .chapter-reveal-enter-active, .chapter-reveal-leave-active,
  .chapter-reveal-enter-active .feature-detail, .chapter-reveal-leave-active .feature-detail,
  .feature-toggle-stem { transition: none; }
  .chapter-reveal-enter-from .feature-detail, .chapter-reveal-leave-to .feature-detail { transform: none; }
}
</style>
