<script setup lang="ts">
import { ref } from 'vue'
import BrandMark from './BrandMark.vue'

const menuOpen = ref(false)

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <header class="site-header" :class="{ 'menu-open': menuOpen }">
    <BrandMark />
    <button
      class="menu-toggle"
      type="button"
      :aria-expanded="menuOpen"
      aria-controls="site-navigation"
      aria-label="Toggle navigation"
      @click="menuOpen = !menuOpen"
    >
      <span></span><span></span>
    </button>
    <nav id="site-navigation" aria-label="Primary navigation">
      <a href="#reader" @click="closeMenu">Live reader</a>
      <a href="#workflow" @click="closeMenu">How it works</a>
      <a href="#capabilities" @click="closeMenu">Features</a>
      <a href="https://github.com/haoyunLi/PaperBridge" target="_blank" rel="noreferrer">
        GitHub
      </a>
      <a class="header-download" href="https://github.com/haoyunLi/PaperBridge#6-build-the-macos-app-from-terminal" @click="closeMenu">Build for Mac</a>
    </nav>
  </header>
</template>
