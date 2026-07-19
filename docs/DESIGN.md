# Design Direction

Superseded the initial "dark GitHub-dashboard" look (functional but generic — every dev portfolio with a dark mode looks like this) with a **blueprint/schematic** direction, grounded in the subject: an engineer whose portfolio behaves like a system, drawn the way that system's own architecture diagrams would be drawn.

## Tokens (see `src/index.css` for source of truth)

- Background: `#0B0F1A` — navy-black with blue undertone, not neutral black. `--color-grid` (`#16213A`) is a faint graph-paper grid, applied via the `.bg-blueprint-grid` utility to hero and section-break areas only — never a global texture.
- HTTP-semantic signal colors are unchanged in purpose, recalibrated in exact hex to sit correctly against the cooler background.
- `--color-signature` (`#FF7A45`) is reserved for exactly one thing: the corner-bracket / leader-line callout device (see Signature element below). It must never be used as a background wash, a button fill, or general decoration — its scarcity is the point.

## Type

Display and body are `IBM Plex Mono` / `IBM Plex Sans` — a pairing built for each other, not a default sans plus an afterthought mono. Headings use the mono face at a bold weight with tight tracking, reading like a diagram label rather than a marketing headline.

## Layout concept

Section headers are schematic callouts: a small tag connected to the heading by a short dashed leader line, replacing the generic eyebrow-label-over-title pattern.

## Signature element

Thin corner-bracket framing (like a callout box on an engineering diagram) on `ServiceCard` and `InfoCard`, rendered only in `--color-signature`, never filled. This is the one place the design spends boldness — everything else stays quiet and disciplined per the frontend-design principle of restraint.

## What this replaces

Do not reintroduce Inter as the primary sans, do not reintroduce a neutral near-black (`#0a0b0d`-style) background, and do not add a second decorative accent color alongside `--color-signature` — one signature color, used sparingly, is the whole point.
