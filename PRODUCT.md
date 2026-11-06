# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Researchers, students, and technical readers who work with academic PDFs on a Mac and need to understand papers written in another language without losing scientific context.

## Product Purpose

PaperBridge is a native macOS academic-paper reader. It turns a PDF or pasted text into a structured bilingual reading experience, then provides summaries, connected full-paper translation, and selected-text explanations through local Ollama by default or explicitly enabled OpenAI. Success means a reader can move between the source and translation while still trusting the original figures, formulas, tables, terminology, and document structure.

## Positioning

PaperBridge combines local document reconstruction with a choice of AI provider: MinerU or PDFKit preserves the paper as a scientific document, while local Ollama or opt-in OpenAI processes its text. PDF files and image bytes are not uploaded to OpenAI; online requests can include full extracted text in batches.

## Operating Context

Readers open or drag in a PDF, choose source and target languages, use automatically detected Ollama models, review the parsed structure, and translate the paper. They can then switch among the original paper, aligned bilingual reader, bilingual summary, and connected full translation. Exact text selections can be translated, explained, highlighted, annotated, or bookmarked. Results can be exported as Markdown with referenced assets.

## Capabilities and Constraints

- Native macOS application for macOS 14 or later.
- Local Ollama is the default; optional OpenAI is selected under Settings > Models, with separate translation, summary, paragraph-explanation, and quick-lookup models.
- OpenAI model fields start empty. Accessible Responses API text models are user-chosen; model listing is not capability or pricing data, and manual IDs are supported.
- OpenAI requires an API key and explicit session consent, with no automatic provider fallback. API usage is paid separately from ChatGPT.
- The key is stored in the local macOS Keychain with iCloud synchronization disabled, never settings or exports. Normal Mac backup/migration can include Keychain.
- Selection requests include selected text, nearby context, title, and matching terminology. Full translation/summary send full extracted text in batches, not PDF or image uploads. Responses API store:false does not guarantee zero retention.
- Output variants are retained locally per provider/model/language across restarts without restoring cloud consent; Local Data clears these variants too.
- TranslateGemma 4B is the lightweight recommended default; installed Ollama models are detected automatically.
- Optional local MinerU parsing reconstructs sections, reading order, figures, tables, formulas, and Markdown assets.
- Built-in PDFKit fallback preserves exact source pages when MinerU is unavailable.
- Source and target languages are configurable; English to Simplified Chinese is the default, not a fixed pair.
- Figures, standalone formulas, tables, units, code, and scientific identifiers are protected from ordinary paragraph translation.
- Recoverable paragraph failures can be retried; global OpenAI setup, key, access/model, or rate/quota errors stop the run rather than repeat the same failure for every paragraph.
- The website is a static Vue 3 and TypeScript site deployed through AWS Amplify.
- The signed and Apple-notarized Universal macOS app is available from GitHub Releases; download actions link directly to the current DMG asset.
- Windows 0.2.8 is available as an unsigned x64 development preview. Direct Setup and Portable executable downloads use the separate `windows-v0.2.8` release; GitHub's global latest remains the signed macOS release. Do not imply Windows is notarized, signed, or guaranteed feature-identical to macOS. Link the Windows setup guide for platform differences.

## Brand Commitments

- Product name: PaperBridge.
- Primary links: `paperbridges.net`, `github.com/haoyunLi/PaperBridge`, and `info@paperbridges.net`.
- The website should feel recognizably related to the native app and use a clean solid-color interface rather than decorative gradients.
- The product icon remains a recognizable brand asset, but the interface demonstration should lead the website rather than screenshots.
- Voice is calm, precise, academic, and practical. Avoid unsupported hype.

## Evidence on Hand

- Native app source and feature documentation in `../PaperBridge_work/`.
- Existing interactive simulations and product copy in `src/components/`.
- OpenAI feature truth: `../PaperBridge_UI_redesign/README.md` and `../PaperBridge_UI_redesign/PaperBridge/PaperReaderViewModel+AI.swift` for the 1.10.0 update.
- PaperBridge icon in `public/images/paperbridge-icon.png`.
- The project has no testimonials, customer logos, usage metrics, or independent performance benchmarks. Future marketing work must not fabricate them.

## Product Principles

- Preserve scientific meaning before optimizing translation flow.
- Keep parsing and saved work on the reader's Mac, use local inference by default, and make online text processing an informed, explicit choice.
- Show source and translation together so claims remain verifiable.
- Make advanced local tooling usable without requiring Terminal expertise.
- Explain the real workflow through interaction rather than static marketing claims.

## Accessibility & Inclusion

The marketing site must remain keyboard accessible, responsive from mobile through large desktop layouts, readable at increased text sizes, and respectful of `prefers-reduced-motion`.
