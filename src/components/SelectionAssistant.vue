<script setup lang="ts">
type AssistantMode = 'translate' | 'explain'

defineProps<{
  translation: string
  explanation: string
}>()

const mode = defineModel<AssistantMode>({ required: true })
</script>

<template>
  <div class="term-popover" role="dialog" aria-label="Selected term assistant">
    <div class="popover-tabs">
      <button :class="{ active: mode === 'translate' }" type="button" @click="mode = 'translate'">Translate</button>
      <button :class="{ active: mode === 'explain' }" type="button" @click="mode = 'explain'">Explain</button>
    </div>
    <Transition name="fade" mode="out-in">
      <div :key="mode">
        <strong>{{ mode === 'translate' ? translation : 'In simple terms' }}</strong>
        <p>{{ mode === 'translate' ? 'Only the selected text is translated.' : explanation }}</p>
      </div>
    </Transition>
    <div class="annotation-actions">
      <button type="button">Highlight</button>
      <button type="button">Add note</button>
      <button type="button">Bookmark</button>
    </div>
  </div>
</template>
