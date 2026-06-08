---
title: "Is my task fan-out-shaped?"
description: A short test for deciding whether a task is worth handing to a swarm of agents, or whether the swarm is just expensive theater.
pubDate: 2026-06-07
---

# Is my task fan-out-shaped?

A dynamic workflow spawns many agents to work a task in parallel. That is powerful when the task is shaped for it and wasteful when it is not. Use this before you reach for one.

## The four-part test

A task is shaped for a swarm when all four are true:

1. **Wide, not deep.** The work is a lot of similar small jobs, not one long chain of reasoning. Surveying fifty things beats thinking hard about one.
2. **Independent pieces.** No piece needs another piece's answer. If step two depends on step one, it has to run in sequence and cannot fan out.
3. **Each piece is checkable.** Every unit of work produces something you can verify on its own (a claim with a source, a file that still compiles, a finding you can reproduce).
4. **Too big for one context.** The whole job does not fit comfortably in a single conversation. If it does, just do it in one.

If you cannot answer yes to all four, a swarm is probably the wrong tool.

## The second half: verify the swarm

Passing the test is not enough. A swarm produces more output than you will read, so you cannot trust it by reading it. The verification has to be part of the design, not something you do after.

The strongest pattern is adversarial: after the agents produce findings, a second wave of agents tries to knock each finding down before it is allowed into the result. Only what survives gets reported. Checking is cheap when checking is just more agents, so make every result earn its place.

## When it is just expensive theater

Do not reach for a swarm when:

- The task has to be reasoned through in one continuous line.
- Each step changes the next (tightly coupled work).
- It is small enough to just do yourself.
- You have no way to check the output, so volume only multiplies the risk.

In those cases the swarm is pure overhead: more tokens, more wall-clock, nothing you can trust at the end.

## The shapes that usually fit

- **Breadth research.** Many independent lookups, each with a checkable source, cross-checked before synthesis.
- **Wide audits.** Scanning a large surface for one class of problem, each finding verified on its own.
- **Mechanical transforms at scale.** The same change applied across many files, each one checked after.

The common thread: the work is wide, the pieces are independent, and each piece can be checked. That is the shape. The judgment is in seeing it, and in deciding how each piece gets verified.
