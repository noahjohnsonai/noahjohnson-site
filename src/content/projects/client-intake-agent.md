---
title: Conversational AI Client-Intake Agent
description: A hybrid-conversational AI agent that replaces manual pre-engagement client intake.
pubDate: 2026-05-05
tags:
  - ai-agent
  - llm
  - magic-link-auth
  - prompt-injection-hardening
  - zero-data-retention
  - building-in-public
  - ai-augmented
  - claude-code
  - nextjs
  - typescript
  - tailwind
  - shadcn-ui
  - supabase
  - postgres
  - anthropic
  - resend
  - upstash
  - vercel
  - vitest
  - playwright
  - lefthook
  - biome
featured: false
skills:
  - claude-code
  - nextjs
  - typescript
  - tailwindcss
  - supabase
  - postgres
  - vercel
  - vitest
  - github
---

## What

A hybrid-conversational AI agent for pre-engagement client intake. Inbound clients receive a magic link, walk through a guided multi-session intake, and the engagement team receives a structured discovery brief by email when everyone has finished.

## Why

Pre-engagement intake is the single most expensive thing a service business does badly. Static questionnaires don't probe; humans who probe in person don't scale; the cost gets paid in either lost revenue or unbillable scoping calls. A conversational agent that can pull on threads and produce a brief in the team's own shape removes a large amount of manual ceremony without putting any actual decisions in the agent's hands.

## Stack at a glance

- **[Next.js](https://nextjs.org) 15** (App Router) with **[TypeScript](https://www.typescriptlang.org)**
- **[Tailwind v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)** — UI primitives
- **[Supabase](https://supabase.com)** — Postgres + Auth + Storage with RLS
- **[Anthropic Claude](https://www.anthropic.com/claude) via the [Zero Data Retention endpoint](https://docs.anthropic.com/en/docs/about-claude/data-usage-and-privacy)** — agent reasoning under a "never used for training" contract
- **[Resend](https://resend.com) + [Upstash Ratelimit](https://upstash.com)** — server-side brief delivery and per-IP/per-session abuse caps
- **[Vitest](https://vitest.dev) + [Playwright](https://playwright.dev)** — unit and end-to-end coverage
- **[Lefthook](https://github.com/evilmartians/lefthook) + [Biome](https://biomejs.dev)** — pre-commit gates and formatter
- **Hosted on [Vercel](https://vercel.com)**

## How it's built

A four-agent governance harness — PM, backend, frontend, trust-ops — with a hard-rule set focused on security posture: server-authoritative session state, no PII in URLs, no in-chat brief rendering, an invisible system prompt, user input treated as data and never as instruction, ZDR-tier required on the model endpoint. All firm-identity strings flow through a single brand config so the same codebase can be re-skinned cleanly.
