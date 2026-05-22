---
title: 'Discovery Agent: production-grade AI intake, with the brief as the contract'
description: A hybrid-conversational AI intake agent for consulting engagements. The brief is the contract; the architecture is the operator judgment.
pubDate: 2026-05-21
tags:
  - ai-agent
  - llm
  - magic-link-auth
  - prompt-injection-hardening
  - zero-data-retention
  - building-in-public
  - ai-augmented
  - claude-code
  - production-ai
  - eval-driven-development
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

A hybrid-conversational AI agent — scripted spine, AI on the follow-ups — for pre-engagement client intake. Inbound clients receive a magic link, walk through a guided multi-session intake, and the engagement team receives a structured discovery brief by email when the intake completes.

## Why I'm building it

I've spent 10+ years on the consulting side of CRM implementations. The pre-discovery questionnaire — a Word doc emailed to a paying client — is the single most expensive thing services firms do badly. Most clients return it incomplete, late, or with answers that don't match what we actually need to walk into the discovery call prepared. The job has never been to collect data. It's been to show up already knowing the three things that matter. That's a conversation, not a form. So I'm building the conversation, and treating the brief as the deliverable.

## What makes this different

This is not a chatbot wrapped around an LLM. The architecture treats the discovery brief as a contract document: every part of the system exists to produce a brief consultants actually want to read. The constraints baked into the build are where ten years of intake judgment lives.

- **The brief is the product.** Brief schema is a contract doc. Every agent in the build coordinates through it. Schema changes route through a single owner with eval discipline.
- **Server-authoritative session state.** Magic-link token validates server-side on every request. No PII in URLs. The client never decides what's complete.
- **System prompt is invisible and eval-gated.** Any commit touching the prompt requires a passing eval-set run. No silent drift in agent behavior.
- **User input is data, never instruction.** Injection attempts get a polite decline, a timestamped log, and a flag in the brief's Security Note section.
- **AI disclosure is mandatory.** Consent timestamp recorded server-side; no agent turn fires for a session that lacks it.
- **ZDR-tier model endpoint, enforced architecturally.** Anthropic Zero-Data-Retention required by hard rule. The disclosure copy commits to "never used for training"; the architecture is the implementation contract.
- **Brand-agnostic by rule.** All firm-identity strings — name, color, logo path, domain, retention period — flow through a single config. The same codebase serves any firm.
- **5-layer smoke pipeline.** Unit → integration → conversation eval (Claude judge against a golden set) → Playwright E2E → human visual regression. The agent runs layers 1–4 before requesting human review.

There are 27 architectural rules of this shape in the project's CLAUDE.md. None of them are incidental.

## How it's built

A four-agent governance harness — PM, frontend, backend, and agent-prompt — each with bounded ownership. PM owns governance docs (DECISIONS, PROGRESS, COMPLETION_LOG); agent-prompt owns the system prompt and brief schema; the engineering agents touch code only in their lanes. Schema changes propagate via `// CONTRACT-CHANGE-NEEDED:` comments that PM picks up at every `/wrap` and routes.

The 27 hard rules and the governance docs are append-only — corrections add a new entry rather than rewriting history. Cross-territory changes (anything touching `config/brand.ts`, the system prompt, the brief schema, or any DB migration) trigger an `AskUserQuestion` grill before any code is written, regardless of which agent surfaced the change.

## Stack at a glance

- **[Next.js](https://nextjs.org) 15** (App Router) with **[TypeScript](https://www.typescriptlang.org)**
- **[Tailwind v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)** — UI primitives
- **[Supabase](https://supabase.com)** — Postgres + Auth + Storage with RLS
- **[Anthropic Claude](https://www.anthropic.com/claude) via the [Zero Data Retention endpoint](https://docs.anthropic.com/en/docs/about-claude/data-usage-and-privacy)** — agent reasoning under a "never used for training" contract
- **[Resend](https://resend.com) + [Upstash Ratelimit](https://upstash.com)** — server-side brief delivery and per-IP/per-session abuse caps
- **[Vitest](https://vitest.dev) + [Playwright](https://playwright.dev)** — unit and end-to-end coverage
- **[Lefthook](https://github.com/evilmartians/lefthook) + [Biome](https://biomejs.dev)** — pre-commit gates and formatter
- **Hosted on [Vercel](https://vercel.com)**
