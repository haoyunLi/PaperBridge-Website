<script setup lang="ts">
import { macDownloadURL, windowsDownloadURL, windowsGuideURL, windowsPortableURL, windowsReleaseURL, windowsVersion } from '../data/downloads'
</script>

<template>
  <section id="download" class="download-section" aria-labelledby="download-title">
    <div class="download-copy">
      <h2 id="download-title">Your next paper,<br /><em>closer.</em></h2>
      <p>Keep the original, figures, and formulas in view. Read with local Ollama or explicitly opt in to OpenAI text processing.</p>
      <div class="download-actions">
        <a
          class="button download-primary"
          :href="macDownloadURL"
          target="_blank"
          rel="noreferrer"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M16.9 13.5c0-2.8 2.3-4.2 2.4-4.3a5.2 5.2 0 0 0-4.1-2.2c-1.7-.2-3.4 1-4.3 1s-2.3-1-3.8-1c-2 0-3.8 1.2-4.8 3-2.1 3.7-.5 9.1 1.5 12 .9 1.4 2.1 3 3.6 2.9 1.5-.1 2.1-1 3.9-1 1.8 0 2.3 1 3.9 1 1.6 0 2.6-1.4 3.5-2.8a13 13 0 0 0 1.6-3.3 5.1 5.1 0 0 1-3.4-5.3ZM14 5.2A5 5 0 0 0 15.2 1a5.1 5.1 0 0 0-3.4 1.7 4.7 4.7 0 0 0-1.3 3.5A4.3 4.3 0 0 0 14 5.2Z" />
          </svg>
          Download for macOS
        </a>
        <a class="button download-primary" :href="windowsDownloadURL" aria-describedby="windows-download-note">Download for Windows</a>
        <a href="https://github.com/haoyunLi/PaperBridge" target="_blank" rel="noreferrer">View source and build guide</a>
      </div>
      <small>macOS 14 or later · Apple Silicon and Intel · Ollama required for local AI</small>
    </div>

    <div class="platform-status">
      <article class="available-platform">
        <span><i></i> Version 1.10.0</span>
        <h3>PaperBridge for macOS</h3>
        <p>Universal Apple Silicon and Intel build, Developer ID signed and Apple notarized. Local by default, OpenAI optional.</p>
        <a :href="macDownloadURL">Download the signed Mac app</a>
      </article>
      <article class="available-platform preview-platform">
        <span>Version {{ windowsVersion }} · Development preview</span>
        <h3>PaperBridge for Windows</h3>
        <p id="windows-download-note">Windows x64. Setup installs for your Windows user; Portable runs without installation. These preview builds are unsigned and Windows SmartScreen may show a warning.</p>
        <div class="platform-links">
          <a :href="windowsDownloadURL">Download Windows installer (.exe)</a>
          <a :href="windowsPortableURL">Download portable (.exe)</a>
          <a :href="windowsGuideURL" target="_blank" rel="noreferrer">Windows setup and feature differences</a>
          <a :href="windowsReleaseURL" target="_blank" rel="noreferrer">Release notes and SHA-256 checksums</a>
        </div>
      </article>
    </div>
  </section>
</template>
