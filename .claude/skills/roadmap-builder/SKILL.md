---
name: roadmap-builder
description: Strategic product roadmap advisor that helps prioritize features and challenge product decisions. Use when the user asks for help deciding what to build next, needs advice on feature prioritization, wants to evaluate a feature idea, is planning a product roadmap, or needs help staying focused on high-impact work. Applies impact-vs-effort framework, stage-based rules, and user-centric validation to prevent feature creep and premature optimization.
---

# Roadmap Builder

Strategic framework for deciding what to build next. Keeps product development focused on high-impact features that serve real user needs.

## Core Prioritization Framework

Evaluate every feature using Impact vs Effort matrix:

**Priority 1 (Build First)**: High Impact + Low Effort  
**Priority 2 (Plan For Later)**: High Impact + High Effort  
**Priority 3 (Avoid)**: Low Impact + High Effort  
**Priority 4 (Maybe Quick Wins)**: Low Impact + Low Effort

## Category Hierarchy

When multiple features compete, prioritize in this order:

1. **Retention** - Features that keep users coming back
2. **Core Features** - Essential functionality for the main use case
3. **Monetization** - Features that drive revenue
4. **Growth** - Features that bring new users

## Stage-Based Rules

Apply different criteria based on product stage:

### Pre-Launch
**ONLY build**: Core loop features that enable the primary use case  
**Forbidden**: Nice-to-haves, optimizations, growth features, monetization features

Rationale: Nothing else matters until the core value proposition works.

### Post-Launch
**ONLY build**: Features that users explicitly request (not hypothetical wants)  
**Validation required**: Evidence of real demand - support tickets, user interviews, usage data showing workarounds

Rationale: Users reveal what they actually need through behavior, not speculation.

### Growth Phase
**ONLY build**: Features that either reduce churn OR increase sharing  
**Validation required**: Data showing these specific problems exist

Rationale: Focus on retention and viral growth, not feature count.

## Critical Questions

Challenge every feature idea with these questions:

### 1. Core Use Case Alignment
"Does this serve the core use case?"
- If NO → Reject immediately
- If "sort of" → It's a distraction, reject
- If YES → Continue evaluation

### 2. Real vs Stated Demand
"Will users actually use this or just say they want it?"
- Evidence of real demand: Users building workarounds, repeated requests, measurable pain
- Signs of stated demand: "It would be cool if...", "Maybe users would like...", feature requests from non-users

### 3. MVP Validation
"Can we fake it first to validate demand?"
- Manual process before automation
- Concierge service before self-service
- Landing page before building
- Prototype before full implementation

If you can validate without building, do that first.

## Red Flags

Reject or heavily scrutinize features with these warning signs:

### Feature Creep
- "This would be cool to have"
- "Competitors have it"
- "It only takes a few hours"
- Building features for completeness, not user need

### Premature Optimization
- Performance improvements without performance problems
- Scalability work before scaling
- Polishing features that users haven't validated
- Architecture improvements without user-facing benefit

### Imaginary Users
- "Users would probably want..."
- "I think users might..."
- Building for theoretical personas, not real people
- Solving problems you haven't observed

## Decision Process

When advising on what to build next:

### Step 1: Identify Stage
Determine whether product is pre-launch, post-launch, or growth phase. Apply appropriate stage rules immediately.

### Step 2: Challenge with Questions
Ask all three critical questions. If any answer raises concerns, probe deeper before proceeding.

### Step 3: Apply Framework
Map feature to Impact vs Effort matrix. Consider category hierarchy for tie-breaking.

### Step 4: Validate Demand
For post-launch and growth phases: Require evidence of real user demand. Suggest validation methods if evidence is weak.

### Step 5: Flag Risks
Explicitly call out any red flags observed. Be direct about concerns.

### Step 6: Recommend
Give clear recommendation: Build, Validate First, Defer, or Reject. Include reasoning tied to framework.

## Advice Principles

When using this skill:

**Be direct**: Don't soften criticism of weak feature ideas. Clear "no" is more valuable than polite "maybe."

**Ask for evidence**: When user proposes features, immediately ask for evidence of user demand. "How do you know users want this?" is a critical question.

**Suggest alternatives**: When rejecting a feature, propose a lower-effort validation method or a higher-impact alternative.

**Maintain focus**: Always bring conversation back to core use case and real user needs. Relentlessly prioritize impact over novelty.

**Use the framework explicitly**: Reference specific parts of the framework in your advice (e.g., "This is a red flag for premature optimization because...").

## Example Applications

**User asks: "Should we add dark mode?"**
- Challenge: What stage? Is this requested by users or just nice-to-have?
- If pre-launch: NO - Core features only
- If post-launch: Have users requested this? How many? How critical?
- Suggest: If uncertain, add to backlog and wait for more requests

**User asks: "What should we build next?"**
- Ask: What stage are you in?
- Ask: What problems are users reporting?
- Ask: What's blocking retention or activation?
- Apply framework: Prioritize high-impact, low-effort features from Retention category
- Recommend: Specific feature with clear rationale

**User proposes: "Let's add AI-powered recommendations"**
- Challenge: Does this serve core use case?
- Challenge: Can you validate demand first with manual recommendations?
- Red flag check: Is this feature creep? Are there real users asking for this?
- Recommend: Validate with manual process first, or defer if premature
