---
title: 'What dynamic workflows are actually for'
description: One prompt became 134 agents working in the background. The skill is not running the swarm, it is recognizing the kind of problem that is shaped for one.
pubDate: 2026-06-07
draft: false
featured: false
cover: /posts/dynamic-workflows-cover.jpg
coverAlt: Editorial illustration of a murmuration of starlings wheeling into a single sweeping shape against a warm dark sky, one bird picked out in terracotta near the leading edge, with soft warm directional light from the upper left.
tags:
  - claude-code
  - dynamic-workflows
  - ai-agent
  - multi-agent
  - methodology
  - ai-augmented
---

## TLDR

One prompt I sent turned into 134 agents working in the background, and came back fifteen minutes later as a verified research memo. Dynamic workflows, a new Claude Code feature, let Claude write and run a script that orchestrates a swarm of subagents while your session stays live. The agent count impresses, but the useful skill is quieter: recognizing which problems are shaped for a swarm, the wide and independent ones where every piece can be checked, and building the verification in so you can trust work you will never read in full. It earns its keep on the right shape of problem, and it is expensive theater on the wrong one.

## What dynamic workflows are

Anthropic recently shipped a feature called dynamic workflows, and the cleanest definition is theirs: you describe a task, Claude writes a script that orchestrates a swarm of subagents to carry it out, and a runtime runs that script in the background while your session stays live. That script is a real program, written on the fly for your specific task, that spawns and coordinates other instances of Claude at a scale you would never sit and wait through by hand.

Two nearby features get conflated with this. It is not the model taking more turns in your conversation. Ordinary subagents do that, and their results land back in your context where they cost you tokens and attention. It is not a scheduled job either, the kind you set on a timer to re-run a prompt. A dynamic workflow is a third thing: a one-off orchestration program that holds its own logic, keeps the intermediate work out of your context, and hands you back a single result when the swarm is done. What is new is not that Claude can delegate. It is that Claude writes and runs the delegation harness itself.

## One prompt, 134 agents

The first time I used one, I had a competitive-landscape map to build: how firms in an adjacent market package a particular kind of offering, across several ecosystems, with sources I could check. The old version of this job is a day of tabs. I typed one prompt describing what I wanted, approved the plan, and went and did something else. About fifteen minutes later a single document came back, categorized findings and a patterns section and a sources list, assembled by 134 subagents that had been working in the background while I was gone.

My first reaction was the one you are probably having. A hundred and thirty-four agents to write a research memo sounds like a flex. It is the kind of number you screenshot to look impressive, and I did not trust that it meant anything. I had that suspicion going in, so the rest of this is me taking it seriously: what those agents actually did, why this task was a good fit for them, and how you tell a problem that is shaped for a swarm from one where the swarm is just expensive theater.

## The run

The task broke into many small, independent pieces. How one firm packages an offering is its own lookup, and it does not depend on how any other firm does it. That independence is the thing that makes a task suitable for a swarm: you can hand each piece to a separate agent and nothing has to wait its turn. A task where step two needs step one's answer cannot fan out. This one had almost none of those edges, which is why it was a good fit and most of my work is not.

The script Claude wrote worked in phases. First it fanned out across angles and sources, one agent per slice, running many in parallel up to a fixed concurrency cap. Then a second wave took each claim the searchers brought back and tried to knock it down, testing it against other sources before it was allowed into the report. Only the claims that survived reached the synthesis pass that wrote the document. That adversarial check is not something the runtime does for free. It is logic the script encodes, and a swarm is only as trustworthy as the checking you build into it.

The numbers: 134 subagents, about fifteen minutes, all of it while I did other work. Twenty-five claims came through verified, and none were thrown out in the checking. What made the memo usable was the checking itself, because every claim in it had survived a separate agent trying to discredit it. That verification pass existed only because checking is cheap when checking is just more agents to spawn. A day of manual research almost never includes one. This run included it by default.

## How to recognize the shape

A task is shaped for a swarm when it decomposes into pieces that do not depend on each other, that each produce something you can check, and that together are too big to hold in one context. The research run hit all three. So would auditing a large surface for one class of problem, or transforming a few hundred files the same way. The common thread is that the work is wide rather than deep, and the pieces do not need to talk to each other. I wrote the whole thing up as a [short checklist you can run before reaching for a swarm](/examples/is-my-task-fan-out-shaped.md).

The other half of the test is the checking. You cannot trust output you did not read, and a swarm produces more than you will read, so the verification has to be designed in rather than done after. And when a task is not wide and independent, a swarm is the wrong tool and an expensive one. Anything that has to be reasoned through in one continuous line, anything where each step changes the next, anything small enough to just do yourself, none of those want 134 agents. There the swarm is pure overhead, token cost with nothing to show for it.

So the skill the feature rewards is not running it. It is looking at a task and seeing whether it is wide and independent, and then deciding how each piece gets checked. The agents are cheap to spawn. The decomposition and the verification are where the judgment lives, and neither one gets automated by handing the work to a swarm.

## Where this is going

Dynamic workflows are a research preview, which is the honest frame for where this is. The feature will change, the rough edges are real, and I would not bet a deadline on a background run finishing clean every time. But the motion underneath it will outlast the preview. Once spawning a hundred agents costs about as much thought as spawning one, the question stops being whether you can parallelize a task and becomes whether the task is shaped to allow it.

That is a different kind of work than prompting. You are not writing the answer, and you are not even writing the steps. You are recognizing the shape of a problem, deciding how its pieces get checked, and letting a swarm you will never read in full do the rest. I think that recognition is going to be a real part of the job, and the way to get good at it is to start on the tasks that are obviously wide, like research, before the harder calls show up.
