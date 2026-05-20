---
title: Household-Management SaaS with AI Inbox Ingest
description: A relational household-management SaaS that pre-populates from your inbox.
pubDate: 2026-05-15
tags:
  - saas
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

A relational household-management SaaS where the first-login experience is hundreds of pre-extracted items — receipts, warranties, subscriptions, service history, school mail, insurance — pulled from a read-only inbox connection rather than a blank account.

## Why

Personal-CRM and household-org tools share one cold-start problem: nobody fills in their own data. Most of what belongs in one is already sitting in an inbox. The hard part isn't the extraction — it's earning trust at the trust boundary, where the raw email body is never persisted, medical mail is metadata-only, and the OAuth scope stays read-only forever.

## Stack at a glance

- **[Next.js](https://nextjs.org) 15** with **[React 19](https://react.dev)** — App Router, Server Actions
- **[Tailwind v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)** — design tokens via `@theme`
- **[Supabase](https://supabase.com) + [Drizzle](https://orm.drizzle.team)** — Postgres + Auth + Storage with RLS, typed schema and migrations
- **[Inngest](https://www.inngest.com)** — durable functions for the inbox-ingest pipeline
- **[Anthropic Claude](https://www.anthropic.com/claude) via the [Vercel AI SDK](https://sdk.vercel.ai)** — extractors at the trust boundary
- **[Resend](https://resend.com) + [Sentry](https://sentry.io)** — transactional mail and observability
- **[Vitest](https://vitest.dev) with pglite + [Playwright](https://playwright.dev)** — RLS-aware unit specs and end-to-end smoke
- **Hosted on [Vercel](https://vercel.com)**, local-first dev through the MVP, cloud cutover at beta

## How it's built

Built with Claude Code under a six-agent governance harness — PM, design, frontend, backend, extraction, and trust-ops — and a hard-rule set enforced in CI. The defining one: every locked extractor version is eval-gated, with per-field regression against a stored baseline blocking the commit. Local-first development through the MVP, cloud cutover at beta.
