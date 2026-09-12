<script setup lang="ts">
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import InteractiveDemo from './components/InteractiveDemo.vue'
import ReadingUpdateSection from './components/ReadingUpdateSection.vue'
import WorkflowSection from './components/WorkflowSection.vue'
import CapabilitiesSection from './components/CapabilitiesSection.vue'
import GettingStartedSection from './components/GettingStartedSection.vue'
import PrivacySection from './components/PrivacySection.vue'
import FAQSection from './components/FAQSection.vue'
import DownloadSection from './components/DownloadSection.vue'
import BrandMark from './components/BrandMark.vue'
</script>

<template>
  <div class="site-shell">
    <SiteHeader />
    <main>
      <HeroSection />
      <WorkflowSection />
      <InteractiveDemo />
      <ReadingUpdateSection />
      <CapabilitiesSection />
      <GettingStartedSection />
      <PrivacySection />
      <FAQSection />
      <DownloadSection />
    </main>
    <footer class="site-footer">
      <BrandMark />
      <nav aria-label="Footer navigation">
        <a href="https://github.com/haoyunLi/PaperBridge" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://github.com/haoyunLi/PaperBridge#readme" target="_blank" rel="noreferrer">Documentation</a>
        <a href="https://github.com/haoyunLi/PaperBridge/releases/latest/download/PaperBridge.dmg" target="_blank" rel="noreferrer">Download</a>
        <a href="#privacy">Privacy</a>
        <a href="#reading-update">New in 1.9</a>
      </nav>
      <div><a href="mailto:info@paperbridges.net">info@paperbridges.net</a><span>© 2026 PaperBridge</span></div>
    </footer>
  </div>
</template>
