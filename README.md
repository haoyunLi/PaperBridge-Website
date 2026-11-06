# PaperBridge Website

Marketing and interactive product-demo website for [PaperBridge](https://github.com/haoyunLi/PaperBridge), built with Vue 3, TypeScript, and Vite.

![PaperBridge website preview](./public/images/paperbridge-social-v4.png)

## Downloads

- [Download for macOS (.dmg)](https://github.com/haoyunLi/PaperBridge/releases/latest/download/PaperBridge.dmg)
- [Download for Windows (.exe)](https://github.com/haoyunLi/PaperBridge/releases/download/windows-v0.2.8/PaperBridge-Windows-0.2.8-x64-Setup.exe)
- [Windows portable (.exe)](https://github.com/haoyunLi/PaperBridge/releases/download/windows-v0.2.8/PaperBridge-Windows-0.2.8-x64-Portable.exe)

Windows 0.2.8 is an unsigned x64 development preview; SmartScreen may display a warning. See the [Windows setup guide and feature differences](https://github.com/haoyunLi/PaperBridge/blob/windows-v0.2.8/windows/README.md) and [release notes/checksums](https://github.com/haoyunLi/PaperBridge/releases/tag/windows-v0.2.8). Website simulations and setup examples depict macOS, not guaranteed Windows feature parity.

Website download destinations live in `src/data/downloads.ts`. Windows buttons link straight to the Setup asset, not the release page. When publishing a Windows update, update `windowsVersion` and the versioned URLs in both repositories' READMEs after checking the new assets. Do not use `releases/latest/download` for Windows: that endpoint belongs to the macOS release and its update feed.

The interactive examples explain the native macOS workflow: local PDF reconstruction with MinerU/PDFKit, local Ollama or optional OpenAI text processing, bilingual reading, summaries, selected-text tools, translated captions, and preserved figures and formulas. They use illustrative content, not screenshots or live AI. Language controls demonstrate app settings; the sample content stays English / Simplified Chinese.

## AI provider choice in 1.10.0

The `#ai-providers` section presents the optional OpenAI feature alongside the existing local workflow, using the site's existing solid navy/cobalt/warm-paper/coral surfaces and typography. Availability copy targets **PaperBridge 1.10.0**; publish this website update only after that signed release and its update feed are available. The permanent DMG URL is unchanged.

`AIProvidersSection.vue` is an in-memory illustration, not an API client. It accepts no keys, uploads no documents, makes no model requests, and stores nothing in browser storage. OpenAI choices A and B are fictional labels, not real model IDs or recommendations. The initial provider is Ollama; all four OpenAI task-model fields start empty.

- Switch providers to compare local and online behavior; each provider keeps its illustrative task selections until page reload or Reset demo.
- Choose separate translation, summary, paragraph explanation, and quick-lookup models, or explicitly copy the translation model to every task. The copy button stays disabled with an empty translation choice.
- Toggle illustrative session consent to see OpenAI's paused/configuration states. Changing providers revokes the demonstration consent. Nothing is transmitted in any state.
- Switch Selected-text help / Whole-paper tasks to see the actual app's text-sharing boundary. Selected text is accompanied by nearby context, title, and matching terminology; full translation/summary send full extracted text in batches. PDF files and images are not uploaded to OpenAI.
- Expand Before you enable OpenAI for Keychain, model-discovery/manual-ID, session-revocation, style-guide, costs, and retention details. The native app uses the Responses API with `store: false`, which does not guarantee zero retention. API usage is paid separately from ChatGPT; there is no automatic fallback.

The app stores keys in the local macOS Keychain with iCloud synchronization disabled, never in settings or exports; normal backup/migration can include Keychain. App output variants are retained locally by provider/model/language across settings changes and restarts without restoring cloud consent. Local Data clears variants. The website does not simulate durable disk storage or a real Keychain.

Feature descriptions also reflect import feedback (filename, elapsed time, recognized stages; no invented overall percentage), returning to the prior paper after a canceled/failed import, and selection-translation instructions that retain uncertainty, names, symbols, and units rather than expand into explanation. These are safeguards, not a promise of perfect extraction or AI accuracy. Formula/image protection and translatable captions remain unchanged.

The source of truth for this update is `../PaperBridge_UI_redesign/README.md`, `PaperReaderViewModel+AI.swift`, the selection workflow, and the variant-persistence implementation in that app repository. The website is not a release mechanism; deployment verification belongs to the publishing agent.

## Reading continuity in 1.9.1

The `#reading-update` section demonstrates four locally implemented app improvements:

- Resume a stopped translation without repeating saved blocks; stop and resume the simulated task.
- Edit a note with automatic save feedback, switch examples and return, or remove a highlight while keeping its note. Save Now and undo remain available.
- Follow a source from Overview, use Back / Forward to retrace the jump, or return to the saved block; search stays above the scrollable text.
- Open a detected section from the source reading map. The displayed excerpt remains exactly the same in the example Reader, with no generated answer.

The note-autosave and Back / Forward improvements ship in **PaperBridge 1.9.1**, alongside compact bilingual headings and persistent progress/save status. The earlier reliability tools shipped in 1.9. Demo timers illustrate states and are not performance claims. Browser examples make no document uploads or model requests; notes are memory-only and disappear on page reload. App reading history is session-only; force quit during the short autosave delay can lose the latest keystrokes.

The app README includes matching feature descriptions and verification notes in `docs/reliability-update.md`. Version 1.9 contains the six reading-efficiency features below. Comprehensive paragraph reconstruction and semantic verification of AI claims are not promised.

## Feature and setup guides

`#capabilities` explains eighteen reading tasks. The original twelve cover importing, preserved resources, bilingual reading, selected-text help, summaries, full translation, annotations, navigation, export, models, recovery, and the source map. Six new chapters cover extraction checks, section translation, the local library, quick help/terminology, summary sources, and reading comfort.

Each feature includes its use case, three in-app steps, installation requirements, preserved content, practical limits, and an interactive example link. All titles remain visible in a chapter-style list, with independently expandable details and expand/collapse all. Desktop keeps the introduction alongside the chapters; mobile uses one column without a dropdown. Reduced motion and inert collapsed content are supported. Descriptions live in `src/data/features.ts`.

`FeaturePractice.vue` embeds six lightweight examples directly inside their chapters:

- Compare a cut-off sentence against fictional original context without guessing the missing words.
- Translate Abstract/Conclusion first; cancel/resume the remaining section simulation without repeating completed items.
- Search two sample library records and switch between their independent reading positions and notes.
- Review and save a preferred translation in a memory-only demonstration glossary.
- Open an illustrative source quotation and contrast it with a claim lacking a validated source link.
- Adjust text size/spacing and toggle a compact focus-reading example.

All sample papers, translations, claims, progress states, and saved terms are illustrative. They are not live model responses, benchmarks, actual user files, or persistent browser storage. In the native app, quotation validation proves location rather than correctness; glossary entries guide future prompts, not guaranteed substitutions.

`#getting-started` has four selectable routes: reading without models, local translation, local explanation/summary, or OpenAI. The online route points to Settings > Models rather than requiring an Ollama download. It keeps MinerU separate and recommended for either provider, explains TranslateGemma 4B/12B/27B for local users, and states memory/network requirements. The hero links to both this guide and the provider demonstration.

Privacy copy distinguishes on-device parsing and local Ollama inference from explicitly enabled OpenAI text processing, downloads, update checks, and links. Structured Markdown is not described as a pixel-identical translated PDF. Availability labels must stay aligned with the signed app release.

### Keep the website and app documentation aligned

1. Verify behavior in the app source and tests before changing feature claims.
2. Update the app README, this README, the interactive example, and the related FAQ together.
3. Keep unreleased work labeled as a development preview. A website deployment does not publish an app update.
4. After a signed app release and update feed are published, verify its release notes before changing availability labels.
5. Keep macOS download links on the stable `releases/latest/download/PaperBridge.dmg` URL. Do not turn preview examples into a second download destination.

## Requirements

- Node.js 22.18 or newer
- npm 10 or newer

## Local development

```bash
npm install
npm run dev
```

Open the local address shown in Terminal, normally `http://localhost:5173`.

## Production build

```bash
npm run build
```

The static site is written to `dist/` and can be deployed with AWS Amplify Hosting or S3 + CloudFront.

## Deploy to AWS Amplify

The included `amplify.yml` installs the required Node version, builds the Vue app, and publishes `dist/`.

1. Push this folder to a GitHub repository, for example `PaperBridge-Website`.
2. Sign in to the AWS account that manages `paperbridges.net`.
3. Open **AWS Amplify → Create new app → GitHub**.
4. Authorize GitHub, choose the website repository and its production branch, then continue.
5. Confirm that Amplify detected `amplify.yml`, then choose **Save and deploy**.
6. After the first deployment succeeds, open **Hosting → Custom domains → Add domain**.
7. Select `paperbridges.net`, map the production branch to the root domain, and add `www` as a redirect to the root domain.
8. Choose the free **Amplify managed certificate** and finish the setup.

Because the domain is managed by Route 53 in the same AWS account, Amplify can create the required DNS verification and HTTPS records automatically. Domain activation can take time while DNS and the certificate propagate.

No environment variables or backend services are required.

For the existing site, pushes to the Amplify-connected production branch can trigger a deployment. Check that the deployment succeeded before telling users the live website has changed. A successful local build alone does not update the domain.

## Validation

Run `npm run build` for TypeScript checks and a production build, then verify the preview at desktop and mobile widths. Exercise the four original interactive examples, six inline practices, and provider demonstration. Check all eighteen feature entries and four setup routes, keyboard focus, reduced motion, no-match search, cancellation/resume, glossary input, source expansion, typography/focus controls, console errors, and the direct-download URL. No demo may request Ollama/OpenAI, accept an API key, or upload content.

For 1.10.0, test `#ai-providers`: initial Ollama state; OpenAI's four empty models; disabled copy action until a translation model is chosen; distinct per-task choices; explicit copy-to-all; consent on/off; both request scopes; provider switching retaining sample model choices but clearing consent; and Reset demo returning to local defaults with empty OpenAI fields. Verify the new OpenAI setup route and feature chapter, expand the privacy details, and check that no API network requests occur. Check 1440px and 390px layouts plus a 320px narrow pass, keyboard labels/focus, and unchanged downloads. Browser validation of this update is assigned to the publishing agent; earlier results below apply only to the earlier site revisions.

Local checks covered desktop/mobile layouts, feature/setup choices, and the four interactive examples, with no console errors or external demo requests. The former feature dropdown has been replaced with accessible disclosure buttons; verify Enter/Space, independent expansion, expand/collapse all, and no focusable links inside collapsed chapters. The design detector reports intermediate type sizes absent from the sparse `DESIGN.md` ramp; existing typography and palette were preserved rather than rewriting the design system during this feature task.

The earlier chapter presentation was checked at 1440px, 1024px, 390px, and 320px. The six-feature extension keeps that presentation rather than bringing back the disliked dropdown or screenshot swaps. The 1.9.1 continuity examples were checked at 1440px and 390px, with no page overflow or console errors: note autosave, scenario switching, highlight removal, undo, source navigation, and Back / Forward. Availability wording distinguishes the 1.9 tools from the 1.9.1 fixes.

The extension passed production build and Chrome checks at 1440x1000, 390x844, and 320x740. All eighteen descriptions were present; the six practices responded correctly, including Enter expansion, cancelled section work retaining results, no-match library search, term saving, source quotations, and reading controls. No console errors or horizontal overflow were found. The small-screen reading example now places navigation above the text. Native Browser plugin was unavailable, so an isolated Playwright/Chrome session was used, with no personal browser profile. Visual review was performed in-thread; the existing sparse design-type-ramp advisories remain, and no design-system rewrite was made.

## Domain

Production domain: [paperbridges.net](https://paperbridges.net)

## Primary links

- latest macOS direct download: `https://github.com/haoyunLi/PaperBridge/releases/latest/download/PaperBridge.dmg`
- release details: `https://github.com/haoyunLi/PaperBridge/releases/latest`
- current signed release: the latest GitHub Release (Universal, Apple notarized)
- source: `https://github.com/haoyunLi/PaperBridge`
- contact: `info@paperbridges.net`
