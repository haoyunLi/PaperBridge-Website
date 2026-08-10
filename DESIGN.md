---
name: PaperBridge Website
description: A living bilingual critical edition for a local-first macOS paper reader.
colors:
  paper: "#f3eee4"
  paper-light: "#fffdf8"
  paper-deep: "#e5ddcf"
  ink: "#122033"
  ink-soft: "#56606c"
  cobalt: "#0a59d6"
  cobalt-dark: "#073c91"
  cobalt-pale: "#dce9ff"
  coral: "#e8493e"
  coral-dark: "#aa2923"
  amber: "#f0a026"
  green: "#1e8d6c"
  line: "#cfc6b8"
typography:
  display:
    fontFamily: "Newsreader Variable, serif"
    fontSize: "clamp(3.6rem, 6.4vw, 6rem)"
    fontWeight: 470
    lineHeight: 0.93
    letterSpacing: "-0.038em"
  body:
    fontFamily: "Manrope Variable, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Manrope Variable, sans-serif"
    fontSize: "0.58rem"
    fontWeight: 750
    letterSpacing: "0.1em"
rounded:
  control: "8px"
  panel: "15px"
  workbench: "16px"
components:
  button-primary:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.paper-light}"
    rounded: "10px"
    height: "52px"
    padding: "0 21px"
  panel-workbench:
    backgroundColor: "{colors.paper-light}"
    textColor: "{colors.ink}"
    rounded: "{rounded.workbench}"
---

# Design System: PaperBridge Website

## Overview

**Creative North Star: “The Living Critical Edition”**

The paper remains the interface. The shipped homepage uses accessible document fragments and working controls, not product screenshots, to reconstruct, translate, and read a paper in context. Warm editorial pages sit inside cobalt and deep-ink workbenches; coral marks translation and action. Independent finish review: **PASS**.

## Colors

Warm paper is the reading ground; cobalt owns navigation, active state, and major product planes; coral marks translated content and the closing action. Amber is reserved for focus, selection, and in-progress annotation; green signals healthy local services. All planes are solid color.

## Typography

Newsreader Variable is used for editorial promises, paper headings, and reading prose. Manrope Variable carries navigation, controls, status, and explanation. Display copy is large, tightly tracked, balanced, and usually two short lines; body copy is restrained to readable measures near 44–68ch.

## Layout

The page runs: sticky navigation, split hero, dark reconstruction workflow, cobalt live reader, capabilities, local-privacy proof, FAQ, coral download section, and footer. Content panels cap at 1400px; the hero caps at 1540px. The split hero stacks below 1200px, navigation collapses below 960px, and at 720px sidebars and secondary logs are removed while document pages, tabs, and primary controls remain operable without horizontal page overflow.

## Elevation & Depth

Depth is structural rather than decorative: major workbenches use one soft downward shadow, while their interiors use tonal planes and single borders. Paper sheets lift lightly from neutral canvases. There are no gradients, glass effects, or decorative blur.

## Shapes

Major demonstrations use 15–16px radii; controls and interior blocks use 5–11px radii. Status lights and the privacy orbit are circular. Borders are thin and functional. Pills appear only as compact status or capability tags, never as navigation containers.

## Components

- **Brand:** cobalt rounded-square book mark with a paper-white page and coral seam.
- **Actions:** cobalt primary buttons on light surfaces; paper-white build button on the coral closing section; hover lifts primary actions by 2px. All keyboard focus uses a 3px amber outline.
- **Hero workbench:** four selectable phases, Open PDF → Reconstruct → Translate → Read, auto-advance every 4.2 seconds, pause/play control, and pause on hover or focus.
- **Workflow console:** four tabs expose reconstruction, resource protection, local Ollama translation, and structured Markdown packaging.
- **Reader:** live language selects, Reader/Summary/Full translation tabs, selected-term Translate/Explain assistant, annotation states, export-ready state, and bookmark state.
- **Motion:** stage changes combine opacity, vertical movement, and clipping; the reconstruction scan is the signature motion. Reduced-motion preference disables effective animation and smooth scrolling.

## Do's and Don'ts

- **Do** lead with the editorial promise and live workbench, with the signed macOS download action above the fold.
- **Do** keep original formulas, figures, tables, units, code, and identifiers visually distinct from translated prose; captions may be translated.
- **Do** describe MinerU as optional, PDFKit as the exact visual fallback, and Ollama inference as local and configurable.
- **Don't** replace the paper interface with a generic SaaS hero, screenshot carousel, card grid, gradient, or glass treatment.
- **Don't** offer a Windows download before it exists; keep it clearly labelled as coming soon.
- **Don't** invent testimonials, customer logos, usage metrics, benchmarks, or cloud-processing claims.
