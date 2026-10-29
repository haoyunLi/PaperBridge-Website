<template>
  <section id="privacy" class="privacy-section" aria-labelledby="privacy-title">
    <div class="privacy-orbit" aria-hidden="true">
      <svg viewBox="0 0 220 220">
        <circle cx="110" cy="110" r="82" />
        <circle cx="110" cy="110" r="54" />
        <path d="M82 91h56v48H82zM94 91V76a16 16 0 0 1 32 0v15" />
      </svg>
      <span>YOUR MAC</span>
      <i class="orbit-dot one"></i><i class="orbit-dot two"></i><i class="orbit-dot three"></i>
    </div>
    <div class="privacy-copy">
      <h2 id="privacy-title">Your paper stays.<br /><em>You choose the AI.</em></h2>
      <p>PDF parsing, saved work, and exports stay on your Mac. With the default Ollama provider, inference stays local too. Optional OpenAI sends text directly to OpenAI only after you configure it and confirm session consent.</p>
      <p>Selected-text help sends the selection, nearby context, title, and matching terminology. Whole-paper translation and summary send full extracted text in batches. PDF files and images are not uploaded to OpenAI.</p>
      <p>The API key stays in the local macOS Keychain with iCloud synchronization disabled, never in settings or exports; normal backup or migration can include the Keychain. <code>store: false</code> does not guarantee zero retention. Review <a href="https://developers.openai.com/api/docs/guides/your-data" target="_blank" rel="noreferrer">OpenAI's data controls</a>.</p>
      <p>Tool/model downloads and update checks also use the internet. Local recovery, including saved provider variants across restarts, is not an independent backup. Keep exports of important work.</p>
      <a href="https://github.com/haoyunLi/PaperBridge" target="_blank" rel="noreferrer">Inspect the source on GitHub</a>
    </div>
    <div class="privacy-ledger">
      <p><b>No PaperBridge account</b><span>Open and read. OpenAI needs your own API key.</span></p>
      <p><b>No PDF or image upload</b><span>OpenAI receives text, not source files.</span></p>
      <p><b>No automatic fallback</b><span>Switch providers yourself; consent can be revoked.</span></p>
      <p><b>Separate API costs</b><span>OpenAI API usage is paid separately from ChatGPT.</span></p>
    </div>
  </section>
</template>
