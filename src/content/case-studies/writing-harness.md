---
title: How I built a writing harness on Claude Code
description: A grilling-instead-of-drafting workflow for AI-assisted writing, and what it cost to choose the slow path.
pubDate: 2026-05-20
draft: false
project: noahjohnson-ai
cover: /case-studies/writing-harness-cover.jpg
coverAlt: Editorial illustration of a vintage typewriter on a wooden desk, three-quarter view, one terracotta-accented key on the keyboard, blank paper rolled into the carriage, warm dark background with soft directional light from upper left.
tags:
  - claude-code
  - ai-augmented
  - writing
  - methodology
  - case-study
---

## TLDR

The default for AI-assisted writing is *the AI drafts, you edit*. That motion produces prose that's competent and quietly generic. The harness this article describes runs the opposite motion. The AI proposes nothing larger than a paragraph at a time, the human keeps, refines, rewrites, or drops each one, and a private voice scaffold constrains everything the agent produces. The trade is speed for voice. The article walks why, the methodology, and what's portable.

## What this is

The site you're reading runs on a writing harness I built on top of Claude Code. It's a small system of slash commands, two purpose-built agents, a voice scaffold that calibrates against my own prose, and a handful of conventions that govern how articles and case studies get drafted. The goal was modest. I wanted a writing tool that felt the same as the tool I was writing with, and I wanted that tool to produce prose that sounded like me instead of like an AI. What follows is the story of why the obvious approach to that second goal turned out to be wrong, and what we built instead.

## The default writing motion is wrong

When people picture AI-assisted writing, the picture is almost always the same. You sit down with the AI, you describe what you want, and the AI drafts. You read what comes back, you fix the parts that are wrong, you ship. The motion is: AI proposes a chunk; you correct it. This is the motion every product, every tutorial, and every tool review is built around. It is also, I think, the motion that quietly destroys what makes a writer's voice their own.

The prose that comes back from that loop is competent. Sometimes it's better than competent. But it is almost always faintly *generic*, in a way that's hard to point at any single sentence to prove. A sentence at a time, the writing is fine. As a corpus, it sounds like every other corpus drafted the same way.

The harness this article describes was built around the opposite motion. The AI proposes nothing larger than a paragraph at a time, and stops. Every paragraph is a gate. You keep it, refine it, rewrite it, or drop it before the next paragraph exists at all. The article you are reading right now was written that way. It took longer to write than it would have under the default motion. The trade was deliberate, and the rest of this piece is about why it was worth it.

## Where the grilling instinct came from

The harness didn't start as a writing tool. It started as a voice problem. The first few times I tried drafting longer pieces with Claude Code, the prose came back competent and uniformly off. Sentences I would never have written. Cadences that read as someone else's defaults. The fix wasn't a better prompt. The fix was teaching the system what *my* prose actually sounds like, and giving it explicit permission to draft within that and nowhere else.

That meant building a voice scaffold. Not a single voice document, but a small library of them. The first set was a corpus of samples gathered from multiple sources, capturing how I actually write across different registers: how I talk to a collaborator in the middle of a task, how I dictate when I'm warming up to a topic, how I correct course when something is going wrong. The number of samples mattered less than the variety. Voice isn't a single thing. It's a few overlapping registers, and a calibration that captures only one of them produces a flat caricature. Triangulation only works with enough range to surface the differences.

Sitting on top of that corpus, a handful of anonymized style profiles. Each one modeled on a writer whose published work I read often, but stripped of the author's name and reduced to its load-bearing shape: opening move, sentence rhythm, hedging patterns, signature transitions, characteristic failure modes. The point wasn't to write like any specific person. It was to give the agent a set of distinct *registers* to lean toward, with a recommendation engine that decides which one fits a given piece. A short opinion piece pulls toward one shape. A long technical explainer pulls toward another. A field-guide-style case study (like this one) pulls toward a third. The profiles are dials, not destinations.

A pivot worth flagging: I built the voice scaffold inside a private, gitignored directory, and I decided early on that it would stay there. Publishing the actual style profiles and corpus would mean giving away my own writing register to anyone who wanted to clone it. The *method* of building a voice scaffold is shareable, and it's one of the take-home artifacts attached to this article. The voice itself isn't. That distinction shaped everything that came after it.

By the time the voice work was done, the dominant motion of the project was already grilling. Every load-bearing decision had been surfaced as a question with a recommendation, alternatives, and an explicit escape hatch. The voice corpus was approved by grill. The style profile shapes were locked by grill. The list of things the voice should never do (the don'ts) was negotiated one question at a time. By the time it came to actually wire up the article-drafting flow, the natural shape was obvious. The writer agent didn't need to invent a new motion. It inherited the one the project had already been built on.

## The conversation before the draft

Before any gate fires, there is a conversation.

When I start a new piece, I don't hand the agent a topic and watch it draft. I talk to it about what the piece is supposed to *be*. What's bothering me about the topic. What I think the wrong belief is. What I want to push back on. What I want to make a reader notice. Sometimes I type. Sometimes I dictate into speech-to-text and paste the transcript. Sometimes it's a few rounds of "no, that's not what I meant" before the actual subject of the piece becomes clear. The agent's job during this phase is not to draft. It's to listen and synthesize.

What the agent produces from that conversation is not prose. It's a set of candidate framings for the piece: three or four possible tensions, three or four possible angles, sometimes a few candidate titles. Each one gets surfaced as a real choice. The author picks one. That choice becomes the spine of the outline that Gate 2 will eventually lock.

The conversation also produces something less visible: the per-piece *direction-setting* that doesn't fit into the dial-picking of Gate 1. When I wrote this article, I gave three specific directions before the first paragraph was drafted: write as if the project is complete, be vague about counts of corpus samples, frame the closer forward-looking instead of as gaps to fill. None of those are archetype or audience or style profile choices. They are piece-shape decisions that came out of the conversation and rode along with the outline through every subsequent gate.

The dictation part matters. Typing is the chat-channel register; dictation is closer to the spoken-talk register and surfaces different material. A topic I would describe in three terse typed sentences becomes five paragraphs of meandering dictation, and the agent has more to work with. Most of the meandering doesn't make it into the piece. The shape of the meandering does.

## The five gates

The harness, in mechanical terms, is five grilling gates spaced across a drafting session.

The first gate is the setup. Before any prose exists, the writer agent surfaces a sequence of decisions about the piece: what archetype it belongs to, which audience persona it serves, which style profile to lean toward, what conviction level to operate at. Each one a separate question with a recommendation and three or four alternatives. The point of front-loading these is mundane but important. By the time the agent drafts the first paragraph, the article's shape is locked. It can't drift mid-piece toward something it was never meant to be.

The second gate is the outline. Six beats, proposed as a single block, approved or edited before a word of prose appears. Without this gate, the AI's instinct is to make individual paragraphs good while the structural arc quietly drifts. Locking the skeleton first is the only way to keep the spine of the article in your control.

The third gate is the one this article was written through. Per beat, one paragraph. Surface it. The author chooses to keep it, refine it, rewrite it from a different angle, or drop the beat entirely. Refinement asks one targeted follow-up. Rewrite gets one more attempt. Skip is a real option, not a polite fiction. If a paragraph isn't earning its place, it doesn't go in. The slowness here is the load-bearing feature, not a side effect.

The fourth gate is take-home discovery. After every beat lands, the agent re-scans the developing draft for anything that could be lifted into a generalized artifact. A CLAUDE.md skeleton. An agent template. A workflow document. A configuration snippet. Each candidate is surfaced as a question. Anything the author accepts becomes a separate file under the `examples/` collection, with a generalized name (no project identifiers, no client names, no Noah-specific paths), and an inline link in the article body. The reader clicks the link, the file loads in the right-hand drawer, and the artifact is downloadable as raw markdown. Take-homes stop being afterthoughts.

The fifth gate is the voice check. Before the draft goes to review, the agent scans every paragraph against an explicit list of things the voice does not do: AI vocabulary tells, throat-clearing intros, marketing CTAs, stacked hedges, ungrounded metaphors, conviction-stacks in technical writing, em-dashes anywhere in published prose. Each violation is surfaced verbatim with the rule cited. The author decides whether to revise or to override on purpose. The check doesn't auto-fix anything. The point is conscious choice, not pattern-matching cleanup.

What you buy with five gates is a draft that stayed close to your voice the entire time it was being written, instead of one you had to rescue at the end.

## What you can lift

The harness is a small enough system to lift in pieces. The four take-home artifacts below cover the pieces of the design that are genuinely portable. Click any of them and the file loads in the right-hand drawer of this page. Each one is downloadable as raw markdown, drop-in for your own setup.

The headliner is [build-your-own-voice](/examples/build-your-own-voice/). It walks the method of constructing a voice scaffold from your own writing samples, without ever publishing the scaffold itself. If you take only one of these, take this one. The rest of the harness assumes a voice scaffold to constrain against; without it, the agent is back to guessing.

[The five-gate writing harness](/examples/writing-harness-five-gates/) is the full drafting-loop spec, lifted into a standalone artifact. Five gates: setup, outline, per-paragraph, take-home discovery, voice check. Sequencing rules included. Use this as a reference when implementing your own agent or as a checklist when reviewing AI-drafted prose generally.

[The writer agent template](/examples/writer-agent-template/) is the actual Claude Code agent definition that drives the loop. Generalized, no project-specific paths. Drop it in `.claude/agents/writer.md` in your own project, point its required-reading section at your voice scaffold directory, and you have a working five-gate writer.

[The case-study content collection setup](/examples/case-study-content-collection-setup/) is the Astro scaffold that makes the case studies + project cross-link work on this site. Useful if you're running Astro and want a paired collection that enforces a 1:1 relationship at build time and auto-renders cross-link chips on both sides.

None of these include the actual voice files. The voice stays private; the apparatus is public.

## Where this is going

What's exciting about this kind of tooling is how rapidly it's evolving, and how much remains to be discovered about what AI-augmented writing can actually do. The harness described here is one shape, and tomorrow's iteration will be a different shape. The five gates might collapse into three. Voice scaffolds might become something the agent learns continuously instead of something the author calibrates upfront. The conversation before the draft might stop being a separate phase entirely.

What stays load-bearing is the underlying motion: the human owns the voice and the structure, and the agent does the heavy lifting inside those constraints. As tools like this mature, that arrangement becomes more *comfortable*, not less. Writers who learn to direct AI-augmented drafting with this kind of precision are doing something genuinely new, and the work compounds. This is the direction the work is moving, and the harness is what the direction looks like today.
