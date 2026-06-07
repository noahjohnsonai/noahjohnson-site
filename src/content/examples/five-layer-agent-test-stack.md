---
title: A five-layer test stack for AI agents
description: How to test an AI agent like production software — five layers from deterministic logic up to human judgment, with the agent running the automated ones itself before a human looks.
pubDate: 2026-06-07
---

# A five-layer test stack for AI agents

The hardest claim to make about any AI agent is that it still works after the last change. Most agents are tested by a person trying it once and seeing that it seemed fine. That is not a test, it is a vibe. This is a drop-in strategy for putting an agent through the same gates you would put any production system through.

The shape is five layers ordered from the most deterministic to the least, plus one rule about who runs what and when.

## The five layers

**Layer 1 — Unit tests on the pure logic.** Everything that has nothing to do with the model: token generation and validation, serialization and rendering of your output document, any state machine, input classifiers, guards. Fast (sub-second), test-driven, a failing test written first. This is the layer most agent projects skip, and it is the cheapest one to have.

**Layer 2 — Integration tests against a real datastore.** The parts that touch the database and the session, exercised against a real one (a local Postgres, an in-process build, or a disposable test schema). Session lifecycle, row-level security, access expiry, any gating logic. Slower than unit (seconds), still fully deterministic.

**Layer 3 — Conversation evaluation.** The layer specific to agents. A set of personas run against a rubric that scores the things that actually matter for your agent's job: domain coverage, staying on task, refusing what it should refuse, deferring what it should defer. The scoring is done independently, by a separate model judging against a known-good set, rather than by the agent grading itself. Runs on every change to the system prompt.

**Layer 4 — End-to-end through the real interface.** The whole flow, run the way a user would experience it, in a real browser or client. Entry through authentication through a first streamed turn through the output populating through completion through whatever fires at the end. This is what catches the wiring failures the lower layers cannot see.

**Layer 5 — Human regression.** A person checking the things a machine cannot: whether it feels premium, whether the copy tone is right, whether the output reads like a human expert produced it, whether it works on a real phone. Kept to a short, scripted pass so it stays cheap enough to run at every milestone.

## The contract: agent before human

The point of the stack is not the layers. It is the ordering of *who* runs them.

The agent runs layers 1 through 4 itself, on the changed scopes, and only when those are green does it produce a short smoke report and ask for human review. The human's time then goes entirely to layer 5 judgment, not to setup. A smoke report is just a compact summary: which layers passed, how many scenarios ran, where the artifacts (screenshots, logs, snapshots) live, and any bugs filed this run.

This single rule is what changes the economics. Without it, a human babysits the whole suite. With it, the human spends ten minutes on the part only a human can do.

## Beating the flaky part: a gated debug surface

The slowest, least deterministic thing in any agent test is the model call itself. If every end-to-end scenario has to set up its state by talking to the agent through the UI, the suite is slow and flaky for reasons that have nothing to do with what you are testing.

The fix is a debug surface: a small, explicitly gated interface (behind an environment flag, and asserted *absent* from production builds in CI) that lets the test harness put the application into any state in milliseconds and assert on the interesting surface directly. Force the session to a given step. Skip the consent screen. Inject an attachment. Snapshot the output. Mock a reply or a stream. The agent sets up state instantly and spends its assertions on what actually matters, instead of negotiating with an LLM to reach the screen under test.

Keep it ruthlessly gated. The same surface that makes testing fast is a liability if it ships, so the build verifies it has been tree-shaken out of production.

## Eval-gating the system prompt

Treat the system prompt like code. Any change that touches it has to clear the conversation evaluation before it ships, with no regression against the previous baseline.

The trap is model variance: the same prompt can score differently on two runs for reasons that are not a regression. So when a persona fails, re-run it once with the *previous* prompt as a control. If the control passes and the new prompt fails, it is a real regression. If both fail, it is the model's natural variance and not your change. This one move is the difference between an eval gate you trust and one you learn to ignore.

## Pre-commit gating

Wire the cheap layers into pre-commit so they run automatically on the scopes they cover:

- Any commit: formatter and type-check, blocking.
- Application code change: unit tests for the changed scope, blocking.
- API route change: integration tests for that route, blocking.
- System-prompt change: the conversation eval set, blocking.
- Output-schema or renderer change: render snapshot tests, blocking.
- Before ship: the full preflight plus the agent smoke plus the human regression.

## Why this is worth the overhead

Most of this is one-time cost. The unit and integration layers are ordinary engineering. The conversation eval and the gated debug surface are the two pieces specific to agents, and they are exactly the two that let one person move fast without shipping regressions they cannot see. The layer that separates a demo that worked once from a system you would put in front of a paying user is layer 3 onward, run automatically, every time.
