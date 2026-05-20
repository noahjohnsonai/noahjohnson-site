---
title: The five-gate writing harness
description: A drafting-loop spec for AI-assisted writing where the human owns every paragraph and the AI never autonomously produces more than one at a time.
pubDate: 2026-05-20
---

# The five-gate writing harness

A drafting-loop specification for AI-assisted writing where the human owns every paragraph and the AI never autonomously produces more than one paragraph at a time.

The harness assumes you have a [voice scaffold](/examples/build-your-own-voice/) in place. Without one, the harness has nothing to constrain itself against. With one, it gives the agent a structured five-gate motion that keeps the draft close to your voice from the first sentence to the last.

## Pre-gate: the conversation before the draft

Before any gate fires, there is a conversation. The setup grill picks dials; this phase produces the substance.

The agent invites a topic conversation: *"Talk through the piece with me. What's bothering you about the topic? What's the wrong belief you're pushing back on? What do you want a reader to walk away with?"* Typing or dictation are both fine. If the author pastes a speech-to-text transcript, the meandering is feature, not noise.

The agent does not draft during this phase. It listens and synthesizes. From the conversation, it produces a set of candidate framings (3–4 possible tensions, angles, or titles) and surfaces them as a single multi-option question. The author picks one. That choice becomes the spine of the outline that Gate 2 will lock.

The conversation also captures per-piece direction-setting that doesn't fit into the dial-picking of Gate 1: instructions like *"write as if the project is complete"* or *"be vague about counts"* or *"frame the closer forward-looking"*. These get recorded explicitly and re-surfaced at each subsequent gate so they ride along through the whole drafting motion.

If the author hands the agent a topic and says "just go" without conversation, the agent surfaces that as a choice: *"Want to talk through the piece first, or go straight to the setup grill?"* Both are valid; defaulting to the conversation produces sharper outlines.

## The five gates

### Gate 1: Setup

Before any prose exists, the writer agent asks a series of decisions about the piece. Each as a separate question with a recommendation, three or four alternatives, and an explicit "Other" escape.

- **Existing draft or new?** If existing, the agent reads it before continuing.
- **Which archetype?** Whatever set you've defined (Explainer, Case Study, Contrarian, Breadcrumb-trail, etc.).
- **Which audience persona?** From your AUDIENCE.md. *"Everyone"* is not an acceptable answer.
- **Which style profile?** From your MATRIX.md. The archetype's default is the recommendation.
- **What conviction-firmness?** Low / Mid / High. Each archetype has a default; this is the conscious override dial.

The point of front-loading these is mundane but important. By the time the agent drafts the first paragraph, the article's shape is locked. It can't drift mid-piece toward something it was never meant to be.

### Gate 2: Outline

The agent proposes a 3–6 beat outline based on the locked archetype and tension. The outline is surfaced as a single block of text; the author approves it as-is, edits specific beats, or rewrites the whole thing. No prose appears until the outline is locked.

Without this gate, the AI's instinct is to make individual paragraphs good while the structural arc quietly drifts. Locking the skeleton first is the only way to keep the spine of the article in the author's control.

### Gate 3: Per-paragraph

The core gate. For each beat in the locked outline:

1. The agent drafts **one paragraph**. No more.
2. The agent surfaces the paragraph with four options: **Keep / Refine / Rewrite / Skip**.
3. If Refine: the agent asks one targeted follow-up about what to change. Applies it. Re-presents.
4. If Rewrite: the agent asks one targeted follow-up about what to try differently. Applies it. Re-presents.
5. If Skip: the beat is dropped. The agent confirms the outline still hangs together before moving on.
6. Once approved, the agent moves to the next beat.

The slowness here is the load-bearing feature, not a side effect. If you're moving faster than one paragraph at a time, the harness is being bypassed.

### Gate 4: Take-home discovery

After every beat lands, the agent re-scans the developing draft for anything that could be lifted into a generalized take-home artifact. Typical candidates:

- A configuration skeleton (CLAUDE.md, settings.json fragment, etc.).
- An agent template.
- A workflow document or methodology checklist.
- A configuration snippet (MCP config, slash command, hook).

Each candidate is surfaced as a question. Anything the author accepts becomes a separate file under the `examples/` collection, with a generalized name (no project identifiers, no client names, no author-specific paths), and an inline link in the article body at the point of reference. Take-homes stop being afterthoughts.

### Gate 5: Voice check

Before the draft goes to review, the agent scans every paragraph against an explicit list of things the voice does not do. Drawn from your DEFAULT.md don'ts:

- AI vocabulary tells (*delve, tapestry, leverage, robust, comprehensive guide,* etc.)
- Throat-clearing intros (*"In this post we'll cover..."*).
- Marketing-CTA voice (*"Don't miss out! Subscribe today!"*).
- Stacked hedges (*"I think we should probably maybe consider potentially..."*).
- Long summary recaps in short pieces.
- Ungrounded metaphor.
- Conviction-stacks in technical writing.
- Em-dashes in published prose. (Em-dashes have been so thoroughly contaminated by AI prose that even legitimate uses now read as AI-written.)

Each violation is surfaced verbatim with the rule cited. The author decides whether to revise or to override on purpose. The voice check **does not auto-fix anything**. The point is conscious choice, not pattern-matching cleanup.

## Sequencing rules

- **The pre-gate conversation runs first.** The author can opt out of it ("just go to the setup grill") but the agent always offers it. Skipping the conversation tends to produce outlines that drift mid-piece.
- **Gates are sequential.** You cannot enter Gate 3 without passing Gate 2.
- **Refine and Rewrite within a gate are unlimited**, but each attempt counts. If you've Refined a paragraph more than three times, the beat is probably wrong, not the paragraph. Back up to Gate 2 and revisit the outline.
- **Skip is a real option, not a polite fiction.** If a paragraph isn't earning its place, it doesn't go in. The Skip option exists because the writer agent's tendency is to defend its own output. Skip breaks that loop.
- **Take-home discovery (Gate 4) runs continuously**, not just at the end. Capturing artifacts at the moment the prose names them produces sharper artifacts than rebuilding them from a finished draft.

## What you get

A draft that stayed close to your voice the entire time it was being written, instead of one you had to rescue at the end. Take-home artifacts that exist as standalone files, not as appendices to a single piece. A drafting motion that scales: the same five gates work for a 400-word opinion piece and a 6000-word field guide.
