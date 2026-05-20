---
title: Industry-Niche News Aggregator
description: A curated developer-news aggregator for a specific software ecosystem.
pubDate: 2026-04-23
tags:
  - aggregator
  - web-scraping
  - rls
  - public-mvp
  - design-system
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
  - oauth
  - magic-link-auth
  - inngest
  - zod
  - vercel
  - browserless
  - pnpm
  - biome
  - vitest
  - playwright
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
  - vitest
  - pnpm
---

## What

A curated developer-news aggregator for a specific software ecosystem. One ranked feed pulling from the ecosystem's official blog, community forum, release notes, GitHub, YouTube, Reddit, podcasts, events, and jobs.

## Why

Niche developer communities lose news to the same shape every time: a sprawling official blog that's hard to scan, a forum where the real signal lives but with no chronological surface, a release-notes page nobody reads, and scattered GitHub repos. One ranked feed with a dev-tool aesthetic solves a problem the ecosystem has had for years.

## Stack at a glance

Next.js (App Router, with the new `proxy.ts` middleware convention) · React · TypeScript · Tailwind · shadcn/ui · Supabase (Postgres, RLS, Auth) · PKCE plus magic-link plus GitHub OAuth · Inngest for the signed scraper pipeline · `sanitize-html` and zod at every adapter yield · Vercel · Browserless for browser-strategy scrapes · pnpm · Biome · Vitest · Playwright.

## How it's built

Built with Claude Code under a hard-rule set centered on the auth boundary: RLS is the only auth gate, Server Actions return discriminated unions and never throw across the boundary, every input is zod-validated, design tokens only (no hex or px in components), append-only migrations, admin routes gated, every admin mutation audited. Tiered build with a security gate at every tier-ship.
