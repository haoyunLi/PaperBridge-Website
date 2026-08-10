<script setup lang="ts">
import { ref } from 'vue'

type AssistantMode = 'translate' | 'explain'

defineProps<{
  translation: string
  explanation: string
}>()

const mode = defineModel<AssistantMode>({ required: true })
const highlighted = ref(false)
const noteAdded = ref(false)
const bookmarked = ref(false)
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
      <button :class="{ active: highlighted }" type="button" @click="highlighted = !highlighted">{{ highlighted ? 'Highlighted' : 'Highlight' }}</button>
      <button :class="{ active: noteAdded }" type="button" @click="noteAdded = !noteAdded">{{ noteAdded ? 'Note saved' : 'Add note' }}</button>
      <button :class="{ active: bookmarked }" type="button" @click="bookmarked = !bookmarked">{{ bookmarked ? 'Bookmarked' : 'Bookmark' }}</button>
    </div>
  </div>
</template>
