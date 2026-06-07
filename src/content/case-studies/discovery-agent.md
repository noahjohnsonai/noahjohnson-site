---
title: 'The brief is the contract: building an AI intake agent like production software'
description: A hybrid-conversational discovery agent where every architectural rule exists to produce a brief consultants actually trust. The engineering is where the operator judgment lives.
pubDate: 2026-06-07
draft: false
project: client-intake-agent
cover: /case-studies/discovery-agent-cover.jpg
coverAlt: Editorial illustration of a single sealed envelope on a dark desk, a terracotta wax seal catching warm directional light from the upper left, faint structured lines suggesting a document behind it.
tags:
  - claude-code
  - ai-agent
  - llm
  - production-ai
  - eval-driven-development
  - testing
  - methodology
  - case-study
  - ai-augmented
---

## TLDR

Most AI intake tools are a chatbot wrapped around a form. This one replaces the form entirely. It runs the pre-discovery conversation a consultant would, draws real requirements out of clients who have never had to give them, and produces a brief the engagement team can trust. The whole thing is built like production software: the brief is a contract every part of the system coordinates through, the experience is tailored to each client, and the agent is tested and secured like anything you would put in front of a paying customer. The exciting part is the direction it points. A decade of intake judgment, compiled into something repeatable, and an early step toward discovery that is mostly agentic.

## What this is

Discovery Agent is a hybrid-conversational AI agent that replaces the pre-discovery questionnaire for CRM implementation work. An inbound client receives a magic link, walks through a guided multi-session intake that feels like a conversation, and the engagement team receives a structured discovery brief by email when the intake completes. Scripted spine, AI on the follow-ups.

I have spent more than a decade on the consulting side of CRM implementations. Most clients I meet have never run one. There is no RFI, no RFP, no prior vendor selection to lean on. They are about to put a software suite across their entire stack, and it is the first time anyone has asked them to say out loud what they actually need. That is not a gap in their competence. It is the reason the work exists. The pre-discovery questionnaire, a Word document emailed to a paying client, assumes the client already knows how to answer it. Most do not, and the ones who try hardest still answer the wrong questions.

Guiding subject-matter experts and stakeholders through that, at any level of preparedness, is the part of the job a form cannot do. So I built the thing that replaces the questionnaire, and I built it to be relied on rather than demoed. The agent carries the process so the client does not have to arrive already knowing how to have the conversation. What follows is how it is put together, and why the architecture, not the model, is where the judgment lives.

## The form was always the wrong tool

A questionnaire optimizes for the wrong outcome. It collects answers. The job of pre-discovery was never to collect answers. It was to show up to the first real conversation already knowing the three things that actually shape the engagement, so the expensive hour with the client is spent on the hard part instead of on intake.

Clients return the form incomplete, late, or answered in a way that does not match what the team needs to walk in prepared. That is not a discipline problem on the client's side. It is a format problem. A form is one person, alone, guessing at what the engagement team needed to know. The information a consultant needs lives in a conversation, in the follow-up question the form never thought to ask, and in the second stakeholder who corrects the first.

Companies want this. The desire to start an implementation the right way is almost always there. What they do not have is a way to execute it, which is why they bring in consultants at all: to sit with their team members, their subject-matter experts, and their stakeholders and draw the real requirements out of people who have never had to put them into words. That is what discovery is, and it is why framing pre-discovery as a guided conversation rather than a form matters. So the agent runs the conversation, brings more of those voices to the table, and treats the brief as the deliverable. The form is gone. The thing the form was supposed to produce is what the system is built around.

## The brief is the contract

The center of the architecture is a single locked, versioned schema that defines exactly what a finished brief contains. It is not a suggestion the model loosely fills in. It is the contract every part of the system coordinates through. The agent populates it. The compiler renders it to markdown and HTML. The live brief pane the client sees as they talk, the admin preview the consultant reviews, and the email that lands when intake completes all consume the same shape verbatim.

That shape is specific. Business overview, project logistics, goals and pain and priorities, current tech stack, workforce and location, a departmental catch-all, supporting documents. Plus the parts a real engagement needs that a form never captures: per-stakeholder sections for subject-matter experts brought in mid-engagement, an explicit list of coverage gaps where the intake fell short, and a security section for anything the agent flagged.

Treating the schema as the contract has a consequence that runs through the whole build. Schema changes route through a single owner under eval discipline, and any change to it propagates in a fixed order to the code that produces and consumes it. The brief is the product, so the schema is the spec, and the spec does not drift quietly. This is the part of the design that a generic chatbot does not have, and the part that makes the output something a consultant will actually rely on.

## User input is data, never instruction

A client walking through intake is handing an AI the operational guts of their business. The architecture has to earn that, and most of the security posture is a direct expression of intake judgment rather than a checklist.

User input is treated as data, never as instruction. An attempt to redirect the agent, intentional or not, gets a polite decline, a timestamped server-side log, and a flag in the brief's security section so the consultant sees it before the call. AI disclosure is mandatory: consent is recorded server-side with a timestamp, and no agent turn fires for a session that has not given it. Session state is server-authoritative. The magic-link token validates on the server on every request, no personally identifying information ever rides in a URL, and the client never decides what counts as complete. The model runs on a zero-data-retention endpoint by hard rule, so the promise that a client's answers are never used for training is a contract the architecture enforces, not a line in a privacy policy.

None of these are features bolted on at the end. They are constraints the build started from, because an intake tool that leaks or that can be talked out of its job is worse than the form it replaces.

## Testing an AI agent like real software

The hardest claim to make about any AI agent is that it still works after the last change. Most agents are tested by a person trying it once and seeing that it seemed fine. Discovery Agent runs through five layers before a human ever looks.

The layers climb from the most deterministic to the least. At the bottom, the pure logic that has nothing to do with the model is tested the way any production code is. Above that, the parts that touch the database and the session are exercised against a real one. Higher up, the agent's own behavior is put through a conversation evaluation, scored against a rubric for the things that actually matter in intake, with the scoring done independently rather than by the agent grading itself. Near the top, the whole flow is run the way a client would experience it. And at the very top sits a human, checking the things a machine cannot: whether it feels premium, whether the brief reads like a consultant wrote it.

Two things make this more than a checklist. The automated layers run on their own and hand a person a short report, so the review time goes to judgment rather than setup. And the system prompt is held to the same bar as code: a change to it has to clear the evaluation before it ships, with enough discipline to tell a real regression apart from the model's normal variance. The specifics of how that is wired matter less than the principle. The agent is held to the standard you would hold any other part of the system to.

This layer is the actual line between a demo that worked once and a system you would put in front of a paying client. The generalized version of this approach is written up as a drop-in [five-layer test stack for AI agents](/examples/five-layer-agent-test-stack.md), if you are testing an agent of your own.

## A governance harness

The build runs as a small set of agents with bounded ownership. Each one owns a defined territory, the governance documents, the agent's own prompt and the brief schema, or the code in a single lane, and stays out of the others. The decisions that shape the system are written down as they are made and not quietly rewritten later, so the reasoning behind a locked choice is still readable months on.

The rule that holds it together is that any change crossing a territory boundary triggers a structured question before a line of code is written, regardless of which agent surfaced it. One person directing the set still runs like a team that reviews itself, because the review is built into the harness rather than left to discipline.

## Brand-agnostic by rule

Every firm-identity string flows through a single configuration file: the name, the color, the logo, the domain, the retention period. The same codebase serves any firm. But the branding is not really about the firm sending the intake. It is about the client receiving it. The experience is tailored to them, so the client a firm is bringing on sits down with something that feels built for their engagement, not a generic form forwarded by a vendor. The conversation adapts to their answers and the whole experience is shaped around the client getting the consulting service. That is an operator instinct showing up in the architecture: the tool is a product, and the product's job is to make each client feel like the work was set up for them specifically. Routing every identity detail through one place keeps the separation clean too, because nothing about a specific firm is allowed to leak into the logic.

## Where this is going

What excites me about a tool like this is not that it works. It is what it points at. The judgment that used to live only in a consultant's head, which questions matter, what a good brief contains, how to draw a real answer out of someone who has never had to give one, does not have to stay locked in there anymore. It can be built into something repeatable.

The near-term promise is concrete. Done well, this speeds up the slowest part of starting an engagement: getting a client intake-ready and prepared enough that the first human discovery session opens on the hard problems instead of the basics. The client arrives already oriented, the consultant arrives already informed, and the expensive hour is spent where it should be.

The longer arc is bigger than intake. I think discovery as a whole eventually runs through something agentic like this, with humans steering the parts that need a human and the agent carrying everything around them. This is not that yet, and I am not pretending it is. It is a good stopgap on the way there, and an iterative step toward a kind of discovery that is mostly agentic. That is the mindset I am building toward: not replacing the consultant, but compiling more and more of what makes a consultant good into tools that let them start every engagement further down the field.
