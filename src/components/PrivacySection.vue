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
      <h2 id="privacy-title">The shortest route is<br /><em>paper to your Mac.</em></h2>
      <p>There is no PaperBridge cloud between your research and the models you choose. PDF parsing, translation, summary, explanation, caching, and export happen on your device.</p>
      <a href="https://github.com/haoyunLi/PaperBridge" target="_blank" rel="noreferrer">Inspect the source on GitHub</a>
    </div>
    <div class="privacy-ledger">
      <p><b>No account</b><span>Open the app and read.</span></p>
      <p><b>No paper upload</b><span>Files stay in local folders.</span></p>
      <p><b>No remote model API</b><span>Requests go to local Ollama.</span></p>
      <p><b>No tracking</b><span>Your reading activity is yours.</span></p>
    </div>
  </section>
</template>
