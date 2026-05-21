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

- **[Next.js 16](https://nextjs.org)** (App Router, with the new `proxy.ts` middleware convention)
- **[React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)**
- **[Tailwind v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)** — design system
- **[Supabase](https://supabase.com)** — Postgres + Auth with RLS as the auth boundary; PKCE + magic-link + [GitHub OAuth](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps) for reader sign-in
- **[Inngest](https://www.inngest.com)** — signed, event-driven scraper pipeline
- **[sanitize-html](https://github.com/apostrophecms/sanitize-html) + [zod](https://zod.dev)** — validation at every adapter yield
- **[Browserless](https://www.browserless.io)** — browser-strategy scrapes for JS-rendered sources
- **[Vitest](https://vitest.dev) + [Playwright](https://playwright.dev)** — unit and end-to-end coverage
- **[Biome](https://biomejs.dev) + [pnpm](https://pnpm.io)** — formatter and package manager
- **Hosted on [Vercel](https://vercel.com)**

## How it's built

A hard-rule set centered on the auth boundary: RLS is the only auth gate, Server Actions return discriminated unions and never throw across the boundary, every input is zod-validated, design tokens only (no hex or px in components), append-only migrations, admin routes gated, every admin mutation audited. Tiered build with a security gate at every tier-ship.
