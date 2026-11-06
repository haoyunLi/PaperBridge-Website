<script setup lang="ts">
import { ref } from 'vue'
import BrandMark from './BrandMark.vue'
import { macDownloadURL, windowsDownloadURL } from '../data/downloads'

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
      <a href="#getting-started" @click="closeMenu">Getting started</a>
      <a href="https://github.com/haoyunLi/PaperBridge" target="_blank" rel="noreferrer">
        GitHub
      </a>
      <a
        class="header-download"
        :href="macDownloadURL"
        target="_blank"
        rel="noreferrer"
        @click="closeMenu"
      >Download for Mac</a>
      <a class="header-download" :href="windowsDownloadURL" aria-label="Download for Windows (x64 preview)" @click="closeMenu">Windows (preview)</a>
    </nav>
  </header>
</template>
