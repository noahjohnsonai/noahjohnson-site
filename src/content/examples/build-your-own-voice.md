---
title: Build your own voice scaffold
description: A method for teaching an AI writing tool what your prose actually sounds like, so you can draft with it without sounding like everyone else who draws with it.
pubDate: 2026-05-20
---

# Build your own voice scaffold

A method for teaching an AI writing tool what your prose actually sounds like, so you can draft with it without sounding like everyone else drafting with the same tool.

The output of this method is a set of files that live in a private, gitignored directory. They are not shipped publicly. They are read by your writing agent at the start of every drafting session and used to constrain what it produces. Your *voice* stays private. The *method* of building one is what this file documents.

## Why bother

When an AI writing tool drafts without a voice scaffold, the prose it produces is competent and generic at the same time. A sentence at a time, the writing is fine. As a body of work, it sounds like every other body of work produced the same way. The fix is not a better prompt. The fix is a calibration pass that teaches the tool what *your* prose looks like and gives it explicit permission to draft within that and nowhere else.

## The four files

The voice scaffold has four load-bearing files plus a small library of supporting ones:

1. `CORPUS.md`: raw samples of your writing across multiple registers, gathered from real sources (not synthesized).
2. `DEFAULT.md`: the baseline voice, with explicit "don'ts" the writing agent will never violate.
3. A set of style profile files (one per writing register you care about) plus a `MATRIX.md` that recommends which profile fits which kind of piece.
4. `AUDIENCE.md` and `ARTICLE_PATTERNS.md`: supporting context that helps the agent pick a shape before drafting.

All of these live in a single gitignored directory. Treat them as your writing tool's calibration data, not as content.

## Phase 1: Corpus

You need enough samples of your own writing to triangulate against. A single source produces a flat caricature. Several sources, each capturing a different register, produces something the agent can actually lean against.

Useful streams to gather from:

- **Session transcripts from any AI tool you collaborate with.** Mine your own typed messages (not the AI's responses). This captures your at-the-keyboard register: how you talk to a collaborator in the middle of a task. Write a small script that extracts user-side messages from your tool's transcript format and concatenates them into one file.
- **Sent emails where you explained something at length.** Not transactional one-liners. The reply-style emails where you were teaching, persuading, or working through an idea.
- **Dictated riffs on topics you care about.** Five minutes each, no editing, no second takes. Aim for a few different topics across different emotional registers (one you can defend firmly, one you can teach gently, one that doesn't need a foil at all). The variety is the point.
- **A live log of corrections you issue to AI tools over time.** Every "no, more like this" you ever say to an agent. Append-only, maintained going forward.

The total word count matters less than the variety. A few thousand words across diverse registers is more useful than a hundred thousand from a single channel.

## Phase 2: Style profiles

Pick a small number of writers whose published work you read often and whose voice you'd be willing to *lean toward* on different kinds of pieces. Four is a useful number: enough to cover the main shapes (terse opinion, pragmatic how-to, generous explainer, practitioner field guide), few enough that the recommendation engine isn't paralyzing.

For each writer, fetch a representative piece. Don't reproduce their prose; analyze it. Extract:

- Opening move (how the piece starts).
- Sentence rhythm (short stacks vs. long unpacking).
- Hedging vs. confidence patterns.
- Second-person vs. first-person address.
- Signature transitions and closers.
- Failure modes for the register.

Write each profile to its own file, **named by shape, not by author**. The agent shouldn't surface author names during drafting. The point of the profiles is to give the writing tool dials to lean toward, not to imitate specific people. Authors are scaffolding for your private mental model.

Add a `MATRIX.md` that compares the profiles side by side and includes a recommendation engine: *"lean toward profile X when the piece is Y."* This is what the writer agent reads during the setup grill to pick a profile for a new piece.

## Phase 3: Synthesis

Now write the baseline files the writing agent will read at the top of every session.

**DEFAULT.md** is the load-bearing one. Synthesize from the corpus and your own intuition: what does your voice *do*, and what does it *never do*? The don'ts are the most useful part. A short list of explicit anti-patterns ("no AI vocabulary tells", "no throat-clearing intros", "no hedge-stacks", "no em-dashes in published prose", etc.) gives the agent a concrete check it can run on every paragraph. Without an explicit list, the agent slowly drifts back to its default register. With one, drift is catchable.

Decide whether your DEFAULT has a chat-channel and a published-channel that differ on surface markers (lowercase, punctuation, transition words). If they do, separate them explicitly. The agent needs to know which channel a draft is in to know which markers are voice and which are channel artifacts.

Treat conviction-firmness as a separate dial from style profile. The same profile can run at low, mid, or high conviction. The writer agent asks about both in the setup grill.

**AUDIENCE.md** documents the readers each piece should serve. Three personas is enough. Every piece declares which one (or two) it's aimed at, and *"everyone"* is not an acceptable answer during the setup grill.

**ARTICLE_PATTERNS.md** defines the archetypes pieces can be (Explainer, Case Study, Contrarian, Breadcrumb-trail, or whatever fits your work). Each archetype maps to a default style profile, a default audience, and a default conviction level. The setup grill picks an archetype first and uses the defaults as starting recommendations.

## What you keep private

The corpus, the four-or-so style profiles, DEFAULT, MATRIX, AUDIENCE, ARTICLE_PATTERNS: none of it ships publicly. Publishing your voice scaffold means handing your writing register to anyone who wants to clone it. The method you've just read is shareable. The output is not.

## What this lets you do

Once the scaffold is in place, you can build a writer agent that reads all of it at the start of every drafting session and constrains itself to drafting within the bounds the scaffold defines. The agent picks an archetype with you. It picks a profile. It picks a conviction level. It proposes an outline you lock before any prose appears. It drafts one paragraph at a time, with explicit keep/refine/rewrite/skip on each. It scans the developing draft for take-home artifacts and asks before extracting them. It runs a final voice-check pass that flags every violation of DEFAULT verbatim.

That whole apparatus is downstream of having a voice scaffold worth reading from. Without it, the agent is guessing. With it, the agent is constrained by *you*.
