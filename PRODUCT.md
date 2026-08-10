# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Researchers, students, and technical readers who work with academic PDFs on a Mac and need to understand papers written in another language without losing scientific context.

## Product Purpose

PaperBridge is a native macOS academic-paper reader. It turns a PDF or pasted text into a structured bilingual reading experience, then provides local summaries, connected full-paper translation, and selected-text explanations. Success means a reader can move between the source and translation while still trusting the original figures, formulas, tables, terminology, and document structure.

## Positioning

PaperBridge combines local document reconstruction with local language models: MinerU or PDFKit preserves the paper as a scientific document, while Ollama translates only the language that should change. The source PDF never needs to be uploaded to a cloud document service.

## Operating Context

Readers open or drag in a PDF, choose source and target languages, use automatically detected Ollama models, review the parsed structure, and translate the paper. They can then switch among the original paper, aligned bilingual reader, bilingual summary, and connected full translation. Exact text selections can be translated, explained, highlighted, annotated, or bookmarked. Results can be exported as Markdown with referenced assets.

## Capabilities and Constraints

- Native macOS application for macOS 14 or later.
- Local Ollama inference with configurable translation, summary, and explanation models.
- TranslateGemma 4B is the lightweight recommended default; installed Ollama models are detected automatically.
- Optional local MinerU parsing reconstructs sections, reading order, figures, tables, formulas, and Markdown assets.
- Built-in PDFKit fallback preserves exact source pages when MinerU is unavailable.
- Source and target languages are configurable; English to Simplified Chinese is the default, not a fixed pair.
- Figures, standalone formulas, tables, units, code, and scientific identifiers are protected from ordinary paragraph translation.
- A failed paragraph does not stop the rest of the paper, and individual failures can be retried.
- The website is a static Vue 3 and TypeScript site deployed through AWS Amplify.
- The signed and Apple-notarized Universal macOS app is available from GitHub Releases; download actions link directly to the current DMG asset.
- A Windows version is planned and may be labelled "coming soon," but it must not offer a download before it exists.

## Brand Commitments

- Product name: PaperBridge.
- Primary links: `paperbridges.net`, `github.com/haoyunLi/PaperBridge`, and `info@paperbridges.net`.
- The website should feel recognizably related to the native app and use a clean solid-color interface rather than decorative gradients.
- The product icon remains a recognizable brand asset, but the interface demonstration should lead the website rather than screenshots.
- Voice is calm, precise, academic, and practical. Avoid unsupported hype.

## Evidence on Hand

- Native app source and feature documentation in `../PaperBridge_work/`.
- Existing interactive simulations and product copy in `src/components/`.
- PaperBridge icon in `public/images/paperbridge-icon.png`.
- The project has no testimonials, customer logos, usage metrics, or independent performance benchmarks. Future marketing work must not fabricate them.

## Product Principles

- Preserve scientific meaning before optimizing translation flow.
- Keep papers and model inference on the reader's Mac.
- Show source and translation together so claims remain verifiable.
- Make advanced local tooling usable without requiring Terminal expertise.
- Explain the real workflow through interaction rather than static marketing claims.

## Accessibility & Inclusion

The marketing site must remain keyboard accessible, responsive from mobile through large desktop layouts, readable at increased text sizes, and respectful of `prefers-reduced-motion`.
