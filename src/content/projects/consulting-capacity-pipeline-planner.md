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

Vite · React · TypeScript · Tailwind v4 · shadcn/ui (Radix primitives) · react-dnd · lucide-react · Supabase (Postgres + RLS) · Figma for design and handoff. Two environments — production and staging — with separate Supabase projects so live planning data isn't touched during iteration.

## How it's built

Built with Claude Code on the **lean end of the governance spectrum** — no multi-agent harness, no append-only decision logs, no PM ceremony. The whole stack is one operator plus Claude Code with broad MCP-tool access: Figma MCP for live design context, Supabase MCP for `apply_migration` / `execute_sql` / `deploy_edge_function` so schema changes land against the cloud DB without a separate migration framework, and Claude-in-Chrome for tab-context inspection during visual iteration. Designs originate in Figma, get exported into a structured handoff folder of HTML and React reference components plus a per-region spec, and Claude rebuilds them inside the live codebase using the existing shadcn primitives and Tailwind tokens. Parallel work runs across separate git worktrees so feature branches and visual refreshes don't collide.
