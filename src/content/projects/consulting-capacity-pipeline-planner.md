---
title: Consulting Capacity & Pipeline Planner
description: A drag-and-drop weekly resource-allocation board fused with a sales-pipeline view for a consulting team.
pubDate: 2026-04-22
tags:
  - internal-tool
  - consulting
  - resource-planning
  - drag-and-drop
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
featured: false
skills:
  - claude-code
  - react
  - typescript
  - tailwindcss
  - supabase
  - postgres
  - vite
  - vercel
---

## What

A drag-and-drop weekly resource-allocation board fused with a sales-pipeline view. Consultants are tracked with specialties, certifications, and a thirteen-week workload; engagements are tracked with status and closure probability, then slotted into per-consultant week blocks.

## Why

Most consulting orgs run resource planning in a spreadsheet and pipeline in a CRM, and the two never talk. The question "do we have capacity to take this deal if it closes?" becomes a meeting instead of a screen. Collapsing both surfaces into one drag-and-drop board removes the meeting and turns capacity-vs-deal into a glance.

## Stack at a glance

Vite · React · TypeScript · Tailwind v4 · shadcn/ui (Radix primitives) · react-dnd · lucide-react · Supabase (Postgres + RLS). Two environments — production and staging — with separate Supabase projects so live planning data doesn't get touched during iteration.

## How it's built

Built with Claude Code as the primary build harness. The schema is intentionally lean — `consultants`, `engagements`, and an `app_notes` log for ideas — with RLS enabled on every table. Engagement archiving uses a soft-delete pattern (`archived_at` + reason) rather than destructive deletes, so historical capacity is auditable. The board uses `react-dnd`'s HTML5 backend for slotting engagements into week cells.
