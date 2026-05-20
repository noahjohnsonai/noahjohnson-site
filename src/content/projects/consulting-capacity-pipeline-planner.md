---
title: Consulting Capacity & Pipeline Planner
description: A drag-and-drop weekly resource-allocation board fused with a sales-pipeline view for a consulting team.
pubDate: 2026-04-22
tags:
  - internal-tool
  - consulting
  - resource-planning
  - drag-and-drop
  - design-handoff
  - mcp-tools
  - worktrees
  - building-in-public
  - ai-augmented
  - claude-code
  - react
  - vite
  - typescript
  - tailwind
  - shadcn-ui
  - supabase
  - postgres
  - rls
  - figma
featured: false
skills:
  - claude-code
  - react
  - typescript
  - tailwindcss
  - supabase
  - postgres
  - vite
  - figma
---

## What

A drag-and-drop weekly resource-allocation board fused with a sales-pipeline view. Consultants are tracked with specialties, certifications, and a thirteen-week workload; engagements are tracked with status and closure probability, then slotted into per-consultant week cells. Dark, dense, mission-control aesthetic.

## Why

Most ops teams run resource planning in a spreadsheet and pipeline in a CRM, and the two never talk. The question "do we have capacity to take this deal if it closes?" becomes a meeting instead of a screen. Collapsing both surfaces into one drag-and-drop board removes the meeting and turns capacity-vs-deal into a glance.

## Stack at a glance

- **[Vite](https://vitejs.dev) + [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org)** — single-page client
- **[Tailwind v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)** — built on **[Radix UI](https://www.radix-ui.com)** primitives
- **[react-dnd](https://react-dnd.github.io/react-dnd/)** — drag-and-drop slotting for the board
- **[lucide-react](https://lucide.dev)** — icon set
- **[Supabase](https://supabase.com)** — Postgres with RLS; separate projects for staging and production so live planning data isn't touched during iteration
- **[Figma](https://www.figma.com)** — design source, exported as a structured HTML + React handoff folder

## How it's built

A tight, MCP-tool-heavy loop between one operator and Claude Code. The Figma MCP feeds live design context straight into the session; designs leave Figma as a structured handoff folder of HTML and React reference components plus a per-region spec, and Claude rebuilds them inside the live codebase using the existing shadcn primitives and Tailwind tokens. The Supabase MCP handles `apply_migration`, `execute_sql`, and `deploy_edge_function` against the cloud DB, so schema and edge-function changes land in one step. Claude-in-Chrome provides tab-context inspection during visual iteration. Parallel features run across separate git worktrees, and a two-environment promote workflow (staging → production, each with its own Supabase project) keeps live planning data clean while iteration happens upstream.
