---
name: sills-audit-content
description: Audit whether product content is clear, understandable, useful, credible, coherent, and appropriate for its audience. Evaluate comprehension, information hierarchy, UX writing, terminology, cognitive load, onboarding, calls to action, errors, empty states, trust, localization readiness, and cross-surface consistency using source, runtime, and shared project knowledge.
license: MIT
metadata:
  author: Sil van Diepen
  version: "0.3.0"
---

# Content Quality Audit

Perform a comprehensive, evidence-based, report-only evaluation of the actual content experience. Do not reduce the audit to checking whether headings, labels, buttons, metadata, errors, or help text merely exist.

## Non-negotiable contract

- Do not modify application code, content, configuration, dependencies, lockfiles, generated files, data, or repository structure.
- Create files only inside the selected dated audit directory.
- Suggestions, rewrites inside findings, and verification steps are allowed; applying fixes is not.
- Never invent evidence, source locations, standards, measurements, screenshots, runtime behaviour, audience needs, or business goals.
- Distinguish direct observation, automated detection, manual judgement, documentation, inference, and untested areas.
- Include concrete positive findings. Do not manufacture praise.
- Read project documentation and repository instructions before applying general practice.
- A clean spelling or grammar check is not proof that content is understandable, useful, trustworthy, or persuasive.

## Shared knowledge first

Before rebuilding any inventory, read `project-knowledge.json` and the shared evidence index.

Reuse available knowledge for:

- routes and screens;
- user roles and authenticated states;
- navigation and information architecture;
- forms, actions, APIs, and workflows;
- localization resources and supported languages;
- components, design-system primitives, and repeated messages;
- errors, empty states, onboarding, help, legal, and trust surfaces.

Add missing content-specific facts to the shared knowledge model. Do not treat missing collector output as proof that a content surface does not exist.

## Supported modes

- `source`: repository and content-resource inspection only.
- `runtime`: running-product inspection only.
- `full`: combine source, runtime, documentation, and shared knowledge.
- `changed`: focus on changed content and affected journeys, repeated primitives, locales, and dependent surfaces.
- `ci`: non-interactive structural checks plus explicit manual-review queues for qualitative judgement.
- `verify`: retest findings from an earlier report without changing the product.

Depth is independent: `quick`, `standard`, or `deep`. Default to `full` and `standard` when source and runtime are available.

## Intake

Establish before judging:

- primary and secondary audiences;
- user expertise, language ability, accessibility needs, and likely stress level;
- product purpose and the job each major journey helps users complete;
- brand voice, legal constraints, terminology rules, and content standards;
- supported languages, source locale, translation workflow, and locale ownership;
- whether the surface is product UI, marketing, documentation, transactional messaging, support, or mixed.

When this information is unavailable, infer cautiously from evidence and mark the audience or purpose assumption explicitly.

## Coverage model

Build a representative content inventory from shared knowledge and direct evidence. Include, where applicable:

- homepage and first-use experience;
- primary navigation and labels;
- core task journeys;
- authentication, permissions, and account recovery;
- forms, validation, confirmations, and destructive actions;
- loading, empty, offline, error, expired, restricted, and success states;
- onboarding, education, help, and documentation;
- pricing, billing, subscriptions, consent, privacy, and trust;
- notifications, email, push, and transactional messages;
- search, filtering, sorting, and no-result experiences;
- localization, pluralisation, dates, numbers, currencies, and RTL surfaces;
- marketing claims and their consistency with the actual product.

Do not select only the polished happy path. Include high-stress, high-risk, and repeated content primitives.

## Evaluation dimensions

### 1. Comprehension and audience fit

Evaluate whether the intended audience can understand:

- what the product or screen is for;
- what happened;
- what is expected next;
- the consequences of an action;
- the difference between available choices;
- unfamiliar concepts, terms, requirements, and restrictions.

Assess unexplained jargon, assumed knowledge, vague references, ambiguous pronouns, overloaded terms, indirect wording, and missing context. Distinguish specialist language that is necessary from specialist language that is merely habitual.

### 2. Information hierarchy and scanability

Evaluate whether content is ordered around user decisions and tasks rather than implementation structure.

Check:

- heading and subheading usefulness;
- progressive disclosure;
- grouping and sequence;
- prominence of critical constraints;
- duplication and buried information;
- label-value clarity;
- whether users can scan before reading deeply;
- whether visual hierarchy and semantic hierarchy agree.

### 3. Cognitive load and reading effort

Assess sentence length, clause density, abstraction, noun stacking, passive constructions, conditional complexity, competing instructions, memory burden, and unnecessary decision points.

Reading-level formulas may be used as supporting evidence only. Never treat a formula as a verdict. Explain which wording creates difficulty and for whom.

### 4. UX writing and action clarity

Evaluate labels, buttons, links, instructions, hints, confirmations, and microcopy for:

- specificity;
- predictability;
- action-outcome alignment;
- consistency;
- brevity without loss of meaning;
- recoverability;
- avoidance of generic labels such as “Submit”, “Continue”, “OK”, or “Learn more” when context is insufficient.

Calls to action must be judged by whether users understand the value, requirement, consequence, and next state, not merely whether a CTA exists.

### 5. Errors, empty states, and recovery

Evaluate whether messages help users recover. A useful message should explain, as applicable:

- what happened;
- what the user can do;
- what the system will do;
- whether data or progress was preserved;
- whether retrying is safe;
- where to get further help.

Flag blame, dead ends, raw technical errors, contradictory validation, generic failure language, and inaccessible or transient messaging.

### 6. Onboarding and learning

Evaluate whether onboarding teaches the user's real task rather than cataloguing features. Check timing, relevance, skippability, repetition, contextual education, permission requests, setup burden, and whether users can recover instructions later.

### 7. Terminology and consistency

Build or reuse a terminology inventory. Detect conflicting names for the same concept, the same word used for different concepts, inconsistent capitalization, inconsistent action labels, product-versus-documentation drift, and source-versus-translation drift.

Consistency is not automatically good. Flag consistently confusing terms as quality problems.

### 8. Trust, credibility, and transparency

Evaluate claims, pricing, consent, permissions, destructive actions, data use, limitations, uncertainty, and automated or AI-generated outcomes.

Check whether content:

- makes verifiable claims;
- distinguishes fact, estimate, recommendation, and marketing language;
- communicates important conditions before commitment;
- avoids manipulative urgency, concealed consequences, false reassurance, or misleading defaults;
- provides appropriate provenance or explanation for generated results.

### 9. Tone and emotional appropriateness

Assess tone against audience, context, seriousness, urgency, failure, accessibility, culture, and brand guidance. Friendly wording is not always appropriate. Flag humour, celebration, blame, excessive enthusiasm, coldness, or informality when it conflicts with the user's state or the consequence of the action.

### 10. Localization readiness

Evaluate whether source content supports translation and locale adaptation:

- no concatenated sentences;
- no ambiguous placeholders;
- sufficient context for translators;
- plural and gender handling;
- expansion tolerance;
- locale-aware dates, numbers, currencies, names, and addresses;
- culturally dependent examples and metaphors;
- RTL-safe ordering and directional language;
- consistent keys and fallback behaviour.

Do not judge translation quality in a language you cannot evaluate confidently. Queue qualified manual review instead.

### 11. Accessibility of language

Evaluate plain-language quality, understandable instructions, descriptive links, accessible names, error identification, reading order, cognitive accessibility, and dependence on colour, position, shape, sound, or visual memory.

Coordinate with the accessibility audit rather than duplicating technical accessibility testing.

### 12. Cross-surface coherence

Compare product UI, marketing, documentation, support, notifications, legal content, and release communication. Flag promise-versus-product gaps, outdated screenshots or instructions, conflicting terminology, and workflows documented differently from how they behave.

## Evidence rules

Each qualitative finding must include:

- the exact observed wording or a short compliant excerpt;
- the route, state, component, message key, or source location;
- the intended audience or explicit audience assumption;
- why the wording impairs comprehension, action, trust, or recovery;
- whether the issue is isolated or repeated;
- a concrete recommendation;
- an improved example when useful;
- verification instructions with representative states and locales.

Do not create findings from personal stylistic preference alone. Tie judgement to audience, task, consequence, consistency, documented voice, or established content principles.

## Audit procedure

1. Read project guidance and shared project knowledge.
2. Establish audience, purpose, voice, locale, and risk assumptions.
3. Build a representative content and state inventory.
4. Prioritise primary journeys, repeated primitives, high-risk operations, onboarding, recovery, and trust surfaces.
5. Collect exact source and runtime evidence before judging.
6. Evaluate the twelve content dimensions.
7. Correlate repeated wording and shared component roots.
8. Separate structural checks from qualitative manual judgement.
9. Record positive patterns with evidence.
10. Record limitations, language gaps, inaccessible states, and untested roles.
11. Write aligned human and machine-readable outputs.
12. Prepare a remediation handoff another agent can use without inventing context.
13. Validate contracts and confirm no product files changed.

## Output

Write inside the selected dated audit directory:

- `summary.md`
- `report.md`
- `report.json`
- `coverage.json`
- `manifest.json`
- `handoff.md`
- `reports/content.md`
- evidence and raw output
- individual finding files when useful

Use stable finding identities derived from rule, surface, location, and subject. Preserve earlier IDs in verification mode.

Recommended content categories:

- comprehension
- hierarchy
- cognitive-load
- actions
- errors-and-recovery
- onboarding
- terminology
- trust
- tone
- localization-readiness
- language-accessibility
- cross-surface-coherence

## Severity and confidence

Use shared Sills models:

- Severity: `critical`, `major`, `moderate`, `minor`, `observation`.
- Confidence: `certain`, `likely`, `possible`, `insufficient-evidence`.
- Release-blocker status is separate.

Severity should reflect user harm, task blockage, financial or legal consequence, frequency, affected audience, recoverability, and systemic repetition. Do not assign high severity merely because wording is poor.

Do not produce a single artificial quality score. Report dimension statuses, finding distribution, repeated roots, coverage, and limitations.

## CI behaviour

CI may identify structural signals such as missing states, duplicate terminology, placeholder text, malformed localization resources, inaccessible labels, and unregistered messages. CI must not present automated readability, sentiment, grammar, or AI-detection output as a complete content-quality judgement.

Queue qualitative surfaces for manual review when context or audience judgement is required.

## References

Read only references relevant to the current scope. Use `references/content-quality-method.md` as the primary qualitative methodology.

<!-- sills:shared-report-contract:start -->
## Shared report and runtime-intake contract

Before writing any Content quality audit output, read `references/report-contract.md` and use the bundled report template.

- Begin with a professional status conclusion using the universal Sills health level and an audit-specific label.
- Report materially different content dimensions separately.
- Include a ship decision only when this specialist has enough evidence to justify one.
- Include prioritised tasks with traceable actions, acceptance criteria, and verification.
- Reference shared knowledge nodes and evidence IDs.
- Keep the standard section order so reports remain comparable.
- When runtime web coverage is relevant and no usable URL is supplied or documented, ask once for live, staging, preview, or local URLs and their environment and role. Continue source analysis if none are provided.
- In CI mode, never prompt; record absent runtime targets and qualitative review gaps as limitations.

Recommended status dimensions: Comprehension; Information hierarchy; UX writing; Errors and recovery; Terminology; Trust and transparency; Localization readiness; Cross-surface coherence.
<!-- sills:shared-report-contract:end -->
