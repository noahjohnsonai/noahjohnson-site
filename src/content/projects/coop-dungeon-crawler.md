---
title: Browser-Based Co-op Dungeon Crawler
description: A solo-built, browser-first, server-authoritative co-op dungeon-expedition game.
pubDate: 2026-04-26
tags:
  - game-dev
  - multiplayer
  - server-authoritative
  - tick-deterministic
  - building-in-public
  - ai-augmented
  - claude-code
  - typescript
  - bun
  - websockets
  - vite
  - threejs
  - supabase
  - postgres
  - rls
  - vitest
  - playwright
  - biome
  - pnpm
  - lefthook
  - docker
featured: false
skills:
  - claude-code
  - typescript
  - bun
  - vite
  - threejs
  - supabase
  - postgres
  - vitest
  - docker
  - pnpm
---

## What

A browser-first co-op dungeon-expedition game with tick-deterministic combat at 300 ms, click-to-move controls, and a server-authoritative world model. Adaptive session length via a save-room-staged chunk loader.

## Why

Most co-op games either demand reflexes that don't translate to a browser or compromise on persistence and party-coherence to fit one. Click-to-move, multiple worlds, and server-authoritative state let the game be playable in a tab over a lunch break without losing what makes the genre worth playing.

## Stack at a glance

- **[TypeScript](https://www.typescriptlang.org)** monorepo via **[pnpm](https://pnpm.io)** workspaces
- **[Bun](https://bun.sh)** — WebSocket world server, tick scheduler
- **[Vite](https://vitejs.dev) + [Three.js](https://threejs.org)** — game client and 3D scene
- **[Supabase](https://supabase.com)** — Postgres with RLS for persistence
- **[Vitest](https://vitest.dev) + [Playwright](https://playwright.dev)** — unit and end-to-end coverage
- **[Biome](https://biomejs.dev) + [Lefthook](https://github.com/evilmartians/lefthook)** — formatter and pre-commit gates
- **[Docker](https://www.docker.com)** — local infra stack

## How it's built

Built end-to-end with Claude Code under a multi-agent governance harness — typed roles for architecture, gameplay, network protocol, content, and PM. Decision logs are append-only, the source-of-truth vision document is immutable, hard rules are enforced by pre-commit hooks, and every tier ship runs a PM report, regression suite, and security review before closing.
