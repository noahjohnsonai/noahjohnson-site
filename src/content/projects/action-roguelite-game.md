---
title: Solo Action-Roguelite Portfolio Game
description: A low-poly 3D action-roguelite dungeon crawler in Godot.
pubDate: 2026-05-04
tags:
  - game-dev
  - godot
  - gdscript
  - solo-dev
  - portfolio
  - action-roguelite
  - building-in-public
  - ai-augmented
  - claude-code
  - gut
  - lefthook
  - gdformat
  - gdlint
featured: false
skills:
  - claude-code
  - godot
  - github
  - git
  - vscode
  - bash
---

## What

A solo, low-poly 3D action-roguelite dungeon crawler. Hades-shaped run, dungeon cadence borrowed from World of Warcraft's Mythic+ vocabulary — rolled affixes, talent-flavored boons, one floor boss per run.

## Why

The roguelite shape forces every system to be playable in isolation, which makes it the right shape for a single-developer portfolio piece on a fixed timeline. The Mythic+ affix layer is the part of dungeon design most worth lifting into the genre and the part most worth building from scratch.

## Stack at a glance

- **[Godot 4](https://godotengine.org)** — engine and editor
- **[GDScript](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/)** — language
- **[GUT](https://github.com/bitwes/Gut)** — unit and scene test framework
- **[Lefthook](https://github.com/evilmartians/lefthook)** — pre-commit gates running gdformat, gdlint, parse-check, and GUT
- **Paid low-poly character and environment kits** — visual asset library
- **CC0 audio** — royalty-free SFX and music

## How it's built

A hard-rule set centered on agent-runnable verification: no design where only a human can tell whether the system worked. TDD is mandatory for gameplay-core surfaces — combat math, ability resolution, boon application — while UI and scene authoring are exempt. A PM agent owns governance documents and ratifies decisions from the other agents into an append-only log.
