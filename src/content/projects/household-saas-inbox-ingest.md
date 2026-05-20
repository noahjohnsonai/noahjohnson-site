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

Next.js · React · TypeScript · Tailwind · shadcn/ui · Supabase (Postgres, Auth, Storage) · Drizzle · Inngest · Anthropic Claude via the Vercel AI SDK · Resend · Sentry · Vitest with pglite · Playwright.

## How it's built

Built with Claude Code under a six-agent governance harness — PM, design, frontend, backend, extraction, and trust-ops — and a hard-rule set enforced in CI. The defining one: every locked extractor version is eval-gated, with per-field regression against a stored baseline blocking the commit. Local-first development through the MVP, cloud cutover at beta.
