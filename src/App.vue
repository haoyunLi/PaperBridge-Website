<script setup lang="ts">
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import InteractiveDemo from './components/InteractiveDemo.vue'
import WorkflowSection from './components/WorkflowSection.vue'
import CapabilitiesSection from './components/CapabilitiesSection.vue'
import PrivacySection from './components/PrivacySection.vue'
import DownloadSection from './components/DownloadSection.vue'
import BrandMark from './components/BrandMark.vue'
</script>

<template>
  <div class="site-shell">
    <SiteHeader />
    <main>
      <HeroSection />
      <InteractiveDemo />
      <WorkflowSection />
      <CapabilitiesSection />
      <PrivacySection />
      <DownloadSection />
    </main>
    <footer class="site-footer">
      <BrandMark />
      <nav aria-label="Footer navigation">
        <a href="https://github.com/haoyunLi/PaperBridge" target="_blank" rel="noreferrer">GitHub ↗</a>
        <a href="https://github.com/haoyunLi/PaperBridge#readme" target="_blank" rel="noreferrer">Documentation</a>
        <a href="https://github.com/haoyunLi/PaperBridge/releases" target="_blank" rel="noreferrer">Releases</a>
        <a href="#privacy">Privacy</a>
      </nav>
      <div><a href="mailto:info@paperbridges.net">info@paperbridges.net</a><span>© 2026 PaperBridge</span></div>
    </footer>
  </div>
</template>
