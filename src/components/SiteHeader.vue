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
      <a href="#demo" @click="closeMenu">Demo</a>
      <a href="#workflow" @click="closeMenu">How it works</a>
      <a href="#privacy" @click="closeMenu">Privacy</a>
      <a href="https://github.com/haoyunLi/PaperBridge" target="_blank" rel="noreferrer">
        GitHub <span aria-hidden="true">↗</span>
      </a>
    </nav>
  </header>
</template>
