---
title: noahjohnson.ai
description: A personal blog and portfolio built as a faithful tribute to the Claude Code desktop UI.
pubDate: 2026-05-19
tags:
  - astro
  - tailwind
  - design
  - claude-code
featured: true
---

![noahjohnson.ai home page — Claude Code-inspired UI with sidebar of session-style entries, welcome hero, session cards, and the bike mascot above the search bar.](/projects/noahjohnson-ai-cover.png)

This is the site you're reading. It's a personal blog and portfolio designed to look and feel like the [Claude Code](https://claude.com/code) desktop app — three-pane shell (sidebar + main + drawer), warm-dark palette, terracotta accent, a pixel-bike mascot perched above the prompt bar, and a usage dial that pretends to be 92% maxed out.

## Why

I wanted a writing home that *felt* like the tool I was writing with. Most blog themes are blog themes. None of them looked like the surface I spend my working hours inside. So I made one.

It also became the first real test of a workflow I want to write about: pair-programming a non-trivial UI clone with an agent, end-to-end, from "what theme should I use" to "production at the apex domain."

## Stack

- **[Astro 6](https://astro.build)** with [Astro View Transitions](https://docs.astro.build/en/guides/view-transitions/) — fully static, instant nav, persistent shell elements
- **[Tailwind CSS 4](https://tailwindcss.com)** — colors defined as `@theme` tokens, no separate config file
- **[Geist + Geist Mono](https://vercel.com/font)** — variable fonts, self-hosted
- **[Pagefind](https://pagefind.app)** — search index built at deploy time, modal triggered by ⌘K / Ctrl K
- **No client framework** — vanilla JS for the interactive bits (drawer toggle, resize, content tracking)
- **Hosted on [Vercel](https://vercel.com)**, domain via [GoDaddy](https://godaddy.com)

## What's actually in here

**Three-pane layout.** Sidebar with grouped sessions (Posts / Projects / About, by year), main content column, right-side `.md` viewer that auto-loads the current page's source. The drawer is resizable (drag the left edge) with width persisted to `localStorage`, and on mobile it slides in as a full-overlay panel with a backdrop instead of squishing the column.

**Authentic-ish chrome.** The toolbar below the prompt has the Auto pill, the +/mic/chevron icons, the model label, and a usage dial that opens a popover showing Context Window 92%, 5-hour 88%, Weekly 91%, Opus only 76%. All decorative. The dial is pure CSS group-hover, no JS.

**Status dots.** Posts you haven't visited show an orange dot in the sidebar — tracked in `localStorage`, mirrors Claude Code's "needs input" attention signal.

**Mascot.** A pixel bicycle in Claude orange, anchored to the right edge of the centered content column so it stays above the search bar at every viewport.

**OS-aware shortcuts.** `⌘K` on Mac, `Ctrl K` on Windows/Linux — sniffed at runtime, applied to both the sidebar Search and the bottom prompt.

## Source

[github.com/nojoatx/noahjohnson-site](https://github.com/nojoatx/noahjohnson-site) — MIT.

## Case study coming

A long-form write-up on how this got built (the back-and-forth pair-programming with Claude Code, dead-ends, deliberate scope cuts, the moments where the agent surprised me, what I'd do differently) is coming as a blog post. The `Hello world` placeholder will be replaced with it shortly.
