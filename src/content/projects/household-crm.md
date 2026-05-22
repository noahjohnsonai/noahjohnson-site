---
title: A Relational Household CRM, Built in Public
description: A relational household CRM for families. Inbox-driven capture, human-curated.
pubDate: 2026-05-15
tags:
  - ai-extraction
  - eval-driven-development
  - building-in-public
  - ai-augmented
  - claude-code
  - nextjs
  - react
  - typescript
  - tailwind
  - shadcn-ui
  - supabase
  - postgres
  - drizzle
  - inngest
  - anthropic
  - vercel-ai-sdk
  - resend
  - sentry
  - vitest
  - pglite
  - playwright
  - vercel
featured: false
skills:
  - claude-code
  - nextjs
  - react
  - typescript
  - tailwindcss
  - supabase
  - postgres
  - vercel
  - sentry
  - vitest
---

## What

A relational household CRM — family, properties, assets, kids, contacts, documents, and history, structured the way a business runs its book of accounts. AI handles capture from the inbox; humans curate.

## Why I'm building it

After a decade implementing CRM systems for businesses, the gap on the household side is hard to miss. Families run on the same primitives a business does — people, properties, assets, documents, history — but the tooling assumes a company on the other end. The bet is that any household with the inclination to keep a single source of truth eventually wants one, and that the right shape for it is relational, not a folder tree. I'm building it in the open because the harder problem isn't the product — it's pushing on AI-augmented product development as a methodology that actually ships.

## How it's built

A six-agent governance harness — PM, design, frontend, backend, extraction, and trust-ops — with hard rules enforced in CI. The defining one: every locked extractor version is eval-gated, with per-field regression against a stored baseline blocking the commit. The interesting work isn't the extraction — it's earning trust at the trust boundary, where the raw email body is never persisted, medical mail is metadata-only, and the OAuth scope stays read-only forever.

## Stack at a glance

- **[Next.js](https://nextjs.org) 15** with **[React 19](https://react.dev)** — App Router, Server Actions
- **[Tailwind v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)** — design tokens via `@theme`
- **[Supabase](https://supabase.com) + [Drizzle](https://orm.drizzle.team)** — Postgres + Auth + Storage with RLS, typed schema and migrations
- **[Inngest](https://www.inngest.com)** — durable functions for the inbox-ingest pipeline
- **[Anthropic Claude](https://www.anthropic.com/claude) via the [Vercel AI SDK](https://sdk.vercel.ai)** — extractors at the trust boundary
- **[Resend](https://resend.com) + [Sentry](https://sentry.io)** — transactional mail and observability
- **[Vitest](https://vitest.dev) with pglite + [Playwright](https://playwright.dev)** — RLS-aware unit specs and end-to-end smoke
- **Hosted on [Vercel](https://vercel.com)**

## What this build is teaching me

Solo product building with an AI-native stack is a different shape than it was five years ago — eval gates do for prompts what type systems do for code, and the unit economics of a one-operator team shift accordingly. The discipline this project demands is mostly about deciding what the trust boundary is, then writing the regression tests for crossing it.
